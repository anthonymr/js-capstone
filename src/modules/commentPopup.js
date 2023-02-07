export default class CommentPopup {
  constructor(tvShowId, domElementId) {
    this.id = tvShowId;
    this.baseUrl = 'https://api.tvmaze.com';
    this.endPoint = '/shows/';
    this.parentDomElement = document.getElementById(domElementId);

    this.#createBasicHTML();

    this.#getTvShow()
      .then((tvShow) => {
        this.#drawPopup(tvShow);
      });
  }

  destroy() {
    this.#hiddePopupModal();

    this.parentDomElement.innerHTML = '';
  }

  #getTvShow = () => fetch(`${this.baseUrl}${this.endPoint}${this.id}`)
    .then((resp) => resp.json())

  #drawPopup(tvShow) {
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

  #createDomElement(id, elementType, attribute, attributeData, title = null) {
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

  #createBasicHTML() {
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
      </div>
    `;
  }

  #showPopupModal = () => this.parentDomElement.classList.remove('hidden')

  #hiddePopupModal = () => this.parentDomElement.classList.add('hidden')
}