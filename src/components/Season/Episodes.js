import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import handleDate from "../../helpers/handleDate";
import { no_poster } from "../../assets";

const Episodes = ({ data, slug, theme }) => {
  return (
    <div className="episode">
      <h4>
        Episodes <span>{data.episode_count}</span>
      </h4>
      {data.episodes.map((item, index) => (
        <div
          className="cardItem"
          key={item.id}
          style={{ borderColor: theme === "dark" && "rgb(49, 49, 49)" }}
        >
          <div className="wrapped" key={item.id}>
            <div className="wrapImg">
              <img
                src={item.still_path}
                alt=""
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null; // prevents looping
                  e.currentTarget.src = no_poster;
                  e.currentTarget.style.transform = "scale(0.5)";
                  e.currentTarget.style.objectFit = "contain";
                }}
                onLoad={({ currentTarget }) => {
                  currentTarget.style.opacity = 1;
                }}
              />
            </div>
            <div className="root w-100">
              <h5>
                {item.episode_number}&nbsp;
                <span>
                  &#9733; &nbsp;{parseFloat(item.vote_average).toFixed(1)}
                </span>{" "}
                {item.name} <small>{handleDate(item.air_date)}</small>
              </h5>
              <p className="mb-0">
                {item.overview !== ""
                  ? item.overview
                  : "We don't have an overview translated in English."}
              </p>
            </div>
          </div>
          <div
            className="expand"
            style={{ borderColor: theme === "dark" && "rgb(49, 49, 49)" }}
          >
            <p
              className="mb-0"
              onMouseOver={({ currentTarget }) =>
                (currentTarget.style.color = "#7f7f7f")
              }
            >
              <Link
                to={{
                  pathname: `/tv/${slug.id}-${slug.title}/watch`,
                  query: {
                    episode: item.episode_number,
                    season: data.season_number,
                    indexSeason: data.index_season,
                    indexEpisode: index,
                  },
                }}
              >
                &#9654; &nbsp;Watch Now
              </Link>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Episodes;
