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
      modal.closest('.backdrop').classList.remove('is-hidden');
      modal.addEventListener('click', onModalClick);
      document.addEventListener('keydown', onKeyboardPress);
    })
    .catch(error => console.log(error));
};

function onKeyboardPress(event) {
  if (event.code === 'Escape') {
    modal.closest('.backdrop').classList.add('is-hidden');
  }
  modal.removeEventListener('click', onModalClick);
  document.removeEventListener('keydown', onKeyboardPress);
}
