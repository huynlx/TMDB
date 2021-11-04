/* eslint-disable */
import BtnScrollToTop from "./BtnScrollToTop";
import { MuiThemeProvider } from "@material-ui/core";
import themeMUI from "./theme";
import "./css/App.css";
import Routes from "./routes/Routes";
import SwiperCore, { Scrollbar } from "swiper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkToken } from "./actions/userActions";
import Header from "./components/Header/Header";
import { fetchWatchList } from "./actions/watchlistActions";
import { fetchFavorites } from "./actions/favoriteActions";
SwiperCore.use([Scrollbar]); //for Swiper Scrollbar

const App = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.user);
  //check authentication khi f5
  useEffect(() => {
    if (isAuth) {
      dispatch(checkToken());
      dispatch(fetchWatchList());
      dispatch(fetchFavorites());
    }
  }, [dispatch, isAuth]);
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark" //return boolean
  ); //cái localStorage.getItem() chỉ chạy 1 lần, nếu ko dùng setIsDark thì state vẫn giữ nguyên !
  const toggleThemeChange = () => {
    if (isDark) {
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", "light");
      setIsDark(false);
      localStorage.setItem("theme", "light");
    } else {
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", "dark");
      setIsDark(true);
      localStorage.setItem("theme", "dark");
    }
  };
  useEffect(() => {
    document
      .getElementsByTagName("HTML")[0]
      .setAttribute("data-theme", localStorage.getItem("theme") || "light");
  }, []);

  return (
    <MuiThemeProvider theme={themeMUI}>
      {" "}
      {/* truyền cho tất cả component bên trong nó giống ThemeProvider của styled-component */}
      <Header toggleTheme={toggleThemeChange} />
      <main>
        <Routes />
        <BtnScrollToTop />
      </main>
    </MuiThemeProvider>
  );
};

export default App;
