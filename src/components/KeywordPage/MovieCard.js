import chuyenDoiUrl from "../../helpers/urlSlug";
import { Link } from "react-router-dom";
import handleDate from "../../helpers/handleDate";

const MovieCard = ({ value, type }) => {
  const theme = document
    .getElementsByTagName("HTML")[0]
    .getAttribute("data-theme");
  return (
    <div className="movie" style={{ border: theme === "dark" && "none" }}>
      <Link to={`/${type}/` + value.id + "-" + chuyenDoiUrl(value.title ?? value.name)}>
        <img src={value.poster_path} alt="" />
      </Link>
      <div className="root">
        <div>
          <Link to={`/${type}/` + value.id + "-" + chuyenDoiUrl(value.title ?? value.name)}>
            {" "}
            <h6 className="title">{value.title ?? value.name}</h6>
          </Link>
          <p className="date">
            {handleDate(value.release_date ?? value.first_air_date)}
          </p>
        </div>
        <p className="overview">{value.overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
