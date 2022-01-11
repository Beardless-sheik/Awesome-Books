import { DateTime } from '../node_modules/luxon/build/es6/luxon.js';

const date = document.querySelector('#currentDate');

// Previewing Date using native Date Class and a setInterval
setInterval(() => {
  const dateToday = DateTime.now();
  let formatDate = dateToday.toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS);
  formatDate = formatDate.replace('GMT+2', '');
  date.innerHTML = `${formatDate}`;
}, 1000);
