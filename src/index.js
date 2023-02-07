import './style.css';
import './img/menu.png';
import './img/close.png';

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
