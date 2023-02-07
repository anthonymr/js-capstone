/* eslint-disable no-unused-vars */
import CommentPopup from './modules/commentPopup.js';

import './style.css';
import './css/commentPopup.css';

import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';

import { BASE_URL, EPISODE_API } from './modules/api.js';
import fetchEpisodes from './modules/displayItems.js';

import {
  closeBtn,
  menuBtn,
  mobileNavlinks,
  mobNavGroup,
} from './modules/docSelectors.js';

const newPopup = new CommentPopup('1', 'comment-popup');

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

// Display List
const episodeContainer = document.querySelector('.episodeContainer');

window.onload = () => {
  fetchEpisodes(EPISODE_API, BASE_URL);
};
