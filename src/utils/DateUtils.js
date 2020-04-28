// @flow
import { DateUtils } from 'react-day-picker';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';

export const parseDate = (date: string, format: string) => {
  const parsed = dateFnsParse(date, format, new Date(), {});
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }
  return undefined;
};

export const formatDate = (date: Date, format: string) => {
  return dateFnsFormat(date, format, {});
};
