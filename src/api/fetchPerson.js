import { API_KEY, API_URL, IMAGE_URL, POSTER_SIZE } from "./Config";
import { no_user } from "../assets";
import { no_poster } from "../assets";
import API from "./axiosConfig";
export const fetchPerson = async (id) => {
  try {
    const { data } = await API.get(`${API_URL}person/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "movie_credits,external_ids",
      },
    });

    const finalData = {
      ...data,
      profile_path: data.profile_path
        ? IMAGE_URL + POSTER_SIZE + data.profile_path
        : no_user,
      movie_credits: {
        cast: data.movie_credits.cast.map((item) => ({
          ...item,
          poster_path: item.poster_path
            ? IMAGE_URL + POSTER_SIZE + item.poster_path
            : no_poster,
          poster_popover: item.poster_path
            ? IMAGE_URL + POSTER_SIZE + item.poster_path
            : no_poster,
        })),
        crew: data.movie_credits.crew.map((item) => ({
          ...item,
          poster_path: item.poster_path
            ? IMAGE_URL + POSTER_SIZE + item.poster_path
            : no_poster,
          poster_popover: item.poster_path
            ? IMAGE_URL + POSTER_SIZE + item.poster_path
            : no_poster,
        })),
      },
      social_id: data.external_ids,
    };
    return finalData;
  } catch (e) {
    console.log(e);
  }
};
