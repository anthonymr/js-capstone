export default class CommentPopup {
  constructor(id) {
    this.id = id;
    this.baseUrl = 'https://api.tvmaze.com';
    this.endPoint = '/shows/';
    this.parentDomElement = document.getElementById('comment-popup');

    this.getTvShow()
      .then(tvShow => {
        this.drawPopup(tvShow);
      });
  }

  getTvShow = () => fetch(`${this.baseUrl}${this.endPoint}${this.id}`)
    .then(resp => resp.json())

  drawPopup(tvShow) {
    this.createDomElement('comment-popup__image', 'img', 'src', tvShow.image.medium);
    this.createDomElement('comment-popup__title', 'h2', 'innerHTML', tvShow.name);
    this.createDomElement('comment-popup__summary', 'span', 'innerHTML', tvShow.summary);
    this.createDomElement('comment-popup__language', 'span', 'innerHTML', tvShow.language, 'Language');
    this.createDomElement('comment-popup__genres', 'span', 'innerHTML', tvShow.genres.join(', '), 'Genres');
    this.createDomElement('comment-popup__network', 'span', 'innerHTML', tvShow.network.name, 'Network');
    this.createDomElement('comment-popup__schedule', 'span', 'innerHTML', tvShow.schedule.time, 'Schedule');

    const xMark = document.getElementById('comment-popup__x-mark');
    xMark.addEventListener('click', (e) => this.hiddePopupModal());

    this.showPopupModal();
    console.log(tvShow);
  }

  createDomElement(id, elementType, attribute, attributeData, title = null) {
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

  showPopupModal(){
    this.parentDomElement.classList.remove('hidden');
  }

  hiddePopupModal(){
    this.parentDomElement.classList.add('hidden');
  }
}