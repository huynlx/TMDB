import { Grid } from "@material-ui/core";
import { memo, useState } from "react";
import { useStyles } from "./style";

const Navigation = (props) => {
  const { setType, setSelect, select } = { ...props };
  const [hover, setHover] = useState(false);
  const [hover2, setHover2] = useState(false);
  const arrowRight = {
    fontSize: "10px",
    position: "absolute",
    right: "20px",
    top: "51%",
    transform: "translateY(-50%)",
  };
  const classes = useStyles(props);
  return (
    <Grid
      className={
        classes.bar +
        " border-right-0 border-left-0 " +
        (props.theme === "dark" && "border-top-0")
      }
      style={{ border: props.theme === "dark" && "1px solid rgb(49,49,49)" }}
    >
      <div className="container">
        <ul>
          <li
            style={{
              borderBottom: select !== "watchlist" && "4px solid #959595",
            }}
            onMouseOver={() => setHover("overview")}
            onMouseOut={() => setHover(false)}
          >
            Overview &nbsp;<span style={{ fontSize: "10px" }}>▼</span>
            <div
              className="position-absolute border text-dark"
              style={{
                zIndex: "1000",
                backgroundColor: "white",
                borderRadius: ".25rem",
                visibility: hover === "overview" ? "visible" : "hidden",
              }}
            >
              <ul className={classes.container}>
                <li
                  onClick={() => {
                    setSelect("main");
                  }}
                >
                  Main
                </li>
                <li
                  className={classes.favorites}
                  onMouseOver={() => setHover2(true)}
                  onMouseOut={() => setHover2(false)}
                >
                  Favorites <span style={arrowRight}>►</span>
                </li>
                <li
                  onClick={() => {
                    setSelect("edit");
                    setType("profile");
                  }}
                >
                  Edit Profile
                </li>
              </ul>
              <div
                className={classes.listFavorites}
                style={{ visibility: hover2 ? "visible" : "hidden" }}
                onMouseOver={() => setHover2(true)}
                onMouseOut={() => setHover2(false)}
              >
                <ul>
                  <li
                    onClick={() => {
                      setSelect("favoritelist");
                      setType("movie");
                    }}
                  >
                    Movies
                  </li>
                  <li
                    onClick={() => {
                      setSelect("favoritelist");
                      setType("tv");
                    }}
                  >
                    TV Shows
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li
            style={{
              borderBottom: select === "watchlist" && "4px solid #959595",
            }}
            className="mr-0"
            onMouseOver={() => setHover("watchlist")}
            onMouseOut={() => setHover(false)}
          >
            Watchlist &nbsp;<span style={{ fontSize: "10px" }}>▼</span>
            <div
              className="position-absolute border text-dark"
              style={{
                zIndex: "1000",
                backgroundColor: "white",
                borderRadius: ".25rem",
                visibility: hover === "watchlist" ? "visible" : "hidden",
              }}
            >
              <ul className={classes.container}>
                <li
                  onClick={() => {
                    setType("movie");
                    setSelect("watchlist");
                  }}
                >
                  Movies
                </li>
                <li
                  onClick={() => {
                    setType("tv");
                    setSelect("watchlist");
                  }}
                >
                  TV Shows
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </Grid>
  );
};

export default memo(Navigation);
