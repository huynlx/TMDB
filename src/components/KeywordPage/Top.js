import "../../scss/components/Top.scss";
const Top = ({ props, type, genreName }) => {
  const name = genreName ?? props.name;

  return (
    <div id="top-keyword">
      <div className="content light-blue_icon">
        <div className="container">
          <h3>{name}</h3>
          <h4 style={{ color: "rgba(255,255,255,0.5)" }}>
            {props.movies.total_results.toLocaleString()}{" "}
            {type === "tv" ? "shows" : "movies"}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Top;
