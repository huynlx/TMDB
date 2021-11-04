import { useState, useEffect, memo } from "react";
import { popularMovie } from "../../api/popularMovie";
import { popularTv } from "../../api/popularTv";
import { popularPeople } from "../../api/popularPeople";
import "../../scss/components/Popular_page.scss";
import { Box, CircularProgress, Container, Grid } from "@material-ui/core";
import PopularResults from "./PopularResults";
import Loader from "../Loading/Loader";
import Movie from "./Movie";
import Footer from "../Footer/Footer";
import { useMediaQuery } from "react-responsive";
const Index = ({ props }) => {
  const root = document
    .getElementsByTagName("HTML")[0]
    .getAttribute("data-theme");
  const params = props.match.params;
  const page = parseInt(params.page);
  const { query, type } = params;
  const [results, setResults] = useState({
    movie: {
      results: ''
    },
    tv: {
      results: ''
    }
  });
  const [loading, setLoading] = useState(true);
  const [resultsLoading, setResultsLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      setResultsLoading(true);
      const searchResults = await Promise.all([
        popularMovie(query, page),
        popularTv(query, page),
        popularPeople(query, page),
      ]);
      const [movie, tv, people] = searchResults;
      setResults({
        movie: {
          ...movie,
          results: [
            // ...results.movie.results,
            ...movie.results
          ]
        },
        tv: {
          ...tv,
          results: [
            // ...results.tv.results,
            ...tv.results
          ]
        },
        people
      });
      setLoading(false);
      const loadImage = (image) => {
        return new Promise((resolve, reject) => {
          const loadImg = new Image();
          loadImg.src = image.poster_path;
          loadImg.onload = () => resolve(image.url); // call then()
          loadImg.onerror = (err) => reject(err); //call catch()
        });
      };
      var dkm = type === "person" ? people : type === "movie" ? movie : tv;
      Promise.all(
        dkm.results
          .slice(0, isMobileDevice ? 3 : 8)
          .map((image) => loadImage(image))
      )
        .then(() => setResultsLoading(false))
        .catch((err) => console.log("Failed to load images", err));
    };
    fetchData();
    // eslint-disable-next-line
  }, [query, page]);
  const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 991.98px)",
  });
  console.log(results);
  return loading ? (
    <Loader />
  ) : (
    <>
      <div id="search">
        <Container>
          <Grid container spacing={3}>
            <Grid item md={3} xs={12}>
              <PopularResults
                params={params}
                movieResults={results}
                type={type}
              ></PopularResults>
            </Grid>
            <Grid
              item
              md={9}
              xs={12}
              style={{ paddingLeft: !isMobileDevice ? "14px" : "12px" }}
            >
              {resultsLoading ? (
                <Box
                  height={350}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <CircularProgress
                    color={root === "dark" ? "secondary" : "primary"}
                  />
                </Box>
              ) : (
                <>
                  {type === "movie" && (
                    <Movie type={type} movie={results.movie} params={params} />
                  )}
                  {type === "tv" && (
                    <Movie type={type} movie={results.tv} params={params} />
                  )}
                  {type === "person" && (
                    <Movie type={type} movie={results.people} params={params} />
                  )}
                </>
              )}
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default memo(Index);
