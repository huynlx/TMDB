import { useMediaQuery } from "react-responsive";
import moment from "moment";
import { Link } from "react-router-dom";
import mediumZoom from "medium-zoom";
import ImageZoom from "../../ImageZoom";
import { useRef } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const handleDate = (date) => {
  let dt = moment(date, "YYYY-MM-DD");
  return dt.format("DD-MM-YYYY");
};
const age = (value, value2) => {
  var years =
    new Date(
      (value2 ? new Date(value2) : new Date()) - new Date(value)
    ).getFullYear() - 1970;
  return years;
};
const tooltip = (socialName, className, theme) => (
  <OverlayTrigger
    key="top"
    placement="top"
    overlay={<Tooltip id={`tooltip-top`}>Visit {socialName}</Tooltip>}
  >
    <span
      className={className}
      style={{ filter: theme === "dark" ? "invert(1)" : "invert(0)" }}
    ></span>
  </OverlayTrigger>
);
const Col_Left = (props) => {
  const theme = document
    .getElementsByTagName("HTML")[0]
    .getAttribute("data-theme");
  const zoom = useRef(mediumZoom());
  const person = props.person;
  const birthday = person.birthday !== null ? handleDate(person.birthday) : "-";
  const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 767.98px)",
  });
  return (
    <div className="row">
      <div className="col-12 text-center">
        <ImageZoom
          src={person.profile_path}
          alt="Zoom"
          zoom={zoom.current}
          background="#0E0E0E"
          width={300}
          height={450}
        />
        <div className="text-left pl-md-2">
          {isMobileDevice && (
            <h2 className="text-center">
              <Link to="#">{person.name}</Link>
            </h2>
          )}
          <div className="d-flex mb-3 mb-md-0 links justify-content-center justify-content-md-start">
            {person.social_id.facebook_id && (
              <a
                href={`https://www.facebook.com/${person.social_id.facebook_id}`}
                target="_blank"
                rel="noreferrer"
              >
                {tooltip("Facebook", "facebook_icon", theme)}
              </a>
            )}
            {person.social_id.twitter_id && (
              <a
                href={`https://twitter.com/${person.social_id.twitter_id}`}
                target="_blank"
                rel="noreferrer"
              >
                {tooltip("Twitter", "twitter_icon", theme)}
              </a>
            )}
            {person.social_id.instagram_id && (
              <a
                href={`https://www.instagram.com/${person.social_id.instagram_id}`}
                target="_blank"
                rel="noreferrer"
              >
                {tooltip("Instagram", "instagram_icon", theme)}
              </a>
            )}
          </div>
          <h3 className="">Personal Info</h3>
          <section>
            <p>
              <strong>Known For</strong>
              {person.known_for_department}
            </p>
            <p>
              <strong>Gender</strong>
              {person.gender === 1 ? "Female" : "Male"}
            </p>
            <p>
              <strong>Birthday</strong>
              {birthday +
                (person.deathday
                  ? ""
                  : " " +
                    (birthday !== "-"
                      ? "(" +
                        (person.deathday
                          ? age(person.birthday, person.deathday)
                          : age(person.birthday)) +
                        " years old)"
                      : ""))}
            </p>
            {person.deathday && (
              <p>
                <strong>Day of Death</strong>
                {handleDate(person.deathday) +
                  " " +
                  (birthday !== "-"
                    ? "(" +
                      (person.deathday
                        ? age(person.birthday, person.deathday)
                        : age(person.birthday)) +
                      " years old)"
                    : "")}
              </p>
            )}
            <p>
              <strong>Place of Birth</strong>
              {person.place_of_birth != null ? person.place_of_birth : "-"}
            </p>
            <div
              style={{
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
                textAlign: "justify",
              }}
            >
              <p style={{ lineHeight: "1.9rem", margin: "0px" }}>
                <strong>Also Known As</strong>
                {person.also_known_as.length !== 0
                  ? person.also_known_as.join("\r\n")
                  : "-"}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Col_Left;
