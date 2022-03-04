import {renderTemplate, RenderPosition} from './render.js';
import { createSiteNavigation } from './view/site-navigation.js';
import { createSiteList } from './view/site-list.js';
import { createSiteSort } from './view/site-sort.js';
import { createSiteEditForm } from './view/site-edit-form.js';
import { createSiteFilters } from './view/site-filters.js';
import { createSiteEventsList } from './view/site-event-list.js';
import { createSiteMenu } from './view/site-menu.js';

const siteNavigation = document.querySelector('.trip-controls__navigation');
const siteEventsElement = document.querySelector('.trip-events');
renderTemplate(siteEventsElement, createSiteEventsList(), RenderPosition.BEFOREEND);
const siteEventsListElement = siteEventsElement.querySelector('.trip-events__list');
const siteFilters = document.querySelector('.trip-controls__filters');
const siteMenu = document.querySelector('.trip-main');

const count = 3;

renderTemplate(siteNavigation, createSiteNavigation(), RenderPosition.BEFOREEND);
for (let i = 0; i < count; i++) {
  renderTemplate(siteEventsListElement, createSiteList(), RenderPosition.BEFOREEND);
}

renderTemplate(siteEventsElement, createSiteSort(), RenderPosition.AFTERBEGIN);
renderTemplate(siteEventsListElement, createSiteEditForm(), RenderPosition.AFTERBEGIN);
renderTemplate(siteFilters, createSiteFilters(), RenderPosition.BEFOREEND);
renderTemplate(siteMenu, createSiteMenu(), RenderPosition.AFTERBEGIN);
