import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';

const apiKey = 'api_key=545b89766536a1810194a2254c99a9cb';

export const apiY = 'AIzaSyBNrUZElVkorq3szg57tq6oUyzOUgtM2bM';

//Get popular movies
export const getPopularMovies = async () => {
  const resp = await axios.get(`${apiUrl}/movie/popular?${apiKey}`);
  return resp.data.results;
};
export const getTopRated = async () => {
  const resp = await axios.get(`${apiUrl}/movie/top_rated?${apiKey}`);
  return resp.data.results;
};
export const getNowPlaying = async () => {
  const resp = await axios.get(`${apiUrl}/movie/now_playing?${apiKey}`);
  return resp.data.results;
};

//Get Upcoming movies
export const getupComingMovies = async () => {
  const resp = await axios.get(`${apiUrl}/movie/upcoming?${apiKey}`);
  return resp.data.results;
};

export const getFamiliyMovies = async () => {
  const resp = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=10751`,
  );
  return resp.data.results;
};
export const getDocumentary = async () => {
  const resp = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=99`,
  );
  return resp.data.results;
};
export const getfantasyMovies = async () => {
  const resp = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=14`,
  );
  return resp.data.results;
};
export const getMovie = async id => {
  const resp = await axios.get(`${apiUrl}/movie/${id}?${apiKey}`);
  return resp.data;
};
export const getVideo = async id => {
  const resp = await axios.get(`${apiUrl}/movie/${id}/videos?${apiKey}`);
  return resp.data.results;
};

//services Tv
export const getPopularTv = async () => {
  const resp = await axios.get(`${apiUrl}/tv/popular?${apiKey}`);
  return resp.data.results;
};

// service search

export const searchMovie = async query => {
  const resp = await axios.get(
    `${apiUrl}/search/movie?${apiKey}&query=${query}`,
  );
  return resp.data.results;
};
