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

export const createRandomMarkup = () => {
  updateDataForLocalStorage();
  createArrayOfGenres();

  galleryApi
    .fetchTrendingMovies()
    .then(data => {
      changePerPageOfQuery();

      changeIdOfGenreToName(data.results);
      changeDateInArrayOfResults(data.results);
      containerEl.innerHTML = createFilmCards(data.results);
      containerEl.addEventListener('click', onPosterClick);
    })
    .catch(error => console.log(error));
};
