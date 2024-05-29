import Header from '../view/Header';
import { render } from '../framework/render';
export default class HeaderPresenter {
  constructor({container, pointModel}) {
    this.container = container;
    this.pointModel = pointModel;
  }

  #renderHeader () {
    render(new Header(), this.container);
  }

  init() {
    this.#renderHeader();
  }
}
