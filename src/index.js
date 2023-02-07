import './style.css';
import './css/commentPopup.css';

import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';

import CommentPopup from './modules/commentPopup.js';

const newPopup = new CommentPopup('1', 'comment-popup');

import {
  menuBtn,
  mobNavGroup,
  closeBtn,
  mobileNavlinks,
} from './modules/docSelectors.js';

// toggle the menu
menuBtn.addEventListener('click', () => {
  mobNavGroup.classList.toggle('display-flex');
});

closeBtn.addEventListener('click', () => {
  mobNavGroup.classList.remove('display-flex');
});

mobileNavlinks.forEach((item) => {
  item.addEventListener('click', () => {
    mobNavGroup.classList.remove('display-flex');
  });
});
