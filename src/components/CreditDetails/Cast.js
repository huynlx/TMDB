/* eslint-disable */
import { Swiper, SwiperSlide } from "swiper/react";
import chuyenDoiUrl from "./../../helpers/urlSlug";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Skeleton } from "@material-ui/lab";
import { Fade } from "@material-ui/core";
import { useMediaQuery } from "react-responsive";
import { no_user } from "../../assets";

const Cast = (props) => {
  const root = document.documentElement;
  const movie = props.movie;
  const [imgsLoaded, setImgsLoaded] = useState(false);
  var english = /[^\x00-\x7F]+/;
  const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 991.98px)",
  });
  useEffect(() => {
    const ac = new AbortController();
    //Preload cast's images
    const loadImage = (image) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = image.profile_path;
        loadImg.onload = () => resolve(image.url);
        loadImg.onerror = (err) => reject(err); //call catch()
      });
    };
    Promise.all(
      movie.credits.cast
        .slice(0, isMobileDevice ? 3 : 6)
        .map((image) => loadImage(image))
    )
      .then(() => setImgsLoaded(true))
      .catch((err) => console.log("Failed to load images", err));
    return () => ac.abort(); // Abort both fetches on unmount
  }, []);
  return (
    <div className="cast">
      <h3 className="mb-3 pl-0">Top Billed Cast</h3>
      {movie.credits.cast.length !== 0 ? (
        <Swiper
          freeMode={true}
          grabCursor={false}
          centeredSlides={false}
          spaceBetween={15}
          slidesPerView={"auto"}
          speed={400}
          onSliderFirstMove={() => root.style.setProperty("--opacityCast", "0")}
          onReachBeginning={() => root.style.setProperty("--opacityCast", "1")}
          scrollbar={{ draggable: true }}
        >
          {movie.credits.cast.map((value, key) => {
            return (
              <SwiperSlide
                key={key}
                style={{
                  boxShadow: imgsLoaded
                    ? "0 2px 8px rgba(0, 0, 0, 0.1)"
                    : "none",
                }}
              >
                {!english.test(value.name) ? ( //true => english, false => not english
                  imgsLoaded ? (
                    <Fade in={true} timeout={600}>
                      <div
                        style={{
                          backgroundColor:
                            document
                              .getElementsByTagName("HTML")[0]
                              .getAttribute("data-theme") === "dark"
                              ? "#111111"
                              : "#dbdbdb",
                        }}
                      >
                        <Link
                          to={
                            "/person/" +
                            value.id +
                            "-" +
                            chuyenDoiUrl(value.name)
                          }
                        >
                          <img
                            style={{
                              height: "228px",
                              width: "152px",
                              transform:
                                value.profile_path === no_user && "scale(0.7)",
                            }}
                            src={value.profile_path}
                            alt=""
                            loading="eager"
                          />
                        </Link>
                        <div className="root">
                          <Link
                            to={
                              "/person/" +
                              value.id +
                              "-" +
                              chuyenDoiUrl(value.name)
                            }
                          >
                            <h5>{value.name}</h5>
                          </Link>
                          <p>{value.character}</p>
                        </div>
                      </div>
                    </Fade>
                  ) : (
                    <>
                      <Skeleton
                        variant="rect"
                        width={152}
                        height={228}
                        animation="wave"
                      />
                      <Skeleton />
                      <Skeleton />
                      <Skeleton />
                    </>
                  )
                ) : imgsLoaded ? (
                  <Fade in={true} timeout={600}>
                    <div
                      style={{
                        backgroundColor:
                          document
                            .getElementsByTagName("HTML")[0]
                            .getAttribute("data-theme") === "dark"
                            ? "#111111"
                            : "#dbdbdb",
                      }}
                    >
                      <Link to={"/person/" + value.id + "-" + "invalid-name"}>
                        <img
                          style={{
                            height: "228px",
                            width: "152px",
                            transform:
                              value.profile_path === no_user && "scale(0.7)",
                          }}
                          src={value.profile_path}
                          alt=""
                          loading="eager"
                        />
                      </Link>
                      <div className="root">
                        <Link to={"/person/" + value.id + "-" + "invalid-name"}>
                          <h5>{value.name}</h5>
                        </Link>
                        <p>{value.character}</p>
                      </div>
                    </div>
                  </Fade>
                ) : (
                  <>
                    <Skeleton
                      variant="rect"
                      width={152}
                      height={228}
                      animation="wave"
                    />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                  </>
                )}
              </SwiperSlide>
            );
          })}
          <SwiperSlide
            className="d-flex justify-content-center align-items-center"
            style={{ width: "100px", top: "128px" }}
          >
            <Link
              to={
                "/movie/" +
                movie.id +
                "-" +
                chuyenDoiUrl(movie.titleEN) +
                "/cast"
              }
            >
              <h4 style={{ paddingLeft: "0px" }}>
                <i className="fa fa-arrow-right" aria-hidden="true"></i>
              </h4>
            </Link>
          </SwiperSlide>
        </Swiper>
      ) : (
        <p>Unavailable</p>
      )}
      <div style={{ paddingBottom: "9px" }}></div>
      <Link
        to={"/movie/" + movie.id + "-" + chuyenDoiUrl(movie.titleEN) + "/cast"}
        className="dkmn pl-0"
        style={{
          fontWeight: "600",
          fontSize: "1.1em",
          textDecoration: "none",
        }}
      >
        Full Cast & Crew
      </Link>
      <br />
      <div className="hr pl-0">
        {" "}
        <hr
          style={{
            margin: "16px 0px 10px 0px",
            borderColor:
              document
                .getElementsByTagName("HTML")[0]
                .getAttribute("data-theme") === "dark"
                ? "#313131"
                : "",
          }}
        />
      </div>
    </div>
  );
};

export default Cast;
