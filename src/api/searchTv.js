import { no_poster } from "../assets";
import { API_KEY, API_URL, IMAGE_URL, POSTER_SIZE } from "./Config";
import API from "./axiosConfig";
export const searchTv = async (query, page) => {
  try {
    const { data } = await API.get(`${API_URL}search/tv`, {
      params: {
        api_key: API_KEY,
        query,
        page,
      },
    });
    const modifiedData = {
      ...data,
      results: data.results.map((tv) => ({
        ...tv,
        poster_path: tv.poster_path
          ? IMAGE_URL + POSTER_SIZE + tv.poster_path
          : no_poster,
      })),
    };
    return modifiedData;
  } catch (e) {
    console.log(e);
  }
};
