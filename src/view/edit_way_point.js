import AbstractView from '../framework/view/abstract-view';
import ClassOffers from './Offers';
const CreateBoxPoint = (des) => `<option value=${des.name}></option>`;
const CreateEventTypeList = (off) =>
  `<div class="event__type-item">
<input id="event-type-${off.type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${off.type}>
<label class="event__type-label  event__type-label--${off.type}" for="event-type-${off.type}-1">${off.type}</label>
</div>`;
function editWayPoint(offers,points, destination, point) {
  const {isFavorite} = point;
  const currentPoint = points.find((poi) => poi.type === offers[0].type);
  const currentDestination = destination.find((des) => des.id === offers[0].ObjOffers[0].id);
  const mapEventTypeList = offers.map((off)=> CreateEventTypeList(off)).join('');
  const BoxPoint = destination.map((des)=> CreateBoxPoint(des)).join('');
  return `<section class="trip-events">
	<h2 class="visually-hidden">Trip events</h2>
			<form class="event event--edit" action="#" method="post">
			<button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
				<header class="event__header">
					<div class="event__type-wrapper">
						<label class="event__type  event__type-btn" for="event-type-toggle-1">
							<span class="visually-hidden">Choose event type</span>
							<img class="event__type-icon" width="17" height="17" src="img/icons/${currentPoint.type}.png" alt="Event type icon">
						</label>
						<input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

						<div class="event__type-list">
							<fieldset class="event__type-group">
								<legend class="visually-hidden">Event type</legend>
								${mapEventTypeList}
							</fieldset>
						</div>
					</div>

					<div class="event__field-group  event__field-group--destination">
						<label class="event__label  event__type-output" for="event-destination-1">
							${currentPoint.type}
							${currentDestination.name}
						</label>
						<input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="" list="destination-list-1">
						<datalist id="destination-list-1">
						${BoxPoint}
						</datalist>
					</div>

					<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
					<button class="event__reset-btn" type="reset">${point.id ? 'Delete' : 'Cansel'}</button>
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
				</header>
				${new ClassOffers(offers, currentPoint).template}
				<section class="event__details">
                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${currentDestination.description}</p>

                    <div class="event__photos-container">
                      <div class="event__photos-tape">${currentDestination.pictures.map((pic) =>`<img class="event__photo" src="${pic.src}" alt="${pic.description}"></img>`)}
                      </div>
                    </div>
                  </section>
			</form>
			</section>`;
}
export default class EditWayPoints extends AbstractView {
  #offers = null;
  #points = null;
  #destination = null;
  #point = null;
  #button = null;
  #butClick = null;
  constructor(offers, points, destination, point, onEditClick) {
    super();
    this.#offers = offers;
    this.#points = points;
    this.#destination = destination;
    this.#point = point;
    this.#butClick = onEditClick;
    this.#button = this.element.querySelector('.event__rollup-btn');
    this.#button.addEventListener('click', this.#onClick);
    // this.favorite = this.element.querySelector('.event__favorite-btn').addEventListener('click', this.favoriteCli);
  }

  get template() {
    return editWayPoint(this.#offers, this.#points, this.#destination, this.#point);
  }

  #onClick = (evt) => {
    evt.preventDefault();
    this.#butClick();
  };

  favoriteCli = () => {
    this.favoriteClick();
  };
}
