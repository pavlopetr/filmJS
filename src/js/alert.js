import Notiflix from 'notiflix';

const OPTIONS = { timeout: 1500 };

export const createAlertFailure = message => {
  return Notiflix.Notify.failure(message, OPTIONS);
};
