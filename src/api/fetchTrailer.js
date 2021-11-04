import { API_KEY, API_URL, BACKDROP_SIZE, IMAGE_URL } from "./Config";
import { no_image } from "../assets";
import API from "./axiosConfig";
export const fetchTrailer = async (type, media_type) => {
  try {
    const test = [];
    await API.get(`${API_URL}${media_type}/${type}`, {
      params: {
        api_key: API_KEY,
        page: 1,
      },
    }).then(async (res) => {
      //data lấy đúng rồi mà đéo hiểu thằng map() nó cứ sai sai
      await Promise.all(
        res.data.results.map(
          //fix return promise pending
          async (item) => {
            await fetchTrailerKey(media_type, item.id).then((res) => {
              test.push({
                ...item,
                backdrop_path: item.backdrop_path
                  ? IMAGE_URL + BACKDROP_SIZE + item.backdrop_path
                  : no_image,
                background: item.backdrop_path
                  ? IMAGE_URL +
                    "w1920_and_h427_multi_faces" +
                    item.backdrop_path
                  : null,
                trailer: res.results,
                title: media_type === "movie" ? item.title : item.name,
              });
            });
          }
        )
      );
      return test;
    });
    return test;
  } catch (e) {
    console.log(e);
  }
};

export const fetchTrailerKey = async (media_type, id) => {
  try {
    const { data } = await API.get(`${API_URL}${media_type}/${id}/videos`, {
      params: {
        api_key: API_KEY,
      },
    });
    const lastData = {
      results: data.results.length
        ? data.results[1]
          ? data.results[1]
          : data.results[0]
        : { key: "đéo có key" },
    };
    return lastData;
  } catch (e) {
    console.log(e);
  }
};
