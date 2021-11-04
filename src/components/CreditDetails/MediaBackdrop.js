import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import chuyenDoiUrl from "./../../helpers/urlSlug";
import { viewMore } from "./Media";
import { scrollLeft } from "./MediaPopular";

const MediaBackdrop = ({ movie }) => {
  const root = document.documentElement;
  const refTest = useRef(null);
  const value = movie.images.backdrop_path;
  useEffect(() => {
    root.style.setProperty("--opacityMedia", "1");
  }, [root]);
  return (
    <>
      {value.length !== 0 ? (
        <div
          style={{ width: "100%", height: "100%", overflowX: "scroll" }}
          ref={refTest}
          onScroll={() => scrollLeft(refTest, root)}
          className="d-flex backdrop"
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
                "/images/backdrops"
              }
            >
              {viewMore()}
            </Link>
          </div>
        </div>
      ) : (
        <p>This backdrops is unavailable</p>
      )}
    </>
  );
};

export default MediaBackdrop;
