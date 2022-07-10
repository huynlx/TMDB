import React, { useEffect, useState } from "react";
import { fetchTv } from "../api/fetchTv";
import Top from "../components/TV/PeopleTvPage/Top";
import Loader from "../components/Loading/Loader";
import Footer from "../components/Footer/Footer";
import "../css/Top.scss";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { handleDate2 } from "../components/MoviePage/functions";
import handleDate from "../helpers/handleDate";
import { no_poster } from "../assets";

const Container = styled.div`
  &&& {
    max-width: 100vw;
    padding: 0px 0px;
    min-height: 30vh;
    margin: 0;
    .around {
      width: 100%;
      display: flex;
      justify-content: center;
      border-bottom: 1px solid #d7d7d7;
      border-color: ${(props) => props.theme === "dark" && "rgb(49, 49, 49)"};
    }
    .item {
      max-width: 1300px;
      width: 100%;
      padding: 20px 15px;
      @media (min-width: 991px) {
        padding: 20px 30px;
      }
      .poster {
        background: #dbdbdb;
        border-radius: 8px;
        height: fit-content;
      }
    }
  }
`;

const Image = styled.img`
  width: 100px;
  height: 150px;
  border-radius: 8px;
  align-self: start;
  object-fit: cover;
  transition: all 0.3s;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 0px 0px 20px;
  h4 {
    padding: 0px 8px 0px 0px;
    &:hover {
      color: #7f7f7f;
    }
  }
  p.overview {
    line-height: 1.2;
    margin-top: 1rem;
  }
  span {
    align-self: start;
    font-weight: 600;
    @media (min-width: 991px) {
      align-self: end;
    }
  }
  div {
    flex-direction: column;
    align-items: start;
  }
  @media (min-width: 991px) {
    padding: 0px 0px 0px 30px;
    div {
      flex-direction: row;
      align-items: center;
    }
  }
`;

const SeasonList = (props) => {
  const id = props.match.params.id;
  const title = props.match.params.title;
  const [data, setData] = useState(null);
  const theme = getComputedStyle(document.documentElement)
    .getPropertyValue("--theme")
    .trim();

  useEffect(() => {
    fetchTv(id).then((res) => setData(res));
  }, [id]);

  return data ? (
    <>
      <Top
        data={{
          title,
          id,
        }}
        url={{
          poster_path: data.poster_path,
          title: data.name,
          date: data.first_air_date,
        }}
      />
      <div className="main" style={{ display: "initial" }}>
        <Container theme={theme} className="container py-0">
          {data.seasons.map((item) => (
            <div className="around">
              <div className="d-flex flex-row item">
                <div className="d-flex poster">
                  <Link to={`/tv/${id}-${title}/season/${item.season_number}`}>
                    <Image
                      src={item.poster_path}
                      alt=""
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = no_poster;
                        currentTarget.style.transform = "scale(0.5)";
                      }}
                      className="easeload"
                      onLoad={({ currentTarget }) => {
                        currentTarget.style.opacity = 1;
                        currentTarget.style.objectFit = "initial";
                      }}
                    />
                  </Link>
                </div>
                <Info className="info">
                  <div className="d-flex">
                    <h4 className="mb-0 font-weight-bold">
                      <Link
                        to={`/tv/${id}-${title}/season/${item.season_number}`}
                      >
                        {item.name}
                      </Link>
                    </h4>
                    <span>
                      {handleDate2(item.air_date) +
                        " | " +
                        item.episode_count +
                        " Episodes"}
                    </span>
                  </div>
                  <p className="mb-0">{`Season ${item.season_number} of ${
                    data.name
                  } premiered on ${handleDate(item.air_date)}.`}</p>
                  {item.overview != "" &&
                    item.overview
                      .split("\n")
                      .filter((item) => item != "")
                      .map((p) => <p className="mb-0 overview">{p}</p>)}
                </Info>
              </div>
            </div>
          ))}
        </Container>
      </div>
      <Footer />
    </>
  ) : (
    <Loader />
  );
};

export default SeasonList;
