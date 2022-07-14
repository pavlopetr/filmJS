import { GalleryApi } from './js/gallery';
import Notiflix from 'notiflix';
import createCardOfMovie from './templates/filmCards.hbs';

const formEl = document.querySelector('#search-form');
const inputEl = document.querySelector('.imput_form');
const containerEl = document.querySelector('.cards-film_list');

const galleryApi = new GalleryApi();

const OPTIONS = { timeout: 1500 };

let arrayAllGenresMovie = null;
galleryApi.fetchGenres().then(data => {
  arrayAllGenresMovie = data;
});

createRandomMarkup();

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  galleryApi.page = 1;
  galleryApi.query = inputEl.value.trim();

  const mediaScreen = document.documentElement.clientWidth;

  if (mediaScreen < 1280 && mediaScreen >= 768) {
    galleryApi.perPage = 18;
  } else {
    galleryApi.perPage = 20;
  }

  if (galleryApi.query === '') {
    createRandomMarkup();
    createAlertFailure(
      'Sorry, your query is empty, please, make your choice. Below you can see the popular films.'
    );
    return;
  }

  galleryApi
    .fetchMovies()
    .then(data => {
      if (data.results.length === 0) {
        createRandomMarkup();
        throw 'Sorry, there are not movies matching your search query. Please try again. Below you can see the popular films.';
      }

      const arrayIdOfGenres = data.results.map(el => el.genre_ids);
      for (let i = 0; i < arrayIdOfGenres.length; i++) {
        arrayIdOfGenres[i].forEach((el, index, array) => {
          const object = arrayAllGenresMovie.find(genre => genre.id === el);
          array[index] = object.name;
        });
      }
      data.results.map((el, index) => (el.genre_ids = arrayIdOfGenres[index]));

      const arrayDateOfMovies = data.results.map(el => el.release_date);
      arrayDateOfMovies.forEach((el, index, array) => {
        const yearFull = new Date(el).getFullYear();
        array[index] = yearFull;
      });
      data.results.map(
        (el, index) => (el.release_date = arrayDateOfMovies[index])
      );

      containerEl.innerHTML = createCardOfMovie(data.results);
    })
    .catch(error => createAlertFailure(error));
}

function createRandomMarkup() {
  galleryApi
    .fetchRandomMovies()
    .then(data => {
      const mediaScreen = document.documentElement.clientWidth;

      if (mediaScreen < 1280 && mediaScreen >= 768) {
        galleryApi.perPage = 18;
      } else {
        galleryApi.perPage = 20;
      }

      const arrayIdOfGenres = data.results.map(el => el.genre_ids);
      for (let i = 0; i < arrayIdOfGenres.length; i++) {
        arrayIdOfGenres[i].forEach((el, index, array) => {
          const object = arrayAllGenresMovie.find(genre => genre.id === el);
          array[index] = object.name;
        });
      }
      data.results.map((el, index) => (el.genre_ids = arrayIdOfGenres[index]));

      const arrayDateOfMovies = data.results.map(el => el.release_date);
      arrayDateOfMovies.forEach((el, index, array) => {
        const yearFull = new Date(el).getFullYear();
        array[index] = yearFull;
      });
      data.results.map(
        (el, index) => (el.release_date = arrayDateOfMovies[index])
      );

      containerEl.innerHTML = createCardOfMovie(data.results);
    })
    .catch(error => createAlertFailure(error));
}

function createAlertFailure(message) {
  return Notiflix.Notify.failure(message, OPTIONS);
}
