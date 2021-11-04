import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { memo } from "react";
const useStlyes = makeStyles((theme) => ({
  icon: {
    fontSize: 29,
    [theme.breakpoints.down("sm")]: {
      fontSize: 24,
    },
  },
}));
const SearchBtn = ({ open, handleClose, handleOpen }) => {
  const classes = useStlyes();
  return !open ? (
    <Link
      onClick={handleOpen}
      className="nav-link"
      id="search"
      to="#"
      style={{ width: "55.44px" }}
    >
      <SearchIcon className={classes.icon} style={{ color: "#01ABDA" }} />
    </Link>
  ) : (
    <Link
      onClick={handleClose}
      className="nav-link"
      id="search"
      to="#"
      style={{ width: "55.44px" }}
    >
      <CloseIcon className={classes.icon} />
    </Link>
  );
};

export default memo(SearchBtn);
