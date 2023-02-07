import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';

import { listItemsContainer } from './docSelectors.js';
import CommentPopup from './commentPopup.js';

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
      showImg.innerHTML = `<img src='${i.image.original}'>`;

      // create show info
      const showInfo = document.createElement('div');
      showInfo.className = 'show-info';

      // create tile for show info
      const title = document.createElement('h3');
      title.className = 'show-title';
      title.innerText = i.name;

      // like action
      const showLikeAction = document.createElement('div');
      showLikeAction.className = 'shwo-like-action';

      // like button
      const btnLike = document.createElement('button');
      btnLike.className = 'btn-like';
      btnLike.innerHTML = "<i class='fa-solid fa-bars'></i>";

      // like count
      const likeCount = document.createElement('span');
      if (i.likes > 1) {
        likeCount.innerText = `${i.likes} likes`;
      } else {
        likeCount.innerHTML = `${i.likes} like`;
      }

      showLikeAction.append(btnLike, likeCount); // append like actions child element.

      showInfo.append(title, showLikeAction); // append in showInfo

      // show action
      const showActions = document.createElement('div');
      showActions.className = 'show-actions';

      // create child btn
      const commentBtn = document.createElement('button');
      commentBtn.className = 'btn-action btn-comment';
      commentBtn.innerText = 'Comments';
      commentBtn.addEventListener('click', (e) => {
        CommentPopup(e);
      });

      const reservationBtn = document.createElement('button');
      reservationBtn.className = 'btn-action btn-reservation';
      reservationBtn.innerText = 'Reservations';
      reservationBtn.addEventListener('click', (e) => {
        CommentPopup(e);
      });

      showActions.append(commentBtn, reservationBtn); // append child action buttons in showActions

      item.append(showImg, showInfo, showActions); // append clild all the elements in item.

      listItemsContainer.appendChild(item);
    });
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
  joinArr.sort((a, b) => (a.id - b.id));

  // call renderItems function to display the item list
  renderItems(joinArr);
};

export default fetchEpisodes;
