import { galleryApi } from './randomFilms';
import createModalCards from '../templates/modalCards.hbs';
import { onModalClick } from './localStorage';
import { deleteFilmFromMarkup } from './deleteFilmFromLibrary';
import { ImdbApi } from './imdbApi';

const imdbApi = new ImdbApi();
const modal = document.querySelector('.modal');

export const onPosterClick = event => {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  galleryApi
    .fetchMovieById(event.target.id)
    .then(data => {
      modal.innerHTML = createModalCards(data);
      if (galleryApi.watchArr.includes(event.target.id)) {
        const buttonWatchedEl = modal.querySelector('[data-action="watched"]');
        buttonWatchedEl.dataset.action = 'remove watched';
        buttonWatchedEl.textContent = 'remove from watched';
      }
      if (galleryApi.queueArr.includes(event.target.id)) {
        const buttonQueueEl = modal.querySelector('[data-action="queue"]');
        buttonQueueEl.dataset.action = 'remove queue';
        buttonQueueEl.textContent = 'remove from queue';
      }
      modal.closest('.backdrop').classList.remove('is-hidden');
      modal.addEventListener('click', onModalClick);
      document.addEventListener('keydown', onKeyboardPress);
      const titleQuery = document.querySelector('.modal__tatel').textContent;
      return titleQuery;
    })
    .then(titleQuery => {
      imdbApi.query = titleQuery;
      imdbApi.fetchSerchByName();
    })
    .catch(error => createAlertFailure(error));
};

export const onKeyboardPress = event => {
  console.log(location);

  if (event.code === 'Escape') {
    modal.closest('.backdrop').classList.add('is-hidden');
  }

  if (location.href === 'http://localhost:61629/library.html') {
    deleteFilmFromMarkup(event);
  }

  // if (
  //   location.href ===
  //   'https://mykhailotsynkevych.github.io/Filmoteka/library.html'
  // ) {
  //   deleteFilmFromMarkup(event);
  // }

  modal.removeEventListener('click', onModalClick);
  document.removeEventListener('keydown', onKeyboardPress);
};
