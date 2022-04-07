const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

const startOfDay = dayjs()
  .utc()
  .startOf('day')
  // .add(2, 'day') //додасть 2 дні
  .format('dddd:HH - YYYY/MMM-DD'); // формат відображення

console.log(startOfDay);