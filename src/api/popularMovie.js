import { no_poster } from "../assets";
import { API_KEY, API_URL, IMAGE_URL, POSTER_SIZE } from "./Config";
import API from "./axiosConfig";

export const popularMovie = async (query, page) => {
  try {
    const { data } = await API.get(`${API_URL}movie/popular`, {
      params: {
        api_key: API_KEY,
        query,
        page,
      },
    });
    const modifiedData = {
      ...data,
      results: data.results.map((movie) => ({
        ...movie,
        poster_path: movie.poster_path
          ? IMAGE_URL + POSTER_SIZE + movie.poster_path
          : no_poster,
      })),
      total_pages: 500,
    };
    return modifiedData;
  } catch (e) {
    console.log(e);
  }
};
