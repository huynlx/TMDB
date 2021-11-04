import moment from "moment";
import { useStylesBootstrap } from "./style";
import { Tooltip } from "@material-ui/core";

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
export const genres = (item) => {
  var gen = [];
  item.map((value) => {
    gen.push(value.name);
    return true;
  });
  var i;
  var x = "";
  var seperator = "";
  for (i = 0; i < gen.length; i++) {
    x += seperator + gen[i];
    seperator = ", ";
  }
  return x;
};
export function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();
  return <Tooltip arrow classes={classes} {...props} />; //phải có classes={classes} => để dùng đc "classes"
}
