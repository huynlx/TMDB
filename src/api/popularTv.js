import { no_poster } from "../assets";
import { API_KEY, API_URL, IMAGE_URL, POSTER_SIZE } from "./Config";
import API from "./axiosConfig";
export const popularTv = async (query, page) => {
  try {
    const { data } = await API.get(`${API_URL}tv/popular`, {
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
      total_pages: 500,
    };
    return modifiedData;
  } catch (e) {
    console.log(e);
  }
};
