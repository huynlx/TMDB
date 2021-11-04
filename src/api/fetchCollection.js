import {
  API_KEY,
  API_URL,
  IMAGE_URL,
  POSTER_SIZE,
  BACKDROP_SIZE,
} from "./Config";
import { no_image } from "../assets";
import { no_poster } from "../assets";
import API from "./axiosConfig";
export const fetchCollection = async (id) => {
  try {
    const { data } = await API.get(`${API_URL}collection/${id}`, {
      params: {
        api_key: API_KEY,
      },
    });
    const checkData = {
      ...data,
      poster_path: data.poster_path
        ? IMAGE_URL + POSTER_SIZE + data.poster_path
        : no_poster,
      backdrop_path: data.backdrop_path
        ? IMAGE_URL + BACKDROP_SIZE + data.backdrop_path
        : no_image,
      parts: data.parts.map((item) => ({
        ...item,
        poster_path: item.poster_path
          ? IMAGE_URL + POSTER_SIZE + item.poster_path
          : no_poster,
      })),
      vote_average: data.parts.reduce(
        (acc, cur) => acc + cur.vote_average / data.parts.length,
        0
      ),
    };
    return checkData;
  } catch (e) {
    console.log(e);
  }
};
