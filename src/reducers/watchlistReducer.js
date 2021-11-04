import * as type from "../actions/action";

const watchlistInitialState = {
  watchlist: [],
  isLoading: false,
  isAdding: false,
  isRemoving: null,
};
const watchlist = (state = watchlistInitialState, action) => {
  switch (action.type) {
    //get
    case type.GET_WATCHLIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case type.GET_WATCHLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        watchlist: action.watchlist,
      };
    case type.GET_WATCHLIST_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    //add
    case type.ADD_TO_WATCHLIST_REQUEST:
      return {
        ...state,
        isAdding: true,
      };
    case type.ADD_TO_WATCHLIST_SUCCESS:
      return {
        ...state,
        isAdding: false,
        watchlist: [action.item, ...state.watchlist],
      };
    case type.ADD_TO_WATCHLIST_FAILURE:
      return {
        ...state,
        isAdding: false,
      };
    //remove
    case type.REMOVE_FROM_WATCHLIST_REQUEST:
      return {
        ...state,
        isRemoving: action.id,
      };
    case type.REMOVE_FROM_WATCHLIST_SUCCESS:
      return {
        ...state,
        isRemoving: null,
        watchlist: state.watchlist.filter((movie) => movie.id !== action.id), //lọc ra các phim còn lại
      };
    case type.REMOVE_FROM_WATCHLIST_FAILURE:
      return {
        ...state,
        isRemoving: null,
      };
    default:
      return state;
  }
};

export default watchlist;
