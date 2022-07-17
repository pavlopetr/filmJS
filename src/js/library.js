import { galleryApi } from './randomFilms';
import { onPosterClick } from './modal';
import createLibraryCards from '../templates/libraryCards.hbs';

containerLibraryElement = document.querySelector('.library-film_list');

function createMarkupWatchLocalStorage() {
  for (let i of galleryApi.watchArr) {
    galleryApi.fetchMovieById(i).then(data => {
      data.release_date = data.release_date.split('-')[0];
      const markup = createLibraryCards(data);
      containerLibraryElement.insertAdjacentHTML('beforeend', markup);
      containerLibraryElement.addEventListener('click', onPosterClick);
    });
  }
}

createMarkupWatchLocalStorage();
