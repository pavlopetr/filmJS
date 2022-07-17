import { galleryApi } from './randomFilms';
import { onPosterClick } from './modal';
import createLibraryCards from '../templates/libraryCards.hbs';
import { createAlertFailure } from './alert';
import { updateDataForLocalStorage } from './localStorage';
import { changeColorBtnLibraryClick } from './colorButton';

const containerLibraryElement = document.querySelector('.library-film_list');

const buttonWatchEl = document.querySelector('button[data-watched]');
const buttonQueueEl = document.querySelector('button[data-queue]');

if (document.location.href === 'http://localhost:1234/library.html') {
  createMarkupWatchLocalStorage();
}

// if (
//   document.location.href ===
//   'https://mykhailotsynkevych.github.io/Filmoteka/library.html'
// ) {
//   createMarkupWatchLocalStorage();
// }

function onButtonWatchEl(event) {
  createMarkupWatchLocalStorage();
  changeColorBtnLibraryClick(event, buttonQueueEl);
}

function onButtonQueueEl(event) {
  createMarkupQueueLocalStorage();
  changeColorBtnLibraryClick(event, buttonWatchEl);
}

function createMarkupWatchLocalStorage() {
  updateDataForLocalStorage();
  containerLibraryElement.innerHTML = '';

  if (galleryApi.watchArr.length === 0) {
    createAlertFailure("You don't have watched films in your library");
  }
  for (let i of galleryApi.watchArr) {
    galleryApi
      .fetchMovieById(i)
      .then(data => {
        createMarkupForLibrary(data);
        buttonWatchEl.addEventListener('click', onButtonWatchEl);
        buttonQueueEl.addEventListener('click', onButtonQueueEl);
      })
      .catch(error => createAlertFailure(error));
  }
}

function createMarkupQueueLocalStorage() {
  updateDataForLocalStorage();
  containerLibraryElement.innerHTML = '';

  if (galleryApi.queueArr.length === 0) {
    createAlertFailure("You don't have watched films in your library");
  }
  for (let i of galleryApi.queueArr) {
    galleryApi
      .fetchMovieById(i)
      .then(data => {
        createMarkupForLibrary(data);
      })
      .catch(error => createAlertFailure(error));
  }
}

function createMarkupForLibrary(data) {
  data.release_date = data.release_date.split('-')[0];
  const markup = createLibraryCards(data);
  containerLibraryElement.insertAdjacentHTML('beforeend', markup);
  containerLibraryElement.addEventListener('click', onPosterClick);
}
