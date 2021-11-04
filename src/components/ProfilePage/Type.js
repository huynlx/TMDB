import { Tabs, Tab } from "@material-ui/core";

const Type = ({
  classes,
  type,
  handleChange,
  movieList,
  tvList,
  select,
  theme,
}) => {
  return (
    <>
      {select !== "edit" ? (
        <Tabs
          TabIndicatorProps={{
            style: { background: theme === "dark" ? "white" : "black" },
          }}
          className={classes.tabs + " mr-auto"}
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
        >
          <Tab
            label={
              <span>
                Movies &nbsp;
                <span style={{ fontSize: "0.9em", color: "#959595" }}>
                  {movieList.length}
                </span>
              </span>
            }
            value="movie"
            className={classes.tab}
          />
          <Tab
            label={
              <span>
                TV &nbsp;
                <span style={{ fontSize: "0.9em", color: "#959595" }}>
                  {tvList.length}
                </span>
              </span>
            }
            value="tv"
            className={classes.tab}
          />
        </Tabs>
      ) : (
        <Tabs
          TabIndicatorProps={{
            style: { background: theme === "dark" ? "white" : "black" },
          }}
          className={classes.tabs + " mr-auto"}
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
        >
          <Tab
            label={<span>Profile</span>}
            value="profile"
            className={classes.tab}
          />
          <Tab
            label={<span>Change password</span>}
            value="password"
            className={classes.tab}
          />
        </Tabs>
      )}
    </>
  );
};

export default Type;
