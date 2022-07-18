import { galleryApi } from './randomFilms';
import createModalCards from '../templates/modalCards.hbs';
import { onModalClick } from './localStorage';

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
    })
    .catch(error => createAlertFailure(error));
};

function onKeyboardPress(event) {
  console.log(location);

  if (event.code === 'Escape') {
    modal.closest('.backdrop').classList.add('is-hidden');
  }
  modal.removeEventListener('click', onModalClick);
  document.removeEventListener('keydown', onKeyboardPress);
}
