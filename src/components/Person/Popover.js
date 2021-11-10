import { OverlayTrigger, Popover } from "react-bootstrap";
import DoubleRing from "../Loading/DoubleRing";
import { memo, useState } from "react";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { addMovie, removeMovie } from "../../actions/watchlistActions";
import {
  addMovie as addMovie2,
  removeMovie as removeMovie2,
} from "../../actions/favoriteActions";
import { useMediaQuery } from "react-responsive";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1.4),
    marginTop: theme.spacing(2.2),
    width: "39.2px",
    height: "39.2px",
    background: "#01B4E4",
    borderRadius: "5px",
    "&:hover": {
      background: "#9ea4a7",
    },
  },
  icon1: (props) => ({
    fontSize: "16.5px !important",
    color: props.isAdded2 ? "#EF47B6" : "white", //favorite
  }),
  icon2: (props) => ({
    fontSize: "16.5px !important",
    color: props.isAdded ? "#CF3131" : "white", //watchlist
  }),
}));
const POPOVER = (props) => {
  const { item, Link, chuyenDoiUrl, changeIcon, icon, id } = props;
  const dispatch = useDispatch();
  const [imgLoaded, setLoaded] = useState({
    [id]: false,
  });
  const overview = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "2",
  };
  const title = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "1",
    fontWeight: "700",
  };
  const loadImg = (img) => {
    const hihi = new Image();
    hihi.src = img;
    hihi.onload = () => {
      setTimeout(() => {
        setLoaded({ [id]: true });
      }, 400);
    };
  };
  const { isAuth } = useSelector((state) => state.user);
  const { watchlist } = useSelector((state) => state.watchlist);
  const { favoritelist } = useSelector((state) => state.favorite);
  const handleAddMovie = (X, movie) => {
    const movieInfo = {
      id: movie.id,
      media_type: movie.media_type,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      overview: movie.overview,
      vote_average: movie.vote_average,
      popularity: movie.popularity,
    };
    dispatch(X(movieInfo));
  };
  //kiểm tra xem movie đã tồn tại trong watchlist được lấy về hay chưa
  const isAdded = watchlist.some((value) => value.id === item.id);
  const isAdded2 = favoritelist.some((value) => value.id === item.id);
  const classes = useStyles({ isAdded, isAdded2 });
  const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 991.98px)",
  });
  const popover = (
    <Popover id="popover-basic">
      <Popover.Content style={{ padding: "12.8px" }}>
        {!isMobileDevice && !imgLoaded[id] && <DoubleRing />}
        <div
          className="d-flex align-items-start"
          style={{
            visibility:
              !isMobileDevice && (imgLoaded[id] ? "visible" : "hidden"),
          }}
        >
          <Link to={"/movie/" + item.id + "-" + chuyenDoiUrl(item.title)}>
            <div
              className="mr-3"
              style={{
                background:
                  item.poster_popover ===
                    "/static/media/no_poster.f9db13c5.svg" && "#dbdbdb",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <img
                src={item.poster_popover}
                alt=""
                style={{
                  width: "94px",
                  height: "141px",
                  transform:
                    item.poster_popover ===
                      "/static/media/no_poster.f9db13c5.svg" && "scale(0.7)",
                }}
              />
            </div>
          </Link>
          <div className="content text-white">
            <h4 className="mb-2" style={title}>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={"/movie/" + item.id + "-" + chuyenDoiUrl(item.title)}
              >
                {item.title}
              </Link>
              &nbsp;&nbsp;
              <span
                className="px-2 group align-items-center"
                style={{
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  backgroundColor: "#01B4E4",
                  borderRadius: "6px",
                  fontSize: "0.55em",
                  display: "inline-flex",
                  verticalAlign: "bottom",
                }}
              >
                <span
                  className="star_icon d-inline-flex pr-3"
                  style={{ width: "14.4px", height: "14.4px" }}
                ></span>
                {item.vote_average}
              </span>
            </h4>
            <p className="m-0" style={overview}>
              {item.overview
                ? item.overview
                : "We don't have an overview translated in English."}
            </p>
            {isAuth && (
              <>
                <Button
                  onClick={
                    !isAuth
                      ? null
                      : !isAdded2
                      ? () => handleAddMovie(addMovie2, item)
                      : () => dispatch(removeMovie2(item.id))
                  }
                  variant="contained"
                  className={classes.button}
                >
                  <FavoriteIcon className={classes.icon1} />
                </Button>
                <Button
                  onClick={
                    !isAuth
                      ? null
                      : !isAdded
                      ? () => handleAddMovie(addMovie, item)
                      : () => dispatch(removeMovie(item.id))
                  }
                  variant="contained"
                  className={classes.button}
                >
                  <BookmarkIcon className={classes.icon2} />
                </Button>
              </>
            )}
          </div>
        </div>
      </Popover.Content>
    </Popover>
  );
  return (
    <OverlayTrigger rootClose trigger="click" placement="top" overlay={popover}>
      <span
        onClick={() => loadImg(item.poster_popover)}
        className={icon[item.id] ? "circle_icon-2" : "circle_icon"}
        onMouseOver={() => {
          changeIcon(item.id);
        }}
        onMouseOut={() => {
          changeIcon(item.id);
        }}
        style={{ filter: props.theme === "dark" ? "invert(1)" : "invert(0)" }}
      ></span>
    </OverlayTrigger>
  );
};

export default memo(POPOVER);
