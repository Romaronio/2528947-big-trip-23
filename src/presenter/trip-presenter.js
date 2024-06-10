import { mode } from '../const';
import { render, replace, remove } from '../framework/render';
import { updateItem } from '../utils/is-favorite';
import EditWayPoints from '../view/edit_way_point';
import WayPoint from '../view/way_point';
export default class TripPresenter {
  #container = null;
  #pointModel = null;
  #Mode = mode.simple;
  #pointUpdate = null;
  wayPoint = null;
  eventEditView = null;
  #point = null;
  #onEditClose = null;
  constructor({container, pointModel, point, pointUpdate, onEditClose}) {
    this.#container = container;
    this.#pointModel = pointModel;
    this.#point = point;
    this.#pointUpdate = pointUpdate;
    this.#onEditClose = onEditClose;
  }

  init() {
    const WayComponent = this.wayPoint;
    const EditComponent = this.eventEditView;
    const offers = this.#pointModel.getOffers();
    const points = this.#pointModel.getPoints();
    const destination = this.#pointModel.getDestination();
    const onEditClick = () => this.switchToWayPoint();
    const onFormWayPoint = () => this.switchToEditWayPoint();

    this.wayPoint = new WayPoint(
      this.#point,
      destination,
      points,
      offers,
      onFormWayPoint,
      {
        favoriteClick:() => {
          const updatePoint = updateItem(this.#point, {isFavorite: !this.#point.isFavorite});
          this.#pointUpdate(updatePoint);
        }
      }
    );

    this.eventEditView = new EditWayPoints(
      offers,
      points,
      destination,
      this.#point,
      onEditClick,
      {
        favoriteClick:() => {
          const updatePoint = updateItem(this.#point, {isFavorite: !this.#point.isFavorite});
          this.#pointUpdate(updatePoint);
        }
      }
    );
    if (WayComponent === null || EditComponent === null) {
      render(this.wayPoint, this.#container);
      return;
    }

    if (this.#Mode === mode.simple) {
      replace(this.eventEditView, WayComponent);
    }

    if (this.#Mode === mode.edit) {
      replace(this.wayPoint, EditComponent);
    }
    remove(WayComponent);
    remove(EditComponent);
  }

  setView () {
    if (this.#Mode === mode.edit) {
      this.switchToWayPoint();
    }
  }

  onEsc = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.switchToWayPoint();
    }
  };

  switchToEditWayPoint = () => {
    replace(this.eventEditView, this.wayPoint);
    document.addEventListener('keydown', this.onEsc);
    this.#onEditClose();
    this.#Mode = mode.edit;
  };

  switchToWayPoint = () => {
    replace(this.wayPoint, this.eventEditView);
    document.removeEventListener('keydown', this.onEsc);
    this.#Mode = mode.simple;
  };
}
