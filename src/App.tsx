import React, { lazy, Suspense, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, CircularProgress } from '@mui/material';
import { theme } from './theme/theme';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import NotFound from './components/layout/NotFound';
import FloatingIcons from './components/layout/FloatingIcons';


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
const Governance = lazy(() => import('./pages/public/Governance'));
const PrivacyPolicy = lazy(() => import('./pages/public/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/public/TermsAndConditions'));
const LoanPolicy = lazy(() => import('./pages/public/LoanPolicy'));
const Exco = lazy(() => import('./pages/public/Exco'));
const Gallery = lazy(() => import('./pages/public/Gallery'));
const Businesses = lazy(() => import('./pages/public/Businesses'));
const BusinessSubmission = lazy(() => import('./pages/public/BusinessSubmission'));
const ExcoMember = lazy(() => import('./pages/public/ExcoMember'));

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
// Routes + Layout Wrapper
// =============================
const AppRoutes: React.FC = () => {
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
      <FloatingIcons />
      <Navbar />

      <Box sx={{ flex: 1, position: 'relative', zIndex: 1 }}>
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

          {/* Catch All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </Box>

      <Box sx={{ position: 'relative', zIndex: 1 }}><Footer /></Box>
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
      <Router>
        <ScrollToTop />
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
};

export default App;