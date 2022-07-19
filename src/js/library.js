import './lightSwitch';
import './teamLightbox';
import ls from './storage';
import { galleryApi } from './randomFilms';
import { onPosterClick } from './modal';
import createLibraryCards from '../templates/libraryCards.hbs';
import { updateDataForLocalStorage } from './localStorage';
import { changeColorBtnLibraryClick } from './colorButton';

const containerLibraryElement = document.querySelector('.library-film_list');
const buttonWatchEl = document.querySelector('button[data-watched]');
const buttonQueueEl = document.querySelector('button[data-queue]');
containerLibraryElement.addEventListener('click', onPosterClick);
const alertInfo = document.querySelector('.library_alert');
buttonWatchEl.addEventListener('click', onButtonWatchEl);
buttonQueueEl.addEventListener('click', onButtonQueueEl);

createMarkupWatchLocalStorage();

function onButtonWatchEl(event) {
  changeColorBtnLibraryClick(event, buttonQueueEl);
  createMarkupWatchLocalStorage();
}

function onButtonQueueEl(event) {
  changeColorBtnLibraryClick(event, buttonWatchEl);
  createMarkupQueueLocalStorage();
}

function createMarkupWatchLocalStorage() {
  updateDataForLocalStorage();
  containerLibraryElement.innerHTML = '';

  const arrayWatch = ls.load(`toWatch`);

  if (!arrayWatch || arrayWatch.length === 0) {
    alertInfo.innerHTML = "You don't have watched films in your library";
    return;
  }
  for (let i of arrayWatch) {
    galleryApi
      .fetchMovieById(i)
      .then(data => {
        createMarkupForLibrary(data);
      })
      .catch(error => console.log(error));
  }
}

function createMarkupQueueLocalStorage() {
  updateDataForLocalStorage();
  containerLibraryElement.innerHTML = '';

  const arrayQueue = ls.load(`queue`);

  if (!arrayQueue || arrayQueue.length === 0) {
    alertInfo.innerHTML = "You don't have films in queue in your library";
    return;
  }
  for (let i of arrayQueue) {
    galleryApi
      .fetchMovieById(i)
      .then(data => {
        createMarkupForLibrary(data);
      })
      .catch(error => console.log(error));
  }
}

function createMarkupForLibrary(data) {
  data.release_date = data.release_date.split('-')[0];
  const markup = createLibraryCards(data);
  containerLibraryElement.insertAdjacentHTML('beforeend', markup);
}
