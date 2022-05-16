import {createElement} from '../render';

const createSiteInfo = () => (
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
    </p>
  </section>`
);

export default class SiteInfo {
  #element = null;
  #waypoints = null;

  constructor(waypoints) {
    this.#waypoints = waypoints;
  }

  get element(){
    if (!this.#element){
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template(){
    return createSiteInfo(this.#waypoints);
  }

  removeElement() {
    this.#element = null;
  }
}