import { GalleryApi } from './galleryApi';
import { createAlertFailure } from './alert';
import {
  changeIdOfGenreToName,
  changeDateInArrayOfResults,
  createArrayOfGenres,
} from './datesForMarkup';
import { changePerPageOfQuery } from './mediaPerPage';
import { onPosterClick } from './modal';
import { updateDataForLocalStorage } from './localStorage';
import createFilmCards from '../templates/filmCards.hbs';

export const containerEl = document.querySelector('.cards-film_list');

export const galleryApi = new GalleryApi();
createArrayOfGenres();
updateDataForLocalStorage();

export const createRandomMarkup = () => {
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
};

if (document.location.href === 'http://localhost:56689/index.html') {
  createRandomMarkup();
}
