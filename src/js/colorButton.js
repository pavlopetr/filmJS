export const changeColorBtnLibraryClick = (event, btnNotTarget) => {
  event.target.style.backgroundColor = '#ff6b01';
  event.target.style.border = 'none';
  event.target.style.boxShadow = '0 4px 21px 0 rgb(255 107 8 / 59%)';
  event.target.dataset.action = 'active';
  btnNotTarget.style.backgroundColor = 'transparent';
  btnNotTarget.style.border = '1px solid #fff';
  btnNotTarget.style.boxShadow = 'none';
  btnNotTarget.dataset.action = 'not-active';
};

export const changeColorBtnHomeClick = (event, btnNotTarget) => {
  event.target.style.backgroundColor = '#ff6b01';
  event.target.style.border = 'none';
  event.target.style.boxShadow = '0 4px 21px 0 rgb(255 107 8 / 59%)';
  event.target.style.color = '#ffffff';
  btnNotTarget.style.backgroundColor = 'transparent';
  btnNotTarget.style.border = '1px solid #000000';
  btnNotTarget.style.boxShadow = 'none';
  btnNotTarget.style.color = '#000000';
};
