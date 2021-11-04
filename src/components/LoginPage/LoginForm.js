import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > *": {
      marginBottom: "20px",
    },
  },
}));
export const theme2 = createMuiTheme({
  palette: {
    type: "dark",
  },
});
export const theme3 = createMuiTheme({
  palette: {
    type: "light",
  },
});

const LoginForm = () => {
  const theme = document
    .getElementsByTagName("HTML")[0]
    .getAttribute("data-theme");
  const dispatch = useDispatch();
  const { error, isLoading } = useSelector((state) => state.user);
  const { handleSubmit, control, errors } = useForm();
  const classes = useStyles();
  const onSubmit = (data) => {
    data.username = data.username.toLowerCase();
    dispatch(login(data));
  };
  return (
    <form className={classes.root} noValidate onSubmit={handleSubmit(onSubmit)}>
      <MuiThemeProvider theme={theme === "dark" ? theme2 : theme3}>
        <Controller
          control={control}
          name="username"
          defaultValue=""
          rules={{ required: { value: true, message: "Username is required" } }}
          as={
            <TextField
              autoFocus
              id="outlined-basic"
              label="Username"
              variant="outlined"
              fullWidth
              size="small"
              error={!!errors.username || !!error.user.loginError.user}
              helperText={
                errors.username
                  ? errors.username.type === "required"
                    ? errors.username.message
                    : null
                  : error.user.loginError.user
                  ? error.user.loginError.user
                  : null
              }
            />
          }
        ></Controller>
        <Controller
          defaultValue=""
          control={control}
          name="password"
          rules={{ required: { value: true, message: "Password is required" } }}
          as={
            <TextField
              type="password"
              id="outlined-basic2"
              label="Password"
              variant="outlined"
              fullWidth
              size="small"
              error={!!errors.password || !!error.user.loginError.password}
              helperText={
                errors.password && errors.password.type === "required"
                  ? errors.password.message
                  : error.user.loginError.password
                  ? error.user.loginError.password
                  : null
              }
            />
          }
        ></Controller>
      </MuiThemeProvider>
      <Box display="flex">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ fontWeight: "600" }}
        >
          Login
        </Button>
        <Button
          component={Link}
          to="/"
          color={theme === "dark" ? "secondary" : "primary"}
        >
          Cancel
        </Button>
        {isLoading && (
          <CircularProgress
            color={theme === "dark" ? "secondary" : "primary"}
            style={{ width: "35px", height: "35px" }}
          />
        )}
      </Box>
    </form>
  );
};

export default LoginForm;
