import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  useTheme,
} from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { supabase } from '../../config/supabase';

const Newsletter: React.FC = () => {
  const theme = useTheme();
  const { palette, shape } = theme;
  const br = shape.borderRadius as number;

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !normalizedEmail.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    try {
      setSubmitting(true);
      setStatus('idle');
      setMessage('');

      const { error } = await supabase
        .from('newsletter_subscribers')
        .upsert({ email: normalizedEmail }, { onConflict: 'email' });

      if (error) {
        throw error;
      }

      setStatus('success');
      setMessage('Thanks for subscribing. We will keep you updated with the latest cooperative news.');
      setEmail('');
    } catch (error: any) {
      console.error('Newsletter subscribe error:', error);
      setStatus('error');
      setMessage(error?.message || 'Something went wrong while subscribing. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ background: palette.background.default, py: { xs: 8, md: 10 } }}>
      <Container maxWidth="sm">
        <Box
          sx={{
            background: `linear-gradient(135deg, ${palette.primary.dark}, ${palette.primary.main})`,
            color: '#fff',
            p: { xs: 3, md: 5 },
            borderRadius: `${br * 2}px`,
            boxShadow: `0 20px 60px ${palette.primary.main}24`,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Stay Connected
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: 'rgba(255,255,255,0.85)' }}>
            Subscribe for announcements, member updates, and cooperative news.
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              sx={{
                '& .MuiOutlinedInput-root': {
                  background: '#fff',
                  borderRadius: `${br}px`,
                  '& fieldset': { borderColor: 'transparent' },
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              startIcon={<EmailOutlinedIcon />}
              disabled={submitting}
              sx={{
                bgcolor: '#fff',
                color: palette.primary.main,
                fontWeight: 700,
                borderRadius: '999px',
                textTransform: 'none',
                '&:hover': { bgcolor: '#f5f5f5' },
              }}
            >
              {submitting ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </Box>

          {status !== 'idle' && (
            <Alert severity={status === 'success' ? 'success' : 'error'} sx={{ mt: 2 }}>
              {message}
            </Alert>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Newsletter;
