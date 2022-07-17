import ls from './storage';
import { galleryApi } from './randomFilms';

export const onModalClick = event => {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  const filmID = event.target.dataset.id;
  if (event.target.dataset.action === 'watched') {
    galleryApi.watchArr.push(filmID);
    ls.save(`toWatch`, galleryApi.watchArr);
    event.target.dataset.action = 'remove from watched';
    event.target.textContent = 'remove from watched';
    event.target.addEventListener('click', onModalClick);
  }
  if (event.target.dataset.action === 'queue') {
    galleryApi.queueArr.push(filmID);
    ls.save('queue', galleryApi.queueArr);
    event.target.dataset.action = 'remove from queue';
    event.target.textContent = 'remove from queue';
    event.target.addEventListener('click', onModalClick);
  }
  if (event.target.dataset.action === 'remove watched') {
    const index = galleryApi.watchArr.indexOf(filmID);
    galleryApi.watchArr.splice(index, 1);
    ls.save(`toWatch`, galleryApi.watchArr);
    event.target.dataset.action = 'watched';
    event.target.textContent = 'add to watched';
    event.target.addEventListener('click', onModalClick);
  }
  if (event.target.dataset.action === 'remove queue') {
    const index = galleryApi.queueArr.indexOf(filmID);
    galleryApi.queueArr.splice(index, 1);
    ls.save('queue', galleryApi.queueArr);
    event.target.dataset.action = 'queue';
    event.target.textContent = 'add to queue';
    event.target.addEventListener('click', onModalClick);
  }
};

export const updateDataForLocalStorage = () => {
  if (galleryApi.watchArr.length === 0 && ls.load(`toWatch`)) {
    ls.load(`toWatch`).forEach(el => {
      galleryApi.watchArr.push(el);
    });
  }
  if (galleryApi.queueArr.length === 0 && ls.load(`queue`)) {
    ls.load('queue').forEach(el => {
      galleryApi.queueArr.push(el);
    });
  }
};

// export const updateDataForLocalStorage = () => {
//   const valuesChangedToWatch = ls.load('toWatch');
//   galleryApi.watchArr = [...valuesChangedToWatch];
//   const valuesChangedToqueue = ls.load('queue');
//   galleryApi.queueArr = [...valuesChangedToqueue];
// };
