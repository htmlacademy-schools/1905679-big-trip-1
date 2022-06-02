import dayjs from 'dayjs';
import { CITIES } from '../const.js';
import { WAYPOINTTYPES } from '../const.js';
import { getRandomInteger } from '../utils/utils.js';
import { OFFERS } from '../const.js';
import { TEXT } from '../const.js';
import {nanoid} from 'nanoid';

const generateDescription = () => {
  const randomIndex = getRandomInteger(0, TEXT.length - 1);

  let decription = '';

  for (let i = 0; i < getRandomInteger(1, 5); i++) {
    decription += TEXT[randomIndex];
  }

  return decription;
};

const generatePicture = () => {
  const picture = [];

  for (let i = 0; i < 4; i++) {
    picture.push(`http://picsum.photos/248/152?r=${getRandomInteger(1, 100)}`);
  }

  return picture;
};

export const generateDates = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(0, maxDaysGap);

  return dayjs().add(daysGap, 'day').toDate();
};

const getRandomWaypointType = () => {
  const randomIndex = getRandomInteger(0, WAYPOINTTYPES.length - 1);

  return WAYPOINTTYPES[randomIndex];
};

const getRandomCity = () => {
  const randomIndex = getRandomInteger(0, CITIES.length - 1);

  return CITIES[randomIndex];
};

const getOffer = () => {
  const randomIndex = getRandomInteger(0, OFFERS.length - 1);

  return OFFERS[randomIndex];
};

const getRandomPrice = () => getRandomInteger(20, 600);

export const generateWaypoint = () => {
  const dueDate = generateDates();

  return {
    id: nanoid(),
    dueDate,
    waypointType: getRandomWaypointType(),
    city: getRandomCity(),
    offers: getOffer(),
    description: generateDescription(),
    picture: generatePicture(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    price: getRandomPrice(),
  };
};
