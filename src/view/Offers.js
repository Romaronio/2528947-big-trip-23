import { createElement } from '../render';
const CreateOffers = (offer) =>
  `<div class="event__offer-selector">
	<input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
	<label class="event__offer-label" for="event-offer-luggage-1">
		<span class="event__offer-title">${offer.title}</span>
		&plus;&euro;&nbsp;
		<span class="event__offer-price">${offer.price}</span>
	</label>
</div>`;
function funOffers(offers, point) {
  const offerFind = offers.find((offer) => offer.type === point.type);
  const findOfferFind = offerFind.ObjOffers.map((offer) => CreateOffers(offer)).join('');
  return `<section class="event__section  event__section--offers">
						<h3 class="event__section-title  event__section-title--offers">Offers</h3>
						<div class="event__available-offers">
							${findOfferFind}
						</div>
					</section>`;
}
export default class ClassOffers {
  constructor(offers, points) {
    this.offers = offers;
    this.points = points;
  }

  getTemplate() {
    return funOffers(this.offers, this.points);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
