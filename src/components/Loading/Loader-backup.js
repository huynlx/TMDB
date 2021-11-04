import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
}));

const Loader = () => {
  const classes = useStyles();
  const root = document
    .getElementsByTagName("HTML")[0]
    .getAttribute("data-theme");
  return (
    <div className={classes.root}>
      <CircularProgress color={root === "dark" ? "secondary" : "primary"} />
    </div>
  );
};

export default Loader;
