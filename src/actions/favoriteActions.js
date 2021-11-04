import axios from "axios";
import { authHeader } from "./userActions";
import * as type from "./action";
import { BACKEND } from "../api/Config";

export const fetchFavorites = () => async (dispatch) => {
  dispatch({ type: type.GET_FAVORITE_REQUEST });
  try {
    const { data } = await axios.get(`${BACKEND}favorites`, {
      headers: authHeader(),
    });
    dispatch({
      type: type.GET_FAVORITE_SUCCESS,
      favoritelist: data.favoritelist,
    });
  } catch (err) {
    //status 400
    console.log(err);
  }
};
export const addMovie = (movie) => async (dispatch) => {
  dispatch({ type: type.ADD_TO_FAVORITE_REQUEST, id: movie.id });
  try {
    const { data } = await axios.post(
      `${BACKEND}favorites/add`,
      {
        movie, //lưu trong req.body trong backend
      },
      {
        headers: authHeader(), //phải ở dưới cùng
      }
    );
    dispatch({ type: type.ADD_TO_FAVORITE_SUCCESS, item: data });
  } catch (err) {
    //status 400
    console.log(err);
  }
};

export const removeMovie = (id) => async (dispatch) => {
  dispatch({ type: type.REMOVE_FROM_FAVORITE_REQUEST, id: id });
  try {
    const { data } = await axios.post(
      `${BACKEND}favorites/remove`,
      {
        id, //lưu trong req.body trong backend
      },
      {
        headers: authHeader(), //phải ở dưới cùng
      }
    );
    dispatch({ type: type.REMOVE_FROM_FAVORITE_SUCCESS, id: data.id });
  } catch (err) {
    //status 400
    console.log(err);
  }
};
