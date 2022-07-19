import './lightSwitch';
import './teamLightbox';
import ls from './storage';
import Pagination from 'tui-pagination';
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

let cardsQuantity;
if (window.innerWidth < 768) cardsQuantity = 4;
else if (window.innerWidth < 1200) cardsQuantity = 8;
else cardsQuantity = 9;

const containerPagination = document.querySelector('.pagination');
const paginationLibraryWatch = new Pagination(containerPagination, {
  itemsPerPage: cardsQuantity,
  visiblePages: 5,
  centerAlign: true,
  firstItemClassName: 1,
  template: {
    currentPage: '<a class="page-btn is-selected">{{page}}</a>',
    page: '<a class="page-btn">{{page}}</a>',
    moveButton: `<button class="move-btn move-btn-{{type}}"></button>`,
    disabledMoveButton:
      '<button class="move-btn move-btn-{{type}} disabled" disabled></button>',
    moreButton: '<a class="page-btn next-is-ellip last-child">...</a>',
  },
});

const paginationLibraryQueue = new Pagination(containerPagination, {
  itemsPerPage: cardsQuantity,
  visiblePages: 5,
  centerAlign: true,
  firstItemClassName: 1,
  template: {
    currentPage: '<a class="page-btn is-selected">{{page}}</a>',
    page: '<a class="page-btn">{{page}}</a>',
    moveButton: `<button class="move-btn move-btn-{{type}}"></button>`,
    disabledMoveButton:
      '<button class="move-btn move-btn-{{type}} disabled" disabled></button>',
    moreButton: '<a class="page-btn next-is-ellip last-child">...</a>',
  },
});

document.onload = updateDataForLocalStorage();
document.onload = createMarkupWatchLocalStorage();

function onButtonWatchEl(event) {
  changeColorBtnLibraryClick(event, buttonQueueEl);
  createMarkupWatchLocalStorage();
}

function onButtonQueueEl(event) {
  changeColorBtnLibraryClick(event, buttonWatchEl);
  createMarkupQueueLocalStorage();
}

function createMarkupWatchLocalStorage() {
  containerLibraryElement.innerHTML = '';
  alertInfo.innerHTML = '';

  const arrayWatch = ls.load(`toWatch`);

  if (!arrayWatch || arrayWatch.length === 0) {
    alertInfo.innerHTML = "You don't have watched films in your library";
    paginationLibraryWatch.reset(0);
    return;
  }

  const arrayForRenderFirstPage = arrayWatch.slice(0, cardsQuantity);
  renderLibraryMarkup(arrayForRenderFirstPage);

  paginationLibraryWatch.reset(arrayWatch.length);
}

function createMarkupQueueLocalStorage() {
  containerLibraryElement.innerHTML = '';
  alertInfo.innerHTML = '';

  const arrayQueue = ls.load(`queue`);

  if (!arrayQueue || arrayQueue.length === 0) {
    alertInfo.innerHTML = "You don't have films in queue in your library";
    paginationLibraryQueue.reset(0);
    return;
  }

  const arrayForRenderFirstPage = arrayQueue.slice(0, cardsQuantity);
  renderLibraryMarkup(arrayForRenderFirstPage);

  paginationLibraryQueue.reset(arrayQueue.length);
}

paginationLibraryWatch.on('afterMove', event => {
  const currentPage = event.page;
  alertInfo.innerHTML = '';
  const arrayWatch = ls.load(`toWatch`);
  const arrayForRenderCurrentPage = arrayWatch.slice(
    (currentPage - 1) * cardsQuantity,
    currentPage * cardsQuantity
  );
  renderLibraryMarkup(arrayForRenderCurrentPage);
});

paginationLibraryQueue.on('afterMove', event => {
  const currentPage = event.page;
  alertInfo.innerHTML = '';
  const arrayQueue = ls.load(`queue`);
  const arrayForRenderCurrentPage = arrayQueue.slice(
    (currentPage - 1) * cardsQuantity,
    currentPage * cardsQuantity
  );
  renderLibraryMarkup(arrayForRenderCurrentPage);
});

function renderLibraryMarkup(array) {
  let markup = '';
  array.forEach(el => {
    galleryApi
      .fetchMovieById(el)
      .then(data => {
        data.release_date = data.release_date.split('-')[0];
        markup += createLibraryCards(data);
        return markup;
      })
      .then(data => (containerLibraryElement.innerHTML = data))
      .catch(error => console.log(error));
  });
}
