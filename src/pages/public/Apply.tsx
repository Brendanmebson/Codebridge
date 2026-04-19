import React, { useState } from 'react';
import {
  Box, Container, Typography, TextField, Button, Alert,
  useTheme, Paper, Stack, IconButton, CircularProgress
} from '@mui/material';
import { supabase } from '../../config/supabase';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Apply: React.FC = () => {
  const theme = useTheme();
  const { palette, typography, shape } = theme;
  const br = shape.borderRadius as number;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: ''
  });
  
  const [files, setFiles] = useState({
    idDoc: null as File | null,
    photoDoc: null as File | null,
    addressDoc: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof typeof files) => {
    if (e.target.files && e.target.files[0]) {
      setFiles({ ...files, [key]: e.target.files[0] });
    }
  };

  const uploadFile = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('member_documents')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('member_documents')
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate files
    if (!files.idDoc || !files.photoDoc || !files.addressDoc) {
      setError('Please upload all required documents (ID, Photograph, and Address Proof).');
      return;
    }

    setLoading(true);

    try {
      // Upload documents sequentially to prevent browser fetch aborts
      const idUrl = await uploadFile(files.idDoc);
      const photoUrl = await uploadFile(files.photoDoc);
      const addressUrl = await uploadFile(files.addressDoc);

      const { error: insertError } = await supabase
        .from('membership_applications')
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          date_of_birth: formData.dateOfBirth,
          id_url: idUrl,
          photo_url: photoUrl,
          address_url: addressUrl
        });

      if (insertError) throw insertError;
      setSuccess(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      setError(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const FileUploadButton = ({ label, file, fileKey, accept }: { label: string, file: File | null, fileKey: keyof typeof files, accept: string }) => (
    <Box sx={{
      border: `1px dashed ${file ? palette.success.main : palette.divider}`,
      borderRadius: `${br}px`, p: 2, textAlign: 'center',
      background: file ? `${palette.success.main}10` : palette.background.paper,
      transition: 'all 0.2s ease',
      '&:hover': { borderColor: palette.primary.main }
    }}>
      <input
        accept={accept}
        style={{ display: 'none' }}
        id={`upload-button-${fileKey}`}
        type="file"
        onChange={(e) => handleFileChange(e, fileKey)}
      />
      <label htmlFor={`upload-button-${fileKey}`}>
        <Button
          variant="text"
          component="span"
          disabled={loading}
          startIcon={file ? <CheckCircleIcon color="success" /> : <CloudUploadIcon />}
          sx={{ color: file ? palette.success.main : palette.text.primary, textTransform: 'none', fontWeight: 600 }}
        >
          {file ? file.name : `Upload ${label}`}
        </Button>
      </label>
      {!file && <Typography variant="caption" display="block" color="text.secondary" mt={1}>Max 5MB. PDF, JPG, PNG.</Typography>}
    </Box>
  );

  if (success) {
    return (
      <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: palette.background.default, px: 3 }}>
        <Paper sx={{ p: 6, borderRadius: `${br * 2}px`, maxWidth: 500, textAlign: 'center', boxShadow: '0 24px 60px rgba(0,0,0,0.08)' }}>
          <Box sx={{ width: 64, height: 64, borderRadius: '50%', background: `${palette.success.main}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
            <ShieldOutlinedIcon sx={{ fontSize: 32, color: palette.success.main }} />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Application Received!</Typography>
          <Typography variant="body1" sx={{ color: palette.text.secondary, mb: 4 }}>
            Thank you for applying to CodeBridge. Our administration team is reviewing your details and documents. We will email you with further instructions once approved.
          </Typography>
          <Button variant="outlined" href="/" size="large" sx={{ borderRadius: 100, textTransform: 'none', fontWeight: 600 }}>
            Return Home
          </Button>
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
              Join the Cooperative
            </Typography>
          </Box>
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>Membership Application</Typography>
          <Typography variant="body1" sx={{ color: palette.text.secondary, maxWidth: 600, mx: 'auto' }}>
            Fill out the form and attach your required documents below. All uploads are securely stored and reviewed confidentially.
          </Typography>
        </Box>

        <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: `${br * 2}px`, boxShadow: '0 12px 40px rgba(0,0,0,0.06)' }}>
          {error && <Alert severity="error" sx={{ mb: 4, borderRadius: `${br}px` }}>{error}</Alert>}
          
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                <TextField required fullWidth label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
                <TextField required fullWidth label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
              </Stack>
              <TextField required fullWidth label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} />
              <TextField required fullWidth label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                <TextField required fullWidth label="Residential Address" name="address" value={formData.address} onChange={handleChange} />
                <TextField required fullWidth label="Date of Birth" name="dateOfBirth" type="date" InputLabelProps={{ shrink: true }} value={formData.dateOfBirth} onChange={handleChange} />
              </Stack>

              <Box sx={{ mt: 2, pt: 3, borderTop: `1px solid ${palette.divider}` }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>Required Documents</Typography>
                <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                  <Box sx={{ flex: 1 }}>
                    <FileUploadButton label="Valid ID (NIN/Passport)" file={files.idDoc} fileKey="idDoc" accept="image/*,.pdf" />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <FileUploadButton label="Recent Photograph" file={files.photoDoc} fileKey="photoDoc" accept="image/*" />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <FileUploadButton label="Address Proof (Utility Bill)" file={files.addressDoc} fileKey="addressDoc" accept="image/*,.pdf" />
                  </Box>
                </Stack>
              </Box>

            </Stack>
            
            <Box sx={{ mt: 5, textAlign: 'center' }}>
              <Button 
                type="submit" variant="contained" size="large" disabled={loading}
                endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <ArrowForwardIcon />}
                sx={{
                  background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`,
                  px: 6, py: 1.5, borderRadius: 100, fontWeight: 700, textTransform: 'none',
                  boxShadow: `0 8px 24px ${palette.primary.main}40`,
                  '&:hover': { transform: 'translateY(-2px)' }
                }}
              >
                {loading ? 'Processing & Uploading...' : 'Submit Application'}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Apply;
