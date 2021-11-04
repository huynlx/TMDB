import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGOUT,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_REQUEST,
} from "./action";
import { BACKEND } from "../api/Config";

export const authHeader = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
};

export const signUp = (newUser) => async (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });
  try {
    const { data } = await axios.post(`${BACKEND}users/signup`, newUser);
    // localStorage.setItem("token", JSON.stringify(data.token));
    console.log(data);
    dispatch({ type: SIGNUP_SUCCESS, user: data });
  } catch (err) {
    //status 400
    dispatch({
      type: SIGNUP_FAILURE,
      error: { signupError: err.response.data },
    });
  }
};

export const login = (User) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(`${BACKEND}users/login`, User);
    localStorage.setItem("token", JSON.stringify(data.token));
    dispatch({ type: LOGIN_SUCCESS, user: data });
  } catch (err) {
    dispatch({ type: LOGIN_FAILURE, error: { loginError: err.response.data } });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT });
};

export const checkToken = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BACKEND}users/profile`, {
      headers: authHeader(),
    });
    dispatch({ type: LOGIN_SUCCESS, user: data });
  } catch (err) {
    //ko có token hoặc token ko hợp lệ
    dispatch({ type: LOGOUT });
  }
};
