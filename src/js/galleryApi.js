import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export class GalleryApi {
  #API_KEY = 'f529977bca559aa35fc4139c14353d12';

  constructor() {
    this.page = 1;
    this.query = null;
    this.perPage = null;
    this.arrayOfGenres = null;
    this.watchArr = [];
    this.queueArr = [];
    this.id = null;
  }

  fetchSearchMovies() {
    axios.defaults.params = {
      api_key: this.#API_KEY,
      query: this.query,
      per_page: this.perPage,
      page: this.page,
    };

    return axios(`/search/movie`).then(response => response.data);
  }

  fetchTrendingMovies(page) {
    axios.defaults.params = {
      api_key: this.#API_KEY,
      page: page,
    };

    return axios(`/trending/movie/day`).then(response => response.data);
  }

  fetchGenres() {
    axios.defaults.params = {
      api_key: this.#API_KEY,
      language: 'en-US',
    };

    return axios(`/genre/movie/list`).then(response => response.data.genres);
  }

  fetchMovieById(id) {
    axios.defaults.params = {
      api_key: this.#API_KEY,
    };
    return axios(`/movie/${id}`).then(response => response.data);
  }
}
