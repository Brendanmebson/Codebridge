import React, { lazy, Suspense, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, CircularProgress } from '@mui/material';
import { theme } from './theme/theme';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import NotFound from './components/layout/NotFound';


// Public Pages
const Home = lazy(() => import('./pages/public/Home'));
const About = lazy(() => import('./pages/public/About'));
const Services = lazy(() => import('./pages/public/Services'));
const Contact = lazy(() => import('./pages/public/Contact'));
const Membership = lazy(() => import('./pages/public/Membership'));
const Apply = lazy(() => import('./pages/public/Apply'));
const LoanCalculator = lazy(() => import('./pages/public/LoanCalculator'));
const Downloads = lazy(() => import('./pages/public/Downloads'));
const Newsletter = lazy(() => import('./pages/public/Newsletter'));

// Auth Pages
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));

// Dashboard Pages
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const Savings = lazy(() => import('./pages/dashboard/Savings'));
const Loans = lazy(() => import('./pages/dashboard/Loans'));
const LoanApplication = lazy(() => import('./pages/dashboard/LoanApplication'));
const LoanDetails = lazy(() => import('./pages/dashboard/LoanDetails'));
const Statements = lazy(() => import('./pages/dashboard/Statements'));
const Governance = lazy(() => import('./pages/public/Governance'));
const PrivacyPolicy = lazy(() => import('./pages/public/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/public/TermsAndConditions'));
const LoanPolicy = lazy(() => import('./pages/public/LoanPolicy'));
const Exco = lazy(() => import('./pages/public/Exco'));
const Gallery = lazy(() => import('./pages/public/Gallery'));
const Businesses = lazy(() => import('./pages/public/Businesses'));
const BusinessSubmission = lazy(() => import('./pages/public/BusinessSubmission'));
const ExcoMember = lazy(() => import('./pages/public/ExcoMember'));

// Admin Pages
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard'));
const MemberManagement = lazy(() => import('./pages/Admin/MemberManagement'));
const LoanApprovals = lazy(() => import('./pages/Admin/LoanApprovals'));

// Layout wrappers
import DashboardLayout from './components/layout/DashboardLayout';
import AdminLayout from './components/layout/AdminLayout';


// =============================
// Scroll To Top Component
// =============================
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
};


// =============================
// Protected Route Component
// =============================
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};


// =============================
// Admin Route Component
// =============================
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const UnauthenticatedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (user) {
    return <Navigate to={userRole === 'admin' ? '/admin' : '/dashboard'} replace />;
  }

  return <>{children}</>;
};


// =============================
// Routes + Layout Wrapper
// =============================
const AppRoutes: React.FC = () => {
  const location = useLocation();
  const { userRole } = useAuth();

  const hideLayout =
  location.pathname.startsWith('/dashboard') ||
  location.pathname.startsWith('/admin') ||
  location.pathname === '/login' ||
  location.pathname === '/register';

  const renderSuspenseFallback = () => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
      }}
    >
      <CircularProgress />
    </Box>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
  {!hideLayout && <Navbar />}

      <Box sx={{ flex: 1 }}>
        <Suspense fallback={renderSuspenseFallback()}>
          <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/loan-calculator" element={<LoanCalculator />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/governance" element={<Governance />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/loan-policy" element={<LoanPolicy />} />
          <Route path="/termsandconditions" element={<TermsAndConditions />} />
          <Route path="/exco" element={<Exco />} />
          <Route path="/exco/:memberSlug" element={<ExcoMember />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/businesses" element={<Businesses />} />
          <Route path="/business-submission" element={<BusinessSubmission />} />

          {/* Auth Routes */}
          <Route path="/login" element={<UnauthenticatedRoute><Login /></UnauthenticatedRoute>} />
          <Route path="/register" element={<UnauthenticatedRoute><Register /></UnauthenticatedRoute>} />

          {/* Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  {userRole === 'admin' ? <Navigate to="/admin" replace /> : <Dashboard />}
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/savings"
            element={
              <ProtectedRoute>
                <DashboardLayout><Savings /></DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/loans"
            element={
              <ProtectedRoute>
                <DashboardLayout><Loans /></DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/loans/apply"
            element={
              <ProtectedRoute>
                <DashboardLayout><LoanApplication /></DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/loans/:loanId"
            element={
              <ProtectedRoute>
                <DashboardLayout><LoanDetails /></DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/statements"
            element={
              <ProtectedRoute>
                <DashboardLayout><Statements /></DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout><AdminDashboard /></AdminLayout>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/members"
            element={
              <AdminRoute>
                <AdminLayout><MemberManagement /></AdminLayout>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/loans"
            element={
              <AdminRoute>
                <AdminLayout><LoanApprovals /></AdminLayout>
              </AdminRoute>
            }
          />

          {/* Catch All */}
<Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </Box>

      {/* Hide footer on dashboard, admin & login */}
  {!hideLayout && <Footer />}
    </Box>
  );
};


// =============================
// Main App
// =============================
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;