/* eslint-disable no-unused-vars */
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';

import { itemCountContainer, listItemsContainer } from './docSelectors.js';
import CommentPopup from './commentPopup.js';
import itemCounter from './itemCounter.js';

// create new likes
const createNewLike = async (id, likeCount) => {
  const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/cTATStFavmk0jriD21vx/likes';
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item_id: id }),
  });

  if (!res.ok && res.status !== 201) {
    return;
  }

  const response = await fetch(url);
  const result = await response.json();
  const likeData = result.find((item) => item.item_id === id);
  if (likeData) {
    likeCount.innerText = likeData.likes > 1 ? `${likeData.likes} likes` : `${likeData.likes} like`;
  }
};

const renderItems = (data) => {
  if (data.length > 0) {
    listItemsContainer.innerHTML = '';

    data.forEach((i) => {
      const item = document.createElement('li');
      item.id = i.id;
      item.className = 'show-item';

      // create sho Img element
      const showImg = document.createElement('div');
      showImg.className = 'show-item-img';
      showImg.innerHTML = `<img src='${i.image.medium}'>`;

      // create show info
      const showInfo = document.createElement('div');
      showInfo.className = 'show-info';

      // create tile for show info
      const title = document.createElement('h3');
      title.className = 'show-titles';
      title.innerText = i.name;

      // like action
      const showLikeAction = document.createElement('div');
      showLikeAction.className = 'shwo-like-action';

      // like button
      const btnLike = document.createElement('button');
      btnLike.className = 'btn-like';

      // like count
      const likeCount = document.createElement('span');
      if (i.likes > 1) {
        likeCount.innerText = `${i.likes} likes`;
      } else {
        likeCount.innerHTML = `${i.likes} like`;
      }

      // btn to create new likes
      btnLike.addEventListener('click', () => {
        createNewLike(i.id, likeCount);
      });

      showLikeAction.append(btnLike, likeCount); // append like actions child element.

      showInfo.append(title, showLikeAction); // append in showInfo

      // show action
      const showActions = document.createElement('div');
      showActions.className = 'show-actions';

      // create child btn
      const commentBtn = document.createElement('button');
      commentBtn.className = 'btn-action btn-comment';
      commentBtn.innerText = 'Comments';
      commentBtn.addEventListener('click', () => {
        const newPopup = new CommentPopup(i.id, 'comment-popup');
      });

      const reservationBtn = document.createElement('button');
      reservationBtn.className = 'btn-action btn-reservation';
      reservationBtn.innerText = 'Reservations';
      reservationBtn.addEventListener('click', () => {
        const newPopup = new CommentPopup(i.id, 'comment-popup');
      });

      showActions.append(commentBtn, reservationBtn); // append child action buttons in showActions

      item.append(showImg, showInfo, showActions); // append clild all the elements in item.

      listItemsContainer.appendChild(item);
    });
    itemCounter(itemCountContainer, listItemsContainer);
  } else {
    listItemsContainer.innerHTML = '<p class="no-data">No Data Found</p>';
  }
};

const fetchEpisodes = async (url, container) => {
  const res = await fetch(url);
  const result = await res.json();

  // fetch the Involment api to get likes
  const resInv = await fetch(`${container}/likes/`);
  const likesResult = await resInv.json();

  // filter Array with have Likes
  const filterArrWithLikes = [];
  result.forEach((item) => {
    likesResult.forEach((likeItem) => {
      if (item.id === likeItem.item_id) {
        filterArrWithLikes.push({ ...item, likes: likeItem.likes });
      }
    });
  });

  // filter Array with no likes
  let filterWithoutLikes = [];
  filterWithoutLikes = result.filter(
    (el) => !filterArrWithLikes.find((element) => element.id === el.id),
  );

  // modify the filterWithout array likes count 0;
  const modifiyFilterWithoutLikes = [];
  filterWithoutLikes.forEach((item) => {
    modifiyFilterWithoutLikes.push({ ...item, likes: 0 });
  });

  // join and sort the arrays
  const joinArr = modifiyFilterWithoutLikes.concat(filterArrWithLikes);
  joinArr.sort((a, b) => a.id - b.id);

  // call renderItems function to display the item list
  renderItems(joinArr);
};

export default fetchEpisodes;
