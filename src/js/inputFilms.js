import { changeIdOfGenreToName } from './datesForMarkup';
import { changeDateInArrayOfResults } from './datesForMarkup';
import { changePerPageOfQuery } from './mediaPerPage';
import { galleryApi } from './randomFilms';
import { createRandomMarkup } from './randomFilms';

const formEl = document.querySelector('#search-form');
formEl.addEventListener('submit', onFormSubmit);

let arrayAllGenresMovie = null;
createArrayOfGenres();

function onFormSubmit(event) {
  event.preventDefault();
  galleryApi.page = 1;
  galleryApi.query = event.currentTarget.element.searchQuery.value.trim();

  changePerPageOfQuery();

  if (galleryApi.query === '') {
    createRandomMarkup();
    createAlertFailure(
      'Sorry, your query is empty, please, make your choice. Below you can see the popular films.'
    );
    return;
  }

  galleryApi
    .fetchMovies()
    .then(data => {
      if (data.results.length === 0) {
        createRandomMarkup();
        throw 'Sorry, there are not movies matching your search query. Please try again. Below you can see the popular films.';
      }

      changeIdOfGenreToName(data.results);
      changeDateInArrayOfResults(data.results);
      containerEl.innerHTML = createFilmCards(data.results);
      containerEl.addEventListener('click', onContainerClick);
    })
    .catch(error => createAlertFailure(error));
}

function createArrayOfGenres() {
  galleryApi.fetchGenres().then(data => {
    arrayAllGenresMovie = data;
  });
}
