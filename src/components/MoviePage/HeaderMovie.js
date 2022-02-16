import ModalVideo from "react-modal-video";
import {
  Grid,
  Fab,
  Typography,
  Fade,
  CircularProgress,
} from "@material-ui/core";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useState, useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import CustomDoughnut from "../Doughnut/CustomDoughnut";
import { useDispatch, useSelector } from "react-redux";
import { no_image } from "../../assets";
import "../../css/_icon.scss";
import mediumZoom from "medium-zoom";
import ImageZoom from "../../ImageZoom";
import { addMovie, removeMovie } from "../../actions/watchlistActions";
import {
  addMovie as addMovie2,
  removeMovie as removeMovie2,
} from "../../actions/favoriteActions";
import { useStyles } from "./style";
import {
  timeConvert,
  handleDate,
  handleDate2,
  genres,
  BootstrapTooltip,
} from "./functions";
import { Link, useHistory, useLocation } from 'react-router-dom';

const HeaderMovie = (props) => {
  const history = useHistory()
  const dispatch = useDispatch();
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
  const trailer = useSelector((state) => state.trailer);
  const movie = props.movie;
  const data = props.data;
  const data2 = props.data2;
  const classes = useStyles();
  const certification =
    movie.certifications !== undefined
      ? movie.certifications.length !== 0
        ? movie.certifications[0].release_dates[0].certification
        : ""
      : "";
  const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 991.98px)",
  });
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
    backgroundImage: `url(${movie.backdrop_path !== no_image ? movie.backdrop_path : null
      })`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: isMobileDevice ? "center" : "right -200px top",
  };
  //kiểm tra xem movie đã tồn tại trong watchlist được lấy về hay chưa
  const isAdded = watchlist.some((item) => item.id === movie.id);
  const isAdded2 = favoritelist.some((item) => item.id === movie.id);
  const handleAddMovie = (X) => {
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
  useEffect(() => {
    document.title =
      movie.title +
      " (" +
      handleDate2(movie.release_date) +
      ") — The Movie Database (TMDb)";
  }, [movie.release_date, movie.title]);

  return (
    <div style={backdropImage}>
      <div
        className="main"
        style={{
          backgroundImage:
            theme === "light"
              ? !isMobileDevice
                ? `linear-gradient(to right, rgba(${data},1.00) 150px,rgba(${data},0.80) 100%)`
                : `linear-gradient( rgba(${data},1.00) 0px, rgba(${data},0.80) 100%)`
              : `linear-gradient(to right, rgb(24, 24, 24) 150px, rgba(24, 24, 24, 0.8) 100%)`,
        }}
      >
        <div className="container py-0 inBackDrop my-auto">
          <div className="row">
            <div className="col-md-12 col-lg-4 col-xl-3 col-12">
              <Fade in={true} timeout={isMobileDevice ? 0 : 1500}>
                <div>
                  <ImageZoom
                    src={movie.poster_path}
                    alt="Zoom"
                    zoom={zoom.current}
                    background="#0E0E0E"
                    width={300}
                    height={450}
                  />
                  <h3 className="w-100 text-center watch mb-0"><Link className="text-white" to={`${history.location.pathname}/watch`}>Watch Now</Link></h3>
                </div>
              </Fade>
            </div>
            <div
              className="col-md pl-xl-4 mt-xl-0 mt-2"
              style={{ color: theme === "light" ? data2 : "white" }}
            >
              <h3 style={{ marginTop: isMobileDevice ? "0px" : "15px" }}>
                {movie.title}
                <span>
                  &nbsp;
                  {movie.release_date &&
                    "(" + handleDate2(movie.release_date) + ")"}
                </span>
              </h3>
              {!isMobileDevice ? (
                <p className="center">
                  <span
                    style={{
                      border: "1px solid",
                      padding: "0.06em 4px 0.06em 8px",
                      borderRadius: "2px",
                      marginRight: "8px",
                      opacity: "0.7",
                    }}
                  >
                    {certification !== "" ? certification : "PG-13"}{" "}
                  </span>
                  {movie.release_date ? handleDate(movie.release_date) : "-"}
                  &nbsp;{" "}
                  {movie.iso_3166_1 !== "" && <span>({movie.iso_3166_1})</span>}
                  &nbsp; •&nbsp;{" "}
                  {movie.genres.length ? genres(movie.genres, "movie") : "-"}&nbsp; •
                  &nbsp;{timeConvert(movie.runtime)}{" "}
                </p>
              ) : (
                <>
                  <p className="center m-0">
                    <span
                      style={{
                        border: "1px solid",
                        padding: "0.06em 4px 0.06em 8px",
                        borderRadius: "2px",
                        marginRight: "8px",
                        opacity: "0.7",
                      }}
                    >
                      {certification !== "" ? certification : "PG-13"}{" "}
                    </span>
                    {movie.release_date ? handleDate(movie.release_date) : "-"}
                    &nbsp;{" "}
                    {movie.iso_3166_1 !== "" && (
                      <span>({movie.iso_3166_1})</span>
                    )}
                    &nbsp; • &nbsp;{timeConvert(movie.runtime)}
                  </p>
                  <p className="center">
                    {movie.genres.length ? genres(movie.genres, 'movie') : "-"}
                  </p>
                </>
              )}
              <div className="doughnut">
                <Grid item className={classes.styledDoughnut}>
                  <CustomDoughnut
                    offAnimation={isMobileDevice ? true : false}
                    rounded={true}
                    vote_average={movie.vote_average}
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
                        {!isAuth
                          ? "Login to add this movie to your favorite list"
                          : !isAdded2
                            ? "Mark as favorite"
                            : "Remove from your favorite list"}
                      </Typography>
                    }
                    className={classes.tooltip}
                  >
                    <Fab
                      className={classes.fab}
                      onClick={
                        !isAuth
                          ? null
                          : !isAdded2
                            ? () => handleAddMovie(addMovie2)
                            : () => dispatch(removeMovie2(movie.id))
                      }
                    >
                      <FavoriteIcon
                        style={{
                          color: isAuth
                            ? !isAdded2
                              ? "white"
                              : "#EF47B6"
                            : "white",
                          fontSize: "15px",
                        }}
                        className={classes.icon}
                      />
                    </Fab>
                  </BootstrapTooltip>
                  {(isAdding2 === movie.id || isRemoving2 === movie.id) && (
                    <CircularProgress
                      size={47}
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
                        {!isAuth
                          ? "Login to add this movie to your watchlist"
                          : !isAdded
                            ? "Add to your watchlist"
                            : "Remove from your watchlist"}
                      </Typography>
                    }
                    className={classes.tooltip}
                  >
                    <Fab
                      className={classes.fab}
                      onClick={
                        !isAuth
                          ? null
                          : !isAdded
                            ? () => handleAddMovie(addMovie)
                            : () => dispatch(removeMovie(movie.id))
                      }
                    >
                      {" "}
                      {/* fab là floating action button */}
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
                  {(isAdding || isRemoving === movie.id) && (
                    <CircularProgress
                      size={47}
                      className={classes.fabProgress}
                    />
                  )}
                </Grid>
                {trailer !== "12345" && play()}
              </div>
              {
                <p
                  className="font-italic"
                  style={{
                    opacity: "0.7",
                    marginBottom: "10px",
                    fontSize: "1.1em",
                    fontWeight: 400,
                  }}
                >
                  {movie.tagline}
                </p>
              }
              <div className="overview">
                <h4>Overview</h4>
                {
                  <p className="pOverview">
                    {movie.overview
                      ? movie.overview
                      : "We don't have an overview translated in English."}
                  </p>
                }
                <div
                  className="row"
                  style={{ display: "flex", justifyContent: "start" }}
                >
                  {movie.credits.crew.slice(0, 6).map((item, key) => {
                    return (
                      <div key={key} className="col-sm-4 col-6">
                        <h6>{item.name}</h6>
                        <p>{item.department}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMovie;
