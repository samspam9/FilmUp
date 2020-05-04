const API_ENTRY = 'http://3.95.160.192:3000';

export default class FilmUpAPI {
  static async fetchMovies(query = '') {
    const res = await (await fetch(`${API_ENTRY}/search?q=${query}`)).json();
    return res;
  }

  static async fetchMovieInfo(id) {
    const res = await (await fetch(`${API_ENTRY}/movie/${id}`)).json();
    return res;
  }
}
