import { createMuiTheme, Theme } from "@material-ui/core";

export const theme: Theme = createMuiTheme({
  typography: {
    fontFamily: "Graduate",
  },
  palette: {
    primary: {
      main: "#003358",
      dark: "#02233a",
      light: "#0e73bb",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#025757",
      dark: "#033b3b",
      light: "#068b8b",
      contrastText: "#FFF",
    },
  },
});
