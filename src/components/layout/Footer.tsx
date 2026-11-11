import React from 'react';
import { Box, Typography, Stack, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SavingsIcon from '@mui/icons-material/Savings';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Footer: React.FC = () => {
  const theme = useTheme();
  const { palette, typography, shape } = theme;
  const br = shape.borderRadius as number;

  const quickLinks = [
    { label: 'About Us', to: '/about' },
    { label: 'Our Services', to: '/services' },
    { label: 'Membership', to: '/membership' },
    { label: 'Membership Application', to: '/apply' },
    { label: 'Loan Calculator', to: '/loan-calculator' },
    { label: 'Downloads', to: '/downloads' },
    { label: 'Newsletter', to: '/newsletter' },
    { label: 'Exco', to: '/exco' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Businesses', to: '/businesses' },
    { label: 'Contact Us', to: '/contact' },
  ];

  const legalLinks = [
    { label: 'Governance', to: '/governance' },
    { label: 'Privacy Policy', to: '/privacy-policy' },
    { label: 'Terms & Conditions', to: '/termsandconditions' },
    { label: 'Loan Policy', to: '/loan-policy' },
  ];

  const socials = [
    { icon: <FacebookIcon sx={{ fontSize: 18 }} />, href: '#', label: 'Facebook' },
    { icon: <TwitterIcon sx={{ fontSize: 18 }} />, href: '#', label: 'Twitter' },
    { icon: <LinkedInIcon sx={{ fontSize: 18 }} />, href: '#', label: 'LinkedIn' },
    { icon: <InstagramIcon sx={{ fontSize: 18 }} />, href: '#', label: 'Instagram' },
    { icon: <WhatsAppIcon sx={{ fontSize: 18 }} />, href: '#', label: 'WhatsApp' },
  ];

  // const stats = [
  //   { val: '1,240+', lab: 'Members' },
  //   { val: '₦1.2B+', lab: 'Disbursed' },
  //   { val: '8+', lab: 'Years' },
  //   { val: '98%', lab: 'Approval' },
  // ];

  const LinkItem: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
    <Box
      component={Link}
      to={to}
      sx={{
        display: 'flex', alignItems: 'center', gap: 0.75,
        color: 'rgba(255,255,255,0.6)',
        textDecoration: 'none',
        fontFamily: typography.fontFamily,
        fontSize: '0.875rem',
        fontWeight: 400,
        transition: 'all 0.25s',
        width: 'fit-content',
        '&:hover': {
          color: palette.accent.main,
          gap: 1.25,
        },
        '&:hover .link-arrow': { opacity: 1, transform: 'translateX(0)' },
      }}
    >
      <Box className="link-arrow" sx={{ opacity: 0, transform: 'translateX(-4px)', transition: 'all 0.25s', display: 'flex', alignItems: 'center' }}>
        <ArrowForwardIcon sx={{ fontSize: 11 }} />
      </Box>
      {children}
    </Box>
  );

  return (
    <Box component="footer" sx={{ background: palette.background.default, px: { xs: 1.5, sm: 2, md: 3 }, pb: { xs: 1.5, md: 3 }, pt: { xs: 1.5, md: 1.5 } }}>
    <Box
      sx={{
        maxWidth: 1360,
        mx: 'auto',
        background: palette.primary.main,
        borderRadius: { xs: '22px', md: '28px' },
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: typography.fontFamily,
      }}
    >
      {/* ── STATS BAR ───────────────────────────────────────────
      <Box sx={{
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        py: { xs: 4, md: 5 },
        position: 'relative', zIndex: 1,
      }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 3, md: 6, lg: 8 } }}>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2,1fr)', md: 'repeat(4,1fr)' },
            gap: { xs: 4, md: 0 },
          }}>
            {stats.map((s, i) => (
              <Box key={i} sx={{
                textAlign: 'center',
                position: 'relative',
                '&:not(:last-child)::after': {
                  content: '""',
                  display: { xs: 'none', md: 'block' },
                  position: 'absolute', right: 0, top: '15%', bottom: '15%',
                  width: 1, background: 'rgba(255,255,255,0.1)',
                },
              }}>
                <Typography sx={{
                  fontFamily: typography.fontFamily,
                  fontSize: { xs: '1.9rem', md: '2.4rem' },
                  fontWeight: 700, color: '#fff', lineHeight: 1, mb: 0.5,
                }}>
                  {s.val}
                </Typography>
                <Typography sx={{
                  fontFamily: typography.fontFamily,
                  fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)',
                  letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500,
                }}>
                  {s.lab}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box> */}

      {/* ── MAIN FOOTER BODY ──────────────────────────────────── */}
      <Box sx={{
        maxWidth: 1200, mx: 'auto',
        px: { xs: 3, md: 6, lg: 8 },
        py: { xs: 7, md: 10 },
        position: 'relative', zIndex: 1,
      }}>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: '2fr 1fr 1fr 1.6fr' },
          gap: { xs: 7, md: 8 },
        }}>

          {/* ── COL 1: Brand ──────────────────────────────── */}
          <Box>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Box sx={{
                width: 40, height: 40, borderRadius: `${br}px`,
                background: palette.accent.main,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <SavingsIcon sx={{ fontSize: 20, color: palette.primary.dark }} />
              </Box>
              <Box>
                <Typography sx={{
                  fontFamily: typography.fontFamily,
                  fontWeight: 500, fontSize: '1rem', color: '#fff', lineHeight: 1.1,
                }}>
                  CodeBridge
                </Typography>
                <Typography sx={{
                  fontFamily: typography.fontFamily,
                  fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)',
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                }}>
                  Cooperative Society
                </Typography>
              </Box>
            </Box>

            <Typography sx={{
              fontFamily: typography.fontFamily,
              fontSize: '0.88rem', color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.85, fontWeight: 300, mb: 4, maxWidth: 300,
            }}>
              A member-owned financial cooperative committed to promoting savings,
              providing affordable loans, and improving economic wellbeing through
              mutual support since 2016.
            </Typography>

            {/* Photo strip */}
            <Box sx={{ display: 'flex', mb: 4, gap: 1.5 }}>
              {[
                'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=120&q=80',
                'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=120&q=80',
                'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=120&q=80',
              ].map((img, i) => (
                <Box key={i} sx={{
                  width: 64, height: 64, borderRadius: `${br}px`, overflow: 'hidden',
                  border: '2px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.3s',
                  '&:hover': { transform: 'translateY(-3px)', border: `2px solid rgba(255,255,255,0.25)` },
                }}>
                  <Box component="img" src={img} alt="Community"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
              ))}
            </Box>

            {/* Socials */}
            <Box sx={{ display: 'flex', gap: 1.25, flexWrap: 'wrap' }}>
              {socials.map((s, i) => (
                <Box
                  key={i}
                  component="a" href={s.href} aria-label={s.label}
                  sx={{
                    width: 38, height: 38, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
                    '&:hover': {
                      background: palette.accent.main,
                      border: `1px solid ${palette.accent.main}`,
                      color: palette.primary.dark,
                      transform: 'translateY(-3px)',
                    },
                  }}
                >
                  {s.icon}
                </Box>
              ))}
            </Box>
          </Box>

          {/* ── COL 2: Quick Links ────────────────────────── */}
          <Box>
            <Typography sx={{
              fontFamily: typography.fontFamily,
              fontSize: '0.95rem', fontWeight: 500,
              color: '#fff',
              letterSpacing: '0.02em',
              mb: 3,
            }}>
              Quick Links
            </Typography>
            <Stack spacing={2}>
              {quickLinks.map((link, i) => (
                <LinkItem key={i} to={link.to}>{link.label}</LinkItem>
              ))}
            </Stack>
          </Box>

          {/* ── COL 3: Legal ──────────────────────────────── */}
          <Box>
            <Typography sx={{
              fontFamily: typography.fontFamily,
              fontSize: '0.95rem', fontWeight: 500,
              color: '#fff',
              letterSpacing: '0.02em',
              mb: 3,
            }}>
              Legal
            </Typography>
            <Stack spacing={2}>
              {legalLinks.map((link, i) => (
                <LinkItem key={i} to={link.to}>{link.label}</LinkItem>
              ))}
            </Stack>

            {/* Registered badge */}
            <Box sx={{
              mt: 5, p: 2,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: `${br}px`,
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Typography sx={{
                  fontFamily: typography.fontFamily,
                  fontSize: '0.68rem', fontWeight: 600,
                  color: palette.accent.main, letterSpacing: '0.06em',
                }}>
                  REGISTERED
                </Typography>
              </Box>
              <Typography sx={{
                fontFamily: typography.fontFamily,
                fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6,
              }}>
                CAC Reg. No. RC12345<br />
                NCSB Certified Cooperative
              </Typography>
            </Box>
          </Box>

          {/* ── COL 4: Contact ────────────────────────────── */}
          <Box>
            <Typography sx={{
              fontFamily: typography.fontFamily,
              fontSize: '0.95rem', fontWeight: 500,
              color: '#fff',
              letterSpacing: '0.02em',
              mb: 3,
            }}>
              Contact
            </Typography>

            <Stack spacing={3}>
              {[
                {
                  icon: <LocationOnIcon sx={{ fontSize: 16 }} />,
                  label: 'Visit Us',
                  val: '14 Cooperative Drive,\nVictoria Island, Lagos',
                },
                {
                  icon: <EmailIcon sx={{ fontSize: 16 }} />,
                  label: 'Email Us',
                  val: 'hello@codebridgecoop.ng',
                },
                {
                  icon: <PhoneIcon sx={{ fontSize: 16 }} />,
                  label: 'Call Us',
                  val: '+234 815 523 0994',
                },
              ].map((c, i) => (
                <Box key={i} sx={{ display: 'flex', gap: 1.75, alignItems: 'flex-start' }}>
                  <Box sx={{
                    width: 32, height: 32, borderRadius: `${br - 2}px`, flexShrink: 0,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: palette.accent.main, mt: 0.25,
                  }}>
                    {c.icon}
                  </Box>
                  <Box>
                    <Typography sx={{
                      fontFamily: typography.fontFamily,
                      fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)',
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      fontWeight: 600, mb: 0.3,
                    }}>
                      {c.label}
                    </Typography>
                    <Typography sx={{
                      fontFamily: typography.fontFamily,
                      fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)',
                      lineHeight: 1.65, fontWeight: 300,
                      whiteSpace: 'pre-line',
                    }}>
                      {c.val}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>

            {/* Office hours */}
            <Box sx={{
              mt: 4, p: 2.5,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: `${br}px`,
            }}>
              <Typography sx={{
                fontFamily: typography.fontFamily,
                fontSize: '0.68rem', fontWeight: 600,
                color: 'rgba(255,255,255,0.35)',
                letterSpacing: '0.1em', textTransform: 'uppercase', mb: 1.5,
              }}>
                Office Hours
              </Typography>
              {[
                { day: 'Mon – Fri', time: '8:00 AM – 5:00 PM' },
                { day: 'Saturday', time: '9:00 AM – 1:00 PM' },
                { day: 'Sunday', time: 'Closed' },
              ].map((h, i) => (
                <Box key={i} sx={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  py: 0.6,
                  borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                }}>
                  <Typography sx={{ fontFamily: typography.fontFamily, fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>
                    {h.day}
                  </Typography>
                  <Typography sx={{
                    fontFamily: typography.fontFamily,
                    fontSize: '0.78rem',
                    color: h.time === 'Closed' ? 'rgba(255,255,255,0.25)' : palette.accent.main,
                    fontWeight: 500,
                  }}>
                    {h.time}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── BOTTOM BAR ────────────────────────────────────────── */}
      <Box sx={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        position: 'relative', zIndex: 1,
      }}>
        <Box sx={{
          maxWidth: 1200, mx: 'auto',
          px: { xs: 3, md: 6, lg: 8 },
          py: { xs: 3, md: 3.5 },
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: 2,
        }}>
          <Typography sx={{
            fontFamily: typography.fontFamily,
            fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', fontWeight: 300,
          }}>
            © {new Date().getFullYear()} CodeBridge Multi-Purpose Cooperative Society. All rights reserved.
          </Typography>

          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            {[
              { label: 'Privacy', to: '/privacy-policy' },
              { label: 'Terms', to: '/termsandconditions' },
            ].map((l, i) => (
              <Box
                key={i}
                component={Link} to={l.to}
                sx={{
                  fontFamily: typography.fontFamily,
                  fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)',
                  textDecoration: 'none', fontWeight: 400,
                  transition: 'color 0.2s',
                  '&:hover': { color: 'rgba(255,255,255,0.75)' },
                }}
              >
                {l.label}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
    </Box>
  );
};

export default Footer;