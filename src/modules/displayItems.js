import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';

const renderItems = (data, container) => {
  if (data.length > 0) {
    container.innerHTML = '';

    data.forEach((i) => {
      const item = document.createElement('li');
      item.id = i.id;
      item.className = 'show-item';

      // Create Img element
      const showImg = document.createElement('div');
      showImg.className = 'show-item-img';
      showImg.innerHTML = `<img src='${i.image.original}'>`;

      // info element
      const showInfo = document.createElement('div');
      showInfo.className = 'show-info';

      // tile for info
      const title = document.createElement('h3');
      title.className = 'show-title';
      title.innerText = i.name;

      // like action
      const showLikeAction = document.createElement('div');

      // like button
      const btnLike = document.createElement('button');
      btnLike.className = 'btn-like';
      btnLike.innerHTML = "<i class='fa-solid fa-bars'></i>";

      // like count
      const likeCount = document.createElement('span');
      likeCount.innerText = '3 likes';

      showLikeAction.append(btnLike, likeCount);

      showInfo.append(title, showLikeAction);

      // show action
      const showActions = document.createElement('div');
      showActions.className = 'show-actions';

      // create child btn
      const commentBtn = document.createElement('button');
      commentBtn.className = 'btn-action btn-comment';
      commentBtn.innerText = 'Comments';

      const reservationBtn = document.createElement('button');
      reservationBtn.className = 'btn-action btn-reservation';
      reservationBtn.innerText = 'Reservations';

      showActions.append(commentBtn, reservationBtn);

      item.append(showImg, showInfo, showActions);

      container.appendChild(item);
    });
  } else {
    container.innerHTML = '<p class="no-data">No Data Found</p>';
  }
};

const fetchEpisodes = async (url, container) => {
  const res = await fetch(url);
  const result = await res.json();

  renderItems(result, container);
};

export default fetchEpisodes;
