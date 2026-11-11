import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import presidentPhoto from '../../assets/members/president.jpg';
import treasurerPhoto from '../../assets/members/Treasurer.jpg';
import { businesses } from './Businesses';
import img2 from '../../assets/img2.jpg';
import img3 from '../../assets/img3.jpg';
import lifeCodebridge1 from '../../assets/life@codebridge/PHOTO-2026-08-29-19-41-31.jpg';
import heroPhoto from '../../assets/life@codebridge/PHOTO-2026-08-29-19-45-04.jpg';
import lifeCodebridge3 from '../../assets/life@codebridge/PHOTO-2026-08-29-19-42-28.jpg';
import lifeCodebridge4 from '../../assets/life@codebridge/PHOTO-2026-08-29-19-43-28.jpg';
import lifeCodebridge5 from '../../assets/life@codebridge/PHOTO-2026-08-29-19-44-27.jpg';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

// --- Animated counter ---
function useCounter(end: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setCount(end); return; }
    let startTime: number | null = null;
    let frame = 0;
    const step = (t: number) => {
      if (startTime === null) startTime = t;
      const p = Math.min((t - startTime) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [end, duration, start]);
  return count;
}

const BigStat: React.FC<{ value: number; prefix?: string; suffix?: string; label: string }> = ({ value, prefix = '', suffix = '', label }) => {
  const theme = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = useCounter(value, 1800, visible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.4 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Box ref={ref}>
      <Typography sx={{
        fontSize: { xs: '2.9rem', sm: '3.4rem', md: '4.4rem' },
        fontWeight: 400,
        letterSpacing: '-0.04em',
        lineHeight: 1,
        color: theme.palette.text.primary,
        fontVariantNumeric: 'tabular-nums',
      }}>
        {prefix}{count.toLocaleString()}{suffix}
      </Typography>
      <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 1.5 }}>
        {label}
      </Typography>
    </Box>
  );
};

