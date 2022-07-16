'use strict';
import ls from './storage';
import { GalleryApi } from '../js/gallery';
import createCardOfMovie from '../templates/libraryCards.hbs';
import createModal from '../templates/modal.hbs';
const modalContainerEl = document.querySelector('.modal');
const containerEl = document.querySelector('.library-film_list');
// const libraryLinkEl = document.querySelector('#library');
const titleEl = document.querySelector('#pageId');
console.log('object :>> ', titleEl);
let toWatchArr = [];
let queueArr = [];

if (toWatchArr.length === 0 && ls.load(`toWatch`)) {
  ls.load(`toWatch`).forEach(el => {
    toWatchArr.push(el);
  });
}
if (queueArr.length === 0 && ls.load(`queue`)) {
  ls.load('queue').forEach(el => {
    queueArr.push(el);
  });
}
if (modalContainerEl) {
  modalContainerEl.addEventListener('click', e => {
    e.preventDefault;
    const parentEl = modalContainerEl.querySelector('.film-id');
    const filmID = parentEl.textContent;
    if (e.target.textContent === 'Add to watched') {
      if (!toWatchArr.includes(filmID)) {
        toWatchArr.push(filmID);
        ls.save(`toWatch`, toWatchArr);
      }
    }
    if (e.target.textContent === 'Add to queue') {
      if (!queueArr.includes(filmID)) {
        queueArr.push(filmID);
        ls.save('queue', queueArr);
      }
    }
  });
}
const galleryApi = new GalleryApi();
// libraryLinkEl.addEventListener('ckick', e => {});
if (titleEl.textContent === 'My library') {
  for (let i of toWatchArr) {
    galleryApi.fetchMovieById(i).then(data => {
      const markup = createCardOfMovie(data);
      containerEl.insertAdjacentHTML('beforeend', markup);
    });
  }
}
