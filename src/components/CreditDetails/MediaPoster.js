import { Link } from "react-router-dom";
import { useRef } from "react";
import chuyenDoiUrl from "./../../helpers/urlSlug";
import { viewMore } from "./Media";
import { scrollLeft } from "./MediaPopular";

const MediaPoster = ({ movie }) => {
  const root = document.documentElement;
  const refTest = useRef(null);
  const value = movie.images.poster_path;
  return (
    <>
      {value.length !== 0 ? (
        <div
          style={{ width: "100%", height: "100%", overflowX: "scroll" }}
          ref={refTest}
          onScroll={() => scrollLeft(refTest, root)}
          className="d-flex poster"
        >
          {value.slice(0, 6).map((item, key) => {
            return (
              <div key={key}>
                <img src={item.url} alt="" loading="lazy" />
              </div>
            );
          })}
          <div className=" d-flex justify-content-center align-items-center">
            <Link
              to={
                "/movie/" +
                movie.id +
                "-" +
                chuyenDoiUrl(movie.titleEN) +
                "/images/posters"
              }
            >
              {viewMore()}
            </Link>
          </div>
        </div>
      ) : (
        <p>This posters is unavailable</p>
      )}
    </>
  );
};

export default MediaPoster;
