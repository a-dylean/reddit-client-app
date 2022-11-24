import React from "react";
import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
          body {
            background-color: #e0e0e0;
          }
        `,
    },
  },
  palette: {
    primary: {
      main: "#757575",
    },
  },
  typography: {
    allVariants: {
      fontFamily: "Verdana, Arial, Helvetica, sans-serif",
      textTransform: "none",
      wordBreak: "break-word",
    },
    h5: {
      fontSize: 18,
    },
  },
});
