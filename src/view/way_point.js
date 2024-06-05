import AbstractView from '../framework/view/abstract-view';
import normalDate from '../utils/utils';
function wayPoint(point, points, destination, offers) {
  const {isFavorite} = point;
  const currentDestination = destination.find((des) => des.id === offers[0].ObjOffers[0].id);
  const currentPoint = points.find((poi) => poi.type === offers[0].type);
  const currentOffers = offers.find((off) => off.type === currentPoint.type);
  const startDate = normalDate(currentPoint.dateFrom);
  const endDate = normalDate(currentPoint.dateTo);
  return `<li class="trip-events__item">
	<div class="event">
		<time class="event__date" datetime="2019-03-18">MAR 18</time>
		<div class="event__type">
			<img
				class="event__type-icon"
				width="42"
				height="42"
				src="img/icons/${currentOffers.type}.png"
				alt="Event type icon"
			/>
		</div>
		<h3 class="event__title">${currentOffers.type} ${currentDestination.name}</h3>
		<div class="event__schedule">
			<p class="event__time">
				<time class="event__start-time" datetime='${startDate}'
					>${startDate}</time
				>
				&mdash;
				<time class="event__end-time" datetime="2019-03-18T13:35"
					>${endDate}</time
				>
			</p>
			<p class="event__duration">01H 10M</p>
		</div>
		<p class="event__price">
			&euro;&nbsp;<span class="event__price-value">${currentPoint.basePrice}</span>
		</p>
		<h4 class="visually-hidden">Offers:</h4>
		<ul class="event__selected-offers">
	<li class="event__offer">
	<span class="event__offer-title">${currentOffers.ObjOffers[0].title}</span>
	&plus;&euro;&nbsp;
	<span class="event__offer-price">${currentOffers.ObjOffers[0].price}</span>
	</li>
		</ul>
		<button class="event__favorite-btn${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
			<span class="visually-hidden">Add to favorite</span>
			<svg
				class="event__favorite-icon"
				width="28"
				height="28"
				viewBox="0 0 28 28"
			>
				<path
					d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"
				/>
			</svg>
		</button>
		<button class="event__rollup-btn" type="button">
			<span class="visually-hidden">Open event</span>
		</button>
	</div>
	</li>`;
}

export default class WayPoint extends AbstractView {
  #destination = null;
  #point = null;
  #offers = null;
  #butClick = null;
  #button = null;
  #points = null;
  constructor(point, points, destination, offers, onEditClick, favoriteClick) {
    super();
    this.#point = point;
    this.#points = points;
    this.#destination = destination;
    this.#offers = offers;
    this.favoriteClick = favoriteClick;
    this.#butClick = onEditClick;
    this.#button = this.element.querySelector('.event__rollup-btn');
    this.#button.addEventListener('click', this.#onClick);
    // this.favorite = this.element.querySelector('.event__favorite-btn').addEventListener('click', this.favoriteClick);
  }

  get template() {
    return wayPoint(this.#point, this.#points, this.#destination, this.#offers);
  }

  #onClick = (evt) => {
    evt.preventDefault();
    this.#butClick();
  };

  favoriteCli = () => {
    this.favoriteClick();
  };
}
