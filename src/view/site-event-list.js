import AbstractView from './abstract-view';

const createSiteEventsList = () => (
  `<ul class="trip-events__list">
      </ul>`
);

export default class SiteEventList extends AbstractView {

  get template() {
    return createSiteEventsList();
  }
}
