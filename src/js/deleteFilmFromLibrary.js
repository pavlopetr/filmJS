export const deleteFilmFromMarkup = event => {
  const watchedBtn = document.querySelector('button[data-watched]');
  const queueBtn = document.querySelector('button[data-queue]');
  if (
    watchedBtn.dataset.action === 'active' &&
    event.currentTarget.querySelector('.js-watch').dataset.action === 'watched'
  ) {
    const idForDelete = event.target.dataset.id;
    const filmForDelete = document.querySelector(
      `li[data-id = '${idForDelete}']`
    );
    filmForDelete.remove();
  }
  if (
    queueBtn.dataset.action === 'active' &&
    event.currentTarget.querySelector('.js-queue').dataset.action === 'queue'
  ) {
    const idForDelete = event.target.dataset.id;
    const filmForDelete = document.querySelector(
      `li[data-id = '${idForDelete}']`
    );
    filmForDelete.remove();
  }
};
