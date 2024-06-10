import { replace, render } from '../framework/render';
import WayPoint from '../view/way_point';
import EditWayPoints from '../view/edit_way_point';
export default class TripPresenter {
  constructor(container, pointModel) {
    this.container = container;
    this.pointModel = pointModel;
  }

  init() {
    const points = this.pointModel.getPoints();
    this.#renderEvents(points);
  }

  #renderEvents(points) {
    points.forEach((point) => this.#renderEvent(point));
  }

  #renderEvent(point) {
    const points = this.pointModel.getPoints();
    const offers = this.pointModel.getOffers();
    const destination = this.pointModel.getDestination();
    const onEditClick = () => swithToEditWayPoint();
    const onFormWayPoint = () => switchToWayPoint();
    const onEsc = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        switchToWayPoint();
      }
    };

    const wayPoint = new WayPoint(
      point,
      destination,
      points,
      offers,
      onFormWayPoint
    );
    const eventEditView = new EditWayPoints(
      offers,
      points,
      destination,
      point,
      onEditClick);

    function swithToEditWayPoint() {
      replace(wayPoint, eventEditView);
      document.addEventListener('keydown', onEsc);
    }

    function switchToWayPoint() {
      replace(eventEditView, wayPoint);
      document.removeEventListener('keydown', onEsc);
    }

    render(wayPoint, this.container);
  }
}
