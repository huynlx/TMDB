/* eslint-disable */
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import chuyenDoiUrl from "./../../helpers/urlSlug";
import { Typography } from "@material-ui/core";
import styled from "styled-components";
import MediaVideo from "./MediaVideo";
import MediaBackdrop from "./MediaBackdrop";
import MediaPoster from "./MediaPoster";
import MediaPopular from "./MediaPopular";
import { respondTo } from "../../helpers/_respondTo";

export const Span = styled.span`
  position: absolute;
  bottom: 12px;
  transition: left 0.25s ease-in-out, width 0.2s 0.1s;
  @media ${respondTo.md} {
    transition: all 0s;
  }
  height: 4px;
  background-color: var(--aColor);
  left: 0;
  width: 69px;
  pointer-events: none;
`;
export const viewMore = () => {
  return (
    <Typography
      style={{
        fontSize: "1.25rem",
        width: "200px",
        textAlign: "center",
        fontWeight: "normal",
      }}
    >
      View More <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
    </Typography>
  );
};
export const onTabClick = (evt, root) => {
  root.style.setProperty("--opacityMedia", "1");
  setLineStyle(evt.target);
};
export const setLineStyle = (tab) => {
  let line = document.querySelector(".nav > .line");
  line.style.left = tab.offsetLeft + "px";
  line.style.width = tab.clientWidth + "px";
};
const Media = (props) => {
  const root = document.documentElement;
  const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 991.98px)",
  });
  const movie = props.movie;
  const [choose, setChoose] = useState({
    mostPopular: isMobileDevice ? false : true,
    video: isMobileDevice ? true : false,
    backdrop: false,
    poster: false,
  });
  const [link, setLink] = useState({
    activeLink: isMobileDevice ? 1 : 0,
  });
  const handleClick = (id) => {
    setLink({ activeLink: id });
  };
  const [viewAll, setViewAll] = useState("");
  useEffect(() => {
    const tabs = document.querySelectorAll(".nav > .nav-link");
    tabs.forEach((tab, index) => {
      tab.onclick = (event) => onTabClick(event, root);
      if (index === 0) setLineStyle(tab);
    });
  }, []);

  return (
    <>
      <nav className="nav justify-content-start pl-lg-3 pl-0 position-relative">
        <a>Media</a>
        {!isMobileDevice && (
          <a
            className={"nav-link" + (0 === link.activeLink ? " selected" : "")}
            onClick={() => {
              setChoose({
                mostPopular: true,
                video: false,
                backdrop: false,
                poster: false,
              });
              handleClick(0);
              setViewAll("");
            }}
          >
            Most Popular
          </a>
        )}
        <a
          className={"nav-link" + (1 === link.activeLink ? " selected" : "")}
          onClick={() => {
            setChoose({
              mostPopular: false,
              video: true,
              backdrop: false,
              poster: false,
            });
            handleClick(1);
            setViewAll("Videos");
          }}
        >
          Videos&nbsp;<span>{movie.videos.length}</span>
        </a>
        <a
          className={"nav-link" + (3 === link.activeLink ? " selected" : "")}
          onClick={() => {
            setChoose({
              mostPopular: false,
              video: false,
              backdrop: true,
              poster: false,
            });
            handleClick(3);
            setViewAll("Backdrops");
          }}
        >
          Backdrops&nbsp;<span>{movie.images.backdrop_path.length}</span>
        </a>
        <a
          className={"nav-link" + (2 === link.activeLink ? " selected" : "")}
          onClick={() => {
            setChoose({
              mostPopular: false,
              video: false,
              backdrop: false,
              poster: true,
            });
            handleClick(2);
            setViewAll("Posters");
          }}
        >
          Posters&nbsp;<span>{movie.images.poster_path.length}</span>
        </a>
        {!isMobileDevice && viewAll === "Videos" && (
          <Link
            className="mr-0"
            to={
              "/movie/" +
              movie.id +
              "-" +
              chuyenDoiUrl(movie.titleEN) +
              "/videos/Trailers"
            }
            style={{ color: "#01B4E4" }}
          >
            View All {viewAll}
          </Link>
        )}
        {!isMobileDevice && viewAll === "Backdrops" && (
          <Link
            className="mr-0"
            to={
              "/movie/" +
              movie.id +
              "-" +
              chuyenDoiUrl(movie.titleEN) +
              "/images/backdrops"
            }
            style={{ color: "#01B4E4" }}
          >
            View All {viewAll}
          </Link>
        )}
        {!isMobileDevice && viewAll === "Posters" && (
          <Link
            className="mr-0"
            to={
              "/movie/" +
              movie.id +
              "-" +
              chuyenDoiUrl(movie.titleEN) +
              "/images/posters"
            }
            style={{ color: "#01B4E4" }}
          >
            View All {viewAll}
          </Link>
        )}
        <Span className="line"></Span>
      </nav>
      <div className="portfolio">
        {choose.video && <MediaVideo movie={movie} />}
        {choose.backdrop && <MediaBackdrop movie={movie} />}
        {choose.poster && <MediaPoster movie={movie} />}
        {choose.mostPopular && !isMobileDevice && (
          <MediaPopular
            video={movie.videos}
            backdrop={movie.images.backdrop_path}
            poster={movie.images.poster_path}
          />
        )}
      </div>
      <div className="hr">
        {" "}
        <hr
          style={{
            margin: "30px 0px",
            borderColor:
              document
                .getElementsByTagName("HTML")[0]
                .getAttribute("data-theme") === "dark"
                ? "#313131"
                : "",
          }}
        />
      </div>
    </>
  );
};

export default Media;
