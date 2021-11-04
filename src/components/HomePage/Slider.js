/* eslint-disable */
import { useState, useEffect, useRef, memo } from "react";
import "../../scss/components/Slider.scss";
import { API_KEY, API_URL, IMAGE_URL } from "../../api/Config";
import chuyenDoiUrl from "../../helpers/urlSlug";
import { Link } from "react-router-dom";
import API from "../../api/axiosConfig";
//Moment js
import moment from "moment";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/scrollbar/scrollbar.scss";

//material ui
import { makeStyles, Grid, Fade } from "@material-ui/core";
import CustomDoughnut from "../Doughnut/CustomDoughnut";
import { no_poster } from "../../assets";

const handleDate = (date) => {
  let dt = moment(date, "YYYY-MM-DD");
  return dt.format("ll");
};
const useStyles = makeStyles((theme) => ({
  styledDoughnut: {
    paddingRight: "0 !important",
  },
  root: {
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    display: "flex",
    justifyContent: "center",
    paddingTop: "120px",
    height: "385px",
  },
}));

export const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.25,
};
export const loadImage = (image) => {
  return new Promise((resolve, reject) => {
    const loadImg = new Image();
    loadImg.src = IMAGE_URL + "w500" + image.poster_path;
    loadImg.onload = () => resolve(image.url); // call then()
    loadImg.onerror = (err) => reject(err); //call catch()
  });
};

const Slider = (props) => {
  const root = document.documentElement;
  const ref = useRef();
  const [firstLoad, setFirstLoad] = useState(true);
  const set = props.slider;
  const [load, setLoad] = useState(false);
  const classes = useStyles();
  const [slider, setSlider] = useState({
    loading: false,
    listSlider: null,
  });
  //  Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    if (!firstLoad) {
      setLoad(true);
    }
    const getList = setTimeout(
      async () => {
        try {
          await API.get(
            `${API_URL}${set}/popular/?api_key=${API_KEY}&page=1`
          ).then((res) => {
            setSlider({
              ...slider,
              listSlider: res.data.results,
              media_type: set,
            });
            const observer = new IntersectionObserver(([entry]) => {
              let element = entry.target;
              setTimeout(
                () => {
                  setLoad(true);
                  setTimeout(
                    () => {
                      Promise.all(
                        res.data.results
                          .slice(0, 8)
                          .map((image) => loadImage(image))
                      )
                        .then(() => {
                          setTimeout(
                            () => {
                              element
                                .querySelectorAll("img")
                                .forEach((item) => {
                                  item.src = item.dataset.src; //1 cái src bị lỗi thôi là nhảy vào catch ngay
                                });
                              setFirstLoad(false);
                              setTimeout(() => setLoad(false), 0);
                            },
                            firstLoad ? 400 : 0
                          );
                        })
                        .catch((err) =>
                          console.log("Failed to load images", err)
                        );
                    },
                    firstLoad ? 300 : 0
                  );
                },
                firstLoad ? 500 : 0
              );
              observer.unobserve(ref.current);
            }, options);
            if (ref.current) {
              observer.observe(ref.current);
            }
            firstLoad && setTimeout(() => setLoad(false), 0);
          });
        } catch (err) {
          console.log(err);
        }
      },
      firstLoad ? 0 : 400
    );
    return () => clearTimeout(getList); //will unmount
  }, [ref, set]);
  return (
    <div
      className="popular container mt-3 p-0"
      style={{ minHeight: "300px" }}
      ref={ref}
    >
      {slider.listSlider ? (
        <Fade timeout={firstLoad ? 800 : 500} in={!load}>
          <div>
            <Swiper
              freeMode={true}
              grabCursor={false}
              centeredSlides={false}
              spaceBetween={15}
              slidesPerView={"auto"}
              onFromEdge={() => root.style.setProperty("--opacity", "0")}
              onReachBeginning={() => root.style.setProperty("--opacity", "1")}
              speed={400}
              scrollbar={{ draggable: true }}
            >
              {slider.listSlider.map((value, key) => {
                return (
                  <SwiperSlide
                    key={key}
                    title={
                      slider.media_type == "movie" ? value.title : value.name
                    }
                  >
                    {slider.media_type == "movie" ? (
                      <>
                        <Link
                          to={
                            "/movie/" +
                            value.id +
                            "-" +
                            chuyenDoiUrl(value.title)
                          }
                        >
                          <li className={firstLoad ? "load" : "loaded"}>
                            <img
                              className="img-fluid"
                              src={no_poster}
                              data-src={IMAGE_URL + "w500" + value.poster_path}
                              alt=""
                              loading="eager"
                            />
                          </li>
                        </Link>
                        <div className="doughnut">
                          <Grid item className={classes.styledDoughnut}>
                            <CustomDoughnut
                              vote_average={value.vote_average}
                              size={34}
                              size2={2}
                              offAnimation={true}
                              fontSize="0.6em"
                            />
                          </Grid>
                        </div>
                        <div
                          className="root"
                          style={{
                            visibility: firstLoad ? "hidden" : "visible",
                          }}
                        >
                          <Link
                            to={
                              "/movie/" +
                              value.id +
                              "-" +
                              chuyenDoiUrl(value.title)
                            }
                            title={value.title}
                          >
                            {value.title}
                          </Link>
                          <p>{handleDate(value.release_date)}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to={
                            "/tv/" + value.id + "-" + chuyenDoiUrl(value.name)
                          }
                        >
                          <li className={firstLoad ? "load" : "loaded"}>
                            <img
                              className="img-fluid"
                              src={no_poster}
                              data-src={IMAGE_URL + "w500" + value.poster_path}
                              alt=""
                              loading="eager"
                            />
                          </li>
                        </Link>
                        <div className="doughnut">
                          <Grid item className={classes.styledDoughnut}>
                            <CustomDoughnut
                              vote_average={firstLoad ? "" : value.vote_average}
                              size={34}
                              size2={2}
                              offAnimation={true}
                              fontSize="0.6em"
                            />
                          </Grid>
                        </div>
                        <div
                          className="root"
                          style={{
                            visibility: firstLoad ? "hidden" : "visible",
                          }}
                        >
                          <Link
                            to={
                              "/tv/" + value.id + "-" + chuyenDoiUrl(value.name)
                            }
                            title={value.name}
                          >
                            {value.name}
                          </Link>
                          <p>{handleDate(value.first_air_date)}</p>
                        </div>
                      </>
                    )}
                  </SwiperSlide>
                );
              })}
              <SwiperSlide
                className="d-flex justify-content-center align-items-center"
                style={{ width: "40px", top: "128px" }}
              >
                <h4 style={{ paddingLeft: "0px" }}></h4>
              </SwiperSlide>
            </Swiper>
          </div>
        </Fade>
      ) : null}
    </div>
  );
};

export default memo(Slider);
