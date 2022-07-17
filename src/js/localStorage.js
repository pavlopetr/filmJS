import ls from './storage';
import { galleryApi } from './randomFilms';

export const onModalClick = event => {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  const filmID = event.target.dataset.id;
  if (event.target.dataset.action === 'watched') {
    if (!galleryApi.watchArr.includes(filmID)) {
      galleryApi.watchArr.push(filmID);
      ls.save(`toWatch`, galleryApi.watchArr);
    }
  }
  if (event.target.dataset.action === 'queue') {
    if (!galleryApi.queueArr.includes(filmID)) {
      galleryApi.queueArr.push(filmID);
      ls.save('queue', galleryApi.queueArr);
    }
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
