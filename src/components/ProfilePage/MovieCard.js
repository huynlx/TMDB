import chuyenDoiUrl from "../../helpers/urlSlug";
import { Link } from "react-router-dom";
import handleDate from "../../helpers/handleDate";
import { CircularProgress, Fab, Fade, Grid } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { removeMovie } from "../../actions/watchlistActions";
import {
  removeMovie as remove2,
  addMovie as addMovie2,
} from "../../actions/favoriteActions";
import StyledDoughnut from "../Doughnut/CustomDoughnut";
import { useMediaQuery } from "react-responsive";

const MovieCard = ({ value, classes, select, theme }) => {
  const dispatch = useDispatch();
  const { isRemoving } = useSelector((state) => state.watchlist);
  const { favoritelist, isAdding2, isRemoving2 } = useSelector(
    (state) => state.favorite
  );
  const type = value.media_type;
  const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 991.98px)",
  });
  const img = {
    height: isMobileDevice ? "auto" : "201px",
    width: isMobileDevice ? "100px" : "133.32px",
  };
  // const [load, setLoad] = useState(true)
  const isAdded2 = favoritelist.some((item) => item.id === value.id);
  // useEffect(() => {
  //     if (isRemoving === value.id) {
  //         setTimeout(() => {
  //             setLoad(false)
  //         }, 300);
  //     }
  // }, [isRemoving, value.id])
  return (
    <Fade in={true} timeout={isRemoving === value.id ? 300 : 300}>
      <div className="movie" style={{ border: theme === "dark" && "none" }}>
        <Link to={`/${type}/` + value.id + "-" + chuyenDoiUrl(value.title)}>
          <img style={img} src={value.poster_path} alt="" />
        </Link>
        <div className="d-flex flex-column justify-content-around w-100">
          <div className="root py-0 h-100">
            <div className="d-flex">
              {!isMobileDevice && (
                <Grid
                  item
                  className={classes.styledDoughnut}
                  style={{ marginRight: "10px" }}
                >
                  <StyledDoughnut
                    fontSize="0.6em"
                    size2={2}
                    offAnimation={true}
                    rounded={true}
                    vote_average={value.vote_average}
                    size={isMobileDevice ? 30 : 34}
                  />
                </Grid>
              )}
              <div>
                <Link
                  to={`/${type}/` + value.id + "-" + chuyenDoiUrl(value.title)}
                >
                  <h6 className="title">{value.title}</h6>
                </Link>
                <p className="date">
                  {value.release_date && handleDate(value.release_date)}
                </p>
              </div>
            </div>
            <p
              className="overview"
              style={{ WebkitLineClamp: isMobileDevice ? 2 : 3 }}
            >
              {value.overview}
            </p>
            <Grid className={classes.grid}>
              <span
                className="mr-4 position-relative"
                onClick={
                  !isAdded2
                    ? () => dispatch(addMovie2(value))
                    : () => dispatch(remove2(value.id))
                }
              >
                <Fab
                  className={classes.fab + " mr-2 " + classes.fab2}
                  style={{
                    background: isAdded2 && "#EF47B6",
                    border: isAdded2 && "#EF47B6",
                  }}
                >
                  <FavoriteIcon
                    className={classes.icon}
                    style={{ color: isAdded2 && "white" }}
                  />
                </Fab>
                Favorite
                {(isAdding2 === value.id || isRemoving2 === value.id) && (
                  <CircularProgress className={classes.progress} size={30} />
                )}
              </span>
              {select === "watchlist" && (
                <span
                  className="position-relative"
                  onClick={() =>
                    dispatch(
                      (select === "watchlist" ? removeMovie : remove2)(value.id)
                    )
                  }
                >
                  <Fab className={classes.fab + " mr-2"}>
                    <CloseIcon
                      className={classes.icon}
                      style={{ fontSize: "18px" }}
                    />
                  </Fab>
                  Remove
                  {isRemoving === value.id && (
                    <CircularProgress className={classes.progress} size={30} />
                  )}
                </span>
              )}
            </Grid>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default MovieCard;
