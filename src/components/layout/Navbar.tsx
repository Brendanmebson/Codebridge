import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import logo from '../../assets/logo.jpg';

type NavItem = { label: string; path: string };

const publicNavItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Membership', path: '/membership' },
  { label: 'Downloads', path: '/downloads' },
];

const adminNavItems: NavItem[] = [
  { label: 'Overview', path: '/admin' },
  { label: 'Members', path: '/admin/members' },
  { label: 'Loans', path: '/admin/loans' },
];

const dashboardNavItems: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Savings', path: '/dashboard/savings' },
  { label: 'Loans', path: '/dashboard/loans' },
  { label: 'Profile', path: '/dashboard/profile' },
];

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const { palette } = theme;
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { user, member, userRole, logout } = useAuth();

  const isDashboard = location.pathname.startsWith('/dashboard');
  const isAuthenticated = Boolean(user || member);
  const isAdminUser = (userRole?.toLowerCase() ?? member?.role?.toLowerCase() ?? '') === 'admin';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);
  const handleDrawerClose = () => setMobileOpen(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navItems = isAuthenticated
    ? (isAdminUser ? adminNavItems : dashboardNavItems)
    : publicNavItems;

  const homePath = isAdminUser ? '/admin' : (isDashboard || isAuthenticated ? '/dashboard' : '/');

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const limePill = {
    background: palette.accent.main,
    color: palette.accent.contrastText,
    borderRadius: '100px',
    fontWeight: 500,
    px: 2.75,
    py: 1,
    '&:hover': { background: palette.accent.dark },
  } as const;

  // ── MOBILE DRAWER ─────────────────────────────────────────────
  const drawer = (
    <Box sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: palette.primary.main,
      color: '#fff',
    }}>
      <Box sx={{ px: 3, pt: 3, pb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box component={Link} to={homePath} onClick={handleDrawerClose} sx={{ display: 'flex' }}>
          <Box component="img" src={logo} alt="CodeBridge Logo" sx={{ height: 34, width: 'auto', borderRadius: '10px' }} />
        </Box>
        <IconButton onClick={handleDrawerClose} size="small" aria-label="Close menu" sx={{
          color: '#fff', border: '1px solid rgba(255,255,255,0.18)',
          '&:hover': { background: 'rgba(255,255,255,0.08)' },
        }}>
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      <Box sx={{ px: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Box
              key={item.path}
              component={Link}
              to={item.path}
              onClick={handleDrawerClose}
              sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                py: 1.75,
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                textDecoration: 'none',
                color: active ? palette.accent.main : 'rgba(255,255,255,0.85)',
                fontSize: '1.35rem',
                fontWeight: 400,
                letterSpacing: '-0.01em',
              }}
            >
              {item.label}
              <ArrowOutwardIcon sx={{ fontSize: 18, opacity: active ? 1 : 0.35 }} />
            </Box>
          );
        })}
      </Box>

      <Box sx={{ px: 3, pb: 4, pt: 3 }}>
        {user ? (
          <Button
            fullWidth
            onClick={() => { handleLogout(); handleDrawerClose(); }}
            startIcon={<LogoutIcon sx={{ fontSize: 16 }} />}
            sx={{
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)',
              '&:hover': { background: 'rgba(255,255,255,0.08)' },
            }}
          >
            Logout
          </Button>
        ) : (
          <Button fullWidth component={Link} to="/contact" onClick={handleDrawerClose} sx={{ ...limePill, py: 1.4 }}>
            Contact us
          </Button>
        )}
      </Box>
    </Box>
  );

  // ── DESKTOP NAV ───────────────────────────────────────────────
  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: scrolled ? 'rgba(239,239,232,0.86)' : palette.background.default,
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: `1px solid ${scrolled ? palette.divider : 'transparent'}`,
          transition: 'background 0.3s ease, border-color 0.3s ease',
          borderRadius: 0,
          color: palette.text.primary,
        }}
      >
        <Toolbar sx={{
          width: '100%',
          maxWidth: 1360,
          mx: 'auto',
          justifyContent: 'space-between',
          px: { xs: 2, sm: 3, md: 4 },
          minHeight: { xs: 64, md: 76 },
        }}>
          <Box
            component={Link}
            to={homePath}
            sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', '&:hover': { opacity: 0.85 } }}
          >
            <Box component="img" src={logo} alt="CodeBridge Logo" sx={{ height: { xs: 34, md: 40 }, width: 'auto', borderRadius: '10px' }} />
          </Box>

          {isMobile ? (
            <IconButton
              onClick={handleDrawerToggle}
              aria-label="Open menu"
              sx={{
                width: 42, height: 42,
                background: palette.primary.main,
                color: '#fff',
                '&:hover': { background: palette.primary.dark },
              }}
            >
              <MenuIcon sx={{ fontSize: 20 }} />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { md: 3, lg: 4.5 } }}>
              {navItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <Box
                    key={item.path}
                    component={Link}
                    to={item.path}
                    sx={{
                      position: 'relative',
                      textDecoration: 'none',
                      color: active ? palette.text.primary : palette.text.secondary,
                      fontSize: '0.92rem',
                      fontWeight: active ? 500 : 400,
                      py: 1,
                      transition: 'color 0.2s ease',
                      '&:hover': { color: palette.text.primary },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        left: '50%', bottom: -2,
                        width: 6, height: 6, borderRadius: '50%',
                        transform: `translateX(-50%) scale(${active ? 1 : 0})`,
                        background: palette.primary.main,
                        boxShadow: `0 0 0 3px ${palette.accent.main}`,
                        transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1)',
                      },
                    }}
                  >
                    {item.label}
                  </Box>
                );
              })}

              {user ? (
                <Button onClick={handleLogout} startIcon={<LogoutIcon sx={{ fontSize: 15 }} />} sx={{
                  border: `1px solid ${palette.divider}`, color: palette.text.primary, px: 2.25, py: 0.9,
                  '&:hover': { background: 'rgba(19,42,33,0.05)' },
                }}>
                  Logout
                </Button>
              ) : (
                <Button component={Link} to="/contact" sx={limePill}>
                  Contact us
                </Button>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': { width: 320, maxWidth: '88vw', border: 'none', borderRadius: 0 },
          '& .MuiBackdrop-root': { background: 'rgba(15,46,37,0.35)' },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
