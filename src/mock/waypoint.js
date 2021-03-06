import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { getRandomInteger } from '../utils/utils';
import { getDiffDates } from '../utils/date-manipulation';

const typeRoutes = [
  { title: 'taxi', img: 'img/icons/taxi.png', allOffer: [], selectedOffer: [], allPriceOffers: 0 },
  { title: 'bus', img: 'img/icons/bus.png', allOffer: [], selectedOffer: [], allPriceOffers: 0 },
  { title: 'drive', img: 'img/icons/drive.png', allOffer: [], selectedOffer: [], allPriceOffers: 0 },
  { title: 'ship', img: 'img/icons/ship.png', allOffer: [], selectedOffer: [], allPriceOffers: 0 },
  { title: 'check-in', img: 'img/icons/check-in.png', allOffer: [], selectedOffer: [], allPriceOffers: 0 },
  { title: 'flight', img: 'img/icons/flight.png', allOffer: [], selectedOffer: [], allPriceOffers: 0 },
  { title: 'restaurant', img: 'img/icons/restaurant.png', allOffer: [], selectedOffer: [], allPriceOffers: 0 },
  { title: 'sightseeing', img: 'img/icons/sightseeing.png', allOffer: [], selectedOffer: [], allPriceOffers: 0 },
  { title: 'train', img: 'img/icons/train.png', allOffer: [], selectedOffer: [], allPriceOffers: 0 }
];

const cityes = [
  { titleCity: 'Amsterdam', description: '', photos: [], isShowPhoto: false },
  { titleCity: 'Geneva', description: '', photos: [], isShowPhoto: false },
  { titleCity: 'Chamonix', description: '', photos: [], isShowPhoto: false }
];

const offersTitle = [
  { 'text': 'Add luggage', 'id': 'luggage' },
  { 'text': 'Switch to comfort', 'id': 'comfort' },
  { 'text': 'Add meal', 'id': 'meal' },
  { 'text': 'Choose seats', 'id': 'seats' },
  { 'text': 'Travel by train', 'id': 'train' }
];

const generateDate = () => {
  const maxDaysGag = 7;
  const daysGap = getRandomInteger(-7, maxDaysGag);
  const daysAddition = daysGap + getRandomInteger(0, 2);
  const startHoursAddition = getRandomInteger(1, 6);
  const endHoursAddition = getRandomInteger(startHoursAddition, startHoursAddition + 10);
  const startMinutesAddition = getRandomInteger(0, 59);
  const endMinutesAddition = getRandomInteger(startMinutesAddition, startMinutesAddition + 59);
  return {
    'dataBeginEvent': dayjs().add(daysGap, 'day').add(startHoursAddition, 'hour').add(startMinutesAddition, 'minute').toDate(),
    'dataEndEvent': dayjs().add(daysAddition, 'day').add(endHoursAddition, 'hour').add(endMinutesAddition, 'minute').toDate()
  };
};

export const generateTime = (date) => {
  const duration = getDiffDates(date.dataBeginEvent, date.dataEndEvent);
  let durationFormat = '';
  if (duration.days !== 0) {
    durationFormat += `${(`0${duration.days}`).slice(-2)}D ${(`0${duration.hours}`).slice(-2)}H ${(`0${duration.minuts}`).slice(-2)}M`;
  }
  else if (duration.hours !== 0) {
    durationFormat += `${(`0${duration.hours}`).slice(-2)}H ${(`0${duration.minuts}`).slice(-2)}M`;
  }
  else {
    durationFormat += `${(`0${duration.minuts}`).slice(-2)}M`;
  }

  return {
    'startTime': `${dayjs(date.dataBeginEvent).format('HH')}:${dayjs(date.dataBeginEvent).format('mm')}`,
    'endTime': `${dayjs(date.dataEndEvent).format('HH')}:${dayjs(date.dataEndEvent).format('mm')}`,
    'duration': durationFormat,
    'arrayDurationFormat': duration
  };
};

const generateDescription = () => {
  cityes.forEach((city) => {
    const descriptionArray = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'.split('.');
    const countDescription = getRandomInteger(1, descriptionArray.length);
    for (let i = 0; i < countDescription; i++) {
      const elementNumber = getRandomInteger(0, descriptionArray.length - 1);
      const descriptionArrayElement = descriptionArray[elementNumber];
      descriptionArray.splice(elementNumber, 1);
      city.description += descriptionArrayElement;
    }
  });
};

const generateOffers = () => {
  typeRoutes.forEach((typeRoute) => {
    const cloneOfferTitle = offersTitle.slice(0);
    let countOffers = getRandomInteger(0, 5);

    for (let i = 0; i < offersTitle.length; i++) {
      const numberElement = getRandomInteger(0, cloneOfferTitle.length - 1);
      const offerTitleElement = cloneOfferTitle[numberElement];
      const offer = {
        title: offerTitleElement,
        price: getRandomInteger(10, 100)
      };
      typeRoute.allOffer.push(offer);
      if (countOffers > 0) {
        typeRoute.selectedOffer.push(offer);
        typeRoute.allPriceOffers += offer.price;
        countOffers--;
      }
      cloneOfferTitle.splice(numberElement, 1);
    }
  });
};

const generatePhoto = () => {
  cityes.forEach((city) => {
    let numberPhoto = 0;
    const countPhotos = getRandomInteger(3, 6);
    for (let i = 0; i < countPhotos; i++) {
      numberPhoto += getRandomInteger(1, 10);
      city.photos.push(`http://picsum.photos/248/152?r=${numberPhoto}`);
    }
  });
};

generateOffers();
generateDescription();
generatePhoto();

export const generateEvents = () => {
  const date = generateDate();
  const time = generateTime(date);
  const type = { currentType: typeRoutes[getRandomInteger(0, 7)], arrayType: typeRoutes };
  const allPrice = type.currentType.allPriceOffers + getRandomInteger(10, 30);
  return {
    id: nanoid(),
    date,
    type,
    city: {currentCity: cityes[getRandomInteger(0, 2)], arrayCity: cityes},
    time,
    allPrice,
    favorite: Boolean(getRandomInteger(0, 1)),
  };
};
