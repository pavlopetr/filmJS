import { galleryApi } from './randomFilms';
import { onPosterClick } from './modal';
import createLibraryCards from '../templates/libraryCards.hbs';
import { createAlertFailure } from './alert';

const containerLibraryElement = document.querySelector('.library-film_list');

const buttonWatchEl = document.querySelector('button[data-watched]');
const buttonQueueEl = document.querySelector('button[data-queue]');

// if (document.location.href === 'http://localhost:60573/library.html') {
//   createMarkupWatchLocalStorage();
// }

if (
  document.location.href ===
  'http://mykhailotsynkevych.github.io/Filmoteka/library.html'
) {
  createMarkupWatchLocalStorage();
}

function onButtonWatchEl(event) {
  createMarkupWatchLocalStorage();
  event.target.style.backgroundColor = '#ff6b01';
  event.target.style.border = 'none';
  buttonQueueEl.style.backgroundColor = 'transparent';
  buttonQueueEl.style.border = '1px solid #fff';
}

function onButtonQueueEl(event) {
  createMarkupQueueLocalStorage();
  event.target.style.backgroundColor = '#ff6b01';
  event.target.style.border = 'none';
  buttonWatchEl.style.backgroundColor = 'transparent';
  buttonWatchEl.style.border = '1px solid #fff';
}

function createMarkupWatchLocalStorage() {
  containerLibraryElement.innerHTML = '';
  if (galleryApi.watchArr.length === 0) {
    createAlertFailure("You don't have watched films in your library");
  }
  for (let i of galleryApi.watchArr) {
    galleryApi
      .fetchMovieById(i)
      .then(data => {
        data.release_date = data.release_date.split('-')[0];
        const markup = createLibraryCards(data);
        containerLibraryElement.insertAdjacentHTML('beforeend', markup);
        containerLibraryElement.addEventListener('click', onPosterClick);
        buttonWatchEl.addEventListener('click', onButtonWatchEl);
        buttonQueueEl.addEventListener('click', onButtonQueueEl);
      })
      .catch(error => createAlertFailure(error));
  }
}

function createMarkupQueueLocalStorage() {
  containerLibraryElement.innerHTML = '';
  if (galleryApi.queueArr.length === 0) {
    createAlertFailure("You don't have watched films in your library");
  }
  for (let i of galleryApi.queueArr) {
    galleryApi
      .fetchMovieById(i)
      .then(data => {
        data.release_date = data.release_date.split('-')[0];
        const markup = createLibraryCards(data);
        containerLibraryElement.insertAdjacentHTML('beforeend', markup);
        containerLibraryElement.addEventListener('click', onPosterClick);
      })
      .catch(error => createAlertFailure(error));
  }
}
