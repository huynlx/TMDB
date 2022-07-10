import moment from "moment";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { no_poster } from "../../../assets";

const handleDate = (date) => {
  let dt = moment(date, "YYYY-MM-DD");
  return dt.format("YYYY");
};
const Top = (props) => {
  const color = useSelector((state) => state.color);

  return (
    <div
      className="top"
      style={{
        backgroundColor:
          document
            .getElementsByTagName("HTML")[0]
            .getAttribute("data-theme") === "light"
            ? `rgba(${color.backdrop},1)`
            : "#2C3132",
        borderBottom:
          document
            .getElementsByTagName("HTML")[0]
            .getAttribute("data-theme") === "dark" && "none",
      }}
    >
      <div className="container">
        <div className="header">
          <Link
            to={
              "/tv/" +
              props.data.id +
              "-" +
              props.data.title +
              `${
                props.data.seasonnumber
                  ? `/season/${props.data.seasonnumber}`
                  : ""
              }`
            }
          >
            <div className="wrapImg">
              <img
                src={props.url.poster_path}
                alt=""
                width={58}
                height={87}
                loading="eager"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = no_poster;
                  currentTarget.style.transform = "scale(0.5)";
                  currentTarget.style.objectFit = "contain";
                }}
                onLoad={({ currentTarget }) => {
                  currentTarget.style.opacity = 1;
                  currentTarget.style.transform = currentTarget.src.includes(
                    no_poster
                  )
                    ? "scale(0.5)"
                    : "scale(1)";
                  currentTarget.style.objectFit = currentTarget.src.includes(
                    no_poster
                  )
                    ? "contain"
                    : "cover";
                }}
              />
            </div>
          </Link>
          <div
            className="ahihi"
            style={{
              color:
                document
                  .getElementsByTagName("HTML")[0]
                  .getAttribute("data-theme") === "light"
                  ? color.text
                  : "white",
            }}
          >
            <h4 className="display-5">
              <Link
                style={{ color: "inherit" }}
                to={
                  "/tv/" +
                  props.data.id +
                  "-" +
                  props.data.title +
                  `${
                    props.data.seasonnumber
                      ? `/season/${props.data.seasonnumber}`
                      : ""
                  }`
                }
              >
                {props.url.title}
              </Link>
              <span
                style={{ fontWeight: "400", opacity: "0.8", color: "inherit" }}
              >
                &nbsp;{props.url.date && "(" + handleDate(props.url.date) + ")"}
              </span>
            </h4>
            <h3>
              <Link
                style={{ color: "inherit" }}
                to={
                  "/tv/" +
                  props.data.id +
                  "-" +
                  props.data.title +
                  `${props.data.seasonnumber ? `/seasons` : ""}`
                }
              >
                {props.data.seasonnumber >= 0
                  ? "← Back to season list"
                  : "← Back to main"}
              </Link>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top;
