import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

const redditRedMain = "#FF4300";
const redditRedFaded = "#FF430010";
const backgroundColor = grey[300];
const white = "#fff";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 700,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: redditRedMain,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
          body {
            background-color: ${backgroundColor}
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
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: "1rem",
        },
      },
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
    // MuiBox: {
    //   styleOverrides: {
    //     root: {
    //       padding: 0,
    //     },
    //   },
    // },
    MuiButton: {
      styleOverrides: {
        startIcon: {
          marginRight: "0.3rem",
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
    selectedSubreddit: {
      fontSize: "1.3rem",
      fontWeight: 600,
      color: white,
      cursor: "pointer",
    },
    h4: {
      fontFamily: "Noto Sans",
      padding: "0 0 0.5rem",
      fontSize: "0.9rem",
      fontWeight: 400,
      lineHeight: "1rem",
    },
    h5: {
      fontSize: "1.125rem",
      fontWeight: 600,
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
