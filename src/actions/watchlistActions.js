import axios from "axios";
import { authHeader } from "./userActions";
import * as type from "./action";
import { BACKEND } from "../api/Config";

export const fetchWatchList = () => async (dispatch) => {
  dispatch({ type: type.GET_WATCHLIST_REQUEST });
  try {
    const { data } = await axios.get(`${BACKEND}watchlist`, {
      headers: authHeader(),
    });
    dispatch({ type: type.GET_WATCHLIST_SUCCESS, watchlist: data.watchlist });
  } catch (err) {
    //status 400
    console.log(err);
  }
};
export const addMovie = (movie) => async (dispatch) => {
  dispatch({ type: type.ADD_TO_WATCHLIST_REQUEST });
  try {
    const { data } = await axios.post(
      `${BACKEND}watchlist/add`,
      {
        movie, //lưu trong req.body trong backend
      },
      {
        headers: authHeader(), //phải ở dưới cùng
      }
    );
    dispatch({ type: type.ADD_TO_WATCHLIST_SUCCESS, item: data });
  } catch (err) {
    //status 400
    console.log(err);
  }
};

export const removeMovie = (id) => async (dispatch) => {
  dispatch({ type: type.REMOVE_FROM_WATCHLIST_REQUEST, id: id });
  try {
    const { data } = await axios.post(
      `${BACKEND}watchlist/remove`,
      {
        id, //lưu trong req.body trong backend
      },
      {
        headers: authHeader(), //phải ở dưới cùng
      }
    );
    dispatch({ type: type.REMOVE_FROM_WATCHLIST_SUCCESS, id: data.id });
  } catch (err) {
    //status 400
    console.log(err);
  }
};
