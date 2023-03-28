// @flow
import { DateUtils } from 'react-day-picker';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import moment from 'moment';

export const parseDate = (date: string, format: string) => {
  const parsed = dateFnsParse(date, format, new Date(), {});
  return DateUtils.isDate(parsed) ? parsed : undefined;
};

export const formatDate = (date: Date, format: string) =>
  dateFnsFormat(date, format, {});

export const remainingDays = (date: string): number | string => {
  if (!date) return '-';

  const eventdate = moment(date, 'D-MMM-yyyy');
  const todaysdate = moment();
  const daysRemaing = eventdate.diff(todaysdate, 'days') + 1;

  return daysRemaing < 0 ? 0 : daysRemaing;
};

export const parseMomentDate = (date: Date | string) => {
  return !date ? date : moment(date).format('D-MMM-yyyy');
};

export const formatTheDate = (date: Date | string) => {
  return !date ? date : moment(date).format('DD-MMM-YYYY');
};
