export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export const SortType = {
  SORT_DAY: 'sort-day',
  SORT_TIME: 'sort-time',
  SORT_PRICE: 'sort-price'
};

export const createOffersTemplate = (offerArray, type) => {
  const getOffersTemplate = (offers) => {
    const offersToRender = offers.filter((offer) => offer.isActive);
    if (offersToRender.length === 0) { return ''; }

    const getListItemTemplate = (offer) => {
      const { title, price } = offer;
      return `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>`;
    };

    return offersToRender.map((offer) => getListItemTemplate(offer)).join('\n');
  };

  const typeOffers = offerArray.filter((offerStruct) => offerStruct.type === type);

  if (typeOffers.length > 0) {
    const offersTemplate = getOffersTemplate(typeOffers[0].offers);

    if (offersTemplate !== '')
    {return `<h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
        ${offersTemplate}
        </ul>`;}
  }

  return '';
};


export const createFormOffersTemplate = (offerArray, type) => {
  const getOffersTemplate = (offers) => {
    if (offers.length === 0) { return ''; }

    const getListItemTemplate = (offer) => {
      const { id, title, price, isActive } = offer;
      return `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${id}" type="checkbox" name="event-offer-${type}" ${isActive ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-${type}-${id}">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
      </div>`;
    };
    return offers.map((offer) => getListItemTemplate(offer)).join('\n');
  };

  const typeOffers = offerArray.filter((offerStruct) => offerStruct.type === type);

  if (typeOffers.length > 0) {
    const offersTemplate = getOffersTemplate(typeOffers[0].offers);

    if (offersTemplate !== '')
    {return `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
        ${offersTemplate}
        </div>
      </section>`;}
  }

  return '';
};
