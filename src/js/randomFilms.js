import Pagination from 'tui-pagination';
import { GalleryApi } from './galleryApi';
import {
  changeIdOfGenreToName,
  changeDateInArrayOfResults,
  createArrayOfGenres,
} from './datesForMarkup';
import { changePerPageOfQuery } from './perPageMediaRule';
import { onPosterClick } from './modal';
import { updateDataForLocalStorage } from './localStorage';
import createFilmCards from '../templates/filmCards.hbs';

export const containerEl = document.querySelector('.cards-film_list');
export const galleryApi = new GalleryApi();

export const containerPagination = document.querySelector('.pagination');
export const pagination = new Pagination(containerPagination, {
  itemsPerPage: galleryApi.perPage,
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

export const createRandomMarkup = page => {
  if (page === 1) {
    updateDataForLocalStorage();
    createArrayOfGenres();
  }

  galleryApi
    .fetchTrendingMovies(page)
    .then(data => {
      changePerPageOfQuery();
      changeIdOfGenreToName(data.results);
      changeDateInArrayOfResults(data.results);
      containerEl.innerHTML = createFilmCards(data.results);
      containerEl.addEventListener('click', onPosterClick);

      if (page === 1) pagination.reset(response.total_results);
    })
    .catch(error => console.log(error));
};

pagination.on('afterMove', event => {
  const currentPage = event.page;
  createRandomMarkup(currentPage);
});
