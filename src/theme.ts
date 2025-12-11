import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00d4ff', // Cyan
      light: '#5dfdff',
      dark: '#00a3cc',
    },
    secondary: {
      main: '#9d4edd', // Purple
      light: '#c77dff',
      dark: '#7b2cbf',
    },
    background: {
      default: '#000000',
      paper: 'rgba(15, 15, 35, 0.8)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
    info: {
      main: '#4cc9f0',
    },
    success: {
      main: '#06ffa5',
    },
    warning: {
      main: '#ffba08',
    },
    error: {
      main: '#ff006e',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(15, 15, 35, 0.6)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          border: '1px solid rgba(0, 212, 255, 0.2)',
          boxShadow: '0 8px 32px 0 rgba(0, 212, 255, 0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
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
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'rgba(10, 10, 25, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(0, 212, 255, 0.2)',
        },
      },
    },
  },
});
