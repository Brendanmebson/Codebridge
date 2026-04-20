import React, { useState } from 'react';
import {
  Box, Typography, IconButton, Drawer, useTheme,
  useMediaQuery, Divider,
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import logo from '../../assets/logo.jpg';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const SIDEBAR_WIDTH = 240;

const navItems = [
  { label: 'Overview', path: '/admin', icon: <DashboardIcon sx={{ fontSize: 20 }} /> },
  { label: 'Members', path: '/admin/members', icon: <PeopleIcon sx={{ fontSize: 20 }} /> },
  { label: 'Loan Approvals', path: '/admin/loans', icon: <AccountBalanceIcon sx={{ fontSize: 20 }} /> },
];

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();
  const { palette, shape } = theme;
  const br = shape.borderRadius as number;
  const location = useLocation();
  const navigate = useNavigate();
  const { member, logout } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isActive = (path: string) =>
    path === '/admin' ? location.pathname === '/admin' : location.pathname.startsWith(path);

  const sidebarContent = (
    <Box sx={{
      width: SIDEBAR_WIDTH,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: palette.primary.dark,
    }}>
      {/* Logo */}
      <Box sx={{ px: 2.5, pt: 2.5, pb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box component={Link} to="/admin" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none' }}>
          <Box component="img" src={logo} alt="CodeBridge"
            sx={{ height: 36, width: 36, borderRadius: `${br - 6}px`, objectFit: 'cover' }} />
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: '#fff', lineHeight: 1.2 }}>
              CodeBridge
            </Typography>
            <Typography sx={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
              Admin Panel
            </Typography>
          </Box>
        </Box>
        {isMobile && (
          <IconButton size="small" onClick={() => setMobileOpen(false)} sx={{ color: 'rgba(255,255,255,0.7)' }}>
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        )}
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

      {/* Admin info */}
      <Box sx={{ px: 2.5, py: 2 }}>
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: 1.5,
          px: 2, py: 1.5,
          background: 'rgba(255,255,255,0.08)',
          borderRadius: `${br}px`,
          border: '1px solid rgba(255,255,255,0.12)',
        }}>
          <Box sx={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <AdminPanelSettingsIcon sx={{ fontSize: 16, color: '#fff' }} />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="body2" noWrap sx={{ fontWeight: 600, color: '#fff', lineHeight: 1.2, fontSize: '0.8rem' }}>
              {member?.first_name} {member?.last_name}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem' }}>
              Administrator
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Nav links */}
      <Box sx={{ px: 2, flex: 1 }}>
        <Typography variant="overline" sx={{ px: 1.5, mb: 1, display: 'block', color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem' }}>
          Management
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Box
                key={item.path}
                component={Link}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                sx={{
                  display: 'flex', alignItems: 'center', gap: 1.5,
                  px: 2, py: 1.25, borderRadius: `${br - 4}px`,
                  textDecoration: 'none',
                  background: active ? 'rgba(255,255,255,0.15)' : 'transparent',
                  border: `1px solid ${active ? 'rgba(255,255,255,0.25)' : 'transparent'}`,
                  color: active ? '#fff' : 'rgba(255,255,255,0.6)',
                  transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
                  '&:hover': {
                    background: 'rgba(255,255,255,0.1)',
                    color: '#fff',
                  },
                }}
              >
                {item.icon}
                <Typography sx={{ fontSize: '0.87rem', fontWeight: active ? 600 : 400, color: 'inherit' }}>
                  {item.label}
                </Typography>
                {active && (
                  <Box sx={{ ml: 'auto', width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />
                )}
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Logout */}
      <Box sx={{ px: 2.5, pb: 3, pt: 2 }}>
        <Divider sx={{ mb: 2, borderColor: 'rgba(255,255,255,0.1)' }} />
        <Box
          onClick={handleLogout}
          sx={{
            display: 'flex', alignItems: 'center', gap: 1.5,
            px: 2, py: 1.25, borderRadius: `${br - 4}px`,
            cursor: 'pointer',
            color: 'rgba(255,255,255,0.65)',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            transition: 'all 0.25s',
            '&:hover': { background: 'rgba(255,255,255,0.12)', color: '#fff' },
          }}
        >
          <LogoutIcon sx={{ fontSize: 18 }} />
          <Typography sx={{ fontSize: '0.87rem', fontWeight: 500, color: 'inherit' }}>Logout</Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: palette.background.default }}>
      {/* Desktop sidebar */}
      {!isMobile && (
        <Box sx={{ width: SIDEBAR_WIDTH, flexShrink: 0, position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
          {sidebarContent}
        </Box>
      )}

      {/* Mobile drawer */}
      {isMobile && (
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ '& .MuiDrawer-paper': { width: SIDEBAR_WIDTH, border: 'none' } }}
        >
          {sidebarContent}
        </Drawer>
      )}

      {/* Main content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Mobile top bar */}
        {isMobile && (
          <Box sx={{
            display: 'flex', alignItems: 'center', gap: 2,
            px: 2, py: 1.5,
            background: palette.primary.dark,
            position: 'sticky', top: 0, zIndex: 100,
          }}>
            <IconButton size="small" onClick={() => setMobileOpen(true)} sx={{ color: '#fff' }}>
              <MenuIcon />
            </IconButton>
            <Box component={Link} to="/admin" sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none' }}>
              <Box component="img" src={logo} alt="CodeBridge" sx={{ height: 28, width: 28, borderRadius: `${br - 6}px` }} />
              <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: '#fff' }}>Admin Panel</Typography>
            </Box>
          </Box>
        )}
        <Box sx={{ flex: 1 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
