import { API_KEY, API_URL, IMAGE_URL, POSTER_SIZE } from "./Config";
import { no_poster } from "../assets";
import API from "./axiosConfig";
export const fetchByGenres = async (id, type, page) => {
    try {
        const { data } = await API.get(`${API_URL}discover/${type}`, {
            // https://api.themoviedb.org/3/discover/tv?api_key=XYZ&with_genres=id
            params: {
                api_key: API_KEY,
                with_genres: id,
                page,
            }
        });
        const checkData = {
            movies: {
                ...data,
                results: data.results.map((item) => ({
                    ...item,
                    poster_path: item.poster_path
                        ? IMAGE_URL + POSTER_SIZE + item.poster_path
                        : no_poster,
                })),
            }
        };
        return checkData;
    } catch (e) {
        console.log(e);
    }
};