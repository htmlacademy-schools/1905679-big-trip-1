import {render, RenderPosition} from './utils/render';
import SiteNavigation from './view/site-navigation.js';
import SiteFilters from './view/site-filters.js';
import SiteInfo from './view/site-info.js';
import { generateWaypoint } from './mock/waypoint.js';
import TripPresenter from './presenter/trip-presenter.js';

const count = 5;
const wayPoint = Array.from({length: count}, generateWaypoint);

const pageMainElement = document.querySelector('.page-body');

const siteNavigation = document.querySelector('.trip-controls__navigation');
const siteFilters = document.querySelector('.trip-controls__filters');

render(siteNavigation, new SiteNavigation(),RenderPosition.BEFOREEND);
render(siteFilters, new SiteFilters(), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(pageMainElement);
tripPresenter.init(wayPoint);
if (wayPoint.length !== 0) {
  render(siteNavigation, new SiteInfo(wayPoint), RenderPosition.BEFOREBEGIN);
}
