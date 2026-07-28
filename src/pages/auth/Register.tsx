import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Alert, InputAdornment, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../config/supabase';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [inviteStatus, setInviteStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  const resolveInviteSession = async (isSubmitting = false) => {
    setError('');
    setSuccess('');

    const params = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    const inviteEmail = params.get('email') || hashParams.get('email') || '';
    const tokenHash = params.get('token_hash') || hashParams.get('token_hash') || '';
    const inviteToken = params.get('token') || hashParams.get('token') || '';
    const authType = params.get('type') || hashParams.get('type') || '';
    const accessToken = params.get('access_token') || hashParams.get('access_token') || '';
    const refreshToken = params.get('refresh_token') || hashParams.get('refresh_token') || '';
    const code = params.get('code') || hashParams.get('code') || '';
    const authKeys = ['access_token', 'refresh_token', 'token', 'token_hash', 'type', 'state', 'code', 'error', 'error_description'];
    const hasAuthParams = [...params.entries(), ...hashParams.entries()].some(([key]) => authKeys.includes(key));

    if (inviteEmail) {
      setEmail(inviteEmail);
    }

    if (hasAuthParams) {
      setInviteStatus('loading');
    }

    const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        if (tokenHash && authType) {
          const { data, error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: authType as 'invite',
          });

          if (error) {
            console.warn('Invite token verification warning:', error.message);
          }

          const session = data?.session;
          if (session?.user?.email) {
            setEmail(session.user.email);
            setInviteStatus('ready');
            return true;
          }
        }

        if (inviteToken && authType) {
          const { data, error } = await supabase.auth.verifyOtp({
            token: inviteToken,
            type: authType as 'invite',
          });

          if (error) {
            console.warn('Invite token verification warning:', error.message);
          }

          const session = data?.session;
          if (session?.user?.email) {
            setEmail(session.user.email);
            setInviteStatus('ready');
            return true;
          }
        }

        if (accessToken && refreshToken) {
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) {
            console.warn('Invite session set warning:', error.message);
          }

          const session = data?.session;
          if (session?.user?.email) {
            setEmail(session.user.email);
            setInviteStatus('ready');
            return true;
          }
        }

        if (code) {
          const { data, error } = await supabase.auth.exchangeCodeForSession({ code });

          if (error) {
            console.warn('Invite code exchange warning:', error.message);
          }

          const session = data?.session;
          if (session?.user?.email) {
            setEmail(session.user.email);
            setInviteStatus('ready');
            return true;
          }
        }
      } catch (parseError) {
        console.warn('Could not parse invite session from URL:', parseError);
      }

      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData?.session?.user?.email) {
        setEmail(sessionData.session.user.email);
        setInviteStatus('ready');
        return true;
      }

      if (attempt < 2) {
        await wait(1000);
      }
    }

    if (hasAuthParams) {
      setInviteStatus('loading');
      setError('The invitation link is still being activated. Please wait a moment and try again.');
    } else if (inviteEmail) {
      setInviteStatus('ready');
      setError('');
    } else if (!isSubmitting) {
      setInviteStatus('error');
      setError('This page is meant to be opened from an admin invitation email. Please use the latest invite link.');
    } else {
      setInviteStatus('error');
      setError('The invitation link could not be activated. Please use a fresh invite link sent from the admin panel.');
    }

    return false;
  };

  useEffect(() => {
    void resolveInviteSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if ((event === 'INITIAL_SESSION' || event === 'SIGNED_IN') && session?.user?.email) {
        setEmail(session.user.email);
        setInviteStatus('ready');
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!password) {
      setError('Please choose a password to finish account creation.');
      return;
    }

    if (!email) {
      setError('Email is missing. Please click the invite link again.');
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    setLoading(true);
    try {
      const inviteReady = await resolveInviteSession(true);
      if (!inviteReady) {
        setLoading(false);
        return;
      }

      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        throw sessionError;
      }

      if (!sessionData?.session) {
        await resolveInviteSession(true);
      }

      const { data: refreshedSessionData } = await supabase.auth.getSession();
      if (!refreshedSessionData?.session) {
        setInviteStatus('error');
        setError('The invitation link could not be activated. Please use a fresh invite link sent from the admin panel.');
        setLoading(false);
        return;
      }

      const { data, error: supabaseError } = await supabase.auth.updateUser({ password });

      if (supabaseError) {
        throw supabaseError;
      }

      if (data?.user) {
        const { error: memberUpdateError } = await supabase
          .from('members')
          .update({
            status: 'active',
            auth_id: data.user.id,
            updated_at: new Date().toISOString(),
          })
          .eq('email', normalizedEmail);

        if (memberUpdateError) {
          console.warn('Could not activate member profile automatically:', memberUpdateError);
        }

        setSuccess('Your account has been created. Redirecting you to your dashboard...');
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 1200);
      } else {
        setError('Could not complete registration. Please try again.');
      }
    } catch (err: unknown) {
      const message =
        err && typeof err === 'object' && 'message' in err
          ? (err as any).message
          : 'Registration failed. Please try again.';
      setError(message as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f6f8fb', p: 3 }}>
      <Box sx={{ width: '100%', maxWidth: 520, bgcolor: '#fff', borderRadius: 3, boxShadow: '0 20px 60px rgba(15,23,42,0.08)', p: { xs: 4, md: 5 } }}>
        <Typography variant="h4" sx={{ mb: 1.5, fontWeight: 700 }}>
          Complete your registration
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
          Please set a secure password for your new CodeBridge account. Your email address is already filled in from the invitation link.
        </Typography>

        {inviteStatus === 'loading' && !error && (
          <Alert severity="info" sx={{ mb: 3 }}>Activating your invitation link. This usually completes in a moment.</Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
          <TextField
            label="Email address"
            value={email}
            disabled
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Choose a password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            helperText="Create a strong password for your account."
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading || !password || inviteStatus !== 'ready'}
            endIcon={!loading ? <ArrowForwardIcon /> : undefined}
            sx={{ textTransform: 'none', py: 1.5 }}
          >
            {loading ? 'Creating account…' : 'Complete registration'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
