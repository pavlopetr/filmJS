'use strict';
import ls from './storage';

const modalContainerEl = document.querySelector('.modal');

let toWatchArr = [];
let queueArr = [];

if (toWatchArr.length === 0 && ls.load(`toWatch`).length > 0) {
  ls.load(`toWatch`).forEach(el => {
    toWatchArr.push(el);
  });
}
if (queueArr.length === 0 && ls.load(`queue`).length > 0) {
  ls.load('queue').forEach(el => {
    queueArr.push(el);
  });
}

console.log('before :>> ', toWatchArr);

modalContainerEl.addEventListener('click', e => {
  e.preventDefault;
  const parentLi = modalContainerEl.querySelector('.film-id');
  const filmID = parentLi.textContent;
  console.dir(e.target);
  if (e.target.textContent === 'Add to watched') {
    // добавить проверку на содержимое массива (без повтороний)
    toWatchArr.push(filmID);
    ls.save(`toWatch`, toWatchArr);
  }
  if (e.target.textContent === 'Add to queue') {
    // добавить проверку на содержимое массива (без повтороний)
    queueArr.push(filmID);
    ls.save('queue', queueArr);
  }
});

console.log('aft:>> ', toWatchArr);
