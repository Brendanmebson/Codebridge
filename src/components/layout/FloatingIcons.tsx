import React from 'react';
import { Box } from '@mui/material';
import type { SvgIconComponent } from '@mui/icons-material';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { brand } from '../../theme/theme';

// Theme colours: dark green, green, white, black
const COLORS = {
  forest: brand.forest,
  green: '#3F8A5F',
  white: '#FFFFFF',
  black: '#0B1410',
} as const;

type Tone = keyof typeof COLORS;

type FloatingIcon = {
  Icon: SvgIconComponent;
  top: string;
  left: string;
  size: number;
  tone: Tone;
  rotate: number;
  duration: number;
  delay: number;
  hideOnMobile?: boolean;
};

// Fixed, hand-placed layout so the pattern feels intentional rather than random
const ICONS: FloatingIcon[] = [
  { Icon: SavingsOutlinedIcon, top: '12%', left: '3%', size: 54, tone: 'forest', rotate: -12, duration: 14, delay: 0 },
  { Icon: HandshakeOutlinedIcon, top: '8%', left: '46%', size: 40, tone: 'white', rotate: 8, duration: 17, delay: 2, hideOnMobile: true },
  { Icon: TrendingUpOutlinedIcon, top: '16%', left: '91%', size: 46, tone: 'green', rotate: -6, duration: 13, delay: 1 },
  { Icon: SpaOutlinedIcon, top: '30%', left: '22%', size: 34, tone: 'black', rotate: 18, duration: 16, delay: 3, hideOnMobile: true },
  { Icon: AccountBalanceOutlinedIcon, top: '34%', left: '72%', size: 58, tone: 'white', rotate: -4, duration: 19, delay: 0.5 },
  { Icon: PaymentsOutlinedIcon, top: '44%', left: '6%', size: 42, tone: 'green', rotate: 10, duration: 15, delay: 4 },
  { Icon: ShieldOutlinedIcon, top: '48%', left: '94%', size: 36, tone: 'forest', rotate: -14, duration: 12, delay: 2.5 },
  { Icon: LightbulbOutlinedIcon, top: '55%', left: '40%', size: 38, tone: 'black', rotate: 6, duration: 18, delay: 1.5, hideOnMobile: true },
  { Icon: GroupsOutlinedIcon, top: '63%', left: '84%', size: 52, tone: 'green', rotate: 4, duration: 16, delay: 3.5 },
  { Icon: VolunteerActivismOutlinedIcon, top: '70%', left: '14%', size: 50, tone: 'white', rotate: -8, duration: 14, delay: 0.8 },
  { Icon: CalculateOutlinedIcon, top: '76%', left: '58%', size: 34, tone: 'forest', rotate: 12, duration: 13, delay: 2.2, hideOnMobile: true },
  { Icon: PieChartOutlineOutlinedIcon, top: '86%', left: '30%', size: 44, tone: 'green', rotate: -10, duration: 17, delay: 4.2 },
  { Icon: AccountBalanceWalletOutlinedIcon, top: '88%', left: '90%', size: 40, tone: 'black', rotate: 8, duration: 15, delay: 1.2 },
  { Icon: StorefrontOutlinedIcon, top: '24%', left: '58%', size: 30, tone: 'green', rotate: -6, duration: 20, delay: 5, hideOnMobile: true },
  { Icon: SchoolOutlinedIcon, top: '92%', left: '4%', size: 36, tone: 'forest', rotate: 14, duration: 16, delay: 2.8 },
  { Icon: HomeOutlinedIcon, top: '4%', left: '78%', size: 32, tone: 'black', rotate: -10, duration: 18, delay: 3.2, hideOnMobile: true },
];

// Tuned for the light page background
const OPACITY: Record<Tone, number> = { forest: 0.2, green: 0.24, white: 1, black: 0.12 };

const FloatingIcons: React.FC = () => (
  <Box
    aria-hidden
    sx={{
      position: 'fixed',
      inset: 0,
      // Behind page content (zIndex 1): icons only show on the page background, never over cards or text
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
      '@keyframes cbFloat': {
        '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(var(--r))' },
        '50%': { transform: 'translate3d(0, -18px, 0) rotate(calc(var(--r) + 6deg))' },
      },
    }}
  >
    {ICONS.map(({ Icon, top, left, size, tone, rotate, duration, delay, hideOnMobile }, i) => (
      <Box
        key={i}
        sx={{
          position: 'absolute',
          top,
          left,
          display: { xs: hideOnMobile ? 'none' : 'flex', md: 'flex' },
          color: COLORS[tone],
          opacity: OPACITY[tone],
          '--r': `${rotate}deg`,
          transform: `rotate(${rotate}deg)`,
          animation: `cbFloat ${duration}s ease-in-out ${-delay}s infinite`,
          willChange: 'transform',
          filter: tone === 'white' ? 'drop-shadow(0 1px 1px rgba(19,42,33,0.12))' : 'none',
          '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
        }}
      >
        <Icon sx={{ fontSize: { xs: size * 0.75, md: size } }} />
      </Box>
    ))}
  </Box>
);

export default FloatingIcons;
