import Header from '../view/Header';
import { render } from '../framework/render';
export default class HeaderPresenter {
  constructor({headerContainer}) {
    this.headerContainer = headerContainer;
  }

  #renderHeader () {
    render(new Header(), this.headerContainer);
  }

  init() {
    this.#renderHeader();
  }
}
