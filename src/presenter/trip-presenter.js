import SiteEventList from '../view/site-event-list';
import SiteSort from '../view/site-sort';
import SiteEmptyList from '../view/site-empty-list';
import PointPresenter from './point-presenter';
import EventNewPresenter from './event-new-presenter';
import { UserAction, UpdateType, FilterType } from '../const';
import { filter } from '../utils/filter';
import { generateEvents } from '../mock/waypoint';
import { clearStats } from '../utils/stat';
import { SortType, sortEventDate, sortEventTime, sortEventPrice } from '../utils/sort';

import { RenderPosition, render, remove } from '../utils/render';

export default class TripPresenter {
  #tripContainer = null;
  #PointPresenters = new Map();
  #eventNewPresenter = null;
  #currentSortType = SortType.DAY.text;
  #eventsModel = null;
  #filterModel = null;

  #sortComponent = null;
  #listEventComponent = new SiteEventList();
  #SiteEmptyListComponent = null;
  #filterType = FilterType.EVERYTHING;


  constructor(tripContainer, eventsModel, filterModel) {
    this.#tripContainer = tripContainer;
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;

    this.#eventNewPresenter = new EventNewPresenter(this.#listEventComponent, this.#handleViewAction);
  }

  get events() {
    this.#filterType = this.#filterModel.filter;
    const events = this.#eventsModel.events;
    const filteredEvents = filter[this.#filterType](events);

    switch (this.#currentSortType) {
      case SortType.DAY.text:
        return filteredEvents.sort(sortEventDate);
      case SortType.TIME.text:
        return filteredEvents.sort(sortEventTime);
      case SortType.PRICE.text:
        return filteredEvents.sort(sortEventPrice);
    }

    return filteredEvents;
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventsModel.deleteEvents(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#PointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderBoard();
        break;
    }
  }

  init = () => {
    this.#renderBoard();

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  createEvent = () => {
    const event = generateEvents();
    event.city.currentCity.isShowPhoto = true;
    const createEventData = {...event, isCreateEvent : true};
    this.#handleModeChange();
    this.#currentSortType = SortType.DAY.text;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    clearStats();
    this.#eventNewPresenter.init(createEventData);
  }

  #handleModeChange = () => {
    this.#eventNewPresenter.destroy();
    this.#PointPresenters.forEach((pointPresenter) => pointPresenter.resetView());
  }

  #renderSort = () => {
    this.#sortComponent = new SiteSort(this.#currentSortType);
    render(this.#tripContainer, this.#sortComponent, RenderPosition.BEFOREEND);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  destroy = () => {
    this.#clearBoard({ resetSortType: true});

    remove(this.#listEventComponent);

    this.#eventsModel.removeObserver(this.#handleModelEvent);
    this.#filterModel.removeObserver(this.#handleModelEvent);
  }

  #renderListEvent = () => {
    render(this.#tripContainer, this.#listEventComponent, RenderPosition.BEFOREEND);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();

  }

  #renderEvent = (tripEvent) => {
    const pointPresenter = new PointPresenter(this.#listEventComponent, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(tripEvent);
    this.#PointPresenters.set(tripEvent.id, pointPresenter);
  }

  #renderEvents = (events) => {
    events.forEach((tripEvent) => this.#renderEvent(tripEvent));
  }

  #renderNoEvents = () => {
    this.#SiteEmptyListComponent = new SiteEmptyList(this.#filterType);
    render(this.#tripContainer, this.#SiteEmptyListComponent, RenderPosition.BEFOREEND);
    this.#listEventComponent.element.remove();
    this.#sortComponent.element.remove();
  }

  #clearBoard = ({ resetSortType = false } = {}) => {
    this.#eventNewPresenter.destroy();
    this.#PointPresenters.forEach((presenter) => presenter.destroy());
    this.#PointPresenters.clear();
    remove(this.#sortComponent);
    remove(this.#SiteEmptyListComponent);

    if (this.#SiteEmptyListComponent) {
      remove(this.#SiteEmptyListComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY.text;
    }
  }

  #renderBoard = () => {
    if (this.events.length === 0) {
      this.#renderNoEvents();
      return;
    }

    const events = this.events.slice();

    this.#renderSort();

    this.#renderListEvent();

    this.#renderEvents(events);

    this.#handleSortTypeChange(this.#currentSortType);
  }
}
