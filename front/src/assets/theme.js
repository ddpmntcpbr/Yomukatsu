import { createMuiTheme } from "@material-ui/core/styles";
import { green, red } from "@material-ui/core/colors";

export const theme = createMuiTheme({
  props: {
    MuiTextField: {
      variant: "filled",
    },
  },
  palette: {
    primary: {
      light: green[200],
      main: green[900],
    },
    secondary: {
      light: red[100],
      main: red[800],
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
      A700: "#616161",
    },
    background: {
      default: "#EAF7FF",
    },
  },
  typography: {
    body1: {
      color: "rgba(0,0,0,.75)",
    },
    button: {
      textTransform: "none",
    },
  },
  mixins: {
    toolbar: {
      minHeight: 40,
    },
  },
});
