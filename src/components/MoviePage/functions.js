import moment from "moment";
import { useStylesBootstrap } from "./style";
import { Tooltip } from "@material-ui/core";
import { Link } from "react-router-dom";
import urlSlug from '../../helpers/urlSlug';

export function timeConvert(n) {
  var num = n;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return rhours + "h " + rminutes + "m";
}
export const handleDate = (date) => {
  let dt = moment(date, "YYYY-MM-DD");
  return dt.format("DD/MM/YYYY");
};
export const handleDate2 = (date) => {
  let dt = moment(date, "YYYY-MM-DD");
  return dt.format("YYYY");
};


export const genres = (item, type) => {
  return item.map((genre, index) => {
    return <><Link className="genre" to={{
      pathname: `/genre/${genre.id}-${urlSlug(genre.name, true)}/${type}`,
      query: {
        name: genre.name,
      }
    }}>{genre.name}</Link><>{(item.length - 1) !== index && ', \xa0'}</></>
  })
};

export function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();
  return <Tooltip arrow classes={classes} {...props} />; //phải có classes={classes} => để dùng đc "classes"
}
