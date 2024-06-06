import { render } from '../framework/render.js';
import { updateDate } from '../utils/is-favorite.js';
import Filter from '../view/Filter.js';
import DrawPoint from '../view/draw_point.js';
import TripPresenter from './trip-presenter.js';
export default class Presenter {
  boardComponent = new DrawPoint();
  pointMap = new Map();
  points = [];
  constructor({container, pointModel}) {
    this.container = container;
    this.pointModel = pointModel;
  }

  init() {
    this.ponts = this.pointModel.getPoints();
    this.#renderBoardComponent();
    this.#renderFilter();
    this.#renderTrip();
  }

  #renderBoardComponent() {
    render(this.boardComponent, this.container);
  }

  #renderFilter() {
    render(new Filter(), this.container);
  }

  #renderTrip() {
    for(const point of this.pointModel.getPoints()) {
      const tripPres = new TripPresenter(
        {
          container: this.container,
          pointModel: this.pointModel,
          point: point,
          pointUpdate: this.#pointUpdate,
          onEditClose: this.onEditClose
        });
      tripPres.init();
      this.pointMap.set(point.id, tripPres);
    }
  }

  #pointUpdate = (updateItem) => {
    this.points = updateDate(this.points, updateItem);
    this.pointMap.get(updateItem.id).init(updateItem);
  };

  onEditClose = () => {
    this.pointMap.forEach((presenter) => presenter.setView());
  };
}


