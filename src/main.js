import {render, RenderPosition} from './render';
import SiteNavigation from './view/site-navigation.js';
import SiteWayPoint from './view/site-waypoint.js';
import SiteSort from './view/site-sort.js';
import SiteEditForm from './view/site-edit-form.js';
import SiteFilters from './view/site-filters.js';
import SiteEventsList from './view/site-event-list.js';
import SiteInfo from './view/site-info.js';
import { generateWaypoint } from './mock/waypoint.js';

const siteMenu = document.querySelector('.trip-main');
const siteNavigation = siteMenu.querySelector('.trip-controls__navigation');
const siteEventsElement = document.querySelector('.trip-events');
const siteFilters = siteMenu.querySelector('.trip-controls__filters');

const renderWaypoint = (eventListElement, waypoint) => {
  const waypointComponent = new SiteWayPoint(waypoint);
  const waypointEditComponent = new SiteEditForm(waypoint);

  const replaceWaypointToEdit = () => {
    eventListElement.replaceChild(waypointEditComponent.element, waypointComponent.element);
  };

  const replaceEditToWaypoint = () => {
    eventListElement.replaceChild(waypointComponent.element, waypointEditComponent.element);
  };
  const onEscKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      replaceEditToWaypoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  waypointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceWaypointToEdit();
    document.addEventListener('keydown', onEscKeyDown);
  });

  waypointEditComponent.element.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    replaceEditToWaypoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(eventListElement, waypointComponent.element, RenderPosition.BEFOREEND);
};

const eventListComponent = new SiteEventsList();
render(siteEventsElement, eventListComponent.element, RenderPosition.BEFOREEND);

const siteEventsListElement = siteEventsElement.querySelector('.trip-events__list');

const count = 3;
const wayPoint = Array.from({length: count}, generateWaypoint);

render(siteMenu, new SiteInfo(wayPoint).element, RenderPosition.AFTERBEGIN);
render(siteNavigation, new SiteNavigation().element,RenderPosition.BEFOREEND);
render(siteFilters, new SiteFilters().element, RenderPosition.BEFOREEND);
render(siteEventsListElement, new SiteSort().element, RenderPosition.AFTERBEGIN);


for (let i = 0; i < count; i++) {
  renderWaypoint(eventListComponent.element, wayPoint[i]);
}
