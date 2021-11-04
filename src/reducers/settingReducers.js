import * as type from "../actions/action";

const settingInitialState = {
  loading: false,
  error: null,
};
const setting = (state = settingInitialState, payload) => {
  switch (payload.type) {
    case type.CHANGE_PASSWORD_REQUEST:
      return {
        loading: true,
        error: null,
      };
    case type.CHANGE_PASSWORD_SUCCESS:
      return {
        loading: false,
        error: null,
        success: true,
      };
    case type.CHANGE_PASSWORD_FAILURE:
      return {
        loading: false,
        error: payload.error,
      };
    case "DEFAULT":
      return {
        loading: false,
        error: null,
      };
    case type.CHANGE_PROFILE_REQUEST:
      return {
        loading: true,
        error: null,
      };
    case type.CHANGE_PROFILE_SUCCESS:
      return {
        loading: false,
        error: null,
        success2: true,
      };
    case type.CHANGE_PROFILE_FAILURE:
      return {
        loading: false,
        error: payload.error,
      };
    default:
      return state;
  }
};

export default setting;
