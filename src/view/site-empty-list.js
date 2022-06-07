import AbstractView from './abstract-view';

import {FilterType} from '../const';

const EventsTextTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no events future',
  [FilterType.PAST]: 'There are no events past'
};

const createSiteEmptyList = (filterType) => {
  const eventsEmptyText = EventsTextTextType[filterType];

  return `<p class="trip-events__msg">${eventsEmptyText}</p>`;
};

export default class SiteEmptyList extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  get template() {
    return createSiteEmptyList(this._data);
  }
}

