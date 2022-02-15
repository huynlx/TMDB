import chuyenDoiUrl from "./../../helpers/urlSlug";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import { Link } from "react-router-dom";
import moment from "moment";
import { useStyles } from "../CreditDetails/Recommendations";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { addMovie, removeMovie } from "../../actions/watchlistActions";
import {
  addMovie as addMovie2,
  removeMovie as removeMovie2,
} from "../../actions/favoriteActions";

const handleDate = (date) => {
  let dt = moment(date, "YYYY-MM-DD");
  return dt.format("DD/MM/YYYY");
};
const Recommendations = (props) => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.user);
  const root = document.documentElement;
  const theme = document
    .getElementsByTagName("HTML")[0]
    .getAttribute("data-theme");
  const classes = useStyles();
  const tv = props.tv;
  const { watchlist } = useSelector((state) => state.watchlist);
  const { favoritelist } = useSelector((state) => state.favorite);
  const isAdded = {};
  const isAdded2 = {};
  const handleAddTv = (X, tv) => {
    const tvInfo = {
      id: tv.id,
      media_type: "tv",
      title: tv.name,
      poster_path: tv.poster_path,
      release_date: tv.first_air_date,
      overview: tv.overview,
      vote_average: tv.vote_average,
      popularity: tv.popularity,
    };
    dispatch(X(tvInfo));
  };
  //kiểm tra xem movie đã tồn tại trong watchlist được lấy về hay chưa
  tv.recommendations.forEach((value) => {
    if (watchlist.some((item) => item.id === value.id)) {
      isAdded[value.id] = true;
    }
    if (favoritelist.some((item) => item.id === value.id)) {
      isAdded2[value.id] = true;
    }
  });
  return (
    <div className="recommendations mb-0 mb-lg-3">
      <h3>Recommendations</h3>
      {tv.recommendations !== null ? (
        tv.recommendations.length !== 0 ? (
          <Swiper
            freeMode={true}
            grabCursor={false}
            centeredSlides={false}
            spaceBetween={19}
            slidesPerView={"auto"}
            speed={400}
            scrollbar={{ draggable: true }}
            onSliderFirstMove={() =>
              root.style.setProperty("--opacityRecommend", "0")
            }
            onReachBeginning={() =>
              root.style.setProperty("--opacityRecommend", "1")
            }
          >
            {tv.recommendations.slice(0, 8).map((value, index) => (
              <SwiperSlide key={index} title={value.name}>
                {
                  <Link to={"/tv/" + value.id + "-" + chuyenDoiUrl(value.name)}>
                    <img
                      className="img-fluid"
                      src={value.backdrop_path}
                      alt=""
                      style={{
                        objectFit: "cover",
                        width: "250px",
                        height: "141px",
                      }}
                      loading="lazy"
                    />
                  </Link>
                }
                <div className="d-flex justify-content-between mb-1">
                  <Link to={"/tv/" + value.id + "-" + chuyenDoiUrl(value.name)}>
                    <span className={classes.link}>{value.name}</span>
                  </Link>
                  <p>{Math.floor(value.vote_average) * 10 + "%"}</p>
                </div>
                <div className="meta position-absolute ">
                  <span className="release_date d-flex align-items-center">
                    <span
                      className="calendar_icon d-inline-flex mr-1"
                      style={{
                        width: "16px",
                        height: "16px",
                        filter: theme === "dark" ? "invert(1)" : "invert(0)",
                      }}
                    ></span>
                    {handleDate(value.first_air_date)}
                    {isAuth && (
                      <span className="ml-auto">
                        <FavoriteIcon
                          className="mr-2"
                          style={{
                            color: isAuth
                              ? !isAdded2[value.id]
                                ? theme === "light"
                                  ? "black"
                                  : "white"
                                : "#EF47B6"
                              : "black",
                            fontSize: "14.1px",
                          }}
                          onClick={
                            !isAuth
                              ? null
                              : !isAdded2[value.id]
                              ? () => handleAddTv(addMovie2, value)
                              : () => dispatch(removeMovie2(value.id))
                          }
                        />
                        <BookmarkIcon
                          style={{
                            color: isAuth
                              ? !isAdded[value.id]
                                ? theme === "light"
                                  ? "black"
                                  : "white"
                                : "#CF3131"
                              : "black",
                            fontSize: "15px",
                          }}
                          onClick={
                            !isAuth
                              ? null
                              : !isAdded[value.id]
                              ? () => handleAddTv(addMovie, value)
                              : () => dispatch(removeMovie(value.id))
                          }
                        />
                      </span>
                    )}
                  </span>
                </div>
              </SwiperSlide>
            ))}
            <SwiperSlide
              className="d-flex justify-content-center align-items-center"
              style={{ width: "0px", top: "128px" }}
            >
              <h4 style={{ paddingLeft: "0px" }}> </h4>
            </SwiperSlide>
          </Swiper>
        ) : (
          <p className="pError">
            We don't have enough data to suggest any movies based on Santana.
            You can help by rating movies you've seen.
          </p>
        )
      ) : null}
    </div>
  );
};

export default Recommendations;
