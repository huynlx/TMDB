export const FILE_SIZE = 1048576; //1MB
export const TMDB_IMAGE = "https://image.tmdb.org/t/p/";
export const embedMovie = (id) => `https://www.2embed.ru/embed/tmdb/movie?id=${id}`;
export const embedEpisode = (id, season, episode) => `https://www.2embed.ru/embed/tmdb/tv?id=${id}&s=${season}&e=${episode}`;
export const imageResize = (src, dimension = "w200") => `${TMDB_IMAGE}${dimension}${src}`;
export const imageOriginal = (src) => `${TMDB_IMAGE}original${src}`;