import { TextField, Button, Box, CircularProgress } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { changePassword } from "../../actions/settingActions";
import { useDispatch, useSelector } from "react-redux";
import { theme2, theme3 } from "../LoginPage/LoginForm";
import { MuiThemeProvider } from "@material-ui/core";
import { useEffect } from "react";
import MyProfile from "./MyProfile";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > *": {
      marginBottom: "15px",
    },
  },
  loader: {
    marginRight: theme.spacing(1),
    color: "white",
    width: "22px !important",
    height: "22px !important",
    position: "absolute",
    left: "7%",
  },
}));
const Edit = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.setting);
  const { user } = useSelector((state) => state.user);
  const { watch, handleSubmit, control, errors } = useForm();
  const { type } = { ...props };
  const onSubmit = (data) => {
    data.username = user.user.username;
    dispatch(changePassword(data));
  };
  useEffect(() => {
    dispatch({ type: "DEFAULT" });
  }, [dispatch]);
  return (
    <>
      {type === "profile" ? (
        <MyProfile {...props} />
      ) : (
        <>
          <h4 className="display-5 font-weight-bold">CHANGE MY PASSWORD</h4>
          {success && (
            <div className="alert alert-success" style={{ fontSize: "19.2px" }}>
              <strong>You have been successfully changed password !</strong>
            </div>
          )}
          <form
            className={classes.root}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <MuiThemeProvider theme={props.theme === "dark" ? theme2 : theme3}>
              <Controller
                control={control}
                name="oldPassword"
                defaultValue=""
                rules={{
                  required: { value: true, message: "This field is required" },
                }}
                as={
                  <TextField
                    autoComplete="con cac"
                    type="password"
                    id="outlined-basic1"
                    label="Old Password"
                    variant="outlined"
                    fullWidth
                    size="small"
                    error={!!errors.oldPassword || error}
                    helperText={
                      errors.oldPassword ? errors.oldPassword.message : error
                    }
                  />
                }
              ></Controller>
              <Controller
                control={control}
                name="newPassword"
                defaultValue=""
                rules={{
                  required: { value: true, message: "This field is required" },
                  minLength: {
                    value: 6,
                    message: "This field min 6 characters",
                  },
                }}
                as={
                  <TextField
                    autoComplete="off"
                    type="password"
                    id="outlined-basic2"
                    label="New Password"
                    variant="outlined"
                    fullWidth
                    size="small"
                    error={!!errors.newPassword}
                    helperText={
                      errors.newPassword && errors.newPassword.message
                    }
                  />
                }
              ></Controller>
              <Controller
                control={control}
                name="confirmPassword"
                defaultValue=""
                rules={{
                  required: { value: true, message: "This field is required" },
                  validate: (value) =>
                    value === watch("newPassword") ||
                    "Both password need to be the same",
                }}
                as={
                  <TextField
                    autoComplete="off"
                    type="password"
                    id="outlined-basic3"
                    label="New password confirmation"
                    variant="outlined"
                    fullWidth
                    size="small"
                    error={!!errors.confirmPassword}
                    helperText={
                      errors.confirmPassword && errors.confirmPassword.message
                    }
                  />
                }
              ></Controller>
            </MuiThemeProvider>
            <Box display="flex" className="justify-content-center mb-0 mt-2">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ fontWeight: "600", width: "200px" }}
              >
                {loading && <CircularProgress className={classes.loader} />}
                SAVE CHANGES
              </Button>
            </Box>
          </form>
        </>
      )}
    </>
  );
};

export default Edit;
