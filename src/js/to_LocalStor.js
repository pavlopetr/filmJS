'use strict';
import ls from './storage';

const containerEl = document.querySelector('.cards-film_list');

let toWatchArry = [];
let temp = ls.load(`toWatch`);
console.dir(temp);
if (toWatchArry.length === 0) {
  toWatchArry = ls.load(`toWatch`);
}

// console.log('before :>> ', toWatchArry);

containerEl.addEventListener('click', e => {
  e.preventDefault;
  const parentLi = e.target.closest('li');
  const filmIdEl = parentLi.querySelector(`.film-id`);
  const filmId = filmIdEl.textContent.trim(` `);
  // console.log('in :>> ', toWatchArry);

  if (e.target.nodeName === 'IMG') {
    toWatchArry.push(filmId);
    localStorage.clear(`toWatch`);
    ls.save(`toWatch`, toWatchArry);
  }
});
// console.log('arrr :>> ', toWatchArry);
