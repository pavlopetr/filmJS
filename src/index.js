import { GalleryApi } from './js/gallery';
import Notiflix from 'notiflix';
import createCardOfMovie from './templates/filmCards.hbs';
import createModal from './templates/modal.hbs';
import './js/to_LocalStor';

const formEl = document.querySelector('#search-form');
const inputEl = document.querySelector('.imput_form');
const containerEl = document.querySelector('.cards-film_list');
const modal = document.querySelector('.modal');

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
      containerEl.innerHTML = createCardOfMovie(data.results);
      containerEl.addEventListener('click', onContainerClick);
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
      containerEl.innerHTML = createCardOfMovie(data.results);
      containerEl.addEventListener('click', onContainerClick);
    })
    .catch(error => createAlertFailure(error));
}

function onContainerClick(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  galleryApi.fetchMovieById(event.target.id).then(data => {
    const markupModal = createModal(data);
    modal.innerHTML = markupModal;
    modal.closest('.backdrop').classList.remove('is-hidden');
  });
}

function changePerPageOfQuery() {
  const mediaScreen = document.documentElement.clientWidth;

  if (mediaScreen < 1280 && mediaScreen >= 768) {
    galleryApi.perPage = 18;
  } else {
    galleryApi.perPage = 20;
  }
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

function createAlertFailure(message) {
  return Notiflix.Notify.failure(message, OPTIONS);
}
