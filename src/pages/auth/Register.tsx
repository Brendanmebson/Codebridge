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
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const inviteEmail = params.get('email');

    if (inviteEmail) {
      setEmail(inviteEmail);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const initSession = async () => {
      try {
        const { data: current } = await supabase.auth.getSession();
        if (current?.session) {
          if (mounted) setSessionReady(true);
          return;
        }

        // Try to extract session from URL if present (invite redirect)
        const url = window.location.href;
        if (/([#?](access_token|refresh_token|type)=)/.test(url)) {
          try {
            const { error } = await supabase.auth.getSessionFromUrl({ storeSession: true });
            if (error) console.error('getSessionFromUrl error:', error);
          } catch (e) {
            console.error('getSessionFromUrl threw:', e);
          }
        }

        // Wait briefly for session to become available
        let tries = 0;
        while (mounted && tries < 10) {
          const { data } = await supabase.auth.getSession();
          if (data?.session) {
            if (mounted) setSessionReady(true);
            return;
          }
          // small delay
          // eslint-disable-next-line no-await-in-loop
          await new Promise((r) => setTimeout(r, 200));
          tries += 1;
        }

        if (mounted) setSessionReady(true);
      } catch (err) {
        console.error('initSession error:', err);
        if (mounted) setSessionReady(true);
      }
    };

    initSession();

    return () => { mounted = false; };
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!password) {
      setError('Please choose a password to finish account creation.');
      return;
    }

    setLoading(true);

      if (!sessionReady) {
        setError('Finishing authentication. Please wait a moment and try again.');
        setLoading(false);
        return;
      }

      // Attempt update; retry once on abort
      let attempt = 0;
      while (attempt < 2) {
        try {
          const { data, error: supabaseError } = await supabase.auth.updateUser({ password });
          if (supabaseError) throw supabaseError;

          if (data.user) {
            setSuccess('Your account has been created. Redirecting you to your dashboard...');
            setTimeout(() => {
              navigate('/dashboard', { replace: true });
            }, 1200);
            break;
          } else {
            setError('Could not complete registration. Please try again.');
            break;
          }
        } catch (err: any) {
          const msg = err?.message || String(err);
          // If aborted, retry once
          if (msg && msg.toLowerCase().includes('abort')) {
            attempt += 1;
            if (attempt >= 2) {
              setError('Request was aborted. Please refresh the page and try again.');
            } else {
              // small backoff before retry
              // eslint-disable-next-line no-await-in-loop
              await new Promise((r) => setTimeout(r, 300));
              continue;
            }
          } else {
            setError(msg);
            break;
          }
        }
      }
    } catch (err: unknown) {
      const message = err && typeof err === 'object' && 'message' in err ? (err as any).message : 'Registration failed.';
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
            disabled={loading || !password}
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
