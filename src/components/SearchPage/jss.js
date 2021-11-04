import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTypography-root": {
      fontFamily: "var(--font) !important",
    },
    "& .MuiBox-root": {
      "& .MuiTypography-root": {
        fontWeight: "600",
      },
    },
    "& .MuiTab-textColorInherit": {
      opacity: 1,
    },
    "&.MuiPaper-root": {
      background: "none",
    },
    "& .MuiTabs-root": {
      "& .MuiTabScrollButton-root": {
        color: (props) => (props.darkmode === "dark" ? "white" : "black"),
      },
    },
  },
  tab: (props) => ({
    background: props.darkmode === "dark" ? "#111111" : "white",
    padding: "24px 12px",
    marginRight: 0,
    color: props.darkmode === "dark" ? "white" : "black",
    "&.Mui-selected": {
      color: props.darkmode === "dark" ? "white" : "black",
      background: props.darkmode === "dark" ? "#272C34" : "#E0E0E0",
      "& $span": {
        background: props.darkmode === "dark" ? "black" : "white",
      },
    },
    [theme.breakpoints.down("sm")]: {
      padding: 12,
    },
    "&:hover": {
      color: props.darkmode === "dark" ? "white" : "black",
      background: props.darkmode === "dark" ? "#272C34" : "#E0E0E0",
      "& $span": {
        background: props.darkmode === "dark" ? "black" : "white",
      },
    },
  }),
  label: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingLeft: 4,
    paddingRight: 4,
    fontWeight: "inherit",
  },
  span: {
    padding: "0 10px",
    background: (props) => (props.darkmode === "dark" ? "black" : "#E0E0E0"),
    borderRadius: 10,
    marginLeft: theme.spacing(1),
    opacity: 0.7,
  },
}));
