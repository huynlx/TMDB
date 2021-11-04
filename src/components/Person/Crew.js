import { useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import chuyenDoiUrl from "./../../helpers/urlSlug";
import Popover from "./Popover";
const handleDate2 = (date) => {
  if (date) {
    let dt = moment(date, "YYYY-MM-DD");
    return dt.format("YYYY");
  } else {
    return "—";
  }
};
const Crew = ({ person, final, data }) => {
  const theme = document
    .getElementsByTagName("HTML")[0]
    .getAttribute("data-theme");
  const [icon, setIcon] = useState({
    id: false,
  });
  const changeIcon = (id) => {
    setIcon({ [id]: !icon[id] });
  };
  const finalData = {};
  final.map((item) => {
    finalData[item] = data[item].map((value) => ({
      ...value,
      date: handleDate2(value.release_date),
    }));
    return true;
  });
  const sort = {};
  final.map((item) => {
    sort[item] = finalData[item].sort(function (a, b) {
      return (
        (b.date === "-") - (a.date === "-") ||
        -(a.date > b.date) ||
        +(a.date < b.date)
      );
    });
    return true;
  });

  // get year
  const combine = {};
  final.map((value) => {
    const x = sort[value].map((item) => {
      return item.date;
    });
    //remove duplicate year
    combine[value] = x.filter(function (value, index) {
      return x.indexOf(value) === index;
    });
    return true;
  });
  const test = {}; //đây rồi chính là nó
  final.map((value) => {
    test[value] = {};
    combine[value].map((value2) => {
      test[value][value2] = finalData[value].filter(
        (item) => item.date === value2
      );
      return true;
    });
    return true;
  });
  return (
    <>
      {final.map((value, key) => {
        return (
          <div key={key} className={value.toLowerCase() + " common"}>
            <h3>{value}</h3>
            <table className="card credits" style={{ borderRadius: "0px" }}>
              <tbody>
                {combine[value].map((value2, key) => (
                  <tr id={value2} key={key} className="list">
                    <td>
                      <table className="credits_group">
                        <tbody>
                          {test[value][value2].reverse().map((item, index) => (
                            <tr key={index}>
                              <td className="year">{value2}</td>
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
                                    "/movie/" +
                                    item.id +
                                    "-" +
                                    chuyenDoiUrl(item.title)
                                  }
                                >
                                  {item.title}
                                </Link>
                                <span className="group">
                                  {!item.job ? (
                                    ""
                                  ) : (
                                    <>
                                      {" "}
                                      <span
                                        style={{
                                          letterSpacing: "2px",
                                          fontWeight: "bold",
                                          color: "var(--as)",
                                          paddingLeft: "4px",
                                        }}
                                      >
                                        ...
                                      </span>{" "}
                                      <span>{item.job}</span>
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
          </div>
        );
      })}
    </>
  );
};

export default Crew;
