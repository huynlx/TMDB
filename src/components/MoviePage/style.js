import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  styledDoughnut: {
    paddingRight: "0 !important",
  },
  icon: {
    color: "white",
    fontSize: "16px",
  },
  fab: {
    boxShadow: "none",
    width: "46px",
    height: "46px",
    [theme.breakpoints.down("sm")]: {
      width: "38px",
      height: "38px",
    },
    backgroundColor: "#032541",
    "&:hover": {
      backgroundColor: "#032541",
    },
  },
  tooltip: {
    marginRight: "20px",
  },
  play: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: "1",
    transition: "0.2s",
    "&:hover": {
      opacity: "0.6",
    },
  },
  fabProgress: {
    position: "absolute",
    left: "0px",
    color: "#90caf9",
    top: "-0.7px",
  },
  wrapper: {
    position: "relative",
  },
}));

export const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: "#032541 !important",
  },
  tooltip: {
    backgroundColor: "#032541 !important",
  },
}));
