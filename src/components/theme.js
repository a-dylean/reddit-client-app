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
    MuiCardContent: {
      styleOverrides:{
        root: { 
          "&:last-child": {
            padding: 0
          } 
        },
      }
      },
    MuiList: {
      styleOverrides: {
        root: {
          paddingTop: 0,
          paddingBottom: 0
        },
        padding: {
          padding: 0
        }
      }
    },
    MuiBox: {
      styleOverrides: {
        root: {
          padding: 0
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#FF4300"
          }
        }
      }
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#FF4300"
          }
        }
      }
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
    h3: {
      fontSize: "1.3rem",
      fontWeight: 600
    },
    h4: {
      fontSize: "1rem",
      fontWeight: 600
    },
    h5: {
      fontSize: "1.2rem",
      fontWeight: 600,
      lineHeight: "1.2rem"
    },
    h6: {
      fontFamily: "Noto Sans",
      fontSize: "0.9rem",
      padding: "0 1rem",
      fontWeight: 400,
      lineHeight: "1.3rem",
    },
    h7: { 
      fontWeight: 600, 
      fontSize: "0.8rem", 
      lineHeight: "0.5rem"
    }
  },
});