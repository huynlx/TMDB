import {
  Grid,
  Fab,
  Typography,
  Fade,
  CircularProgress,
} from "@material-ui/core";
import { IMAGE_URL } from "../../api/Config";
import ModalVideo from "react-modal-video";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CustomDoughnut from "../Doughnut/CustomDoughnut";
import { useMediaQuery } from "react-responsive";
import { handleDate2 } from "./Season";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { no_image } from "../../assets";
import "../../css/_icon.scss";
import mediumZoom from "medium-zoom";
import ImageZoom from "../../ImageZoom";
import {
  addMovie as addMovie2,
  removeMovie as removeMovie2,
} from "../../actions/favoriteActions";
import { addMovie, removeMovie } from "../../actions/watchlistActions";
import { useStyles } from "../MoviePage/style";
import { timeConvert, genres, BootstrapTooltip } from "../MoviePage/functions";
import { Link, useHistory } from "react-router-dom";

const HeaderTv = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = document
    .getElementsByTagName("HTML")[0]
    .getAttribute("data-theme");
  const { isAuth } = useSelector((state) => state.user);
  const { watchlist, isAdding, isRemoving } = useSelector(
    (state) => state.watchlist
  );
  const { favoritelist, isAdding2, isRemoving2 } = useSelector(
    (state) => state.favorite
  );
  const zoom = useRef(mediumZoom());
  const tv = props.tv;
  const trailer = useSelector((state) => state.trailer);
  const classes = useStyles();
  const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 991.98px)",
  });
  const data = props.data;
  const data2 = props.data2;
  const [isOpen, setOpen] = useState(false);
  const play = () => (
    <>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId={trailer}
        onClose={() => setOpen(false)}
      />
      <div className={classes.play}>
        <span
          onClick={() => setOpen(true)}
          className="play_icon"
          style={{
            width: "22.4px",
            height: "22.4px",
            filter:
              theme === "light"
                ? data2 === "black"
                  ? "invert(0)"
                  : "invert(1)"
                : "invert(1)",
          }}
        ></span>
        <h5
          onClick={() => setOpen(true)}
          style={{
            marginLeft: "5px",
            fontWeight: "600",
            textAlign: "center",
            width: "100%",
          }}
        >
          Play Trailer
        </h5>
      </div>
    </>
  );
  const backdropImage = {
    backgroundImage: `url(${tv.backdrop_path !== no_image ? tv.backdrop_path : null
      })`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: isMobileDevice ? "center" : "right -200px top",
  };
  //kiểm tra xem movie đã tồn tại trong watchlist được lấy về hay chưa
  const isAdded = watchlist.some((item) => item.id === tv.id);
  const isAdded2 = favoritelist.some((item) => item.id === tv.id);
  const handleAddTv = (X) => {
    const tvInfo = {
      id: tv.id,
      media_type: tv.media_type,
      title: tv.name,
      poster_path: tv.poster_path,
      release_date: tv.first_air_date,
      overview: tv.overview,
      vote_average: tv.vote_average,
      popularity: tv.popularity,
    };
    dispatch(X(tvInfo));
  };
  useEffect(() => {
    document.title =
      tv.name +
      " (" +
      handleDate2(tv.first_air_date) +
      ") — The Movie Database (TMDb)";
  }, [tv.first_air_date, tv.name]);

  const watchfinal = () => {
    const watch = Object.keys(tv.watch).length !== 0 ? (tv.watch.US ?? tv.watch[Object.keys(tv.watch)[0]]) : null;
    const watch2 = watch ? (watch.flatrate ?? watch.buy ?? watch.rent ?? []) : null;
    if (watch2) {
      if (watch2.length != 0) {
        return {
          logo: watch2[watch2.length - 1].logo_path,
          name: watch2[watch2.length - 1].provider_name
        }
      }
    }
    return {
      logo: null,
      name: null
    }
  }

  return (
    <div style={backdropImage}>
      <div
        className="main"
        style={{
          backgroundImage:
            theme === "light"
              ? !isMobileDevice
                ? `linear-gradient(to right, rgba(${data},1.00) 150px,rgba(${data},0.80) 100%)`
                : `linear-gradient(rgba(${data},1.00) 0px, rgba(${data} ,0.80) 100%)`
              : `linear-gradient(to right, rgb(24, 24, 24) 150px, rgba(24, 24, 24, 0.8) 100%)`,
        }}
      >
        <div className="container py-0 inBackDrop my-auto">
          <div className="row">
            <div className="col-md-12 col-lg-4 col-xl-3 col-12">
              <Fade in={true} timeout={isMobileDevice ? 0 : 1500}>
                <div>
                  <ImageZoom
                    src={tv.poster_path}
                    alt="Zoom"
                    zoom={zoom.current}
                    background="#0E0E0E"
                    width={300}
                    height={450}
                    rounded={false}
                  />
                  <h3 className="w-100 text-center watch mb-0">
                    <div className="d-flex justify-content-center align-items-center">
                      {
                        watchfinal().logo && <Link to={`${history.location.pathname}/watch`}><img src={IMAGE_URL + 'original' + watchfinal().logo} alt="" title={watchfinal().name} /></Link>
                      }
                      <div className={`${watchfinal().logo ? 'align-items-start' : 'align-items-center'}` + ` d-inline-flex flex-column justify-content-center`}>
                        <h4 className="">Now Streaming</h4>
                        <Link className="text-white" to={`${history.location.pathname}/watch`}>Watch Now</Link>
                      </div>
                    </div>
                  </h3>
                </div>
              </Fade>
            </div>
            <div
              className="col-md pl-xl-4 mt-xl-0 mt-3"
              style={{ color: theme === "light" ? data2 : "white" }}
            >
              <h3 style={{ marginTop: isMobileDevice ? "0px" : "15px" }}>
                {tv.name}{" "}
                <span>
                  {tv.first_air_date &&
                    "(" + handleDate2(tv.first_air_date) + ")"}
                </span>
              </h3>
              <p className="center s2 genres">
                <span
                  style={{
                    border: "1px solid",
                    padding: "0.06em 8px 0.06em 8px",
                    borderRadius: "2px",
                    marginRight: "5px",
                    opacity: "0.7",
                  }}
                >
                  TV-MA
                </span>{" "}
                {tv.genres.length ? genres(tv.genres, 'tv') : "-"}&nbsp; • &nbsp;
                {timeConvert(tv.episode_run_time[0])}{" "}
              </p>
              <div className="doughnut">
                <Grid item className={classes.styledDoughnut}>
                  <CustomDoughnut
                    offAnimation={isMobileDevice ? true : false}
                    rounded={true}
                    vote_average={tv.vote_average}
                    size={isMobileDevice ? 50 : 60}
                  />
                </Grid>
                <h5 style={{ fontWeight: "700", marginRight: "20px" }}>
                  User<br></br> Score
                </h5>
                <Grid className={classes.wrapper}>
                  <BootstrapTooltip
                    title={
                      <Typography
                        style={{ fontSize: "14px", padding: "2.5px" }}
                      >
                        {" "}
                        {!isAuth
                          ? "Login to add this movie to your favorite list"
                          : !isAdded2
                            ? "Mark as favorite"
                            : "Remove from your favorite list"}
                      </Typography>
                    }
                    arrow
                    className={classes.tooltip}
                  >
                    <Fab
                      size="medium"
                      className={classes.fab}
                      onClick={
                        !isAuth
                          ? null
                          : !isAdded2
                            ? () => handleAddTv(addMovie2)
                            : () => dispatch(removeMovie2(tv.id))
                      }
                    >
                      <FavoriteIcon
                        className={classes.icon}
                        style={{
                          color: isAuth
                            ? !isAdded2
                              ? "white"
                              : "#EF47B6"
                            : "white",
                          fontSize: "15px",
                        }}
                      />
                    </Fab>
                  </BootstrapTooltip>
                  {(isAdding2 === tv.id || isRemoving2 === tv.id) && (
                    <CircularProgress
                      size={isMobileDevice ? 39 : 47}
                      className={classes.fabProgress}
                    />
                  )}
                </Grid>
                <Grid className={classes.wrapper}>
                  <BootstrapTooltip
                    title={
                      <Typography
                        style={{ fontSize: "14px", padding: "2.5px" }}
                      >
                        {" "}
                        {!isAuth
                          ? "Login to add this movie to your watchlist"
                          : !isAdded
                            ? "Add to your watchlist"
                            : "Remove from your watchlist"}
                      </Typography>
                    }
                    arrow
                    className={classes.tooltip}
                  >
                    <Fab
                      size="medium"
                      className={classes.fab}
                      onClick={
                        !isAuth
                          ? null
                          : !isAdded
                            ? () => handleAddTv(addMovie)
                            : () => dispatch(removeMovie(tv.id))
                      }
                    >
                      <BookmarkIcon
                        style={{
                          color: isAuth
                            ? !isAdded
                              ? "white"
                              : "#CF3131"
                            : "white",
                        }}
                        className={classes.icon}
                      />
                    </Fab>
                  </BootstrapTooltip>
                  {(isAdding || isRemoving === tv.id) && (
                    <CircularProgress
                      size={isMobileDevice ? 39 : 47}
                      className={classes.fabProgress}
                    />
                  )}
                </Grid>
                {trailer !== "12345" && play()}
              </div>
              <p
                className="font-italic"
                style={{
                  opacity: "0.7",
                  marginBottom: "10px",
                  fontSize: "1.1em",
                  fontWeight: 400,
                }}
              >
                {tv.tagline}
              </p>
              <div className="overview">
                <h4>Overview</h4>
                {
                  <p className="pOverview">
                    {tv.overview
                      ? tv.overview
                      : "We don't have an overview translated in English."}
                  </p>
                }
                <div
                  className="row"
                  style={{ display: "flex", justifyContent: "start" }}
                >
                  {tv.credits.crew.length !== 0 ? (
                    tv.credits.crew.slice(0, 6).map((item, key) => (
                      <div key={key} className="col-sm-4 col-6">
                        <h6>{item.name}</h6>
                        <p>{item.department}</p>
                      </div>
                    ))
                  ) : (
                    <div
                      className="col-sm-4 col-6"
                      style={{ marginBottom: isMobileDevice ? "10px" : "0px" }}
                    >
                      <h6>Roberto Aguirre-Sacasa</h6>
                      <p>Creator</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTv;
