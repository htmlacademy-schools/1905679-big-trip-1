import {render, RenderPosition, replace} from './utils/render';
import SiteNavigation from './view/site-navigation.js';
import SiteWayPoint from './view/site-waypoint.js';
import SiteSort from './view/site-sort.js';
import SiteEditForm from './view/site-edit-form.js';
import SiteFilters from './view/site-filters.js';
import SiteEventsList from './view/site-event-list.js';
import SiteInfo from './view/site-info.js';
import { generateWaypoint } from './mock/waypoint.js';
import SiteEmptyList from './view/site-empty-list.js';

const count = 5;
const wayPoint = Array.from({length: count}, generateWaypoint);

const siteMenu = document.querySelector('.trip-main');
const siteNavigation = siteMenu.querySelector('.trip-controls__navigation');
const siteEventsElement = document.querySelector('.trip-events');
const siteFilters = siteMenu.querySelector('.trip-controls__filters');

const renderWaypoint = (eventListElement, waypoint) => {
  const waypointComponent = new SiteWayPoint(waypoint);
  const waypointEditComponent = new SiteEditForm(waypoint);

  const replaceWaypointToEdit = () => {
    replace(waypointEditComponent, waypointComponent);
  };

  const replaceEditToWaypoint = () => {
    replace(waypointComponent, waypointEditComponent);
  };
  const onEscKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      replaceEditToWaypoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  waypointEditComponent.setRollupClickHandler(() => {
    replaceEditToWaypoint();
  });

  waypointComponent.setEditClickHandler(() => {
    replaceWaypointToEdit();
    document.addEventListener('keydown', onEscKeyDown);
  });

  waypointEditComponent.setFormSubmit(() => {
    replaceEditToWaypoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(eventListElement, waypointComponent, RenderPosition.BEFOREEND);
};

if (wayPoint.length === 0) {
  render(siteNavigation, new SiteNavigation(),RenderPosition.BEFOREEND);
  render(siteFilters, new SiteFilters(), RenderPosition.BEFOREEND);
  render(siteEventsElement, new SiteEmptyList(), RenderPosition.BEFOREEND);
} else {
  const eventListComponent = new SiteEventsList();
  render(siteEventsElement, eventListComponent, RenderPosition.BEFOREEND);

  const siteEventsListElement = siteEventsElement.querySelector('.trip-events__list');

  render(siteMenu, new SiteInfo(wayPoint), RenderPosition.AFTERBEGIN);
  render(siteNavigation, new SiteNavigation(),RenderPosition.BEFOREEND);
  render(siteFilters, new SiteFilters(), RenderPosition.BEFOREEND);
  render(siteEventsListElement, new SiteSort(), RenderPosition.AFTERBEGIN);


  for (let i = 0; i < count; i++) {
    renderWaypoint(eventListComponent, wayPoint[i]);
  }
}
