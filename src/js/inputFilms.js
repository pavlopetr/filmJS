import Pagination from 'tui-pagination';
import { containerEl, containerPagination } from './randomFilms';
import { galleryApi, containerEl } from './randomFilms';
import {
  changeIdOfGenreToName,
  changeDateInArrayOfResults,
} from './datesForMarkup';
import { createAlertFailure } from './alert';
import createFilmCards from '../templates/filmCards.hbs';

const formEl = document.querySelector('#search-form');
formEl.addEventListener('submit', onFormSubmit);

const paginationSerch = new Pagination(containerPagination, {
  itemsPerPage: 20,
  visiblePages: 5,
  centerAlign: true,
  template: {
    currentPage: '<a class="page-btn is-selected">{{page}}</a>',
    page: '<a class="page-btn">{{page}}</a>',
    moveButton: `<button class="move-btn move-btn-{{type}}"></button>`,
    disabledMoveButton:
      '<button class="move-btn move-btn-{{type}} disabled" disabled></button>',
    moreButton: '<a class="page-btn next-is-ellip last-child">...</a>',
  },
});

function onFormSubmit(event) {
  event.preventDefault();
  galleryApi.page = 1;
  galleryApi.query = event.currentTarget.elements.searchQuery.value.trim();

  if (galleryApi.query === '') {
    createAlertFailure('Sorry, your query is empty, please, make your choice.');
    return;
  }

  galleryApi
    .fetchSearchMovies()
    .then(data => {
      if (data.results.length === 0) {
        throw 'Sorry, there are not movies matching your search query. Please try again.';
      }

      changeIdOfGenreToName(data.results);
      changeDateInArrayOfResults(data.results);
      containerEl.innerHTML = createFilmCards(data.results);
      paginationSerch.reset(data.total_results);
    })
    .catch(error => createAlertFailure(error));
}

paginationSerch.on('afterMove', event => {
  galleryApi.page = event.page;
  searchMovies();
});

function searchMovies() {
  galleryApi
    .fetchSearchMovies()
    .then(data => {
      if (data.results.length === 0) {
        throw 'Sorry, there are not movies matching your search query. Please try again.';
      }

      changeIdOfGenreToName(data.results);
      changeDateInArrayOfResults(data.results);
      containerEl.innerHTML = createFilmCards(data.results);
    })
    .catch(error => createAlertFailure(error));
}
