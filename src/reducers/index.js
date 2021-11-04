import { combineReducers } from "redux";
import trailer from "./trailerReducer";
import color from "./colorReducer";
import videos from "./videosReducer";
import images from "./imagesReducer";
import user from "./userReducer";
import watchlist from "./watchlistReducer";
import favorite from "./favoriteReducer";
import setting from "./settingReducers";

var rootReducer = combineReducers({
  trailer,
  color,
  videos,
  images,
  user,
  watchlist,
  favorite,
  setting,
});
export default rootReducer;
