import { makeStyles } from "@material-ui/core/styles";
import "../../css/_icon.scss";
import { respondTo } from "../../helpers/_respondTo";
import { MuiThemeProvider } from "@material-ui/core";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../actions/userActions";
import { theme2, theme3 } from "../LoginPage/LoginForm";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  useMediaQuery,
} from "@material-ui/core";
import { memo } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > *": {
      marginBottom: "20px",
      "&:first-child": {
        marginTop: "10px",
      },
    },
  },
}));
const Div = styled.div`
  @media ${respondTo.md} {
    padding: 0px 20px 0px;
    div {
      p {
        margin: 0;
      }
    }
  }
`;
const ColRight = ({ theme }) => {
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const { error, isLoading, user } = useSelector((state) => state.user);
  const { watch, handleSubmit, control, errors } = useForm();
  const classes = useStyles();
  const onSubmit = (data) => {
    data.username = data.username.toLowerCase();
    dispatch(signUp(data));
  };
  return (
    <Div>
      <div>
        <h4 style={{ fontWeight: "700" }}>Sign up for an account</h4>
        <p>
          Signing up for an account is free and easy. Fill out the form below to
          get started. JavaScript is required to to continue.
        </p>
      </div>
      {Object.keys(errors).length ||
      error.cc.signupError.user !== false ||
      error.cc.signupError.email !== false ? (
        <div
          style={{
            margin: "30px 0px 30px",
            overflow: "hidden",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgb(0 0 0 / 10%)",
            border:
              theme === "dark" ? "none" : "1px solid rgba(227,227,227, 1)",
            borderTop: "none",
            background: theme === "dark" && "#313131",
          }}
        >
          <div
            style={{ padding: "20px", background: "#D40242" }}
            className="d-flex align-items-center"
          >
            <span className="circleAlert_icon d-inline-flex"></span>
            <span
              className="m-0 text-white"
              style={{
                fontSize: matches ? "16px" : "19.2px",
                fontWeight: "600",
              }}
            >
              &nbsp; There was an error processing your signup
            </span>
          </div>
          <div className="errors" style={{ padding: "20px" }}>
            <ul className="mb-0" style={{ marginLeft: "20px" }}>
              {Object.entries(errors).map(
                //ES8
                ([key, value]) => {
                  return <li key={key}>{value.message}</li>;
                }
              )}
              {error.cc.signupError.user || error.cc.signupError.email
                ? Object.entries(error.cc.signupError).map(
                    //ES8
                    ([key, value]) => {
                      return <li key={key}>{value}</li>;
                    }
                  )
                : null}
            </ul>
          </div>
        </div>
      ) : null}
      {user === "Successful Registration!" ? (
        Object.keys(user).length ? (
          <div className="alert alert-success" style={{ fontSize: "19.2px" }}>
            <strong>Success Registration!</strong> You are now registered and
            can log in.
          </div>
        ) : null
      ) : null}
      <form
        className={classes.root}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <MuiThemeProvider theme={theme === "dark" ? theme2 : theme3}>
          <Controller
            control={control}
            name="username"
            defaultValue=""
            rules={{
              required: "Username is required",
              minLength: {
                value: 6,
                message: "Username needs to be at least 6 characters long",
              },
            }}
            as={
              <TextField
                autoComplete="new-password"
                autoFocus
                id="outlined-basic1"
                label="Username"
                variant="outlined"
                fullWidth
                size="small"
                error={
                  !!errors.username ||
                  error.cc.signupError.user ===
                    "Username has already been taken"
                }
                helperText={
                  errors.username
                    ? errors.username.type === "required"
                      ? "Please enter your username"
                      : errors.username.type === "minLength"
                      ? "Username must be at least 6 characters"
                      : null
                    : error.cc.signupError.user ===
                        "Username has already been taken" &&
                      error.cc.signupError.user
                }
              />
            }
          />
          <Controller
            control={control}
            name="password"
            defaultValue=""
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password needs to be at least 6 characters long",
              },
            }}
            as={
              <TextField
                autoComplete="new-password"
                id="outlined-basic2"
                type="password"
                label="Password (6 characters minimum)"
                variant="outlined"
                fullWidth
                size="small"
                error={!!errors.password}
                helperText={
                  errors.password &&
                  (errors.password.type === "required"
                    ? "Please enter your password"
                    : errors.password.type === "minLength"
                    ? "Password must be at least 6 characters"
                    : null)
                }
              />
            }
          />
          <Controller
            control={control}
            name="password2"
            defaultValue=""
            rules={{
              required: "Password confirm can't be blank",
              validate: (value) =>
                value === watch("password") ||
                "Password and password confirmation do not match",
            }}
            as={
              <TextField
                autoComplete="new-password"
                id="outlined-basic3"
                type="password"
                label="Password Confirm"
                variant="outlined"
                fullWidth
                size="small"
                error={!!errors.password2}
                helperText={
                  errors.password2 &&
                  (errors.password2.type === "required"
                    ? "Please enter your password confirmation"
                    : errors.password2.type === "validate"
                    ? errors.password2.message
                    : null)
                }
              />
            }
          />
          <Controller
            control={control}
            name="email"
            defaultValue=""
            rules={{
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Email is invalid" },
            }}
            as={
              <TextField
                autoComplete="new-password"
                id="outlined-basic4"
                label="Email"
                variant="outlined"
                fullWidth
                size="small"
                error={
                  !!errors.email ||
                  error.cc.signupError.email === "Email has already been taken"
                } //viền đỏ báo lỗi
                helperText={
                  //hiển thị lỗi là gì
                  errors.email
                    ? errors.email.type === "required"
                      ? "Please enter your email"
                      : errors.email.type === "pattern"
                      ? "Email is invalid"
                      : null
                    : error.cc.signupError.email ===
                        "Email has already been taken" &&
                      error.cc.signupError.email
                }
              />
            }
          />
        </MuiThemeProvider>
        <p>
          By clicking the "Sign up" button below, I certify that I have read and
          agree to the TMDb terms of use and privacy policy.
        </p>
        <Box display="flex">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ fontWeight: "600" }}
          >
            Sign Up
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
            />
          )}
        </Box>
      </form>
    </Div>
  );
};

export default memo(ColRight);