const Home: React.FC = () => {
  const theme = useTheme();
  const { palette } = theme;

  const radius = { xs: '22px', md: '28px' };
  const gap = { xs: 1.5, md: 1.5 };

  const services = [
    { icon: <SavingsOutlinedIcon />, title: 'Secure Savings', desc: 'Build financial security with disciplined savings schemes tailored to your personal and family goals.' },
    { icon: <AccountBalanceOutlinedIcon />, title: 'Affordable Loans', desc: 'Access credit for personal, business, and emergency needs at fair, transparent rates.' },
    { icon: <VolunteerActivismOutlinedIcon />, title: 'Welfare Support', desc: 'Collective mutual aid during hardship, celebration, and community milestones.' },
    { icon: <GavelOutlinedIcon />, title: 'Transparent Governance', desc: 'Member-focused decisions with full accountability, open reporting, and democratic oversight.' },
  ];

  const values = [
    { icon: <ShieldOutlinedIcon />, title: 'Trust & Security', desc: 'Your funds are protected by sound financial safeguards and cooperative law.' },
    { icon: <BoltOutlinedIcon />, title: 'Fast Processing', desc: 'Loan decisions within 48 hours. Savings credited promptly. No bureaucratic delays.' },
    { icon: <HandshakeOutlinedIcon />, title: 'Mutual Support', desc: 'A network of people invested in each other’s financial success.' },
    { icon: <EmojiEventsOutlinedIcon />, title: 'Proven Results', desc: 'Consistent member growth, competitive returns, and real community impact.' },
  ];

  const howItWorks = [
    { step: '01', title: 'Register', desc: 'Complete a simple membership form and get verified in under 24 hours.' },
    { step: '02', title: 'Contribute', desc: 'Set up your monthly savings plan and make your first contribution.' },
    { step: '03', title: 'Access Benefits', desc: 'Unlock loans, dividends, and welfare support as an active member.' },
    { step: '04', title: 'Grow Together', desc: 'Take part in governance, referrals, and community investment programmes.' },
  ];

  const [rotIndex, setRotIndex] = useState(0);
  const rotImages = [img2, img3];
  useEffect(() => {
    const id = window.setInterval(() => setRotIndex((p) => (p + 1) % rotImages.length), 3500);
    return () => window.clearInterval(id);
  }, [rotImages.length]);

  const selectedBusinesses = businesses.filter((b) =>
    ['Brainiac Academy', 'Oladoja Alaso Ebi'].includes(b.businessName || b.name),
  );

  const testimonials = [
    {
      quote: 'CodeBridge helped me grow my farm business and gave me the support I needed to plan better, expand confidently, and improve my livelihood. It was a practical step forward for my family and my future.',
      name: 'Emmanuel Ebuk',
      role: 'Farmer & Member',
      img: treasurerPhoto,
    },
    ...selectedBusinesses.map((b) => ({
      quote: b.impact || 'Codebridge supported my business growth.',
      name: b.businessName || b.name,
      role: 'Business Owner',
      img: b.profileImage || presidentPhoto,
    })),
  ];

  const moments = [
    { img: lifeCodebridge1, title: 'Members building futures together' },
    { img: lifeCodebridge3, title: 'Celebrating milestones as one community' },
    { img: lifeCodebridge4, title: 'Moments of shared growth and success' },
  ];

  const limeButton = {
    background: palette.accent.main,
    color: palette.accent.contrastText,
    '&:hover': { background: palette.accent.dark },
  } as const;

  const forestButton = {
    background: palette.primary.main,
    color: '#fff',
    '&:hover': { background: palette.primary.dark },
  } as const;

  const fadeUp = (delay = 0) => ({
    opacity: 0,
    animation: `homeFadeUp 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s forwards`,
    '@keyframes homeFadeUp': {
      from: { opacity: 0, transform: 'translateY(24px)' },
      to: { opacity: 1, transform: 'none' },
    },
    '@media (prefers-reduced-motion: reduce)': { animation: 'none', opacity: 1 },
  });

  const imageTile = (src: string, alt: string, minHeight: object | number) => (
    <Box sx={{
      borderRadius: radius, overflow: 'hidden', position: 'relative', minHeight, height: '100%',
      '& img': { transition: 'transform 0.8s cubic-bezier(0.22,1,0.36,1)' },
      '&:hover img': { transform: 'scale(1.04)' },
    }}>
      <Box component="img" src={src} alt={alt} sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
    </Box>
  );

  const featureRow = (icon: React.ReactNode, title: string, desc: string, onDark: boolean) => (
    <Box key={title} sx={{ display: 'grid', gridTemplateColumns: '44px 1fr', gap: { xs: 2, md: 3 }, alignItems: 'start' }}>
      <Box sx={{
        color: onDark ? palette.accent.main : palette.primary.main,
        display: 'flex', pt: 0.25,
        '& svg': { fontSize: 30, strokeWidth: 0.2 },
      }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="h6" sx={{ color: onDark ? '#fff' : palette.text.primary, mb: 0.5, fontSize: { xs: '1rem', md: '1.1rem' } }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: onDark ? 'rgba(255,255,255,0.72)' : 'rgba(19,42,33,0.75)', maxWidth: 440 }}>
          {desc}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ background: palette.background.default, overflowX: 'hidden', pb: { xs: 1.5, md: 1.5 } }}>
      <Box sx={{ maxWidth: 1360, mx: 'auto', px: { xs: 1.5, sm: 2, md: 3 }, display: 'flex', flexDirection: 'column', gap }}>

        {/* ── HERO ─────────────────────────────────────────────── */}
        <Box sx={{
          position: 'relative',
          background: palette.primary.main,
          borderRadius: radius,
          overflow: 'hidden',
          color: '#fff',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1.25fr', lg: '0.95fr 1.35fr' },
          gap: { xs: 0, md: 1.5 },
          p: { xs: 1, md: 1.5 },
          minHeight: { md: 'min(74vh, 600px)' },
        }}>
          {/* soft glow + ring, kept to the text side */}
          <Box aria-hidden sx={{
            position: 'absolute', width: 520, height: 520, borderRadius: '50%',
            left: -180, bottom: -260,
            background: `radial-gradient(circle, ${palette.primary.light}66, transparent 70%)`,
            pointerEvents: 'none',
          }} />
          <Box aria-hidden sx={{
            position: 'absolute', width: 300, height: 300, borderRadius: '50%',
            left: { xs: -140, md: -90 }, top: { xs: -150, md: -110 },
            border: '1px solid rgba(255,255,255,0.12)', pointerEvents: 'none',
          }} />

          {/* Text side */}
          <Box sx={{
            position: 'relative', zIndex: 1,
            px: { xs: 2.5, sm: 3.5, md: 5 }, pt: { xs: 4.5, md: 6 }, pb: { xs: 4, md: 5 },
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: { xs: 4, md: 5 },
          }}>
            <Typography sx={{
              color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', fontWeight: 400,
              ...fadeUp(0),
            }}>
              Member-owned cooperative, since 2016
            </Typography>

            <Box>
              <Typography variant="h1" sx={{
                color: '#fff',
                fontSize: { xs: '2.7rem', sm: '3.4rem', md: '3.2rem', lg: '3.9rem' },
                mb: { xs: 2.5, md: 3 },
                textWrap: 'balance',
                ...fadeUp(0.08),
              }}>
                Financial{' '}
                <Box component="span" sx={{ color: palette.accent.main }}>Empowerment</Box>{' '}
                Starts Here.
              </Typography>
              <Typography sx={{
                color: 'rgba(255,255,255,0.75)', fontWeight: 300,
                fontSize: { xs: '1rem', md: '1.08rem' }, lineHeight: 1.7, maxWidth: 460,
                mb: { xs: 3.5, md: 4.5 },
                ...fadeUp(0.16),
              }}>
                A member-owned cooperative promoting savings, providing affordable loans,
                and improving economic wellbeing through mutual support.
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2.5, sm: 3 }, flexWrap: 'wrap', ...fadeUp(0.24) }}>
                <Button component={Link} to="/membership" size="large" sx={limeButton} endIcon={<ArrowOutwardIcon sx={{ fontSize: 18 }} />}>
                  Become a member
                </Button>
                <Box component={Link} to="/about" sx={{
                  color: '#fff', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 0.5,
                  borderBottom: '1px solid rgba(255,255,255,0.3)', pb: 0.25,
                  transition: 'color 0.2s ease, border-color 0.2s ease',
                  '&:hover': { color: palette.accent.main, borderColor: palette.accent.main },
                }}>
                  Learn more
                </Box>
              </Box>
            </Box>

            {/* social proof */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ...fadeUp(0.32) }}>
              <Box sx={{ display: 'flex' }}>
                {[presidentPhoto, treasurerPhoto, lifeCodebridge4, lifeCodebridge3].map((src, i) => (
                  <Box key={i} component="img" src={src} alt="" sx={{
                    width: 36, height: 36, borderRadius: '50%', objectFit: 'cover',
                    border: `2px solid ${palette.primary.main}`, ml: i ? -1.25 : 0,
                  }} />
                ))}
              </Box>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.4 }}>
                <Box component="span" sx={{ color: '#fff', fontWeight: 500 }}>30+ members</Box><br />
                growing together
              </Typography>
            </Box>
          </Box>

          {/* Photo side */}
          <Box sx={{
            position: 'relative',
            borderRadius: { xs: '16px', md: '20px' },
            overflow: 'hidden',
            minHeight: { xs: 280, sm: 380, md: 'auto' },
            ...fadeUp(0.12),
          }}>
            <Box component="img" src={heroPhoto} alt="CodeBridge members together in matching attire"
              sx={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: '50% 35%',
                animation: 'heroZoom 14s ease-out forwards',
                '@keyframes heroZoom': { from: { transform: 'scale(1.08)' }, to: { transform: 'scale(1)' } },
                '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
              }} />
            <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(15,46,37,0.55) 100%)' }} />

            {/* floating stat chips */}
            <Box sx={{
              position: 'absolute', left: { xs: 12, md: 20 }, bottom: { xs: 12, md: 20 },
              display: 'flex', gap: 1, flexWrap: 'wrap', pr: 2,
            }}>
              <Box sx={{
                background: '#fff', color: palette.text.primary, borderRadius: '14px',
                px: 2, py: 1.25, display: 'flex', alignItems: 'center', gap: 1.25,
                boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
              }}>
                <Box sx={{
                  width: 32, height: 32, borderRadius: '50%', background: palette.accent.main, color: palette.primary.main,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <AccountBalanceOutlinedIcon sx={{ fontSize: 17 }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 500, fontSize: '0.95rem', lineHeight: 1.2 }}>₦100M+</Typography>
                  <Typography variant="caption" sx={{ color: palette.text.secondary, lineHeight: 1.2, display: 'block' }}>Total disbursed</Typography>
                </Box>
              </Box>
              <Box sx={{
                background: palette.accent.main, color: palette.accent.contrastText, borderRadius: '14px',
                px: 2, py: 1.25, display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1.25,
                boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
              }}>
                <ScheduleOutlinedIcon sx={{ fontSize: 20 }} />
                <Box>
                  <Typography sx={{ fontWeight: 500, fontSize: '0.95rem', lineHeight: 1.2 }}>48 hours</Typography>
                  <Typography variant="caption" sx={{ lineHeight: 1.2, display: 'block', opacity: 0.75 }}>Loan decisions</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* ── SERVICES BENTO ───────────────────────────────────── */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap }}>
          <Box sx={{ position: 'relative', borderRadius: radius, overflow: 'hidden', minHeight: { xs: 320, md: 'auto' } }}>
            {rotImages.map((src, i) => (
              <Box key={i} component="img" src={src} alt="CodeBridge community"
                sx={{
                  position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
                  opacity: i === rotIndex ? 1 : 0, transition: 'opacity 1s ease',
                }} />
            ))}
          </Box>

          <Box sx={{ background: palette.primary.main, borderRadius: radius, p: { xs: 3.5, md: 5 }, color: '#fff' }}>
            <Typography variant="h3" sx={{ color: '#fff', fontSize: { xs: '1.75rem', md: '2.2rem' }, mb: { xs: 4, md: 6 }, maxWidth: 420 }}>
              How We Support Our Members
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, md: 3.5 } }}>
              {services.map((s) => featureRow(s.icon, s.title, s.desc, true))}
            </Box>
            <Button component={Link} to="/services" sx={{ ...limeButton, mt: { xs: 4, md: 5 } }}>
              Explore services
            </Button>
          </Box>
        </Box>

        {/* ── VALUES BENTO ─────────────────────────────────────── */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap }}>
          <Box sx={{ background: palette.accent.main, borderRadius: radius, p: { xs: 3.5, md: 5 }, color: palette.accent.contrastText, order: { xs: 2, md: 1 } }}>
            <Typography variant="h3" sx={{ color: palette.accent.contrastText, fontSize: { xs: '1.75rem', md: '2.2rem' }, mb: 2, maxWidth: 460 }}>
              Built on Principles That Last
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(15,46,37,0.75)', mb: { xs: 4, md: 5 }, maxWidth: 480 }}>
              Grounded in the ICA cooperative principles: voluntary membership, democratic governance,
              economic participation, and concern for community.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, md: 3.5 } }}>
              {values.map((v) => featureRow(v.icon, v.title, v.desc, false))}
            </Box>
            <Button component={Link} to="/about" sx={{ ...forestButton, mt: { xs: 4, md: 5 } }}>
              Learn our story
            </Button>
          </Box>
          <Box sx={{ order: { xs: 1, md: 2 } }}>
            {imageTile(lifeCodebridge5, 'CodeBridge members at an event', { xs: 340, md: '100%' })}
          </Box>
        </Box>

        {/* ── IMPACT ───────────────────────────────────────────── */}
        <Box sx={{ background: '#F7F7F2', borderRadius: radius, px: { xs: 3, md: 6 }, py: { xs: 5, md: 7 } }}>
          <Typography variant="h5" sx={{ color: palette.text.primary, mb: { xs: 4, md: 6 }, fontWeight: 400 }}>
            Impact You Can Measure
          </Typography>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
            rowGap: 5, columnGap: 3,
            mb: { xs: 5, md: 7 },
          }}>
            <BigStat value={100} prefix="₦" suffix="M+" label="Total disbursed" />
            <BigStat value={30} suffix="+" label="Active members" />
            <BigStat value={98} suffix="%" label="Loan approval rate" />
            <BigStat value={150} prefix="₦" suffix="K" label="Average loan size" />
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.3fr 1fr' }, gap }}>
            {/* President quote */}
            <Box sx={{ background: palette.primary.main, borderRadius: '20px', p: { xs: 3, md: 4 }, color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 3 }}>
              <Typography sx={{ fontSize: { xs: '1.1rem', md: '1.3rem' }, fontWeight: 300, lineHeight: 1.55, letterSpacing: '-0.01em' }}>
                “Six years ago we started with 2 members and a shared belief.
                Today, over 30 members are building better futures together.”
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box component="img" src={presidentPhoto} alt="Edima Ben Ekpo"
                  sx={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${palette.accent.main}` }} />
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="body2" sx={{ color: '#fff', fontWeight: 500 }}>Edima Ben Ekpo</Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>President, CodeBridge</Typography>
                </Box>
              </Box>
            </Box>

            {/* Small facts */}
            <Box sx={{ display: 'grid', gridTemplateRows: 'repeat(3, 1fr)', gap: 1 }}>
              {[
                { icon: <ScheduleOutlinedIcon />, top: '48-hour', bottom: 'Loan decisions' },
                { icon: <GroupsOutlinedIcon />, top: 'Member-owned', bottom: 'Democratic governance' },
                { icon: <CalendarMonthOutlinedIcon />, top: 'Since 2016', bottom: 'Serving our community' },
              ].map((f) => (
                <Box key={f.top} sx={{
                  background: '#fff', borderRadius: '16px', px: 2.5, py: 2,
                  display: 'flex', alignItems: 'center', gap: 2,
                  border: `1px solid ${palette.divider}`,
                }}>
                  <Box sx={{
                    width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: palette.accent.light, color: palette.primary.main,
                    '& svg': { fontSize: 20 },
                  }}>
                    {f.icon}
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ color: palette.text.primary, fontWeight: 500, lineHeight: 1.3 }}>{f.top}</Typography>
                    <Typography variant="caption" sx={{ color: palette.text.secondary }}>{f.bottom}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* ── HOW IT WORKS ─────────────────────────────────────── */}
        <Box sx={{ pt: { xs: 5, md: 8 }, pb: { xs: 2, md: 3 }, px: { xs: 1, md: 2 } }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 3, flexWrap: 'wrap', mb: { xs: 3, md: 4 } }}>
            <Typography variant="h3" sx={{ fontSize: { xs: '1.75rem', md: '2.2rem' } }}>How It Works</Typography>
            <Typography variant="body1" sx={{ color: palette.text.secondary, maxWidth: 420 }}>
              Four simple steps from sign-up to growing with a community that has your back.
            </Typography>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap }}>
            {howItWorks.map((s, i) => (
              <Box key={s.step} sx={{
                background: i === 0 ? palette.primary.main : '#fff',
                color: i === 0 ? '#fff' : palette.text.primary,
                borderRadius: '22px', p: { xs: 3, md: 3.5 },
                border: i === 0 ? 'none' : `1px solid ${palette.divider}`,
                minHeight: { md: 240 },
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 4,
              }}>
                <Box sx={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: palette.accent.main, color: palette.accent.contrastText,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 500, fontSize: '0.9rem', fontVariantNumeric: 'tabular-nums',
                }}>
                  {s.step}
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ color: 'inherit', mb: 0.75 }}>{s.title}</Typography>
                  <Typography variant="body2" sx={{ color: i === 0 ? 'rgba(255,255,255,0.72)' : palette.text.secondary }}>{s.desc}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* ── LIFE AT CODEBRIDGE ───────────────────────────────── */}
        <Box sx={{ pt: { xs: 4, md: 6 }, px: { xs: 1, md: 2 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: { xs: 3, md: 4 } }}>
            <Typography variant="h3" sx={{ fontSize: { xs: '1.75rem', md: '2.2rem' } }}>Life at CodeBridge</Typography>
            <Button component={Link} to="/gallery" sx={{ ...forestButton, display: { xs: 'none', sm: 'inline-flex' } }}>
              View gallery
            </Button>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap }}>
            {moments.map((m) => (
              <Box key={m.title} component={Link} to="/gallery" sx={{
                position: 'relative', borderRadius: '22px', overflow: 'hidden',
                height: { xs: 360, md: 420 }, display: 'block', textDecoration: 'none',
                '& img': { transition: 'transform 0.8s cubic-bezier(0.22,1,0.36,1)' },
                '&:hover img': { transform: 'scale(1.05)' },
              }}>
                <Box component="img" src={m.img} alt={m.title} sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 45%, rgba(15,46,37,0.9) 100%)' }} />
                <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: 0, p: 3 }}>
                  <Typography sx={{ color: '#fff', fontWeight: 500, fontSize: '1.1rem', lineHeight: 1.35, mb: 2, maxWidth: 280 }}>
                    {m.title}
                  </Typography>
                  <Box sx={{
                    display: 'inline-flex', px: 2.25, py: 0.9, borderRadius: '100px',
                    background: palette.accent.main, color: palette.accent.contrastText,
                    fontSize: '0.82rem', fontWeight: 500,
                  }}>
                    View more
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* ── TESTIMONIALS ─────────────────────────────────────── */}
        <Box sx={{ pt: { xs: 6, md: 9 }, pb: { xs: 2, md: 3 }, px: { xs: 1, md: 2 } }}>
          <Typography variant="h3" sx={{ fontSize: { xs: '1.75rem', md: '2.2rem' }, mb: { xs: 3, md: 4 } }}>
            What Our Members Say
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: `repeat(${Math.min(testimonials.length, 3)}, 1fr)` }, gap }}>
            {testimonials.map((t, i) => {
              const dark = i === 1;
              return (
                <Box key={t.name} sx={{
                  background: dark ? palette.primary.main : '#fff',
                  border: dark ? 'none' : `1px solid ${palette.divider}`,
                  borderRadius: '22px', p: { xs: 3, md: 4 },
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 4,
                }}>
                  <Box>
                    <Box sx={{ display: 'flex', gap: 0.25, mb: 2.5 }}>
                      {[...Array(5)].map((_, s) => (
                        <StarRoundedIcon key={s} sx={{ fontSize: 18, color: dark ? palette.accent.main : palette.warning.main }} />
                      ))}
                    </Box>
                    <Typography variant="body1" sx={{ color: dark ? 'rgba(255,255,255,0.86)' : palette.text.primary, fontWeight: 300 }}>
                      {t.quote}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box component="img" src={t.img} alt={t.name}
                      sx={{ width: 46, height: 46, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: dark ? '#fff' : palette.text.primary }}>{t.name}</Typography>
                      <Typography variant="caption" sx={{ color: dark ? 'rgba(255,255,255,0.6)' : palette.text.secondary }}>{t.role}</Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <Box sx={{
          mt: { xs: 3, md: 5 },
          background: palette.accent.main,
          borderRadius: radius,
          px: { xs: 3, md: 6 }, py: { xs: 6, md: 9 },
          textAlign: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <Box aria-hidden sx={{ position: 'absolute', width: 260, height: 260, borderRadius: '50%', border: '1px solid rgba(15,46,37,0.15)', left: -90, bottom: -120 }} />
          <Box aria-hidden sx={{ position: 'absolute', width: 260, height: 260, borderRadius: '50%', border: '1px solid rgba(15,46,37,0.15)', right: -90, top: -120 }} />
          <Typography variant="h2" sx={{ color: palette.accent.contrastText, fontSize: { xs: '2rem', md: '2.8rem' }, mb: 2, position: 'relative' }}>
            Ready to Make a Difference?
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(15,46,37,0.75)', maxWidth: 520, mx: 'auto', mb: 4, position: 'relative' }}>
            Become part of a financially empowered community where members support one another
            to reach shared economic goals, together.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
            <Button component={Link} to="/apply" size="large" sx={forestButton}>Join today</Button>
            <Button component={Link} to="/contact" size="large" sx={{
              color: palette.accent.contrastText, border: '1.5px solid rgba(15,46,37,0.3)',
              '&:hover': { background: 'rgba(15,46,37,0.06)', borderColor: palette.accent.contrastText },
            }}>
              Talk to us
            </Button>
          </Box>
        </Box>

      </Box>
    </Box>
  );
};

export default Home;
