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

export const dateDiffInDays = (date: Object): number => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const today = new Date();
  const utc1 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const utc2 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

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
