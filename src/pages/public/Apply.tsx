import React, { useState } from 'react';
import {
  Box, Container, Typography, TextField, Button, Alert,
  useTheme, Paper, Stack, CircularProgress
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { FORM_ENDPOINT } from '../../config/forms';
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

  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const success = searchParams.get('submitted') === '1';
  const returnUrl = `${window.location.origin}/apply?submitted=1`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof typeof files) => {
    if (e.target.files && e.target.files[0]) {
      setFiles({ ...files, [key]: e.target.files[0] });
    }
  };

  const MAX_FILE_BYTES = 5 * 1024 * 1024;

  // Lets the browser POST the form (with attachments) to FormSubmit, which emails it to the cooperative.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setError('');

    if (!files.idDoc || !files.photoDoc || !files.addressDoc) {
      e.preventDefault();
      setError('Please upload all required documents (ID, Photograph, and Address Proof).');
      return;
    }

    const oversized = [files.idDoc, files.photoDoc, files.addressDoc].find((file) => file.size > MAX_FILE_BYTES);
    if (oversized) {
      e.preventDefault();
      setError(`"${oversized.name}" is larger than 5MB. Please upload a smaller file.`);
      return;
    }

    setLoading(true);
  };

  // Called as a function (not <FileUploadButton/>) so the file inputs keep their selected files across re-renders.
  const renderFileUpload = ({ label, file, fileKey, accept }: { label: string, file: File | null, fileKey: keyof typeof files, accept: string }) => (
    <Box sx={{
      border: `1px dashed ${file ? palette.success.main : palette.divider}`,
      borderRadius: `${br}px`,
      p: 2,
      textAlign: 'center',
      background: file ? `${palette.success.main}10` : palette.background.paper,
      transition: 'all 0.2s ease',
      minHeight: 110,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      '&:hover': { borderColor: palette.primary.main }
    }}>
      <input
        accept={accept}
        style={{ display: 'none' }}
        id={`upload-button-${fileKey}`}
        name={label}
        type="file"
        onChange={(e) => handleFileChange(e, fileKey)}
      />
      <label htmlFor={`upload-button-${fileKey}`} style={{ width: '100%' }}>
        <Button
          variant="text"
          component="span"
          disabled={loading}
          startIcon={file ? <CheckCircleIcon color="success" /> : <CloudUploadIcon />}
          sx={{
            color: file ? palette.success.main : palette.text.primary,
            textTransform: 'none',
            fontWeight: 600,
            width: '100%',
            justifyContent: 'center',
            px: 1,
            whiteSpace: 'normal',
            textAlign: 'center',
            lineHeight: 1.4,
            minHeight: 44,
          }}
        >
          {file ? file.name : `Upload ${label}`}
        </Button>
      </label>
      {file ? (
        <Typography
          variant="caption"
          sx={{
            mt: 1,
            color: 'text.secondary',
            width: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            px: 1,
          }}
        >
          {file.name}
        </Typography>
      ) : (
        <Typography variant="caption" display="block" color="text.secondary" mt={1} sx={{ px: 1, lineHeight: 1.4 }}>
          Max 5MB. PDF, JPG, PNG.
        </Typography>
      )}
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
            Thank you for applying to CodeBridge. Your details and documents have been sent to our membership team, and we will contact you by email or phone about the next steps.
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
          <Box sx={{ display: 'inline-block', mb: 2 }}>
            <Typography sx={{ fontFamily: typography.fontFamily, fontSize: '0.75rem', fontWeight: 700, color: palette.primary.main, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Join the Cooperative
            </Typography>
          </Box>
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>Membership Application</Typography>
          <Typography variant="body1" sx={{ color: palette.text.secondary, maxWidth: 600, mx: 'auto' }}>
            Fill out the form and attach your required documents below. Your application goes straight to our membership team and is reviewed confidentially.
          </Typography>
        </Box>

        <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: `${br * 2}px`, boxShadow: '0 12px 40px rgba(0,0,0,0.06)' }}>
          {error && <Alert severity="error" sx={{ mb: 4, borderRadius: `${br}px` }}>{error}</Alert>}
          
          <Box component="form" action={FORM_ENDPOINT} method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
            <input type="hidden" name="_subject" value={`New membership application: ${formData.firstName} ${formData.lastName}`.trim()} />
            <input type="hidden" name="_replyto" value={formData.email} />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value={returnUrl} />
            <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
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
                <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ alignItems: 'stretch' }}>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    {renderFileUpload({ label: "Valid ID (NIN/Passport)", file: files.idDoc, fileKey: "idDoc", accept: "image/*,.pdf" })}
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    {renderFileUpload({ label: "Recent Photograph", file: files.photoDoc, fileKey: "photoDoc", accept: "image/*" })}
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    {renderFileUpload({ label: "Address Proof (Utility Bill)", file: files.addressDoc, fileKey: "addressDoc", accept: "image/*,.pdf" })}
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
                {loading ? 'Sending application...' : 'Submit Application'}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Apply;
