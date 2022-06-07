import { generateEvents } from './mock/waypoint';
import TripPresenter from './presenter/trip-presenter';
import EventsModel from './model/events-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';

const count = 5;

const events = Array.from({ length: count }, generateEvents);

const siteNavigationElement = document.querySelector('.trip-controls__navigation');

const siteFilterElement = document.querySelector('.trip-controls__filters');

const tripEvents = document.querySelector('.trip-events');

const eventsModel = new EventsModel();
eventsModel.events = events;

const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(tripEvents, siteNavigationElement, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel);

filterPresenter.init();

tripPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (event) => {
  event.preventDefault();
  tripPresenter.createEvent();
});
