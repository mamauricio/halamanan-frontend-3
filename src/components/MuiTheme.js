import { createTheme } from '@mui/material/styles';

const theme = createTheme({
 palette: {
  primary: {
   main: '#52734D', // Main green
  },
  secondary: {
   main: '#264933', // Darker shade
  },
  background: {
   default: '#CCD7C6', // Light gray background color
  },
 },
 typography: {
  fontFamily: '"Roboto", sans-serif',
  fontSize: 16,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
 },
 shape: {
  borderRadius: 8, // Rounded corner radius for elements
 },
 spacing: 8, // Default spacing between elements
 overrides: {
  MuiButton: {
   root: {
    borderRadius: 8, // Rounded corners for buttons
    textTransform: 'none', // Preserve button text case
    // backgroundColor: 'black'
   },
   contained: {
    boxShadow: 'none', // Remove button box shadow
   },
  },
  MuiTextField: {
   root: {
    borderRadius: 8, // Rounded corners for text fields
   },
  },
  MuiCard: {
   root: {
    borderRadius: 8, // Rounded corners for cards
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add a subtle box shadow
   },
  },
  MuiContainer: {
   root: {
    backgroundColor: '#E9ECE1',
   },
  },
  MuiCssBaseline: {
   '@global': {
    '*': {
     'scrollbar-width': 'thin',
    },
    '*::-webkit-scrollbar': {
     width: '4px',
     height: '4px',
    },
   },
  },
 },
});

export default theme;
