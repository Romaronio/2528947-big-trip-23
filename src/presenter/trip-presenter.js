import { mode } from '../const';
import { render, replace } from '../framework/render';
import { updateItem } from '../utils/is-favorite';
import EditWayPoints from '../view/edit_way_point';
import WayPoint from '../view/way_point';
export default class TripPresenter {
  #container = null;
  #pointModel = null;
  #Mode = mode.simple;
  wayPoint = null;
  eventEditView = null;
  constructor({container, pointModel, point, pointUpdate, onEditClose}) {
    this.#container = container;
    this.#pointModel = pointModel;
    this.point = point;
    this.pointUpdate = pointUpdate;
    this.onEditClose = onEditClose;
  }

  init(point) {
    const prevTaskComponent = this.wayPoint;
    const prevTaskEditComponent = this.eventEditView;
    const offers = this.#pointModel.getOffers();
    const points = this.#pointModel.getPoints();
    const destination = this.#pointModel.getDestination();
    const onEditClick = () => this.switchToEditWayPoint();
    const onFormWayPoint = () => this.switchToWayPoint();

    this.wayPoint = new WayPoint(
      this.point,
      points,
      destination,
      offers,
      onFormWayPoint,
      {
        favoriteClick:() => {
          const updatePoint = updateItem(offers, {isFavorite: !point.isFavorite});
          this.pointUpdate(updatePoint);
        }
      }
    );
    this.eventEditView = new EditWayPoints(
      offers,
      points,
      destination,
      this.point,
      onEditClick,
      {
        favoriteClick:() => {
          const updatePoint = updateItem(offers, {isFavorite: !point.isFavorite});
          this.pointUpdate(updatePoint);
        }
      }
    );
    if (prevTaskComponent === null || prevTaskEditComponent === null) {
      render(this.wayPoint, this.#container);
      return;
    }

    if (this.#Mode === mode.simple) {
      replace(this.wayPoint, this.eventEditView);
    }

    if (this.#Mode === mode.edit) {
      replace(this.eventEditView, this.wayPoint);
    }
  }

  onEsc = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.onEditClick();
    }
  };

  switchToEditWayPoint = () => {
    this.onEditClose();
    replace(this.wayPoint, this.eventEditView);
    document.addEventListener('keydown', this.onEsc);
    this.#Mode = mode.edit;
  };

  switchToWayPoint = () => {
    replace(this.eventEditView, this.wayPoint);
    document.removeEventListener('keydown', this.onEsc);
    this.#Mode = mode.simple;
  };

  SetView() {
    if(this.#Mode !== mode.edit){
      this.switchToWayPoint();
    }
  }
}
