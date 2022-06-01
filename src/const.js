import { getRandomInteger } from './utils/utils';

export const CITIES = ['Moscow', 'Ekaterinburg', 'Petersburg', 'Dubai', 'Madrid', 'London'];
export const WAYPOINTTYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export const TEXT = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.'
];

export const OFFERS = [
  {
    offerType: 'Taxi',
    offerName: 'Order Taxi',
    price: 20,
    isChosen: Boolean(getRandomInteger(0, 1))
  },
  {
    offerType: 'Flight',
    offerName: 'Add luggage',
    price: 50,
    isChosen: Boolean(getRandomInteger(0, 1))
  },
  {
    offerType: 'Flight',
    offerName: 'Switch to comfort',
    price: 80,
    isChosen: Boolean(getRandomInteger(0, 1))
  },
  {
    offerType: 'Dive',
    offerName: 'Rent a cat',
    price: 200,
    isChosen: Boolean(getRandomInteger(0, 1))
  },
  {
    offerType: 'Hotel',
    offerName: 'Add breakfast',
    price: 50,
    isChosen: Boolean(getRandomInteger(0, 1))
  }
];
