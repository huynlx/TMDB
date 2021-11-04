import chuyenDoiUrl from "../../helpers/urlSlug";
import { Link } from "react-router-dom";
import handleDate from "../../helpers/handleDate";

const MovieCard = ({ value }) => {
  const theme = document
    .getElementsByTagName("HTML")[0]
    .getAttribute("data-theme");
  return (
    <div className="movie" style={{ border: theme === "dark" && "none" }}>
      <Link to={"/movie/" + value.id + "-" + chuyenDoiUrl(value.title)}>
        <img src={value.poster_path} alt="" />
      </Link>
      <div className="root">
        <div>
          <Link to={"/movie/" + value.id + "-" + chuyenDoiUrl(value.title)}>
            {" "}
            <h6 className="title">{value.title}</h6>
          </Link>
          <p className="date">
            {value.release_date && handleDate(value.release_date)}
          </p>
        </div>
        <p className="overview">{value.overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
