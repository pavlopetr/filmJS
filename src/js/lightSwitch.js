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
}

for (let el of tittleEls) {
  if (switherMode === 'off') {
    el = el.classList.add('nigthText');
  }
}
cneckBoxEl.addEventListener('change', nigthlight);

function nigthlight() {
  if (cneckBoxEl.checked) {
    ls.save('light', 'off');
    bodyEl.classList.add('night');
    footerEl.classList.add('night');
    for (let el of tittleEls) {
      el = el.classList.add('nigthText');
    }
  } else {
    bodyEl.classList.remove('night');
    footerEl.classList.remove('night');
    ls.save('light', 'on');
    for (let el of tittleEls) {
      el = el.classList.remove('nigthText');
    }
  }
}
