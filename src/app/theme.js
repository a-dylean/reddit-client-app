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
      main: "#FF4300",
    },
  },
  typography: {
    allVariants: {
      fontFamily: 'IBM Plex Sans, Arial, sans-serif',
      textTransform: "none",
      wordBreak: "break-word",
    },
    h4: {
      fontSize: "36px",
      fontWeight: 600
    },
    h5: {
      fontSize: "18px",
      fontWeight: 600,
      lineHeight: "22px"
    },
    h6: {
      fontFamily: "Noto Sans",
      fontSize: "14px", 
      width: "100%",
      padding: " 0 16px",
      fontWeight: 400,
      lineHeight: "21px"
    },
    h7: { 
      fontWeight: 600, 
      fontSize: "15px", 
      lineHight: 1
    }
  },
});