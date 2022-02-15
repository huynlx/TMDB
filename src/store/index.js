import { createStore, applyMiddleware } from "redux";
import throttle from "lodash/throttle";
import rootReducer from "./../reducers";
import thunk from "redux-thunk";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("stateRedux");
    if (serializedState === null) {
      return undefined;
    }
    const reduxStore = JSON.parse(serializedState);
    const reduxStoreFinal = {
      ...reduxStore,
      user: {
        ...reduxStore.user,
        error: {
          user: { loginError: { user: false } },
          cc: { signupError: { user: false, email: false } },
          loginError: { user: false, password: false },
        },
      },
      watchlist: { isAdding: false, watchlist: [] },
      favorite: { isAdding2: false, favoritelist: [] },
      setting: { loading: false, error: null },
    };
    return reduxStoreFinal;
  } catch (e) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("stateRedux", serializedState);
  } catch (e) {
    // Ignore write errors;
  }
};

const peristedState = loadState();

const store = createStore(
  rootReducer,
  peristedState, // => thằng peristedState phải ở dưới reducer, ở trên reducer là lỗi ngay => vì khi f5 thì sẽ reset state nên chạy cái này để lấy dữ liệu từ localstorage cho lại vào state 
  applyMiddleware(thunk) // => thằng lồn này phải ở cuối cùng
);

store.subscribe(
  throttle(() => {
    saveState(store.getState()); //thay đổi dữ liệu trên redux phát là chạy hàm subscribe này => lưu vào localStorage
  }, 1000)
);

export default store;
