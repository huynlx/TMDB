//api of TMDB
export const API_URL = "https://api.themoviedb.org/3/";
export const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

// Images
//https://www.themoviedb.org/t/p/ or https://image.tmdb.org/t/p/
export const IMAGE_URL = "https://image.tmdb.org/t/p/";
export const BACKDROP_SIZE = "w1280";
export const POSTER_SIZE = "w500";
export const VIDEO_URL = "https://www.youtube.com/embed/";

//api of YoutubeV3
export const API_YOUTUBE_URL = "https://www.googleapis.com/youtube/v3/videos";
export const API_YOUTUBE_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
export const RUNTIME = "contentDetails";
export const INFO = "id,+snippet";

//api of backend
export const BACKEND = "https://tmdb-huynh-backend.herokuapp.com/"; //host
