// @flow
import { DateUtils } from 'react-day-picker';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import moment from 'moment';

export const parseDate = (date, format) => {
  const parsed = dateFnsParse(date, format, new Date(), {});
  return DateUtils.isDate(parsed) ? parsed : undefined;
};

export const formatDate = (date, format) => dateFnsFormat(date, format, {});
// commented unused code
// export const remainingDays = (date: string): number | string => {
//   if (!date) return '-';

//   const eventdate = moment(date, 'D-MMM-yyyy');
//   const todaysdate = moment();
//   const daysRemaing = eventdate.diff(todaysdate, 'days') + 1;

//   return daysRemaing < 0 ? 0 : daysRemaing;
// };

export const getRemainingDays = date => {
  if (!date) return '-';

  const eventdate = moment(date, 'D-MMM-yyyy');
  const todaysdate = moment().format('D-MMM-yyyy');
  const daysRemaing = eventdate.diff(todaysdate, 'days');
  return daysRemaing;
};

export function parseCorrectDate(DateString) {
  const date = new Date(DateString);
  return new Date(date.toLocaleString());
}

export const parseMomentDate = date => {
  return !date || date === ' '
    ? date
    : moment(parseCorrectDate(date)).format('DD-MMM-YYYY');
};

export const formatTheDate = date => {
  return !date ? date : moment(date).format('DD-MMM-YYYY');
};
