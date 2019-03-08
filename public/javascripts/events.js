'use strict';

const main = () => {
  const rejectButton = document.querySelector('.invitation-button-reject');
  const confirmButton = document.querySelector('.invitation-button-confirm');
  const formInput = document.querySelector('.invitation-form-input');

  rejectButton.addEventListener('click', () => {
    formInput.value = 'reject';
  });
  confirmButton.addEventListener('click', () => {
    formInput.value = 'confirm';
  });
};

window.addEventListener('load', main)
;
