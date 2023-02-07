export default class CommentPopup {
  constructor(tvShowId, domElementId) {
    this.id = tvShowId;
    this.baseUrl = 'https://api.tvmaze.com';
    this.endPoint = '/shows/';
    this.parentDomElement = document.getElementById(domElementId);

    this.#getTvShow()
      .then(tvShow => {
        this.#drawPopup(tvShow);
      });
  }

  destroy() {
    this.#clearDomElement('comment-popup__image');
    this.#clearDomElement('comment-popup__title');
    this.#clearDomElement('comment-popup__summary');
    this.#clearDomElement('comment-popup__language');
    this.#clearDomElement('comment-popup__genres');
    this.#clearDomElement('comment-popup__network');
    this.#clearDomElement('comment-popup__schedule');

    this.#hiddePopupModal();
  }

  #getTvShow = () => fetch(`${this.baseUrl}${this.endPoint}${this.id}`)
    .then(resp => resp.json())

  #drawPopup(tvShow) {
    this.#createDomElement('comment-popup__image', 'img', 'src', tvShow.image.medium);
    this.#createDomElement('comment-popup__title', 'h2', 'innerHTML', tvShow.name);
    this.#createDomElement('comment-popup__summary', 'span', 'innerHTML', tvShow.summary);
    this.#createDomElement('comment-popup__language', 'span', 'innerHTML', tvShow.language, 'Language');
    this.#createDomElement('comment-popup__genres', 'span', 'innerHTML', tvShow.genres.join(', '), 'Genres');
    this.#createDomElement('comment-popup__network', 'span', 'innerHTML', tvShow.network.name, 'Network');
    this.#createDomElement('comment-popup__schedule', 'span', 'innerHTML', tvShow.schedule.time, 'Schedule');

    const xMark = document.getElementById('comment-popup__x-mark');
    xMark.addEventListener('click', (e) => this.destroy());

    this.#showPopupModal();
  }

  #createDomElement(id, elementType, attribute, attributeData, title = null) {
    const parentDomElement = document.getElementById(id);
    
    if(title) {
      const titleDomElement = document.createElement('label');
      titleDomElement.innerHTML = title;
      parentDomElement.appendChild(titleDomElement);
    }

    const newDomElement = document.createElement(elementType);
    newDomElement[attribute] = attributeData;
    parentDomElement.appendChild(newDomElement);
  }

  #clearDomElement(id){
    const parentDomElement = document.getElementById(id);
    parentDomElement.innerHTML = '';
  }

  #showPopupModal = () => this.parentDomElement.classList.remove('hidden')
  #hiddePopupModal = () => this.parentDomElement.classList.add('hidden')
}