import { useState, useEffect } from "react";
import { searchMovie } from "../../api/searchMovie";
import { searchTv } from "../../api/searchTv";
import { searchPeople } from "../../api/searchPeople";
import { searchKeyword } from "../../api/searchKeyword";
import { searchCompany } from "../../api/searchCompany";
import { searchCollection } from "../../api/searchCollection";
import "../../scss/components/Popular_page.scss";
import { Box, CircularProgress, Container, Grid } from "@material-ui/core";
import SearchResults from "./SearchResults";
import DoubleRing from "../Loading/DoubleRing";
import Movie from "../PopularPage/Movie";
import Footer from "../Footer/Footer";
import { useMediaQuery } from "react-responsive";
const Index = ({ props }) => {
  const params = props.match.params;
  const page = parseInt(params.page);
  const { query, type } = params;
  // var Type = eval(type);
  const root = document
    .getElementsByTagName("HTML")[0]
    .getAttribute("data-theme");
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);
  const [resultsLoading, setResultsLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      setResultsLoading(true);
      const searchResults = await Promise.all([
        searchMovie(query, page),
        searchTv(query, page),
        searchPeople(query, page),
        searchKeyword(query, page),
        searchCompany(query, page),
        searchCollection(query, page),
      ]);
      const [movie, tv, person, keyword, companie, collection] = searchResults;
      setResults({ movie, tv, person, keyword, companie, collection });
      setLoading(false);
      const loadImage = (image) => {
        return new Promise((resolve, reject) => {
          const loadImg = new Image();
          loadImg.src = image.poster_path;
          loadImg.onload = () => resolve(image.url); // call then()
          loadImg.onerror = (err) => reject(err); //call catch()
        });
      };
      Promise.all(
        // eslint-disable-next-line
        eval(type)
          .results.slice(0, 6)
          .map((image) => loadImage(image))
      )
        .then(() => setResultsLoading(false))
        .catch((err) => setResultsLoading(false));
    };
    fetchData();
    /* eslint-disable-next-line */
  }, [query, page]);
  const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 991.98px)",
  });
  return loading ? (
    <DoubleRing />
  ) : (
    <>
      <div id="search">
        <Container>
          <Grid container spacing={3}>
            <Grid item md={3} xs={12}>
              <SearchResults
                params={params}
                movieResults={results}
                type={type}
                query={query}
              ></SearchResults>
            </Grid>
            <Grid
              item
              md={9}
              xs={12}
              style={{ paddingLeft: !isMobileDevice ? "14px" : "12px" }}
            >
              <section
                style={{ minHeight: !isMobileDevice ? "552px" : "auto" }}
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
                      <Movie
                        type={type}
                        movie={results.movie}
                        params={params}
                        search={true}
                      />
                    )}
                    {type === "tv" && (
                      <Movie
                        type={type}
                        movie={results.tv}
                        params={params}
                        search={true}
                      />
                    )}
                    {type === "person" && (
                      <Movie
                        type={type}
                        movie={results.person}
                        params={params}
                        search={true}
                      />
                    )}
                    {type === "keyword" && (
                      <Movie
                        type={type}
                        movie={results.keyword}
                        params={params}
                      />
                    )}
                    {type === "companie" && (
                      <Movie
                        type={type}
                        movie={results.companie}
                        params={params}
                      />
                    )}
                    {type === "collection" && (
                      <Movie
                        type={type}
                        movie={results.collection}
                        params={params}
                      />
                    )}
                  </>
                )}
              </section>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Index;
