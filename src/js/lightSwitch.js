'use strict';
// по хорошему - добавить класс "темный" на карточку и bodyб прописать им css - и при checked - добавлять классы
const cneckBoxEl = document.querySelector('[name="ligthswitcher"]');
const bodyEl = document.querySelector('body');
// const filmTitleEl = document.querySelector('.film-name');
// console.log('object :>> ', filmTitleEl);
cneckBoxEl.addEventListener('click', e => {
  if (cneckBoxEl.checked) {
    bodyEl.style.backgroundColor = '#141414';
  } else {
    bodyEl.style.backgroundColor = '#fff';
  }
});
// document.querySelector(
//   'body > section > ul > li:nth-child(1) > div > p.film-tittle'
// );
