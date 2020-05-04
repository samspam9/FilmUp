import {BasicMovieInfo} from 'src/types';

const API_ENTRY = 'http://3.95.160.192:3000';

export default class FilmUpAPI {
  static async fetchMovies(query = '') {
    const res = (await (await fetch(`${API_ENTRY}/search?q=${query}`)).json()) as BasicMovieInfo[];
    return res;
  }

  static async fetchMovieInfo(id: string) {
    const res = await (await fetch(`${API_ENTRY}/movie/${id}`)).json();
    return res;
  }
}
