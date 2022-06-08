import dayjs from 'dayjs';

export const SortType = {
  DAY: { text: 'day', checked: true },
  TIME: { text: 'time', checked: false },
  PRICE: { text: 'price', checked: false },
};

export const sortEventDate = (taskA, taskB) => dayjs(taskA.date.dataBeginEvent).diff(dayjs(taskB.date.dataBeginEvent));

export const sortEventTime = (taskA, taskB) => {
  const timeOne = dayjs(taskA.date.dataEndEvent).diff(dayjs(taskA.date.dataBeginEvent));
  const timeTwo = dayjs(taskB.date.dataEndEvent).diff(dayjs(taskB.date.dataBeginEvent));
  return timeTwo - timeOne;
};

export const sortEventPrice = (taskA, taskB) => taskA.allPrice - taskB.allPrice;

export const sortStats = (taskA, taskB) => taskB[1] - taskA[1];


