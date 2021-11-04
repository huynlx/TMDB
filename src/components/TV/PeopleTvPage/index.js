import { useState, useEffect } from "react";
import "../../../scss/components/CastCrew.scss";
import "../../../css/Top.scss";
import Loader from "../../Loading/Loader";
import TopTv from "./Top";
import Cast from "./Cast";
import Crew from "./Crew";
import Footer from "../../Footer/Footer";
import { fetchPeopleTv } from "../../../api/fetchPeopleTv";

const PeopleTv_page = (props) => {
  const [load, setLoad] = useState(true);
  const id = props.props.match.params.id;
  const title = props.props.match.params.title;
  const data = { id, title };
  const [top, setTop] = useState(null);
  const [cast, setCast] = useState(null);
  const [crew, setCrew] = useState(null);
  useEffect(() => {
    const getData = async () => {
      setLoad(true);
      await fetchPeopleTv(id).then((res) => {
        setCast(res.cast);
        setCrew(res.crew);
        const loadImage = (image) => {
          return new Promise((resolve, reject) => {
            const loadImg = new Image();
            loadImg.src = image.profile_path;
            loadImg.onload = () => resolve(image.url); // call then()
            loadImg.onerror = (err) => reject(err); //call catch()
          });
        };
        Promise.all(res.crew.map((image) => loadImage(image)))
          .then(() => {
            setTop(res.item);
            setLoad(false);
          })
          .catch((err) => console.log("Failed to load images", err));
      });
    };
    getData();
  }, [id]);
  return (
    <>
      {top && <TopTv data={data} url={top} />}
      {load ? (
        <Loader />
      ) : (
        <>
          <div className="main">
            <div className="container" style={{ minHeight: "30vh" }}>
              <div className="row mt-3 mt-lg-0">
                <Cast cast={cast} />
                <Crew crew={crew} />
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default PeopleTv_page;
