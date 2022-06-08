import AbstractView from './abstract-view';
import {MenuItem} from '../const';

const createSiteNavigation = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
  <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" id="${MenuItem.EVENTS}" data-value="${MenuItem.EVENTS}">Table</a>
  <a class="trip-tabs__btn" href="#" id="${MenuItem.STATISTICS}"  data-value="${MenuItem.STATISTICS}">Stats</a>
</nav>`
);

export default class SiteNavigation extends AbstractView {

  get template() {
    return createSiteNavigation();
  }

  setMenuClickHandler = (callback) => {
    const d = document.querySelector('.trip-controls__trip-tabs');
    this._callback.menuClick = callback;
    d.addEventListener('click', this.#menuClickHandler);
  }

  #menuClickHandler = (event) => {
    const currentLink = document.querySelector(`#${event.target.dataset.value}`);
    const prevLink = document.querySelector('.trip-tabs__btn--active');
    currentLink.classList.add('trip-tabs__btn--active');
    prevLink.classList.remove('trip-tabs__btn--active');

    this._callback.menuClick(event.target.dataset.value);
  }
}
