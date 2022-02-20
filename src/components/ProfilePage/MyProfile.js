import { Controller, useForm } from "react-hook-form";
import { TextField, Button, Box, CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useStyles } from "./Edit";
import ReactFirebaseFileUpload from "./Upload";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { theme2, theme3 } from "../LoginPage/LoginForm";
import { MuiThemeProvider } from "@material-ui/core";
import _ from "lodash";

const MyProfile = (props) => {
  const classes = useStyles();
  const childRef = useRef();
  const { handleSubmit, control, errors } = useForm();
  const { loading } = useSelector((state) => state.setting);
  const [loading2, setLoading2] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    if (!loading2) {
      childRef.current.handleUpload(data);
    }
  };
  const setLoad = (value) => {
    setLoading2(value);
  };
  const notify = _.debounce(
    () => toast.success("😎 Update Profile Successfully!", {
      theme: 'colored'
    }),
    900
  );
  return (
    <div>
      <h4 className="display-5 font-weight-bold">MY PROFILE</h4>
      <ReactFirebaseFileUpload
        ref={childRef}
        dispatch={dispatch}
        notify={notify}
        setLoad={setLoad}
      />
      <br />
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <MuiThemeProvider theme={props.theme === "dark" ? theme2 : theme3}>
          <Controller
            control={control}
            name="email"
            defaultValue={user.user.email}
            rules={{
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Email is invalid" },
            }}
            as={
              <TextField
                id="outlined-basic4"
                label="Email"
                variant="outlined"
                fullWidth
                size="small"
                error={!!errors.email} //viền đỏ báo lỗi
                helperText={
                  //hiển thị lỗi là gì
                  errors.email &&
                  (errors.email.type === "required"
                    ? "Please enter your email"
                    : errors.email.type === "pattern"
                      ? "Email is invalid"
                      : null)
                }
              />
            }
          />
        </MuiThemeProvider>
        <Box display="flex" className="justify-content-center mb-0 mt-3">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ fontWeight: "600", width: "200px" }}
          >
            {(loading || loading2) && (
              <CircularProgress className={classes.loader} />
            )}
            SAVE CHANGES
          </Button>
        </Box>
      </form>
      <ToastContainer />
    </div>
  );
};

export default MyProfile;
