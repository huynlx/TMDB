// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import chuyenDoiUrl from "./../../helpers/urlSlug";
import { Link } from "react-router-dom";
import { Skeleton } from "@material-ui/lab";
import { Fade, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { no_poster } from "../../assets";

const useStyles = makeStyles((theme) => ({
  border: {
    borderRadius: "8px",
  },
}));
const KnowFor = (props) => {
  const classes = useStyles();
  const root = document.documentElement;
  const person = props.person;
  const [load, setLoad] = useState(false);
  const [skeleton, setSkeleton] = useState(true);
  const [first, setFirst] = useState(true);
  useEffect(() => {
    if (props.imgLoad) {
      setFirst(false);
      setSkeleton(false);
      setTimeout(() => {
        setLoad(true);
      }, 500);
    }
  }, [props.imgLoad]);
  return (
    <>
      <h3>Known For</h3>
      {person.movie_credits.cast.length !== 0 ? (
        <Swiper
          freeMode={true}
          grabCursor={false}
          centeredSlides={false}
          spaceBetween={14}
          slidesPerView={"auto"}
          speed={400}
          scrollbar={{ draggable: true }}
          onFromEdge={() => root.style.setProperty("--opacityKnowFor", "0")}
          onReachBeginning={() =>
            root.style.setProperty("--opacityKnowFor", "1")
          }
        >
          {person.movie_credits.cast.slice(0, 10).map((value, index) => (
            <SwiperSlide key={index} title={value.title}>
              {load ? (
                <Fade in={load} timeout={500}>
                  <div>
                    <Link
                      to={
                        "/movie/" + value.id + "-" + chuyenDoiUrl(value.title)
                      }
                    >
                      <div
                        style={{
                          backgroundColor: "var(--img)",
                          borderRadius: "8px",
                        }}
                      >
                        <img
                          className="img-fluid"
                          src={value.poster_path}
                          alt=""
                          style={{
                            transform:
                              value.poster_path === no_poster && "scale(0.7)",
                          }}
                        />
                      </div>
                    </Link>
                    <Link
                      to={
                        "/movie/" + value.id + "-" + chuyenDoiUrl(value.title)
                      }
                    >
                      <p
                        className="text-center"
                        style={{ marginBottom: "20px" }}
                      >
                        {value.title}
                      </p>
                    </Link>
                  </div>
                </Fade>
              ) : (
                <Fade in={skeleton} timeout={first ? 0 : 500}>
                  <div>
                    <Skeleton
                      variant="rect"
                      width={130}
                      height={195}
                      animation="wave"
                      className={classes.border}
                    />
                    {/* <Skeleton height={16} />
                                                    <Skeleton height={16} /> */}
                    <br />
                  </div>
                </Fade>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Swiper
          freeMode={true}
          grabCursor={false}
          centeredSlides={false}
          spaceBetween={14}
          slidesPerView={"auto"}
          speed={400}
          onFromEdge={() => root.style.setProperty("--opacityKnowFor", "0")}
          onReachBeginning={() =>
            root.style.setProperty("--opacityKnowFor", "1")
          }
        >
          {person.movie_credits.crew.slice(0, 10).map((value, index) => (
            <SwiperSlide key={index}>
              {props.imgLoad ? (
                <Fade in={true} timeout={600}>
                  <div>
                    <Link
                      to={
                        "/movie/" + value.id + "-" + chuyenDoiUrl(value.title)
                      }
                    >
                      <div
                        style={{
                          backgroundColor: "var(--img)",
                          borderRadius: "8px",
                        }}
                      >
                        <img
                          src={value.poster_path}
                          alt=""
                          style={{
                            transform:
                              value.poster_path === no_poster && "scale(0.7)",
                          }}
                        />
                      </div>
                    </Link>
                    <Link
                      to={
                        "/movie/" + value.id + "-" + chuyenDoiUrl(value.title)
                      }
                    >
                      <p className="text-center">{value.title}</p>
                    </Link>
                  </div>
                </Fade>
              ) : (
                <>
                  <Skeleton
                    variant="rect"
                    width={130}
                    height={195}
                    animation="wave"
                    className={classes.border}
                  />
                  {/* <Skeleton height={16} /> */}
                  {/* <Skeleton height={16} /> */}
                  <br />
                </>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default KnowFor;
