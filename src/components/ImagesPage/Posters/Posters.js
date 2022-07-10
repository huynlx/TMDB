import { useSelector } from "react-redux";
import { respondTo } from "../../../helpers/_respondTo";
import styled from "styled-components";
import "../../../css/_icon.scss";
import { useRef } from "react";
import mediumZoom from "medium-zoom";
import ImageZoom from "../../../ImageZoom";

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media ${respondTo.md} {
    justify-content: space-between;
  }
`;
const Img = styled.div`
  margin-bottom: 30px;
  margin-right: 15px;
  margin-left: 15px;
  border-radius: 8px;
  // border:1px solid rgb(227,227,227);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  img {
    background-color: #dbdbdb;
    transition: filter 1s linear, transform 0.3s cubic-bezier(0.2, 0, 0.2, 1) !important;
    &.image__loaded {
      filter: blur(0px);
    }
    &.image__loading {
      filter: blur(50px);
    }
  }
  @media ${respondTo.md} {
    flex-basis: 24%;
    margin: 0px 0px 10px;
    img {
      width: 100%;
      height: auto;
    }
  }
  @media ${respondTo.sm} {
    flex-basis: 32%;
    margin: 0px 0px 10px;
    img {
      width: 100%;
      height: auto;
    }
  }
  @media ${respondTo.xs} {
    flex-basis: 48%;
    margin: 0px 0px 14px;
    img {
      width: 100%;
      height: auto;
    }
  }
`;
const Root = styled.div(
  ({ theme }) => `
  padding: 5px 14px;
  ${theme === "dark" && "background:#313131"}
`
);
const Posters = ({ theme }) => {
  const zoom = useRef(mediumZoom());
  const posters = useSelector((state) => state.images.posters);
  return posters.length ? (
    <Div>
      {posters.map((image, key) => (
        <Img key={key}>
          <a href={image.url_original} target="_blank">
            <ImageZoom
              src={image.url}
              alt="Zoom"
              // zoom={zoom.current}
              background="#0E0E0E"
              id={key}
              width={208}
              height={312}
            />
          </a>
          <Root theme={theme}>
            <span style={{ fontSize: "14px", fontWeight: "bold" }}>Size</span>
            <br />
            <div className="d-flex align-items-center">
              <span className="mr-1">
                {image.width}x{image.height}
              </span>
              <span
                className="check_icon d-inline-flex"
                title="This aspect ratio is valid."
                style={{
                  width: "16px",
                  height: "16px",
                  filter: theme === "dark" && "invert(1)",
                }}
              ></span>
            </div>
          </Root>
        </Img>
      ))}
    </Div>
  ) : (
    <p style={{ height: "21vh" }}>There no posters added to this entry.</p>
  );
};
export default Posters;
