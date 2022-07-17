'use strict';
import ls from './storage';

const cneckBoxEl = document.querySelector('[name="ligthswitcher"]');
const bodyEl = document.querySelector('body');
const footerEl = document.querySelector('footer');
let tittleEls = document.getElementsByClassName('film-tittle');

const switherMode = ls.load('light');
if (switherMode === 'off') {
  cneckBoxEl.checked = true;
  bodyEl.classList.add('night');
  footerEl.classList.add('night');
  // let Arry = Array(tittleEls);
  // Array.prototype.forEach(tittleEls, function (tittleEls) {
  //   return tittleEls.classList.add('night');
  // });
  // console.dir(Arry);
}

cneckBoxEl.addEventListener('change', nigthlight);

function nigthlight() {
  if (cneckBoxEl.checked) {
    ls.save('light', 'off');
    bodyEl.classList.add('night');
    footerEl.classList.add('night');
  } else {
    bodyEl.classList.remove('night');
    footerEl.classList.remove('night');
    ls.save('light', 'on');
  }
}
// let elem = document.getElementById('t');
// t.onclick = function () {
//   if (this.style.backgroundColor) {
//     this.style.backgroundColor = '';
//   } else {
//     this.style.backgroundColor = 'red';
//   }
// };
