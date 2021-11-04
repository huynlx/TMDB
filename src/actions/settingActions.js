import axios from "axios";
import * as type from "./action";
import { BACKEND } from "../api/Config";

export const changePassword = (dt) => async (dispatch) => {
  dispatch({ type: type.CHANGE_PASSWORD_REQUEST });
  try {
    await axios.post(`${BACKEND}users/changePassword`, dt);
    dispatch({ type: type.CHANGE_PASSWORD_SUCCESS });
  } catch (err) {
    //status 400
    dispatch({ type: type.CHANGE_PASSWORD_FAILURE, error: err.response.data });
  }
};

export const changeProfile = (dt, dt2) => async (dispatch) => {
  dispatch({ type: type.CHANGE_PROFILE_REQUEST });
  try {
    await axios.post(`${BACKEND}users/changeProfile`, dt);
    dispatch({ type: type.CHANGE_PROFILE_SUCCESS });
    dispatch({ type: type.LOGIN_SUCCESS, user: dt2 });
  } catch (err) {
    //status 400
    dispatch({ type: type.CHANGE_PROFILE_FAILURE, error: err.response.data });
  }
};
