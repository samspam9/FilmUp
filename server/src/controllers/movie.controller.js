const axios = require("axios");
const API_KEY = "60f138f6dc815972ead2243ebfabd60b";

async function search(ctx) {
  const query = encodeURIComponent(ctx.query.q);
  const movieList = [];
  const results = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=1`
  );

  for (movie of results.data.results) {
    movieList.push({
      id: movie.id,
      poster: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
      title: movie.title,
    });
  }
  ctx.ok(movieList);
}

async function getDetails(ctx) {
  const id = ctx.params.id;
  const results = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
  );

  ctx.ok(results.data);
}

module.exports = {
  search,
  getDetails,
};
