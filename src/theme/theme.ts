import { createTheme } from '@mui/material';

// Tema customizado com paleta rural
export const theme = createTheme({
  palette: {
    primary: {
      main: '#D97706',
      light: '#F59E0B',
      dark: '#92400E',
    },
    secondary: {
      main: '#FCD34D',
      light: '#FDE68A',
      dark: '#F59E0B',
    },
    background: {
      default: '#FFFBEB',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#78350F',
      secondary: '#92400E',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 16,
  },
});
