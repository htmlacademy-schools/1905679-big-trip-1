import {createElement} from '../render';

const createSiteEventsList = () => (
  `<ul class="trip-events__list">
      </ul>`
);

export default class SiteEventList {
  #element = null;

  get element() {
    if (!this.#element){
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createSiteEventsList();
  }

  removeElement() {
    this.#element = null;
  }
}
