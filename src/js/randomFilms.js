import { GalleryApi } from './js/gallery';
import { createAlertFailure } from './js/alert';
import { changeIdOfGenreToName } from './datesForMarkup';
import { changeDateInArrayOfResults } from './datesForMarkup';
import { changePerPageOfQuery } from './mediaPerPage';
import createFilmCards from './templates/filmCards.hbs';

export const galleryApi = new GalleryApi();

let arrayAllGenresMovie = null;
createArrayOfGenres();

createRandomMarkup();

export const createRandomMarkup = () => {
  galleryApi
    .fetchRandomMovies()
    .then(data => {
      changePerPageOfQuery();

      changeIdOfGenreToName(data.results);
      changeDateInArrayOfResults(data.results);
      containerEl.innerHTML = createFilmCards(data.results);
      containerEl.addEventListener('click', onContainerClick);
    })
    .catch(error => createAlertFailure(error));
};

function createArrayOfGenres() {
  galleryApi.fetchGenres().then(data => {
    arrayAllGenresMovie = data;
  });
}
