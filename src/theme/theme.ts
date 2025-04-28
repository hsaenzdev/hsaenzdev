import { createTheme, PaletteMode, ThemeOptions } from '@mui/material';

// Create theme options for our retro-modern game style
const getThemeOptions = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode
          primary: {
            main: '#6200ea',
            light: '#9d46ff',
            dark: '#0a00b6',
          },
          secondary: {
            main: '#ff4081',
            light: '#ff79b0',
            dark: '#c60055',
          },
          background: {
            default: '#f5f5f5',
            paper: '#ffffff',
          },
          text: {
            primary: '#212121',
            secondary: '#757575',
          },
        }
      : {
          // Dark mode
          primary: {
            main: '#bb86fc',
            light: '#eeb8ff',
            dark: '#8858c8',
          },
          secondary: {
            main: '#03dac6',
            light: '#84ffff',
            dark: '#00a896',
          },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
          text: {
            primary: '#e0e0e0',
            secondary: '#a0a0a0',
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
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: '16px 0 0 16px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
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