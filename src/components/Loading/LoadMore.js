import { Box, Button, CircularProgress } from "@material-ui/core";
import { memo, useState } from "react";

const LoadMore = ({ loading, handleClick }) => {
  const [hover, setHover] = useState(false);
  const style = {
    backgroundColor: "#01B4E4",
    fontWeight: "700",
    fontSize: "24px",
    color: hover ? "black" : "white",
    boxShadow: "none",
    marginTop: "20px",
  };
  const root = document
    .getElementsByTagName("HTML")[0]
    .getAttribute("data-theme");
  return loading ? (
    <Box
      display="flex"
      justifyContent="center"
      style={{ padding: "4px 0px", marginTop: "20px" }}
    >
      <CircularProgress color={root === "dark" ? "secondary" : "primary"} />
    </Box>
  ) : (
    <Button style={style} variant="contained" fullWidth onClick={handleClick}>
      <p
        className="m-0"
        onClick={() => setHover(false)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        Load More
      </p>
    </Button>
  );
};

export default memo(LoadMore);
