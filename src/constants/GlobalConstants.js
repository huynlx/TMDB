export const FILE_SIZE = 1048576; //1MB
export const TMDB_IMAGE = "https://image.tmdb.org/t/p/";
export const embedMovie = (id) => `https://2embed.org/embed/${id}`;
export const embedEpisode = (id, season, episode) => `https://2embed.org/embed/series?tmdb=${id}&sea=${season}&epi=${episode}`;
export const imageResize = (src, dimension = "w200") => `${TMDB_IMAGE}${dimension}${src}`;
export const imageOriginal = (src) => `${TMDB_IMAGE}original${src}`;