import { Box, useMediaQuery } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  ul: {
    "& .MuiPaginationItem-root": {
      color: (theme) => (theme.darkmode === "dark" ? "#fff" : "#000"),
    },
    "& .Mui-selected": {
      backgroundColor: (theme) =>
        theme.darkmode === "dark" ? "#111111" : "#E0E0E0",
    },
  },
}));
const PaginationBar = ({ total_pages, params, type }) => {
  const theme = {
    darkmode: document
      .getElementsByTagName("HTML")[0]
      .getAttribute("data-theme"),
  };
  const { ul } = useStyles(theme); //tham số truyền vào của useStyles phải là object
  const history = useHistory();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const handleChange = (event, value) => {
    if (params.query) {
      history.push(`/search/${params.type}/${params.query}/${value}`);
    } else {
      history.push(`/${params.type}/${value}`);
    }
  };
  return (
    total_pages > 1 && (
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          className={ul}
          count={total_pages}
          page={parseInt(params.page)}
          onChange={handleChange}
          shape="rounded"
          size={!matches ? "medium" : "small"}
        />
      </Box>
    )
  );
};

export default PaginationBar;
