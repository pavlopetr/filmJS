import axios, { Axios } from 'axios';

export class ImdbApi {
  BASE_URL = 'https://imdb-api.com/en/API';
  QS = 'SearchTitle';
  TFR = 'YouTubeTrailer';
  #API_KEY = 'k_26818z1s';
  constructor() {
    this.query = null;
  }
  fetchSerchByName = async () => {
    try {
      const response = await axios.get(
        `${this.BASE_URL}/${this.QS}/${this.#API_KEY}/${this.query}`
      );
      const trailerId = response.data.results[0].id;
      this.fetchTrailer(trailerId);
    } catch (error) {
      console.log('error serch');
    }
  };

  fetchTrailer = async trailerId => {
    try {
      const response = await axios.get(
        `${this.BASE_URL}/${this.TFR}/${this.#API_KEY}/${trailerId}`
      );
      const trailerUrlId = response.data.videoId;

      return trailerUrlId;
    } catch (error) {
      console.log('error Trailer');
    }
  };
}
