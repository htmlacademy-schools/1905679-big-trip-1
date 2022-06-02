import SiteWayPoint from '../view/site-waypoint';
import SiteEditForm from '../view/site-edit-form';
import {render, RenderPosition, replace, remove} from '../utils/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #waypointsListElement = null;
  #changeData = null;
  #changeMode = null;

  #waypointItemComponent = null;
  #editFormComponent = null;

  #waypoint = null;
  #mode = Mode.DEFAULT;

  constructor(waypointsListElement, changeData, changeMode) {
    this.#waypointsListElement = waypointsListElement;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (waypoint) => {
    this.#waypoint = waypoint;

    const prevWaypointComponent = this.#waypointItemComponent;
    const prevEditComponent = this.#editFormComponent;

    this.#waypointItemComponent = new SiteWayPoint(waypoint);
    this.#editFormComponent = new SiteEditForm(waypoint);

    this.#waypointItemComponent.setEditClickHandler(this.#handleEditClick);
    this.#editFormComponent.setRollupClickHandler(this.#handleRollupClick);
    this.#editFormComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#waypointItemComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    if (prevWaypointComponent === null || prevEditComponent === null){
      render(this.#waypointsListElement, this.#waypointItemComponent, RenderPosition.BEFOREEND);
      return;
    }
    if (this.#mode === Mode.DEFAULT){
      replace(this.#waypointItemComponent, prevWaypointComponent);
    }
    if (this.#mode === Mode.EDITING) {
      replace(this.#editFormComponent, prevEditComponent);
    }

    remove(prevWaypointComponent);
    remove(prevEditComponent);
  }

  destroy = () => {
    remove(this.#waypointItemComponent);
    remove(this.#editFormComponent);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToItem();
    }
  }

  #replaceItemToForm = () => {
    replace(this.#editFormComponent, this.#waypointItemComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToItem = () => {
    replace(this.#waypointItemComponent, this.#editFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (event) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      event.preventDefault();
      this.#replaceFormToItem();
    }
  };

  #handleEditClick = () => {
    this.#replaceItemToForm();
  };

  #handleRollupClick = () => {
    this.#replaceFormToItem();
  };

  #handleFormSubmit = (waypoint) => {
    this.#changeData(waypoint);
    this.#replaceFormToItem();
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#waypoint, isFavorite: !this.#waypoint.isFavorite});
  }
}
