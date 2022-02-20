import { Fade } from "@material-ui/core";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetchTrailer } from "../../../api/fetchTrailer";
import "../../../scss/components/Trailer.scss";
import ModalVideo from "react-modal-video";
import "../../../css/_icon.scss";
import chuyenDoiUrl from "../../../helpers/urlSlug";
import { no_poster } from "../../../assets";
import { options } from "../Slider";

import NProgress from 'nprogress';

const Index = (props) => {
  const root = document.documentElement;
  const [firstLoad, setFirstLoad] = useState(true);
  const ref = useRef();
  const type = props.trailer;
  const media_type = props.media_type;
  const items = [];
  const [trailer, setTrailer] = useState(null);
  const [fade, setFade] = useState(false);
  const [key, setKey] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [element, setElement] = useState(null);
  const play = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    display: firstLoad ? "none" : "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  useMemo(() => {
    if (element) {
      setKey(element.trailer.key); //rerender
      props.getUrl(element.background); //rerender
    }
    //eslint-disable-next-line
  }, [element]);
  if (trailer) {
    trailer.forEach((element) => {
      items.push(
        <SwiperSlide
          title={element.title}
          key={element.id}
          onMouseOver={() => setElement(element)}
        >
          <div className="wrapper" style={{ position: "relative" }}>
            <li className={firstLoad ? "load" : "loaded"}>
              <img
                className="img-fluid"
                src={no_poster}
                data-src={element.backdrop_path}
                alt=""
                loading="eager"
              />
            </li>
            <div className="play" style={play}>
              <div
                className="btnPlay play_icon"
                onClick={() => setOpen(true)}
              ></div>
            </div>
          </div>
          <div
            className="info"
            style={{ display: firstLoad ? "none" : "block" }}
          >
            <Link
              className="text-white"
              to={`/${media_type}/${element.id}-${chuyenDoiUrl(element.title)}`}
            >
              {element.title}
            </Link>
            <p>{element.trailer.name}</p>
          </div>
        </SwiperSlide>
      );
    });
  }
  useEffect(() => {
    if (!firstLoad) {
      NProgress.configure({ showSpinner: false });
      NProgress.configure({ trickleRate: 0.2, trickleSpeed: 100 });
      NProgress.start();
      setFade(false);
    }
    const fetch = setTimeout(
      async () => {
        await fetchTrailer(type, media_type).then((res) => {
          setTrailer(res);
          const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
              let element = entry.target;
              setTimeout(
                () => {
                  setFade(false);
                  setTimeout(
                    () => {
                      const loadImage = (image) => {
                        return new Promise((resolve, reject) => {
                          const loadImg2 = new Image();
                          loadImg2.src = res[0].background;
                          const loadImg = new Image();
                          loadImg.src = image.backdrop_path;
                          loadImg.onload = () => {
                            resolve(image.url); // call then()
                            props.getUrl(res[0].background);
                          };
                          loadImg.onerror = (err) => reject(err); //call catch()
                        });
                      };
                      Promise.all(
                        res.slice(0, 4).map((image) => loadImage(image))
                      )
                        .then(() => {
                          setTimeout(
                            () => {
                              element
                                .querySelectorAll("img")
                                .forEach((item) => {
                                  item.src = item.dataset.src;
                                });
                              NProgress.done();
                              setFirstLoad(false);
                              setFade(true);
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
                firstLoad ? 300 : 0
              );
              observer.unobserve(ref.current);
            }
          }, options);
          if (ref.current) {
            observer.observe(ref.current);
          }
          firstLoad && setTimeout(() => setFade(true), 0);
        });
      },
      firstLoad ? 0 : 400
    );
    return () => clearTimeout(fetch);
    //eslint-disable-next-line
  }, [ref, type, media_type]);

  return (
    <Fade in={fade} timeout={firstLoad ? 800 : 450}>
      <div className="trailer container" ref={ref}>
        {key && (
          <ModalVideo
            channel="youtube"
            autoplay
            isOpen={isOpen}
            videoId={key}
            onClose={() => setOpen(false)}
          />
        )}
        <Swiper
          freeMode={true}
          grabCursor={false}
          centeredSlides={false}
          spaceBetween={20}
          slidesPerView={"auto"}
          speed={400}
          onReachBeginning={() =>
            root.style.setProperty("--opacityTrailer", "1")
          }
          onSliderFirstMove={() =>
            root.style.setProperty("--opacityTrailer", "0")
          }
        >
          {items}
          <SwiperSlide
            className="d-flex justify-content-center align-items-center"
            style={{ width: "40px", top: "128px" }}
          >
            <h4 style={{ paddingLeft: "0px" }}> </h4>
          </SwiperSlide>
        </Swiper>
      </div>
    </Fade>
  );
};

export default memo(Index);
