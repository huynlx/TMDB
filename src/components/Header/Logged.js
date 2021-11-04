import { Avatar, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { Link } from "react-router-dom";
import { OverlayTrigger, Popover } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  icon: {
    padding: "4px 10px",
    "& span": {
      "& div": {
        width: "33px",
        height: "33px",
      },
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0px",
    },
  },
  text: {
    fontWeight: 600,
  },
}));
const Logged = ({ username }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const classes = useStyles();
  const menu = {
    fontWeight: "600",
    fontSize: "0.9em",
    fontFamily: "var(--font)",
  };
  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>
        <MenuItem
          component={Link}
          onClick={() => document.body.click()}
          to="/profile"
        >
          <i
            style={{ fontSize: "18px" }}
            className="fa fa-user"
            aria-hidden="true"
          ></i>
          <span style={menu}>&nbsp;&nbsp;&nbsp;View profile</span>
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(logout());
          }}
        >
          <i
            style={{ fontSize: "18.5px" }}
            className="fa fa-sign-out"
            aria-hidden="true"
          ></i>
          <span style={menu}>&nbsp;&nbsp;Logout</span>
        </MenuItem>
      </Popover.Content>
    </Popover>
  );
  return (
    <OverlayTrigger
      rootClose
      trigger="click"
      placement="bottom"
      overlay={popover}
    >
      <IconButton className={classes.icon}>
        {user.user.avatar ? (
          <Avatar alt="avatar" src={user.user.avatar} />
        ) : (
          <Avatar className={"bg-danger"}>
            <Typography className="text-uppercase" color="initial">
              {user.user.username[0]}
            </Typography>
          </Avatar>
        )}
      </IconButton>
    </OverlayTrigger>
  );
};

export default memo(Logged);
