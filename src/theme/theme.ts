import { createTheme, PaletteMode, ThemeOptions } from '@mui/material';

// Create theme options for our retro-modern game style
const getThemeOptions = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode
          primary: {
            main: '#FF3366',
            light: '#FF6B9F',
            dark: '#CC295F',
          },
          secondary: {
            main: '#4DFFDB',
            light: '#7BFFE7',
            dark: '#00D1B2',
          },
          background: {
            default: '#F0F2F5',
            paper: '#FFFFFF',
          },
          text: {
            primary: '#1A1B41',
            secondary: '#666B8D',
          },
          // Custom colors for game elements
          accent1: {
            main: '#FFD23F',
            light: '#FFE07B',
            dark: '#D1B200',
          },
          accent2: {
            main: '#9B5DE5',
            light: '#B47EFF',
            dark: '#7B3CC8',
          },
          accent3: {
            main: '#00F5D4',
            light: '#4DFFDB',
            dark: '#00D1B2',
          },
        }
      : {
          // Dark mode
          primary: {
            main: '#FF3366',
            light: '#FF6B9F',
            dark: '#CC295F',
          },
          secondary: {
            main: '#4DFFDB',
            light: '#7BFFE7',
            dark: '#00D1B2',
          },
          background: {
            default: '#0A0B1E',
            paper: '#141539',
          },
          text: {
            primary: '#F0F2F5',
            secondary: '#A0A7B8',
          },
          // Custom colors for game elements
          accent1: {
            main: '#FFD23F',
            light: '#FFE07B',
            dark: '#D1B200',
          },
          accent2: {
            main: '#B47EFF',
            light: '#C99EFF',
            dark: '#9B5DE5',
          },
          accent3: {
            main: '#00F5D4',
            light: '#4DFFDB',
            dark: '#00D1B2',
          },
        }),
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '2.5rem',
    },
    h2: {
      fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '2rem',
    },
    h3: {
      fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '1.75rem',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    body1: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    body2: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    button: {
      textTransform: 'none',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 16px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: '16px 0 0 16px',
          backgroundImage: 'linear-gradient(145deg, var(--background-paper) 0%, var(--background-default) 100%)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(145deg, var(--background-paper) 0%, var(--background-default) 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

// Create light and dark theme variants
export const lightTheme = createTheme(getThemeOptions('light'));
export const darkTheme = createTheme(getThemeOptions('dark'));

// Helper function to get the appropriate theme
export const getAppTheme = (mode: PaletteMode) => 
  mode === 'light' ? lightTheme : darkTheme; 