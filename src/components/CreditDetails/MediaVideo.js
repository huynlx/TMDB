import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import { Link } from "react-router-dom";
import ModalVideo from "react-modal-video";
import chuyenDoiUrl from "./../../helpers/urlSlug";
import { viewMore } from "./Media";
import { scrollLeft } from "./MediaPopular";
import { useRef } from "react";

const MediaVideo = ({ movie }) => {
  const root = document.documentElement;
  const refTest = useRef(null);
  const value = movie.videos;
  const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 991.98px)",
  });
  const [isOpen, setOpen] = useState({ id: false });
  const openModal = (id) => {
    setOpen({
      [id]: true,
    });
  };
  const closeModal = (id) => {
    setOpen({
      [id]: false,
    });
  };
  return (
    <>
      {value.length !== 0 ? (
        value.length !== 1 ? (
          <div
            className="d-flex video"
            ref={refTest}
            onScroll={() => scrollLeft(refTest, root)}
            style={{ overflowX: "scroll" }}
          >
            {value.slice(0, 6).map((item, key) => {
              return isMobileDevice ? (
                <iframe
                  key={key}
                  src={item.url}
                  allowFullScreen
                  title="key"
                ></iframe>
              ) : (
                <div key={key}>
                  <ModalVideo
                    channel="youtube"
                    autoplay
                    isOpen={isOpen[item.key]}
                    videoId={item.key}
                    onClose={() => closeModal(item.key)}
                  />
                  <div
                    style={{
                      width: "533px",
                      height: "300px",
                      backgroundImage: `url('https://i.ytimg.com/vi/${item.key}/hqdefault.jpg')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="d-flex  justify-content-center align-items-center"
                    id="video"
                  >
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{
                        paddingLeft: "2px",
                        borderRadius: "100%",
                        width: "65px",
                        height: "65px",
                        background: "rgba(0,0,0,0.7)",
                      }}
                    >
                      <div
                        className="btnPlay"
                        onClick={() => openModal(item.key)}
                        style={{
                          backgroundImage: `url('https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-175-play-806cb05551791b8dedd7f8d38fd3bd806e2d397fcfeaa00a5cc9129f0819fd07.svg')`,
                          width: "35px",
                          height: "35px",
                          filter: "invert(1)",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className=" d-flex justify-content-center align-items-center">
              <Link
                to={
                  "/movie/" +
                  movie.id +
                  "-" +
                  chuyenDoiUrl(movie.title) +
                  "/videos/Trailers"
                }
              >
                {viewMore()}
              </Link>
            </div>
          </div>
        ) : (
          <div className="d-flex video">
            {isMobileDevice ? (
              <div className="embed-responsive embed-responsive-16by9">
                <iframe
                  title=" "
                  style={{ borderRadius: "6px" }}
                  className="embed-responsive-item"
                  src={value[0].url}
                ></iframe>
              </div>
            ) : (
              <div>
                <ModalVideo
                  channel="youtube"
                  autoplay
                  isOpen={isOpen[value[0].key]}
                  videoId={value[0].key}
                  onClose={() => closeModal(value[0].key)}
                />
                <div
                  style={{
                    width: "550px",
                    height: "316.8px",
                    backgroundImage: `url('https://i.ytimg.com/vi/${value[0].key}/hqdefault.jpg')`,
                    backgroundSize: "550px 433px",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "8px",
                  }}
                  className="d-flex  justify-content-center align-items-center"
                  id="video"
                >
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      paddingLeft: "2px",
                      borderRadius: "100%",
                      width: "65px",
                      height: "65px",
                      background: "rgba(0,0,0,0.7)",
                    }}
                  >
                    <div
                      className="btnPlay"
                      onClick={() => openModal(value[0].key)}
                      style={{
                        backgroundImage: `url('https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-175-play-806cb05551791b8dedd7f8d38fd3bd806e2d397fcfeaa00a5cc9129f0819fd07.svg')`,
                        width: "35px",
                        height: "35px",
                        filter: "invert(1)",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      ) : (
        <p>This video is unavailable</p>
      )}
    </>
  );
};

export default MediaVideo;
