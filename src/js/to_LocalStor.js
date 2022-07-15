'use strict';
import ls from './storage';

const modalContainerEl = document.querySelector('.modal');

let toWatchArry = [];
let temp = ls.load(`toWatch`);
console.dir(temp);
// if (toWatchArry.length === 0) {
//   toWatchArry = ls.load(`toWatch`);
// }

// console.log('before :>> ', toWatchArry);

modalContainerEl.addEventListener('click', e => {
  e.preventDefault;
  const parentLi = modalContainerEl.querySelector('.film-id');
  const filmID = parentLi.textContent;
  // console.dir(e.target);
  if (e.target.textContent === 'Add to watched') {
    toWatchArry.push(filmID);
    // localStorage.clear(`toWatch`);
    ls.save(`toWatch`, toWatchArry);
  }
});

// console.log('arrr :>> ', toWatchArry);
// ['data-watched'].name;
