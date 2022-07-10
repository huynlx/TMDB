// import { API_KEY, API_URL, IMAGE_URL, POSTER_SIZE } from "./Config";
// import { no_poster } from "../assets";
// import API from "./axiosConfig";
// export const fetchKeyword = async (id, page) => {
//   try {
//     const { data } = await API.get(`${API_URL}keyword/${id}`, {
//       params: {
//         api_key: API_KEY,
//         append_to_response: "movies",
//         page,
//       },
//     });
//     const checkData = {
//       ...data,
//       movies: {
//         ...data.movies,
//         results: data.movies.results.map((item) => ({
//           ...item,
//           poster_path: item.poster_path
//             ? IMAGE_URL + POSTER_SIZE + item.poster_path
//             : no_poster,
//         })),
//       },
//     };
//     return checkData;
//   } catch (e) {
//     console.log(e);
//   }
// };

import { API_KEY, API_URL, IMAGE_URL, POSTER_SIZE } from "./Config";
import { no_poster } from "../assets";
import API from "./axiosConfig";
export const fetchKeyword = async (id, type, page) => {
  try {
    const { data } = await API.get(`${API_URL}discover/${type}`, {
      // https://api.themoviedb.org/3/discover/tv?api_key=2bcc10a90f7e9e82823432df39ff399d&with_keywords=6270
      params: {
        api_key: API_KEY,
        with_keywords: id,
        page,
      },
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
      },
      name: await fetchNameKeyword(id),
    };
    return checkData;
  } catch (e) {
    console.log(e);
  }
};

const fetchNameKeyword = async (id) => {
  return (
    await API.get(`${API_URL}keyword/${id}`, {
      params: {
        api_key: API_KEY,
      },
    })
  ).data.name;
};
