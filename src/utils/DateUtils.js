// @flow
import { DateUtils } from 'react-day-picker';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import typeof Locale from 'date-fns/locale/en-US';

export const parseDate = (date: string, format: string, locale: Locale) => {
  const parsed = dateFnsParse(date, format, new Date(), { locale });
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }
  return undefined;
};

export const formatDate = (date: number, format: string, locale: Locale) => {
  return dateFnsFormat(date, format, { locale });
};
