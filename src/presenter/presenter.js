import { render } from '../framework/render.js';
import { updateDate, updateItem } from '../utils/is-favorite.js';
import Filter from '../view/Filter.js';
import DrawPoint from '../view/draw_point.js';
import TripPresenter from './trip-presenter.js';
export default class Presenter {
  boardComponent = new DrawPoint();
  pointMap = new Map();
  constructor({container, pointModel}) {
    this.container = container;
    this.pointModel = pointModel;
  }

  init() {
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
      const TripPres = new TripPresenter(
        {
          container: this.container,
          pointModel: this.pointModel,
          point: point,
          pointUpdate: this.#pointUpdate,
          onEditClose: this.onEditClose
        });
      TripPres.init();
      this.pointMap.set(point.id, TripPres);
    }
  }

  #pointUpdate = () => {
    this.point = updateDate(this.point, updateItem);
    this.pointMap.get(updateItem.id).init(updateItem);
  };

  onEditClose = () => {
    this.pointMap.forEach((presenter) => presenter.SetView());
  };
}


