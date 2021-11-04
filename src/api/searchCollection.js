import { no_poster } from "../assets";
import { API_KEY, API_URL, IMAGE_URL, POSTER_SIZE } from "./Config";
import API from "./axiosConfig";
export const searchCollection = async (query, page) => {
  try {
    const { data } = await API.get(`${API_URL}search/collection`, {
      params: {
        api_key: API_KEY,
        query,
        page,
      },
    });
    const modifiedData = {
      ...data,
      results: data.results.map((item) => ({
        ...item,
        poster_path: item.poster_path
          ? IMAGE_URL + POSTER_SIZE + item.poster_path
          : no_poster,
      })),
    };
    return modifiedData;
  } catch (e) {
    console.log(e);
  }
};
