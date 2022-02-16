import axios from "axios";
import {
  API_KEY,
  API_URL,
  IMAGE_URL,
  BACKDROP_SIZE,
  VIDEO_URL,
  POSTER_SIZE,
} from "./Config";
import { no_image } from "../assets";
import { no_user } from "../assets";
import { no_poster } from "../assets";
import API from "./axiosConfig";

export const fetchMovie = async (id) => {
  var requestEN = {
    params: {
      api_key: API_KEY,
      append_to_response:
        "credits,videos,recommendations,keywords,images,release_dates,similar",
      // language: 'vi'
    },
  };
  // var requestVI = {
  //     params: {
  //         api_key: API_KEY,
  //         language: 'vi',
  //         append_to_response: "videos"
  //     },
  // }
  const list = [];
  const populateData = (data) => {
    list.push(data);
  };
  await axios
    .all([
      API.get(`${API_URL}movie/${id}`, requestEN),
      // API.get(`${API_URL}movie/${id}`, requestVI)
    ])
    .then(
      axios.spread((obj1, obj2) => {
        populateData(obj1.data);
        // populateData(obj2.data);
      })
    );
  const data = list[0]; //English data
  // const dataAlt = list[1]; //Vietnamese data
  const checkData = {
    ...data,
    title: data.title,
    titleEN: data.title,
    genres: data.genres,
    media_type: "movie",
    poster_path: data.poster_path
      ? IMAGE_URL + POSTER_SIZE + data.poster_path
      : no_poster,
    backdrop_path: data.backdrop_path
      ? IMAGE_URL + BACKDROP_SIZE + data.backdrop_path
      : no_image,
    iso_3166_1:
      data.production_countries.length !== 0
        ? data.production_countries[0].iso_3166_1
        : "",
    tagline: data.tagline,
    overview: data.overview,
    credits: {
      crew: data.credits.crew.slice(0, 9).map((value, key) => ({
        ...value,
        profile_path: value.profile_path
          ? IMAGE_URL + POSTER_SIZE + value.profile_path
          : no_user,
      })),
      cast: data.credits.cast.slice(0, 9).map((value, key) => ({
        ...value,
        profile_path: value.profile_path
          ? IMAGE_URL + POSTER_SIZE + value.profile_path
          : no_user,
      })),
    },
    videos:
      data.videos.results.length !== 0
        ? data.videos.results.map((item, key) => ({
          ...item,
          url: VIDEO_URL + item.key,
        }))
        : // url: VIDEO_URL + data.videos.results[0].key
        [],
    recommendations: data.recommendations.results
      ? data.recommendations.results.slice(0, 8).map((value, key) => ({
        ...value,
        backdrop_path: value.backdrop_path
          ? IMAGE_URL + BACKDROP_SIZE + value.backdrop_path
          : no_image,
        poster_path: value.poster_path
          ? IMAGE_URL + POSTER_SIZE + value.poster_path
          : no_poster,
      }))
      : "We don't have enough data to suggest any movies based on Santana. You can help by rating movies you've seen.",
    keywords: data.keywords.keywords
      ? data.keywords.keywords.map((value, key) => ({ ...value }))
      : "No keywords have been added.",
    images: {
      backdrop_path: data.images.backdrops
        ? data.images.backdrops.map((value, key) => ({
          ...value,
          url_original: IMAGE_URL + "w500_and_h282_face" + value.file_path,
          url: IMAGE_URL + "w533_and_h300_bestv2" + value.file_path,
        }))
        : "This backdrops is unavailable",
      poster_path: data.images.posters
        ? data.images.posters.map((value, key) => ({
          ...value,
          url_original: IMAGE_URL + "w220_and_h330_face" + value.file_path,
          url: IMAGE_URL + "w220_and_h330_face" + value.file_path,
        }))
        : "This posters is unavailable",
    },
    certifications: data.release_dates.results.filter((item) => {
      var x =
        data.production_countries.length !== 0
          ? data.production_countries[0].iso_3166_1
          : "";
      return item.iso_3166_1 === x;
    }),
    similar: {
      ...data.similar,
      results: data.similar.results.map(value => (
        {
          ...value,
          poster_path: value.poster_path
            ? IMAGE_URL + POSTER_SIZE + value.poster_path
            : no_poster
        }
      ))
    }
  };
  return checkData;
};
