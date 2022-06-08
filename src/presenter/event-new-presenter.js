import EditPoint from '../view/site-edit-form';
import { nanoid } from 'nanoid';
import { UserAction, UpdateType } from '../const';
import { RenderPosition, render, remove } from '../utils/render';

export default class EventNewPresenter {
  #eventListContainer = null;
  #changeData = null;
  #eventEditComponent = null;
  #tripEvent =null;
  constructor(eventListContainer, changeData) {
    this.#eventListContainer = eventListContainer;
    this.#changeData = changeData;
  }

  init = (tripEvent) => {
    this.#tripEvent =tripEvent;

    if (this.#eventEditComponent !== null) {
      return;
    }
    this.#eventEditComponent = new EditPoint(this.#tripEvent);

    this.#eventEditComponent.setClickRollupHandler(this.#handleDeleteClick);
    this.#eventEditComponent.setFormSubmitHadler(this.#handleFormSubmit);
    this.#eventEditComponent.setDeleteClickHandler(this.#handleDeleteClick);
    render(this.#eventListContainer, this.#eventEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#onEscKeyDown);
  }

  destroy = () => {
    if (this.#eventEditComponent === null) {
      return;
    }

    remove(this.#eventEditComponent);
    this.#eventEditComponent = null;

    document.removeEventListener('keydown', this.#onEscKeyDown);
  }

  #onEscKeyDown = (event) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      event.preventDefault();
      this.destroy();
    }
  }

  #handleDeleteClick = () => {
    this.destroy();
  }

  #handleFormSubmit = (event) => {
    this.#changeData(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      {id: nanoid(), ...event},
    );
    this.destroy();
  }
}
