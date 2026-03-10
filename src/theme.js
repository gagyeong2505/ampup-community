import { createTheme } from '@mui/material/styles';

/**
 * AmpUp 커뮤니티 테마
 * 블랙 베이스 + 퍼플 포인트 다크 테마
 */
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#B026FF',
    },
    secondary: {
      main: '#FF00CC',
    },
    background: {
      default: '#111111',
      paper: '#1A1A1F',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.125rem',
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
  },
  spacing: 8,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#111111',
          scrollbarColor: '#B026FF #1A1A1F',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#1A1A1F',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#B026FF',
            borderRadius: '4px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #B026FF, #FF00CC)',
          '&:hover': {
            background: 'linear-gradient(135deg, #9900DD, #DD00AA)',
            boxShadow: '0 0 12px rgba(176, 38, 255, 0.5)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A1A1F',
          border: '1px solid rgba(176, 38, 255, 0.15)',
          '&:hover': {
            border: '1px solid rgba(176, 38, 255, 0.4)',
            boxShadow: '0 0 16px rgba(176, 38, 255, 0.15)',
          },
        },
      },
    },
  },
});

export default theme;
