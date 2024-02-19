import moment from 'moment';

export default function getNextWorkingDay(date) {
  const day = date.clone();
  let nextDay = day.add(1, 'days');
  if (nextDay.day() === 0) {
    nextDay = nextDay.add(1, 'days');
  } else if (nextDay.day() === 6) {
    nextDay = nextDay.add(2, 'days');
  }
  return nextDay;
}
