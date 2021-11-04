import {
  Box,
  Card,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStyles } from "../SearchPage/jss";

const PopularResults = ({ params, movieResults, type }) => {
  const theme = {
    darkmode: document
      .getElementsByTagName("HTML")[0]
      .getAttribute("data-theme"),
  };
  const classes = useStyles(theme);
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const allTabs = [
    {
      type: "movie",
      label: "Movies",
      total_results: movieResults.movie.total_results,
    },
    {
      type: "tv",
      label: "Tv Shows",
      total_results: movieResults.tv.total_results,
    },
    {
      type: "person",
      label: "People",
      total_results: movieResults.people.total_results,
    },
  ];
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <Card style={{ borderRadius: "8px" }} className={classes.root}>
      <Box
        p={2}
        color="white"
        style={{
          backgroundColor: theme.darkmode === "light" ? "#01B4E4" : "#333333",
        }}
      >
        <Typography variant="h6">
          {"Popular " + capitalizeFirstLetter(type) + "s"}
        </Typography>
      </Box>
      <Tabs
        TabIndicatorProps={{ style: { display: "none" } }}
        orientation={matches ? "horizontal" : "vertical"}
        variant={matches ? "scrollable" : "fullWidth"}
        scrollButtons="on"
        indicatorColor="primary"
        value={params.type}
      >
        {allTabs.map((tab) => (
          <Tab
            key={tab.type}
            component={Link}
            to={`/${tab.type}/1`}
            selected={tab.type === params.type}
            value={tab.type}
            className={classes.tab}
            label={
              <Typography className={classes.label}>
                {tab.label}
                <span className={classes.span}>
                  {tab.total_results.toLocaleString()}
                </span>
              </Typography>
            }
          ></Tab>
        ))}
      </Tabs>
    </Card>
  );
};

export default PopularResults;
