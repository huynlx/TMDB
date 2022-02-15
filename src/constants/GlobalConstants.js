export const FILE_SIZE = 1048576; //1MB
export const embedMovie = (id) => `https://www.2embed.ru/embed/tmdb/movie?id=${id}`;
export const embedEpisode = (id, season, episode) => `https://www.2embed.ru/embed/tmdb/tv?id=${id}&s=${season}&e=${episode}`;
