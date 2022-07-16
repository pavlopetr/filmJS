'use strict';
import ls from './storage';
const modalContainerEl = document.querySelector('.modal');

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
