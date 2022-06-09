import { generateEvents } from './mock/waypoint';
import TripPresenter from './presenter/trip-presenter';
import EventsModel from './model/events-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import SiteNavigation from './view/site-navigation';
import { MenuItem } from './const';
import { countingStats, clearStats } from './utils/stat';
import StatView from './view/site-stat-view';
import { RenderPosition, render, remove } from './utils/render';
import Api from './api';

const AUTHORIZATION = 'Basic Lv1Bn3hbq3Rj7hj';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip/';

const eventModel = new EventsModel(new Api(END_POINT, AUTHORIZATION));

const count = 5;

const events = Array.from({ length: count }, generateEvents);

const siteMainElement = document.querySelector('.page-main').querySelector('.page-body__container');

const siteMenuContainer = document.querySelector('.trip-controls__navigation');

const siteFilterElement = document.querySelector('.trip-controls__filters');

const tripEvents = document.querySelector('.trip-events');

const siteMenuComponent = new SiteNavigation();

const eventsModel = new EventsModel();
eventsModel.events = events;

const filterModel = new FilterModel();

render(siteMenuContainer, siteMenuComponent, RenderPosition.BEFOREEND);
const tripPresenter = new TripPresenter(tripEvents, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel);

filterPresenter.init();

tripPresenter.init();

let statsView = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.EVENTS:
      filterPresenter.init();
      tripPresenter.init();
      remove(statsView);
      clearStats();
      break;
    case MenuItem.STATISTICS:
      countingStats(eventsModel.events);
      statsView = new StatView();
      render(siteMainElement, statsView, RenderPosition.BEFOREEND);
      filterPresenter.destroy();
      tripPresenter.destroy();
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (event) => {
  event.preventDefault();
  const tableLink = document.querySelector('#EVENTS');
  const statsLink = document.querySelector('#STATISTICS');
  tableLink.classList.add('trip-tabs__btn--active');
  statsLink.classList.remove('trip-tabs__btn--active');
  filterPresenter.destroy();
  filterPresenter.init();
  tripPresenter.destroy();
  tripPresenter.init();
  tripPresenter.createEvent();
});
