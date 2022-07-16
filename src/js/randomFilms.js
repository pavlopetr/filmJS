import { GalleryApi } from './galleryApi';
import { createAlertFailure } from './alert';
import { changeIdOfGenreToName } from './datesForMarkup';
import { changeDateInArrayOfResults } from './datesForMarkup';
import { createArrayOfGenres } from './datesForMarkup';
import { changePerPageOfQuery } from './mediaPerPage';
import createFilmCards from '../templates/filmCards.hbs';

export const containerEl = document.querySelector('.cards-film_list');

export const galleryApi = new GalleryApi();
createArrayOfGenres();

export const createRandomMarkup = () => {
  galleryApi
    .fetchRandomMovies()
    .then(data => {
      changePerPageOfQuery();

      changeIdOfGenreToName(data.results);
      changeDateInArrayOfResults(data.results);
      containerEl.innerHTML = createFilmCards(data.results);
    })
    .catch(error => createAlertFailure(error));
};

createRandomMarkup();
