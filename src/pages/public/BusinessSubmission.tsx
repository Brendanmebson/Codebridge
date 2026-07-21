import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';
import { isSupabaseConfigured, supabase } from '../../config/supabase';

const BusinessSubmission: React.FC = () => {
  const theme = useTheme();
  const { palette, typography, shape } = theme;
  const br = shape.borderRadius as number;

  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    category: '',
    website: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!isSupabaseConfigured) {
      setError('Supabase is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment before submitting.');
      return;
    }

    const requiredFields = [
      formData.businessName.trim(),
      formData.ownerName.trim(),
      formData.email.trim(),
      formData.description.trim(),
    ];

    if (requiredFields.some((field) => !field)) {
      setError('Please complete the business name, owner name, email, and business description fields.');
      return;
    }

    setLoading(true);

    try {
      const { error: insertError } = await supabase
        .from('business_submissions')
        .insert({
          business_name: formData.businessName.trim(),
          owner_name: formData.ownerName.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          category: formData.category.trim(),
          website: formData.website.trim(),
          description: formData.description.trim(),
          status: 'pending',
        });

      if (insertError) {
        throw insertError;
      }

      setSuccess(true);
      setFormData({
        businessName: '',
        ownerName: '',
        email: '',
        phone: '',
        category: '',
        website: '',
        description: '',
      });
    } catch (submitError: any) {
      console.error('Business submission error:', submitError);
      setError(submitError?.message || 'Something went wrong while submitting your business. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: palette.background.default, px: 3 }}>
        <Paper sx={{ p: 6, borderRadius: `${br * 2}px`, maxWidth: 560, textAlign: 'center', boxShadow: '0 24px 60px rgba(0,0,0,0.08)' }}>
          <Box sx={{ width: 64, height: 64, borderRadius: '50%', background: `${palette.success.main}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
            <CheckCircleIcon sx={{ fontSize: 32, color: palette.success.main }} />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Business Submitted</Typography>
          <Typography variant="body1" sx={{ color: palette.text.secondary, mb: 4 }}>
            Thanks for submitting your business. Our team will review the details and contact you if your profile needs any follow-up.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button component={Link} to="/businesses" variant="outlined" size="large" sx={{ borderRadius: 100, textTransform: 'none', fontWeight: 600 }}>
              Back to Businesses
            </Button>
            <Button component={Link} to="/" variant="contained" size="large" sx={{ borderRadius: 100, textTransform: 'none', fontWeight: 600 }}>
              Return Home
            </Button>
          </Stack>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ background: palette.background.default, minHeight: '100vh', py: { xs: 8, md: 12 }, px: 3 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Box sx={{ display: 'inline-block', px: 2, py: 0.5, background: `${palette.primary.main}10`, border: `1px solid ${palette.primary.main}22`, borderRadius: '100px', mb: 2 }}>
            <Typography sx={{ fontFamily: typography.fontFamily, fontSize: '0.75rem', fontWeight: 700, color: palette.primary.main, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Member Directory
            </Typography>
          </Box>
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>Submit Your Business</Typography>
          <Typography variant="body1" sx={{ color: palette.text.secondary, maxWidth: 680, mx: 'auto' }}>
            Tell us about your business and we will review your listing request for the CodeBridge member directory.
          </Typography>
        </Box>

        <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: `${br * 2}px`, boxShadow: '0 12px 40px rgba(0,0,0,0.06)' }}>
          {error && <Alert severity="error" sx={{ mb: 4, borderRadius: `${br}px` }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                <TextField required fullWidth label="Business Name" name="businessName" value={formData.businessName} onChange={handleChange} />
                <TextField required fullWidth label="Owner / Contact Name" name="ownerName" value={formData.ownerName} onChange={handleChange} />
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                <TextField required fullWidth label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} />
                <TextField fullWidth label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                <TextField fullWidth label="Business Category" name="category" value={formData.category} onChange={handleChange} />
                <TextField fullWidth label="Website" name="website" value={formData.website} onChange={handleChange} />
              </Stack>

              <TextField
                required
                fullWidth
                multiline
                minRows={5}
                label="Business Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Stack>

            <Box sx={{ mt: 5, textAlign: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <ArrowForwardIcon />}
                sx={{
                  background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`,
                  px: 6,
                  py: 1.5,
                  borderRadius: 100,
                  fontWeight: 700,
                  textTransform: 'none',
                  boxShadow: `0 8px 24px ${palette.primary.main}40`,
                  '&:hover': { transform: 'translateY(-2px)' },
                }}
              >
                {loading ? 'Submitting...' : 'Submit Business'}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default BusinessSubmission;
