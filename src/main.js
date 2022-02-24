import { createSiteMenuTemplate } from './view/site-menu-view.js';
import { renderTemplate, RenderPosition } from '../render.js';
import { createSiteFilterTemplate } from './view/site-filter-view.js';
import { createSiteSortTemplate } from './view/site-sort-view.js';
import { createSiteListTemplate } from './view/site-list-view.js';
import { createSiteLoadingTemplate } from './view/site-loading-view.js';

const siteMainElement = document.querySelector('.trip-main');
const siteHeaderElement = siteMainElement.querySelector('.trip-main__trip-controls');

renderTemplate(siteHeaderElement, createSiteMenuTemplate(), RenderPosition.BEFOREEND);

const siteFilterElement = siteMainElement.querySelector('.trip-controls__filters');

renderTemplate(siteFilterElement, createSiteFilterTemplate(), RenderPosition.BEFOREEND);

const siteSortElement = document.querySelector('.page-main');
const siteHeaderSortElement = siteSortElement.querySelector('.trip-events');

renderTemplate(siteHeaderSortElement, createSiteSortTemplate(), RenderPosition.BEFOREEND);

renderTemplate(siteHeaderSortElement, createSiteListTemplate(), RenderPosition.BEFOREEND);

renderTemplate(siteHeaderSortElement, createSiteLoadingTemplate(), RenderPosition.BEFOREEND);

