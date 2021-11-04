import { useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import chuyenDoiUrl from "./../../helpers/urlSlug";
import Popover from "./Popover";
const handleDate2 = (date) => {
  let dt = moment(date, "YYYY-MM-DD");
  return dt.format("YYYY");
};

const Acting = (props) => {
  const theme = document
    .getElementsByTagName("HTML")[0]
    .getAttribute("data-theme");
  const person = props.person;
  const cast = person.movie_credits.cast;
  const finalCast = cast.map((item) => ({
    ...item,
    date: item.release_date ? handleDate2(item.release_date) : "—",
  }));
  //sort date
  const sortDateCast = finalCast.sort(function (a, b) {
    return (
      (b.date === "-") - (a.date === "-") ||
      -(a.date > b.date) ||
      +(a.date < b.date)
    );
  });
  //get date
  const dm = sortDateCast.map((item) => item.date);
  //remove duplicate date
  const finalDate = dm.filter(function (value, index) {
    return dm.indexOf(value) === index;
  });
  //set year to object
  const test = {};
  finalDate.map((item) => {
    test[item] = sortDateCast.filter((value) => value.date === item);
    return true;
  });
  const [icon, setIcon] = useState({
    id: false,
  });
  const changeIcon = (id) => {
    setIcon({ [id]: !icon[id] });
  };
  return (
    <table className="card credits" style={{ borderRadius: "0px" }}>
      <tbody>
        {finalDate.map((value, key) => (
          <tr key={key} id={value} className="list">
            <td>
              <table className="credits_group">
                <tbody>
                  {test[value].reverse().map((item, index) => (
                    <tr key={index}>
                      <td className="year">{value}</td>
                      <td className="seperator">
                        <Popover
                          id={key + "-" + index}
                          item={item}
                          Link={Link}
                          chuyenDoiUrl={chuyenDoiUrl}
                          changeIcon={changeIcon}
                          icon={icon}
                          theme={theme}
                        />
                      </td>
                      <td className="role">
                        <Link
                          to={
                            "/movie/" + item.id + "-" + chuyenDoiUrl(item.title)
                          }
                        >
                          {item.title}
                        </Link>
                        <span className="group">
                          {!item.character ? (
                            ""
                          ) : (
                            <>
                              {" "}
                              as <span>{item.character}</span>
                            </>
                          )}{" "}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Acting;
