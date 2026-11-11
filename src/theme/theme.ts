import { createTheme } from '@mui/material/styles';

// Lexend: wide, geometric sans that matches the bento / editorial look
const fontLink = document.createElement('link');
fontLink.href =
  'https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap';
fontLink.rel = 'stylesheet';
if (!document.head.querySelector('[href*="Lexend"]')) {
  document.head.appendChild(fontLink);
}

// Custom "accent" palette slot for the lime highlight colour
declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary'];
  }
  interface PaletteOptions {
    accent?: PaletteOptions['primary'];
  }
}

const FONT = '"Lexend", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif';

// Core brand tokens
export const brand = {
  forest: '#173F33',     // deep green surfaces (cards, footer)
  forestDeep: '#0F2E25',
  forestSoft: '#2C6450',
  lime: '#E8F35E',       // highlight cards + primary CTAs
  limeDeep: '#D6E244',
  canvas: '#EFEFE8',     // page background
  ink: '#132A21',
  muted: '#5A6B62',
  line: 'rgba(19,42,33,0.08)',
};

export const theme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: brand.forest,
      light: brand.forestSoft,
      dark: brand.forestDeep,
      contrastText: '#FFFFFF',
    },

    secondary: {
      main: '#3F8A5F',
      light: '#B5DA6E',
      dark: '#245A43',
      contrastText: '#FFFFFF',
    },

    accent: {
      main: brand.lime,
      light: '#F3F8A6',
      dark: brand.limeDeep,
      contrastText: brand.forestDeep,
    },

    success: {
      main: '#3F8A5F',
      light: '#6FB585',
      dark: '#245A43',
    },

    error: {
      main: '#C8423B',
      light: '#E06A62',
      dark: '#A2302A',
    },

    warning: {
      main: '#E0A526',
      light: '#F1C24E',
      dark: '#B98111',
    },

    info: {
      main: '#2F7F78',
      light: '#5FA9A2',
      dark: '#1E5C57',
    },

    background: {
      default: brand.canvas,
      paper: '#FFFFFF',
    },

    text: {
      primary: brand.ink,
      secondary: brand.muted,
    },

    divider: brand.line,
  },

  typography: {
    fontFamily: FONT,

    h1: {
      fontFamily: FONT,
      fontSize: '3.5rem',
      fontWeight: 500,
      lineHeight: 1.08,
      letterSpacing: '-0.03em',
    },

    h2: {
      fontFamily: FONT,
      fontSize: '2.8rem',
      fontWeight: 500,
      lineHeight: 1.12,
      letterSpacing: '-0.025em',
    },

    h3: {
      fontFamily: FONT,
      fontSize: '2.2rem',
      fontWeight: 500,
      lineHeight: 1.18,
      letterSpacing: '-0.02em',
    },

    h4: {
      fontFamily: FONT,
      fontSize: '1.6rem',
      fontWeight: 500,
      lineHeight: 1.28,
      letterSpacing: '-0.015em',
    },

    h5: {
      fontFamily: FONT,
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '-0.01em',
    },

    h6: {
      fontFamily: FONT,
      fontSize: '1.05rem',
      fontWeight: 500,
      lineHeight: 1.45,
    },

    body1: {
      fontFamily: FONT,
      fontSize: '1rem',
      fontWeight: 300,
      lineHeight: 1.75,
    },

    body2: {
      fontFamily: FONT,
      fontSize: '0.9rem',
      fontWeight: 300,
      lineHeight: 1.7,
    },

    subtitle1: {
      fontFamily: FONT,
      fontSize: '1.1rem',
      fontWeight: 300,
      lineHeight: 1.7,
    },

    subtitle2: {
      fontFamily: FONT,
      fontSize: '0.85rem',
      fontWeight: 500,
      lineHeight: 1.6,
      letterSpacing: '0.02em',
    },

    caption: {
      fontFamily: FONT,
      fontSize: '0.78rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },

    overline: {
      fontFamily: FONT,
      fontSize: '0.75rem',
      fontWeight: 500,
      letterSpacing: '0.04em',
      textTransform: 'none' as const,
    },

    button: {
      fontFamily: FONT,
      textTransform: 'none' as const,
      fontWeight: 500,
      letterSpacing: 0,
    },
  },

  shape: {
    borderRadius: 14,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: brand.canvas,
          display: 'block',
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 100,
          padding: '10px 26px',
          fontSize: '0.92rem',
          fontWeight: 500,
          boxShadow: 'none',
          transition: 'background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease, transform 0.2s ease',
          '&:hover': {
            boxShadow: 'none',
          },
          '&:active': {
            transform: 'scale(0.97)',
          },
        },
        sizeLarge: {
          padding: '14px 34px',
          fontSize: '0.98rem',
        },
        sizeSmall: {
          padding: '6px 18px',
          fontSize: '0.82rem',
        },
        contained: {
          '&:hover': {
            boxShadow: 'none',
          },
        },
        outlined: {
          borderWidth: 1.5,
          '&:hover': { borderWidth: 1.5 },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: 'none',
          border: `1px solid ${brand.line}`,
          transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 14,
            backgroundColor: '#FFFFFF',
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 100,
          fontWeight: 500,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
  },
});
