export default class CommentPopup {
  constructor(id) {
    this.id = id;
    this.baseUrl = 'https://api.tvmaze.com';
    this.endPoint = '/shows/'

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
    this.createDomElement('comment-popup__language', 'span', 'innerHTML', tvShow.language);
    this.createDomElement('comment-popup__genres', 'span', 'innerHTML', tvShow.genres.join(', '));
    this.createDomElement('comment-popup__network', 'span', 'innerHTML', tvShow.network.name);
    this.createDomElement('comment-popup__schedule', 'span', 'innerHTML', tvShow.schedule.time);
    
    console.log(tvShow);
  }

  createDomElement(id, elementType, attribute, attributeData) {
    const parentDomElement = document.getElementById(id);
    const newDomElement = document.createElement(elementType);
    newDomElement[attribute] = attributeData;
    parentDomElement.appendChild(newDomElement);
  }
}