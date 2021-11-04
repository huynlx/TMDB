import ModalVideo from "react-modal-video";
import { useRef, useState } from "react";

export const scrollLeft = (element, root) => {
  var elmnt = element.current;
  var x = elmnt.scrollLeft;
  if (x === 0) {
    root.style.setProperty("--opacityMedia", "1");
  } else {
    root.style.setProperty("--opacityMedia", "0");
  }
};
const MediaPopular = ({ video, backdrop, poster }) => {
  const root = document.documentElement;
  const refTest = useRef(null);
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
  return !video.length && !backdrop.length && !poster.length ? (
    <p>This most popular is unavailable</p>
  ) : (
    <div
      onScroll={() => scrollLeft(refTest, root)}
      ref={refTest}
      className="d-flex popular"
      style={{ overflowX: "scroll" }}
    >
      {video.length ? (
        <div key={video[0].key}>
          <ModalVideo
            channel="youtube"
            autoplay
            isOpen={isOpen[video[0].key]}
            videoId={video[0].key}
            onClose={() => closeModal(video[0].key)}
          />
          <div
            style={{
              width: "533px",
              height: "300px",
              backgroundImage: `url('https://i.ytimg.com/vi/${video[0].key}/hqdefault.jpg')`,
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
                onClick={() => openModal(video[0].key)}
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
      ) : null}
      {backdrop.length ? (
        <img
          className="backdropPopular"
          src={backdrop[0].url}
          alt=""
          loading="lazy"
        />
      ) : null}
      {poster.length ? (
        <img
          className="posterPopular"
          src={poster[0].url}
          alt=""
          loading="lazy"
        />
      ) : null}
    </div>
  );
};

export default MediaPopular;
