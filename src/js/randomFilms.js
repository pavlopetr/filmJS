import { GalleryApi } from './galleryApi';
import { createAlertFailure } from './alert';
import {
  changeIdOfGenreToName,
  changeDateInArrayOfResults,
  createArrayOfGenres,
} from './datesForMarkup';
import { changePerPageOfQuery } from './perPageMediaRule';
import { onPosterClick } from './modal';
import { updateDataForLocalStorage } from './localStorage';
import createFilmCards from '../templates/filmCards.hbs';
import { formEl, onFormSubmit } from './inputFilms';

export const containerEl = document.querySelector('.cards-film_list');

export const galleryApi = new GalleryApi();
createArrayOfGenres();
updateDataForLocalStorage();

export const createRandomMarkup = () => {
  galleryApi
    .fetchTrendingMovies()
    .then(data => {
      changePerPageOfQuery();

      changeIdOfGenreToName(data.results);
      changeDateInArrayOfResults(data.results);
      containerEl.innerHTML = createFilmCards(data.results);
      formEl.addEventListener('submit', onFormSubmit);

      containerEl.addEventListener('click', onPosterClick);
    })
    .catch(error => createAlertFailure(error));
};

if (document.location.href === 'http://localhost:1234/index.html') {
  createRandomMarkup();
}

// if (
//   document.location.href ===
//   'https://mykhailotsynkevych.github.io/Filmoteka/index.html'
// ) {
//   createRandomMarkup();
// }
