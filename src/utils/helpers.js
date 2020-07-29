// @flow
import { isObject, valuesIn } from 'lodash';

const objectToString = (_object: Object): String => {
  if (!isObject(_object)) return _object.toString();

  const objectStringfied = valuesIn(_object).map(value =>
    isObject(value) ? objectToString(value) : value
  );

  return objectStringfied.join(', ');
};

export default objectToString;
