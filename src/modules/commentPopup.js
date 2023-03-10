import commentCounter from './commentCounter.js';

export default class CommentPopup {
  constructor(tvShowId, domElementId) {
    this.id = tvShowId;
    this.baseUrl = 'https://api.tvmaze.com';
    this.endPoint = '/shows/';
    this.parentDomElement = document.getElementById(domElementId);

    this.parentDomElement.classList.add('hidden');

    this.involvApiBaseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';
    this.involvApiKey = 'cTATStFavmk0jriD21vx';
    this.involvApiCommentsEndpoint = `/apps/${this.involvApiKey}/comments`;

    this.#createBasicHTML();

    this.#setNewCommentEvents();

    this.#getTvShow();
    this.#getComments(tvShowId);
  }

  destroy = () => {
    this.#hiddePopupModal();

    this.parentDomElement.innerHTML = '';
  }

  #getTvShow = async () => {
    const response = await fetch(`${this.baseUrl}${this.endPoint}${this.id}`);
    const tvShows = await response.json();

    this.#drawPopup(tvShows);
  }

  #drawPopup = (tvShow) => {
    this.#createDomElement('comment-popup__image', 'img', 'src', tvShow.image.medium);
    this.#createDomElement('comment-popup__title', 'h2', 'innerHTML', tvShow.name);
    this.#createDomElement('comment-popup__summary', 'span', 'innerHTML', tvShow.summary);
    this.#createDomElement('comment-popup__language', 'span', 'innerHTML', tvShow.language, 'Language');
    this.#createDomElement('comment-popup__genres', 'span', 'innerHTML', tvShow.genres.join(', '), 'Genres');
    this.#createDomElement('comment-popup__network', 'span', 'innerHTML', tvShow.network.name, 'Network');
    this.#createDomElement('comment-popup__schedule', 'span', 'innerHTML', tvShow.schedule.time, 'Schedule');

    const xMark = document.getElementById('comment-popup__x-mark');
    xMark.addEventListener('click', () => this.destroy());

    this.#showPopupModal();
  }

  #createDomElement = (id, elementType, attribute, attributeData, title = null) => {
    this.auxDomElement = document.getElementById(id);

    if (title) {
      const titleDomElement = document.createElement('label');
      titleDomElement.innerHTML = title;
      this.auxDomElement.appendChild(titleDomElement);
    }

    const newDomElement = document.createElement(elementType);
    newDomElement[attribute] = attributeData;
    this.auxDomElement.appendChild(newDomElement);
  }

  #createBasicHTML = () => {
    this.parentDomElement.innerHTML = `
      <div>
        <div class="comment-popup__x-mark">
          <i class="fa-solid fa-xmark" id="comment-popup__x-mark"></i>
        </div>
        <div class="comment-popup__description-container">
          <span id="comment-popup__image"></span>
          <div>
            <span id="comment-popup__title"></span>
            <div id="comment-popup__language"></div>
            <div id="comment-popup__genres"></div>
            <div id="comment-popup__network"></div>
            <div id="comment-popup__schedule"></div>
          </div>
        </div>
        <span id="comment-popup__summary"></span>
        <h2 id="comment-popup__comments_title">Comments</h2>
        <ul id="comment-popup__comments_list"></ul>
        <h3 id="comment-popup__new-comment-title">Add new comment</h3>
        <form id="comment-popup__new-comment-form">
          <input placeholder="Your name" id="comment-popup__new-comment-username">
          <textarea placeholder="Your insights" id="comment-popup__new-comment-insight"></textarea>
          <button id="comment-popup__new-comment-submit">Comment</button>
        </form>
      </div>
    `;
  }

  #updateCommentCounter = (count) => {
    this.commentTitle = document.getElementById('comment-popup__comments_title');
    this.commentTitle.innerHTML = `Comments (${count})`;
  }

  #showPopupModal = () => this.parentDomElement.classList.remove('hidden')

  #hiddePopupModal = () => this.parentDomElement.classList.add('hidden')

  #getComments = async (id) => {
    const response = await fetch(`${this.involvApiBaseUrl}${this.involvApiCommentsEndpoint}?item_id=${id}`);
    const comments = await response.json();

    this.#drawComments(comments);
  }

  #drawComments = (comments) => {
    this.parentUl = document.getElementById('comment-popup__comments_list');
    this.parentUl.innerHTML = '';

    if (Array.isArray(comments)) {
      comments.forEach((comment) => {
        const newLiElement = document.createElement('li');
        const divDate = document.createElement('div');
        const divUser = document.createElement('div');
        const divComment = document.createElement('div');

        divDate.innerHTML = comment.creation_date;
        divUser.innerHTML = comment.username;
        divComment.innerHTML = comment.comment;

        newLiElement.appendChild(divDate);
        newLiElement.appendChild(divUser);
        newLiElement.appendChild(divComment);

        this.parentUl.appendChild(newLiElement);
      });
    }

    const commentAmount = commentCounter('comment-popup__comments_list');
    this.#updateCommentCounter(commentAmount);
  }

  async #addNewComment(username, insight) {
    const response = await fetch(`${this.involvApiBaseUrl}${this.involvApiCommentsEndpoint}`, {
      method: 'POST',
      body: JSON.stringify({
        item_id: this.id,
        username,
        comment: insight,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok && response.status !== 201) {
      return;
    }

    this.#getComments(this.id);
  }

  #setNewCommentEvents = () => {
    this.newCommentUserName = document.getElementById('comment-popup__new-comment-username');
    this.newCommentInsight = document.getElementById('comment-popup__new-comment-insight');
    this.newCommentSubmit = document.getElementById('comment-popup__new-comment-submit');

    this.newCommentSubmit.addEventListener('click', (event) => {
      event.preventDefault();

      if (!this.newCommentUserName.value || !this.newCommentInsight.value) {
        return;
      }

      this.#addNewComment(this.newCommentUserName.value, this.newCommentInsight.value);
      this.newCommentUserName.value = '';
      this.newCommentInsight.value = '';
    });
  }
}