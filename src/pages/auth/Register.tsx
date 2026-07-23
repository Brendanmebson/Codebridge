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

  useEffect(() => {
    // Listen for auth state changes - this will capture the session from the invite link
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'INITIAL_SESSION') {
        // Initial session check
        if (session?.user?.email) {
          setEmail(session.user.email);
        } else {
          // Fallback: check URL parameters
          const params = new URLSearchParams(window.location.search);
          const inviteEmail = params.get('email');
          if (inviteEmail) {
            setEmail(inviteEmail);
          }
        }
      } else if (event === 'SIGNED_IN') {
        // Session established from invite link
        if (session?.user?.email) {
          setEmail(session.user.email);
        }
      }
    });

    // Cleanup listener on unmount
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

    setLoading(true);
    try {
      // Try to get current session
      const { data: sessionData } = await supabase.auth.getSession();
      
      // If no session, the invite link may have expired - user needs to click it again
      if (!sessionData?.session) {
        setError('Invite link has expired. Please check your email for a fresh invitation link.');
        setLoading(false);
        return;
      }

      // Update the password
      const { data, error: supabaseError } = await supabase.auth.updateUser({ password });
      
      if (supabaseError) {
        throw supabaseError;
      }

      if (data?.user) {
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
