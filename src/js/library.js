import { galleryApi } from './randomFilms';
// import { onPosterClick } from './modal';
import createLibraryCards from '../templates/libraryCards.hbs';
import { createAlertFailure } from './alert';

containerLibraryElement = document.querySelector('.library-film_list');

function createMarkupWatchLocalStorage() {
  if (galleryApi.watchArr.length === 0) {
    createAlertFailure("You don't have watched films in your library");
  }
  for (let i of galleryApi.watchArr) {
    galleryApi
      .fetchMovieById(i)
      .then(data => {
        data.release_date = data.release_date.split('-')[0];
        const markup = createLibraryCards(data);
        containerLibraryElement.insertAdjacentHTML('beforeend', markup);
      })
      .catch(error => createAlertFailure(error));
  }
}

if (document.location.href === 'http://localhost:1234/library.html') {
  createMarkupWatchLocalStorage();
}
