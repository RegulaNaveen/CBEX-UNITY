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
