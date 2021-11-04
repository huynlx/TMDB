import { FormControl, Select, MenuItem } from "@material-ui/core";
import { theme2, theme3 } from "../LoginPage/LoginForm";
import { MuiThemeProvider } from "@material-ui/core";

const SortBy = ({ option, handleChange2, classes, theme }) => {
  return (
    <div style={{ fontWeight: "normal", fontSize: "1.07rem" }}>
      Filter by:
      <MuiThemeProvider theme={theme === "dark" ? theme2 : theme3}>
        <FormControl className={classes.formControl}>
          <Select
            style={{ paddingLeft: "4px" }}
            value={option}
            onChange={handleChange2}
          >
            <MenuItem className={classes.fix} value={"Date Added"}>
              Date Added
            </MenuItem>
            <MenuItem className={classes.fix} value={"Popularity"}>
              Popularity
            </MenuItem>
            <MenuItem className={classes.fix} value={"Release Date"}>
              Release Date
            </MenuItem>
          </Select>
        </FormControl>
      </MuiThemeProvider>
    </div>
  );
};

export default SortBy;
