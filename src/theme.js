import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',  // Use dark theme globally
  },
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: '100%',  // Ensure Avatar takes full width
          height: '80px', // Avatar height
          marginBottom: '10px', // Margin below the Avatar
          '&:hover': {
            transform: 'scale(1.05)', // Scale on hover
            transition: 'transform 0.2s', // Smooth transition
            cursor: 'pointer', // Pointer cursor on hover
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          // width: '100%',  // Ensure Card takes full width
          // height: '80px', // Card height (same as Avatar)
          // marginBottom: '10px', // Margin below the Card
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          margin: '5px', // Margin for chips
        },
      },
    },
    // More components can be added here with custom styles if necessary
  },
});

export default theme;
