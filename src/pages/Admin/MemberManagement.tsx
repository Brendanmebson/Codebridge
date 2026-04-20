import React, { useEffect, useState } from 'react';
import {
  Box, Container, Typography, Card, CardContent, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Chip, IconButton, TextField,
  MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions, Alert,
  Pagination, CircularProgress, Tabs, Tab, Stack, Link as MuiLink
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Block as BlockIcon,
  Visibility as VisibilityIcon,
  Cancel as CancelIcon,
  DescriptionOutlined as DocIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import { supabase, supabaseUrl, supabaseAnonKey } from '../../config/supabase';
import type { Member } from '../../types';
import { createClient } from '@supabase/supabase-js';

interface Application {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  date_of_birth: string;
  status: string;
  id_url?: string;
  photo_url?: string;
  address_proof_url?: string;
  rejection_reason?: string;
  created_at: string;
}

const MemberManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const [members, setMembers] = useState<Member[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  // Application State
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  
  // Approval
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [isProcessingApp, setIsProcessingApp] = useState(false);

  // Rejection
  const [rejectionDialogOpen, setRejectionDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  // View Docs
  const [docsDialogOpen, setDocsDialogOpen] = useState(false);

  useEffect(() => {
    if (activeTab === 0) fetchMembers();
    else fetchApplications();
  }, [statusFilter, searchTerm, page, activeTab]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      let query = supabase.from('members').select('*', { count: 'exact' });
      if (statusFilter !== 'all') query = query.eq('status', statusFilter);
      if (searchTerm) query = query.or(`first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,member_number.ilike.%${searchTerm}%`);
      const { data, count, error: fetchError } = await query
        .order('created_at', { ascending: false })
        .range((page - 1) * 20, page * 20 - 1);
      if (fetchError) throw fetchError;
      setMembers(data || []);
      setTotalPages(Math.ceil((count || 0) / 20));
    } catch (err: any) {
      setError('Failed to load members');
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      setLoading(true);
      let query = supabase.from('membership_applications').select('*', { count: 'exact' });
      if (statusFilter !== 'all') query = query.eq('status', statusFilter);
      if (searchTerm) query = query.or(`first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`);
      const { data, count, error: fetchError } = await query
        .order('created_at', { ascending: false })
        .range((page - 1) * 20, page * 20 - 1);
      if (fetchError) throw fetchError;
      setApplications(data || []);
      setTotalPages(Math.ceil((count || 0) / 20));
    } catch (err: any) {
      setError('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async () => {
    if (!selectedMember || !newStatus) return;
    try {
      const { error: updateError } = await supabase.from('members').update({ status: newStatus }).eq('id', selectedMember.id);
      if (updateError) throw updateError;
      setSuccess(`Member status updated to ${newStatus}`);
      setStatusDialogOpen(false);
      fetchMembers();
    } catch (err: any) {
      setError(err.message || 'Failed to update status');
    }
  };

  const generateRandomPassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let pass = '';
    for (let i = 0; i < 12; i++) pass += chars.charAt(Math.floor(Math.random() * chars.length));
    return pass;
  };

  /* ----- APPLICATION ACTIONS ----- */
  
  const openDocs = (app: Application) => {
    setSelectedApp(app);
    setDocsDialogOpen(true);
  };

  const openApproveDialog = (app: Application) => {
    setSelectedApp(app);
    setGeneratedPassword(generateRandomPassword());
    setApprovalDialogOpen(true);
  };

  const openRejectDialog = (app: Application) => {
    setSelectedApp(app);
    setRejectionReason('');
    setRejectionDialogOpen(true);
  };

  const approveApplication = async () => {
    if (!selectedApp) return;
    try {
      setIsProcessingApp(true);
      setError('');
      
      const tempClient = createClient(supabaseUrl, supabaseAnonKey, { auth: { persistSession: false } });

      const { data: authData, error: authError } = await tempClient.auth.signUp({
        email: selectedApp.email,
        password: generatedPassword,
        options: { 
          data: { 
            firstName: selectedApp.first_name, 
            lastName: selectedApp.last_name,
            phone: selectedApp.phone,
            address: selectedApp.address,
            dateOfBirth: selectedApp.date_of_birth,
            role: 'member'
          } 
        }
      });
      if (authError) throw authError;

      // Force member status to 'inactive' to require an initial deposit on login
      await supabase.from('members').update({ status: 'inactive' }).eq('email', selectedApp.email);

      await supabase.from('membership_applications').update({ status: 'approved' }).eq('id', selectedApp.id);

      setSuccess(`Application approved! Password generated for ${selectedApp.email}.`);
      setApprovalDialogOpen(false);
      fetchApplications();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to approve application');
    } finally {
      setIsProcessingApp(false);
    }
  };

  const rejectApplication = async () => {
    if (!selectedApp || !rejectionReason.trim()) return;
    try {
      setIsProcessingApp(true);
      await supabase.from('membership_applications').update({ 
        status: 'rejected',
        rejection_reason: rejectionReason 
      }).eq('id', selectedApp.id);
      setSuccess(`Application rejected. An email will theoretically be dispatched stating: "${rejectionReason}"`);
      setRejectionDialogOpen(false);
      fetchApplications();
    } catch (err: any) {
      setError('Failed to reject application');
    } finally {
      setIsProcessingApp(false);
    }
  };

  const getStatusColor = (status: string) => {
    if (status === 'active' || status === 'approved') return 'success';
    if (status === 'pending') return 'warning';
    return 'error';
  };

  return (
    <Container maxWidth="lg" sx={{ paddingY: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 4, fontWeight: 700 }}>Member Management</Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={activeTab} onChange={(e, v) => { setActiveTab(v); setPage(1); }}>
          <Tab label="Existing Members" />
          <Tab label="Pending Applications" />
        </Tabs>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess('')}>{success}</Alert>}

      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField label="Search" placeholder="Name, email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ flexGrow: 1, minWidth: 250 }} />
            <TextField select label="Status Filter" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} sx={{ minWidth: 150 }}>
              <MenuItem value="all">All</MenuItem>
              {activeTab === 0 ? (
                ['active', 'pending', 'inactive', 'suspended'].map(s => <MenuItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</MenuItem>)
              ) : (
                ['pending', 'approved', 'rejected'].map(s => <MenuItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</MenuItem>)
              )}
            </TextField>
          </Box>
        </CardContent>
      </Card>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}><CircularProgress /></Box>
      ) : activeTab === 0 ? (
        // Existing Members Table
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Member Number</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell sx={{ fontWeight: 600 }}>{member.member_number}</TableCell>
                  <TableCell>{member.first_name} {member.last_name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={(member.role || 'member').toUpperCase()}
                      color={member.role === 'admin' ? 'primary' : 'default'}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell><Chip label={member.status.toUpperCase()} color={getStatusColor(member.status)} size="small" /></TableCell>
                  <TableCell align="center">
                    <IconButton size="small" color="success" onClick={() => { setSelectedMember(member); setNewStatus('active'); setStatusDialogOpen(true); }} disabled={member.status === 'active'}><CheckCircleIcon /></IconButton>
                    <IconButton size="small" color="error" onClick={() => { setSelectedMember(member); setNewStatus('suspended'); setStatusDialogOpen(true); }} disabled={member.status === 'suspended'}><BlockIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        // Applications Table
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Documents</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>{app.first_name} {app.last_name}</TableCell>
                  <TableCell>{app.email}</TableCell>
                  <TableCell>
                    <Chip label={app.status.toUpperCase()} color={getStatusColor(app.status)} size="small" />
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined" size="small" startIcon={<DocIcon />} onClick={() => openDocs(app)}>
                      View Files
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton title="Approve" size="small" color="success" onClick={() => openApproveDialog(app)} disabled={app.status !== 'pending'}><CheckCircleIcon /></IconButton>
                    <IconButton title="Reject" size="small" color="error" onClick={() => openRejectDialog(app)} disabled={app.status !== 'pending'}><CancelIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
        <Pagination count={totalPages} page={page} onChange={(_, value) => setPage(value)} color="primary" />
      </Box>

      {/* Approve Application Dialog */}
      <Dialog open={approvalDialogOpen} onClose={() => !isProcessingApp && setApprovalDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Approve Application</DialogTitle>
        <DialogContent>
          <Typography mb={2}>You are approving <strong>{selectedApp?.first_name} {selectedApp?.last_name}</strong>.</Typography>
          <Alert severity="warning" sx={{ mb: 2 }}>This will create a new user account with an INITIAL DEPOSIT REQUIRED lock. Please email them this password.</Alert>
          <Box sx={{ p: 2, background: 'rgba(0,0,0,0.05)', borderRadius: 1, fontFamily: 'monospace', textAlign: 'center', fontSize: '1.2rem', letterSpacing: 2 }}>
            {generatedPassword}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setApprovalDialogOpen(false)} disabled={isProcessingApp}>Cancel</Button>
          <Button onClick={approveApplication} variant="contained" disabled={isProcessingApp}>{isProcessingApp ? 'Processing...' : 'Create Locked Account'}</Button>
        </DialogActions>
      </Dialog>

      {/* Reject Application Dialog */}
      <Dialog open={rejectionDialogOpen} onClose={() => !isProcessingApp && setRejectionDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Reject Application</DialogTitle>
        <DialogContent>
          <Typography mb={2}>Please provide a reason for rejecting <strong>{selectedApp?.first_name}</strong>'s application. This will be sent as an email.</Typography>
          <TextField fullWidth multiline rows={3} label="Reason for rejection" value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRejectionDialogOpen(false)} disabled={isProcessingApp}>Cancel</Button>
          <Button onClick={rejectApplication} variant="contained" color="error" disabled={isProcessingApp || !rejectionReason.trim()}>
            {isProcessingApp ? 'Rejecting...' : 'Reject & Notify'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Documents Dialog */}
      <Dialog open={docsDialogOpen} onClose={() => setDocsDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Applicant Documents</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Valid ID / Passport</Typography>
              {selectedApp?.id_url ? <MuiLink href={selectedApp.id_url} target="_blank" rel="noopener">Open Document</MuiLink> : <Typography variant="caption">Not provided</Typography>}
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Recent Photograph</Typography>
              {selectedApp?.photo_url ? (
                <Box mt={1} component="img" src={selectedApp.photo_url} sx={{ maxWidth: 200, borderRadius: 2, border: '1px solid #eee' }} />
              ) : <Typography variant="caption">Not provided</Typography>}
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Proof of Address</Typography>
              {selectedApp?.address_proof_url ? <MuiLink href={selectedApp.address_proof_url} target="_blank" rel="noopener">Open Document</MuiLink> : <Typography variant="caption">Not provided</Typography>}
            </Box>
            {selectedApp?.rejection_reason && (
              <Box mt={2}>
                <Alert severity="error">Rejected previously: {selectedApp.rejection_reason}</Alert>
              </Box>
            )}
          </Stack>
        </DialogContent>
        <DialogActions><Button onClick={() => setDocsDialogOpen(false)}>Close</Button></DialogActions>
      </Dialog>

      {/* Member Update Dialog */}
      <Dialog open={statusDialogOpen} onClose={() => setStatusDialogOpen(false)}>
        <DialogTitle>Update Status</DialogTitle>
        <DialogContent>
          <Typography>Change status of {selectedMember?.first_name} to <strong>{newStatus}</strong>?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleStatusChange} variant="contained">Confirm</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MemberManagement;