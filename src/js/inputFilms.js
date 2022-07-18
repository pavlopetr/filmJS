import { galleryApi, containerEl } from './randomFilms';
import {
  changeIdOfGenreToName,
  changeDateInArrayOfResults,
} from './datesForMarkup';
import { changePerPageOfQuery } from './perPageMediaRule';
import { createAlertFailure } from './alert';
import createFilmCards from '../templates/filmCards.hbs';

const formEl = document.querySelector('#search-form');

export const onFormSubmit = event => {
  event.preventDefault();
  galleryApi.page = 1;
  galleryApi.query = event.currentTarget.elements.searchQuery.value.trim();

  changePerPageOfQuery();

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
    })
    .catch(error => createAlertFailure(error));
};

formEl.addEventListener('submit', onFormSubmit);
