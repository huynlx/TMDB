import IconButton from "@material-ui/core/IconButton";
import { Avatar, Typography } from "@material-ui/core";
import { DateTime } from "luxon";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  icon: {
    padding: 0,
    "& span": {
      "& div": {
        width: "150px",
        height: "150px",
        [theme.breakpoints.down("sm")]: {
          width: "100px",
          height: "100px",
        },
      },
    },
  },
  container: {
    display: "flex",
  },
  text: {
    fontWeight: 500,
    opacity: 0.7,
    fontSize: "1.1em",
  },
}));
const Header = () => {
  const classes = useStyles();
  const { user } = useSelector((state) => state.user);
  return (
    <div
      className={"container " + classes.container}
      style={{ padding: "30px" }}
    >
      <IconButton className={classes.icon}>
        {user.user.avatar ? (
          <Avatar alt="avatar" src={user.user.avatar} />
        ) : (
          <Avatar className={"bg-danger"}>
            <Typography className="text-uppercase" variant="h1" color="initial">
              {user.user.username[0]}
            </Typography>
          </Avatar>
        )}
      </IconButton>
      <div
        className="text-white d-flex flex-column justify-content-center"
        style={{ paddingLeft: "30px" }}
      >
        <p className="m-0 font-weight-bold" style={{ fontSize: "32px" }}>
          {user.user.username}
        </p>
        <p className={classes.text}>
          Member since{" "}
          {DateTime.fromISO(user.user.createdAt).toFormat("MMMM yyyy")}
        </p>
      </div>
    </div>
  );
};

export default Header;
