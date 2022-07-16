import { GalleryApi } from './galleryApi';
import { createAlertFailure } from './alert';
import { onPosterClick } from './modal';
import { updateDataForLocalStorage } from './modal';
import createFilmCards from '../templates/filmCards.hbs';

const formEl = document.querySelector('#search-form');
const containerEl = document.querySelector('.cards-film_list');

formEl.addEventListener('submit', onFormSubmit);

export const galleryApi = new GalleryApi();

let arrayAllGenresMovie = null;
createArrayOfGenres();
createRandomMarkup();

function onFormSubmit(event) {
  event.preventDefault();
  galleryApi.page = 1;
  galleryApi.query = event.currentTarget.elements.searchQuery.value.trim();

  changePerPageOfQuery();

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

      changeIdOfGenreToName(data.results);
      changeDateInArrayOfResults(data.results);
      containerEl.innerHTML = createFilmCards(data.results);
      containerEl.addEventListener('click', onPosterClick);
    })
    .catch(error => createAlertFailure(error));
}

function createRandomMarkup() {
  galleryApi
    .fetchRandomMovies()
    .then(data => {
      changePerPageOfQuery();

      changeIdOfGenreToName(data.results);
      changeDateInArrayOfResults(data.results);
      containerEl.innerHTML = createFilmCards(data.results);
      containerEl.addEventListener('click', onPosterClick);
    })
    .catch(error => createAlertFailure(error));
}

function changePerPageOfQuery() {
  const mediaScreen = document.documentElement.clientWidth;

  if (mediaScreen < 1280 && mediaScreen >= 768) {
    galleryApi.perPage = 18;
  } else {
    galleryApi.perPage = 20;
  }
}

function createArrayOfGenres() {
  galleryApi.fetchGenres().then(data => {
    arrayAllGenresMovie = data;
  });
}

function changeIdOfGenreToName(arrayOfResults) {
  const arrayIdOfGenres = arrayOfResults.map(el => el.genre_ids);

  for (let i = 0; i < arrayIdOfGenres.length; i++) {
    arrayIdOfGenres[i].forEach((el, index, array) => {
      const object = arrayAllGenresMovie.find(genre => genre.id === el);
      array[index] = object.name;
    });
  }
  arrayOfResults.map((el, index) => (el.genre_ids = arrayIdOfGenres[index]));
}

function changeDateInArrayOfResults(arrayOfResults) {
  const arrayDateOfMovies = arrayOfResults.map(el => el.release_date);

  arrayDateOfMovies.forEach((el, index, array) => {
    array[index] = el.split('-')[0];
  });
  arrayOfResults.map(
    (el, index) => (el.release_date = arrayDateOfMovies[index])
  );
}
