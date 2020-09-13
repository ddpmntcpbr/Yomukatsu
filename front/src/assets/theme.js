import { createMuiTheme } from '@material-ui/core/styles';

// Pick colors on https://material.io/resources/color/#!/

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#e0f1f1',
      main: '#e0f1f1',
      dark: '#5188b1',
      contrastText: '#000000',
    },
    secondary: {
      light: '#aed265',
      main: '#aed265',
      dark: '#aed265',
      contrastText: '#000000',
    },
    grey: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#d5d5d5",
      A200: "#aaaaaa",
      A400: "#303030",
      A700: "#616161"
    }
  },
  typography: {
    button: {
      textTransform: "none",
    }
  }
});