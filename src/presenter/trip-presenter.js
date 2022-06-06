import SiteSort from '../view/site-sort';
import SiteEmptyList from '../view/site-empty-list';
import SiteEventList from '../view/site-event-list';
import {render, RenderPosition} from '../utils/render';
import PointPresenter from './point-presenter';
import {updateItem} from '../utils/utils';
import {SortType} from '../utils/utils';
import {sortTaskByDay, sortTaskByDuration, sortTaskByPrice} from '../utils/sort';


export default class TripPresenter {
  #mainElement = null;
  #tripEventsElement = null;

  #sortComponent = new SiteSort();
  #emptyEventList = new SiteEmptyList();
  #tripEventsListElement = new SiteEventList();

  #tripEvents = [];
  #pointPresenter = new Map();
  #currentSortType = SortType.SORT_DAY;
  #sourcedTripPoints = [];

  constructor(mainElement) {
    this.#mainElement = mainElement;
    this.#tripEventsElement = this.#mainElement.querySelector('.trip-events');
  }

  init = (tripEvents) => {
    this.#tripEvents = [...tripEvents];
    this.#sourcedTripPoints = [...tripEvents];
    this.#renderMain();
  }

  #renderEmptyList = () => {
    render(this.#tripEventsElement, this.#emptyEventList, RenderPosition.BEFOREEND);
  }

  #renderTripEventsListElement = () => {
    render(this.#tripEventsElement, this.#tripEventsListElement, RenderPosition.BEFOREEND);
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleTaskChange = (updatedPoint) => {
    this.#tripEvents = updateItem(this.#tripEvents, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
    this.#sourcedTripPoints = updateItem(this.#sourcedTripPoints, updatedPoint);
  }

  #renderSort = () => {
    render(this.#tripEventsElement, this.#sortComponent, RenderPosition.AFTERBEGIN);

    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #sortTasks = (sortType) => {
    switch (sortType) {
      case SortType.SORT_DAY:
        this.#tripEvents.sort(sortTaskByDay);
        break;
      case SortType.SORT_TIME:
        this.#tripEvents.sort(sortTaskByDuration);
        break;
      case SortType.SORT_PRICE:
        this.#tripEvents.sort(sortTaskByPrice);
        break;
      default:
        this.#tripEvents = [...this.#sourcedTripPoints];
    }
    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortTasks(sortType);
    this.#clearTaskList();
    this.#renderTripEventsList();
  }

  #renderTripEvent = (waypoint) => {
    const pointPresenter = new PointPresenter(this.#tripEventsListElement, this.#handleTaskChange, this.#handleModeChange);
    pointPresenter.init(waypoint);
    this.#pointPresenter.set(waypoint.id, pointPresenter);
  }

  #renderTripEventsList = () => {
    for (let i = 0; i < this.#tripEvents.length; i++) {
      this.#renderTripEvent(this.#tripEvents[i]);
    }
  }

  #renderMain = () => {
    if (this.#tripEvents.length === 0) {
      this.#renderEmptyList();
    } else {
      this.#renderSort();
      this.#renderTripEventsListElement();
      this.#sortTasks(this.#currentSortType);
      this.#renderTripEventsList();
    }
  }

  #clearTaskList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }
}
