import { createMuiTheme } from "@material-ui/core";

const defaultTheme = createMuiTheme();
const theme = createMuiTheme({
  overrides: {
    MuiPaper: {
      elevation1: {
        // boxShadow: '0 2px 8px rgb(0 0 0 / 10%)',
        // border: '1px solid #e3e3e3'
        boxShadow:
          "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
      },
      root: {
        // backgroundColor: 'none'
      },
    },
    MuiCssBaseline: {
      "@global": {
        a: {
          textDecoration: "none",
          color: "inherit",
        },
      },
    },
    MuiContainer: {
      maxWidthLg: {
        paddingTop: defaultTheme.spacing(3),
        paddingBottom: defaultTheme.spacing(3),
      },
    },
    MuiToolbar: {
      root: {
        // width container
        maxWidth: 1280,
        width: "100%",
        margin: "auto",
      },
    },
    MuiCardMedia: {
      root: {
        borderRadius: 8,
      },
    },
    MuiCardActionArea: {
      root: {
        borderRadius: 8,
      },
    },
    MuiButton: {
      root: {
        textTransform: "none",
        color: "inherit",
        // Typography body1
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif"',
        fontWeight: 400,
        fontSize: "1rem",
        lineHeight: 1.5,
        letterSpacing: "0.00938em",
        minWidth: "auto",
      },
    },
    MuiTabs: {
      root: {
        alignItems: "center",
      },
    },
    MuiTab: {
      root: {
        [defaultTheme.breakpoints.up("xs")]: {
          minHeight: "auto",
          minWidth: "auto",
        },
        padding: "4px 0px",
        marginRight: defaultTheme.spacing(2),
        color: "inherit",
        textTransform: "none",

        // Typography body1
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif"',
        fontWeight: 400,
        fontSize: "1rem",
        lineHeight: 1.5,
        letterSpacing: "0.00938em",
        "&:hover": {
          backgroundColor: "#E0E0E0",
        },
        "&.Mui-selected": {
          backgroundColor: "#E0E0E0",
          fontWeight: "bold",
          color: "black",
        },
      },
    },
    PrivateTabIndicator: {
      root: {
        height: 4,
      },
      vertical: {
        width: 4,
      },
    },
    MuiTouchRipple: {
      //disable Ripple Effect
      root: {
        display: "none",
      },
    },
  },
  typography: {
    h3: {
      fontWeight: "bold",
    },
    h4: {
      fontWeight: "bold",
    },
    h5: {
      fontWeight: "bold",
    },
    h6: {
      fontWeight: "bold",
    },
    subtitle1: {
      fontWeight: "bold",
    },
  },
  palette: {
    primary: {
      main: "#032541",
      contrastText: defaultTheme.palette.getContrastText("#032541"),
    },
    secondary: {
      main: "#fff",
      contrastText: defaultTheme.palette.getContrastText("#fff"),
    },
  },
});

export default theme;
