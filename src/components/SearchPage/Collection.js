import { Link } from "react-router-dom";

const Collection = ({ movie, theme }) => {
  return (
    <div
      className="collection movie"
      style={{ border: theme === "dark" && "none" }}
    >
      <Link to={"/collection/" + movie.id}>
        <img
          src={movie.poster_path}
          alt=""
          style={{ backgroundColor: "var(--img)" }}
          loading="lazy"
        />
      </Link>
      <div className="root">
        <Link to={"/collection/" + movie.id}>
          <h6 className="title">{movie.name}</h6>
        </Link>
        <p className="overview">{movie.overview}</p>
      </div>
    </div>
  );
};

export default Collection;
