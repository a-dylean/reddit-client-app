import { createTheme } from "@mui/material";

const redditRedMain = "#FF4300";
const redditRedFaded = "#FF430010";

export const theme = createTheme({
  palette: {
    primary: {
      main: redditRedMain,
      background: "#fafafa",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
          body {
            background-color: #e0e0e0;
          }
        `,
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          "&:last-child": {
            padding: 0,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          marginBottom: "1rem",
          paddingBottom: 0

        }
      }
    },
    MuiList: {
      styleOverrides: {
        root: {
          paddingTop: 0,
          paddingBottom: 0,
        },
        padding: {
          padding: 0,
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: redditRedFaded,
          },
        },
      },
    },
 },
  typography: {
    allVariants: {
      fontFamily: "IBM Plex Sans, Arial, sans-serif",
      textTransform: "none",
      wordBreak: "break-word",
    },
    h3: {
      fontSize: "1.3rem",
      fontWeight: 600,
      color: "#fff",
      cursor: "pointer"
    },
    h4: {
      fontSize: "1rem",
      fontWeight: 600,
    },
    h5: {
      fontFamily: "Noto Sans",
      fontSize: "0.9rem",
      padding: "0 0 0.3rem",
      fontWeight: 400,
      lineHeight: "1rem",
    },
    h6: {
      fontFamily: "Noto Sans",
      fontSize: "0.9rem",
      padding: "0 1rem",
      fontWeight: 400,
      lineHeight: "1rem",
    },
    h7: {
      fontWeight: 600,
      fontSize: "0.8rem",
      lineHeight: "0.5rem",
    },
  },
});
