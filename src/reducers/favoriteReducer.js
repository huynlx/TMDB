import * as type from "../actions/action";

const favoriteInitialState = {
  favoritelist: [],
  isLoading2: false,
  isAdding2: null,
  isRemoving2: null,
};
const favorite = (state = favoriteInitialState, action) => {
  switch (action.type) {
    //get
    case type.GET_FAVORITE_REQUEST:
      return {
        ...state,
        isLoading2: true,
      };
    case type.GET_FAVORITE_SUCCESS:
      return {
        ...state,
        isLoading2: false,
        favoritelist: action.favoritelist,
      };
    case type.GET_FAVORITE_FAILURE:
      return {
        ...state,
        isLoading2: false,
      };
    //add
    case type.ADD_TO_FAVORITE_REQUEST:
      return {
        ...state,
        isAdding2: action.id,
      };
    case type.ADD_TO_FAVORITE_SUCCESS:
      return {
        ...state,
        isAdding2: null,
        favoritelist: [action.item, ...state.favoritelist],
      };
    case type.ADD_TO_FAVORITE_FAILURE:
      return {
        ...state,
        isAdding2: null,
      };
    //remove
    case type.REMOVE_FROM_FAVORITE_REQUEST:
      return {
        ...state,
        isRemoving2: action.id,
      };
    case type.REMOVE_FROM_FAVORITE_SUCCESS:
      return {
        ...state,
        isRemoving2: null,
        favoritelist: state.favoritelist.filter(
          (movie) => movie.id !== action.id
        ), //lọc ra các phim còn lại
      };
    case type.REMOVE_FROM_FAVORITE_FAILURE:
      return {
        ...state,
        isRemoving2: null,
      };
    default:
      return state;
  }
};

export default favorite;
