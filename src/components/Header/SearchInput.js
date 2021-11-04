import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";
import { memo, useEffect, useState } from "react";
import { searchMovie } from "./../../api/searchMovie";
import { Autocomplete } from "@material-ui/lab";
import { InputBase, makeStyles, MuiThemeProvider } from "@material-ui/core";
import { theme2, theme3 } from "../LoginPage/LoginForm";

const Form = styled.form`
  position: relative;
  margin: 0px auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const useStyles = makeStyles((theme) => ({
  input: (props) => ({
    padding: theme.spacing(1.5, 1, 1.5, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(props.paddingLeft + 2)}px)`,
    width: "100%",
    "&:placeholder-shown": {
      fontStyle: "italic",
    },
  }),
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  complete: {
    display: "flex",
    width: "100%",
  },
  icon: (props) => ({
    position: "absolute",
    display: "flex",
    top: "50%",
    transform: "translateY(-50%)",
  }),
}));

const SearchInput = ({ searchRef, paddingLeft = 0, vl }) => {
  var blank = /^\s*$/; //blank => true, ! => false
  const classes = useStyles({ paddingLeft });
  const history = useHistory();
  const toggle = document
    .getElementsByTagName("HTML")[0]
    .getAttribute("data-theme");
  const [dt, setDt] = useState("the");
  const [options, setOptions] = useState([]);
  const handleInputChange = (event, value) => {
    setDt(value); //set để chạy useEffect
  };
  const handleChange = (event, value) => {
    if (!blank.test(value) && value !== null) {
      history.push(`/search/movie/${value}/1`);
    }
  };
  useEffect(() => {
    let isMounted = true;
    const fetchOption = async () => {
      var blank = /^\s*$/;
      if (!blank.test(dt)) {
        const results = isMounted && (await searchMovie(dt, 1)).results;
        setOptions(results.map((movie) => movie.title));
      }
    };
    if (vl) {
      setDt("");
    }
    fetchOption();
    return () => {
      isMounted = false;
    };
  }, [dt, vl]);
  return (
    <Form
      onSubmit={(e) => e.preventDefault()} //chưa gõ gì mà bấm enter => onSubmit()
    >
      <MuiThemeProvider theme={toggle === "dark" ? theme2 : theme3}>
        <Autocomplete
          className={classes.complete}
          onChange={handleChange} //bấm vào option => handleChange(), gõ xong mới enter => handleChange()
          freeSolo
          options={options}
          filterOptions={(options) => options} //fix Autocomplete ko hiện đủ options
          ref={searchRef}
          inputValue={dt} //giá trị mặc định
          onInputChange={handleInputChange}
          renderInput={(params) => (
            <>
              <div className={classes.icon}>
                <SearchIcon />
              </div>
              <InputBase
                autoFocus
                ref={params.InputProps.ref}
                inputProps={{ ...params.inputProps }}
                placeholder="Search for a movie, tv show, person..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.input,
                }}
              />
            </>
          )}
        />
      </MuiThemeProvider>
    </Form>
  );
};

export default memo(SearchInput);
