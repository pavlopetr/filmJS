import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import mishaUrl from '../images/team-misha.jpeg';
import sergeyUrl from '../images/team-sergey.jpeg';
import pashaUrl from '../images/team-pasha.jpeg';
import romanUrl from '../images/team-roman.jpg';
import pavloUrl from '../images/team-pavlo.jpg';
import annaUrl from '../images/team-anna.jpg';

const markup = `<div class="team-wrapper">
<div class="team-card">
    <img src="${mishaUrl}" alt="Misha" class="team-image">
    <p class="team-name">Misha</p>
    <p class="team-role">mini Team Lead</p>
</div>
<div class="team-card">
    <img src="${romanUrl}" alt="Roman" class="team-image">
    <p class="team-name">Roman</p>
    <p class="team-role">Scrum Master</p>
</div>
<div class="team-card">
    <img src="${sergeyUrl}" alt="Sergey" class="team-image">
    <p class="team-name">Sergey</p>
    <p class="team-role">tiny Developer</p>
</div>
<div class="team-card">
    <img src="${annaUrl}" alt="Anna" class="team-image">
    <p class="team-name">Anna</p>
    <p class="team-role">Senior Developer</p>
</div>
<div class="team-card">
    <img src="${pashaUrl}" alt="Pavlo" class="team-image">
    <p class="team-name">Pavlo</p>
    <p class="team-role">Developer</p>
</div>
<div class="team-card">
    <img src="${pavloUrl}" alt="Pavlo" class="team-image">
    <p class="team-name">Pavlo</p>
    <p class="team-role">Developer</p>
</div>
</div>`;
const container = document.querySelector('.js-team-modal');

container.addEventListener('click', openModal);

const modal = basicLightbox.create(markup);

function openModal(e) {
  modal.show();

  window.addEventListener('keydown', closeModalHandler);

  function closeModalHandler(e) {
    if (e.code === 'Escape') {
      modal.close();
      window.removeEventListener('keydown', closeModalHandler);
    }
  }
}
