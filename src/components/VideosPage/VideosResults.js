import {
  Box,
  Card,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useStyles } from "../SearchPage/jss";

const VideosResults = ({ params, data, options, mediaType }) => {
  const color = useSelector((state) => state.color);
  const type = params;
  const root = document
    .getElementsByTagName("HTML")[0]
    .getAttribute("data-theme");
  const theme = {
    darkmode: root,
  };
  const classes = useStyles(theme);
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const allTabs = [
    {
      type: "Trailers",
      label: "Trailers",
      total_results: options.Trailers.length,
    },
    {
      type: "Teasers",
      label: "Teasers",
      total_results: options.Teasers.length,
    },
    {
      type: "Clips",
      label: "Clips",
      total_results: options.Clips.length,
    },
    {
      type: "Scenes",
      label: "Behind the Scenes",
      total_results: options.Scenes.length,
    },
    {
      type: "Bloopers",
      label: "Bloopers",
      total_results: options.Bloopers.length,
    },
    {
      type: "Featurettes",
      label: "Featurettes",
      total_results: options.Featurettes.length,
    },
  ];
  const allTabsTv = [
    ...allTabs,
    {
      type: "Opening",
      label: "Opening Credits",
      total_results: options.Opening.length,
    },
  ];
  return (
    <Card style={{ borderRadius: "8px" }} className={classes.root}>
      <Box
        p={2}
        color="white"
        style={{
          backgroundColor:
            theme.darkmode === "dark" ? "#333333" : `rgba(${color.backdrop},1)`,
          color: theme.darkmode === "dark" ? "white" : color.text,
          borderBottom: document.getElementsByTagName("HTML")[0].getAttribute("data-theme") === "light" ? "1px solid #d7d7d7" : "none"
        }}
      >
        <Typography variant="h6">Videos</Typography>
      </Box>
      <Tabs
        orientation={matches ? "horizontal" : "vertical"}
        variant={matches ? "scrollable" : "fullWidth"}
        scrollButtons="on"
        indicatorColor="primary"
        value={type}
        TabIndicatorProps={{
          style: {
            backgroundColor:
              theme.darkmode === "dark"
                ? "#333333"
                : `rgba(${color.backdrop},1)`,
          },
        }}
      >
        {mediaType === "movie"
          ? allTabs.map((tab) => (
            <Tab
              key={tab.type}
              component={Link}
              to={`/movie/${data.id}-${data.title}/videos/${tab.type}`}
              selected={tab.type === type}
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
          ))
          : allTabsTv.map((tab) => (
            <Tab
              key={tab.type}
              component={Link}
              to={`/tv/${data.id}-${data.title}/videos/${tab.type}`}
              selected={tab.type === type}
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

export default VideosResults;
