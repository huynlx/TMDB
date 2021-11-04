import "../css/_icon.scss";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  headerColor: {
    backgroundImage:
      "radial-gradient(at 30% top, #24343b 0%, rgba(3, 37, 65, 1) 70%)",
  },
}));
const BackgroundHeader = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.headerColor}>
      <div className="headerBackground">{children}</div>
    </div>
  );
};

export default BackgroundHeader;
