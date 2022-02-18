/* eslint-disable */
import { useState, useEffect } from "react";
import "../../scss/components/PersonInfo.scss";
import Footer from "./../Footer/Footer";
import { fetchPerson } from "./../../api/fetchPerson";
import Loader from "./../Loading/Loader";
import Col_Left from "./Col_Left";
import Col_Right from "./Col_Right";

const Person = (props) => {
  const [imgLoad, setImgLoad] = useState(false);
  const root = document.documentElement;
  const id = props.props.match.params.id;
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState({});
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await fetchPerson(id).then((res) => {
        setPerson(res);
        const loadImg2 = new Image();
        loadImg2.src = res.profile_path;
        loadImg2.onload = () => {
          setLoading(false);
        };
        const loadImage = (image) => {
          return new Promise((resolve, reject) => {
            const loadImg = new Image();
            loadImg.src = image.poster_path;
            loadImg.onload = () => resolve(image.url);
            loadImg.onerror = (err) => reject(err);
          });
        };
        if (res.movie_credits.cast.length !== 0) {
          Promise.all(
            res.movie_credits.cast.slice(0, 10).map((image) => loadImage(image))
          )
            .then(() => setImgLoad(true))
            .catch((err) => console.log("Failed to load images", err));
        } else if (res.movie_credits.crew.length !== 0) {
          Promise.all(
            res.movie_credits.crew.slice(0, 10).map((image) => loadImage(image))
          )
            .then(() => setImgLoad(true))
            .catch((err) => console.log("Failed to load images", err));
        }
      });
    };
    getData();
    root.style.setProperty("--opacityKnowFor", "1");
  }, [id, root]);

  return loading !== true ? (
    <>
      <div className="person">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Col_Left person={person} />
            </div>
            <div className="col-md-9 pl-md-5">
              <Col_Right person={person} imgLoad={imgLoad} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loader />
  );
};

export default Person;
