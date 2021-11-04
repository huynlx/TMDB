import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
} from "../actions/action";

const InitialState = {
  isAuth: !!localStorage.getItem("token"), //!!=> chuyển đổi đối tượng thành boolean(0,null,undefined,false=>false,còn lại=>true)
  user: {},
  error: {},
  isLoading: false,
};
const user = (state = InitialState, payload) => {
  switch (payload.type) {
    //login
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: { user: { loginError: { user: false, password: false } } },
      };
    case LOGIN_SUCCESS:
      return {
        isLoading: false,
        error: { loginError: { user: false, password: false } },
        isAuth: true,
        user: payload.user,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: {
          user: payload.error,
          loginError: { user: false, password: false },
          cc: { signupError: { user: false, email: false } },
        },
        user: {},
      };
    case LOGOUT:
      return {
        isLoading: false,
        isAuth: false,
        error: {
          user: { loginError: { user: false } },
          loginError: { user: false, password: false },
          cc: { signupError: { user: false, email: false } },
        },
        user: {},
      };
    //signup
    case SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: { cc: { signupError: { user: false, email: false } } },
      };
    case SIGNUP_SUCCESS:
      return {
        isLoading: false,
        error: {
          user: { loginError: { user: false } },
          cc: { signupError: { user: false, email: false } },
          loginError: { user: false, password: false },
        },
        isAuth: false,
        user: payload.user,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: { user: { loginError: { user: false } }, cc: payload.error },
        user: {},
      };
    default:
      return state;
  }
};
export default user;
