import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  option: {
    fontWeight: "bold",
    paddingBottom: "11px",
    fontSize: "1.5rem",
    alignItems: "center",
  },
  tabs: {
    marginLeft: theme.spacing(3), //1 => 8px
  },
  tab: (toggle) => ({
    backgroundColor: "unset !important",
    fontWeight: "normal !important",
    color: toggle.theme === "dark" && "gray",
    "&:hover": {
      backgroundColor: "unset",
    },
    "&.MuiTab-textColorPrimary.Mui-selected": {
      color: toggle.theme === "dark" ? "white" : "black",
    },
  }),
  fab: {
    width: "30px",
    height: "30px",
    backgroundColor: "unset",
    boxShadow: "unset",
    border: "1px solid #959595",
    "&:hover": {
      backgroundColor: "#959595",
      "& $icon": {
        color: "white",
      },
    },
    "&.MuiFab-root": {
      minHeight: "auto",
    },
  },
  grid: {
    padding: "5px 0px 3px",
    color: "#959595",
    "& span:hover": {
      "& $fab": {
        backgroundColor: "#959595",
        "& $icon": {
          color: "white",
        },
      },
      "& $fab2": {
        backgroundColor: "#EF47B6",
        border: "1px solid #EF47B6",
        "& $icon": {
          color: "#EF47B6",
        },
      },
    },
  },
  icon: {
    color: "#959595",
    fontSize: "15px",
  },
  fab2: {
    "&:hover": {
      backgroundColor: "#EF47B6",
      border: "1px solid #EF47B6",
    },
  },
  progress: {
    position: "absolute",
    left: 0,
  },
  styledDoughnut: {
    paddingRight: "0 !important",
    display: "flex",
    alignItems: "center",
  },
  formControl: {
    "&.MuiFormControl-root": {
      marginTop: theme.spacing(-0.1),
      marginLeft: theme.spacing(2),
      minWidth: 120,
    },
  },
  fix: {
    fontFamily: "var(--font)",
  },
  container: {
    padding: "8px 0px",
    "& li": {
      display: "block !important",
      textAlign: "start",
      padding: "3px 64px 3px 24px !important",
      margin: "0 !important",
      "&:hover": {
        backgroundColor: "#F8F9FA",
      },
    },
  },
  bar: {
    border: "1px solid rgb(227,227,227)",
    textAlign: "center",
    "& div": {
      "& ul": {
        marginBottom: "0",
        "& li": {
          listStyle: "none",
          display: "inline-block",
          marginRight: "40px",
          padding: "10px 0px",
        },
      },
      "& $listFavorites": {
        "& ul": {
          "& li": {
            padding: "3px 10px 3px 24px",
            marginRight: 0,
            width: "100%",
            "&:hover": {
              backgroundColor: "#F8F9FA",
            },
          },
        },
      },
    },
  },
  favorites: {
    "&:hover": {
      backgroundColor: "#959595 !important",
      color: "white",
    },
  },
  listFavorites: {
    zIndex: -1,
    visibility: "hidden",
    backgroundColor: "white",
    borderRadius: ".25rem",
    right: 0,
    transform: "translate(153.5px, -76px)",
    position: "absolute",
    border: "1px solid rgb(227,227,227)",
    "& ul": {
      textAlign: "start",
      padding: "8px 0",
      width: "152px",
    },
    [theme.breakpoints.down("sm")]: {
      transform: "translate(117.5px, -76px)",
      "& ul": {
        width: "115px",
      },
    },
  },
}));
