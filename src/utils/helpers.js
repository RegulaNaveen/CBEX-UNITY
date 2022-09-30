// @flow
import { isObject, valuesIn, isEmpty } from 'lodash';

export const objectToString = (_object: Object): string => {
  if (!isObject(_object))
    return !isEmpty(_object) ? _object.toString() : 'No data';

  const objectStringfied = valuesIn(_object).map(value =>
    isObject(value) ? objectToString(value) : value
  );

  return objectStringfied.join(', ');
};

export const objectContains = (
  object: Object,
  search: string,
  deepSearch: boolean
): boolean => {
  if (isEmpty(search)) return false;

  const arr = valuesIn(object);

  const found = arr.filter(prop => {
    if (isObject(prop)) return objectContains(prop, search, deepSearch);
    return !deepSearch
      ? prop
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase())
      : prop.toString().toLowerCase() === search.toLocaleLowerCase();
  });

  if (!isEmpty(found)) return true;
  return false;
};

export function convertToInternationalCurrency(labelValue) {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + 'B'
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + 'M'
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + 'K'
    : Math.abs(Number(labelValue));
}

// Function to parse stringify Json
export function parseStringifyJson(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return false;
  }
}

export function extractEmails(text) {
  const emails = text.match(
    /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi
  );
  return emails ? emails[0] : null;
}

export const avoidSpecialChars = string => {
  return string.replace(/[&\/\\#,+$~%.'":*?<>]/g, '');
};
