export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  ACCESS_TOKEN: process.env.EXPO_PUBLIC_MOVIE_API_ACCESS_TOKEN,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_ACCESS_TOKEN}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    // @ts-ignore
    // console.log(response.statusText);
    throw new Error("Failed to fetch movies", response.statusText);
  }

  const data = await response.json();
  return data.results;
};

// const url = 'https://api.themoviedb.org/3/disocer/movies?include_adult=false&language=en-US&page=1';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzBlYzJlNTVlNWMxYzdmOWY0NTk0OTlkNTc4NTZjNCIsIm5iZiI6MTc1Nzg4Mzg0OS41MTMsInN1YiI6IjY4YzcyZGM5NjhjMWUyZDQ1Y2EwZjNlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w1z_ApVtBSz10rJyXAQm4rGjkXTn88GLCrsXBzZe184'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));
