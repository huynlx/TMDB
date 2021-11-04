import { API_KEY, API_URL } from "./Config";
import API from "./axiosConfig";
export const searchKeyword = async (query, page) => {
  try {
    const { data } = await API.get(`${API_URL}search/keyword`, {
      params: {
        api_key: API_KEY,
        query,
        page,
      },
    });
    const modifiedData = {
      ...data,
    };
    return modifiedData;
  } catch (e) {
    console.log(e);
  }
};
