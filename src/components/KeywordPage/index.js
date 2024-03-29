import React, { useEffect, useState } from "react";
import Main from "./Main";
import "../../css/Main.scss";
import Top from "./Top";
import Loader from "../Loading/Loader";
import { fetchKeyword } from "../../api/fetchKeyword";
import { fetchByGenres } from "../../api/fetchByGenres";
import Footer from "../Footer/Footer";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";

const Index = ({ props }) => {
  const { pathname } = useLocation();
  const genreName = props.location.query?.name ?? null;
  const type = pathname.includes("tv") ? "tv" : "movie";
  const id = props.match.params.id;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [page, setPage] = useState(1);
  const handleClick = () => {
    setPage(page + 1);
  };
  const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 991.98px)",
  });
  useEffect(() => {
    const getAPI = async () => {
      const func = (id, page) =>
        pathname.includes("genre")
          ? fetchByGenres(id, type, page)
          : fetchKeyword(id, type, page);
      if (loading) {
        await func(id, page).then((res) => {
          setData(res);
          const loadImage = (image) => {
            return new Promise((resolve, reject) => {
              const loadImg = new Image();
              loadImg.src = image.poster_path;
              loadImg.onload = () => resolve(image.url);
              loadImg.onerror = (err) => reject(err);
            });
          };
          Promise.all(
            res.movies.results.slice(0, 5).map((image) => loadImage(image))
          )
            .then(() => {
              setLoading(false);
            })
            .catch((err) => console.log("Failed to load images", err));
        });
      } else {
        setLoadingBtn(true);
        await func(id, page).then((res) => {
          const loadImage = (image) => {
            return new Promise((resolve, reject) => {
              const loadImg = new Image();
              loadImg.src = image.poster_path;
              loadImg.onload = () => resolve(image.url);
              loadImg.onerror = (err) => reject(err);
            });
          };
          Promise.all(
            res.movies.results
              .slice(0, isMobileDevice ? 3 : 4)
              .map((image) => loadImage(image))
          )
            .then(() => {
              setData({
                ...data,
                movies: {
                  ...data.movies,
                  results: [...data.movies.results, ...res.movies.results],
                },
              });
              setLoadingBtn(false);
            })
            .catch((err) => console.log("Failed to load images", err));
        });
      }
    };
    getAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, page]);

  return (
    <>
      {!loading ? (
        <>
          <Top props={data} type={type} genreName={genreName} />
          <Main
            props={data}
            loadingBtn={loadingBtn}
            handleClick={handleClick}
            page={page}
            type={type}
          />
          <Footer />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Index;
