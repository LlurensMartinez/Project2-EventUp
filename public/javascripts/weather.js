'use strict';

const main = () => {
  const backButton = document.querySelector('.go-back-btn');
  backButton.addEventListener('click', () => {
    window.history.back();
  });
};

window.addEventListener('load', main);
