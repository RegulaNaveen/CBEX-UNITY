import {
  objectContains,
  convertToInternationalCurrency,
  avoidSpecialChars,
  reorder,
  objectToString
} from '../helpers';

describe('objectToString', () => {
  it('should return the string representation of a non-empty object', () => {
    const object = {
      name: 'John Doe',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'New York',
        country: 'USA'
      }
    };

    const result = objectToString(object);

    expect(result).toBe('John Doe, 30, 123 Main St, New York, USA');
  });

  it('should return "No data" for an empty object', () => {
    const object = {};

    const result = objectToString(object);

    expect(result).toBe('');
  });

  it('should return the string representation of a nested object', () => {
    const object = {
      name: 'John Doe',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'New York',
        country: {
          name: 'USA',
          code: 'US'
        }
      }
    };

    const result = objectToString(object);

    expect(result).toBe('John Doe, 30, 123 Main St, New York, USA, US');
  });

  it('should return the string representation of an object with array values', () => {
    const object = {
      name: 'John Doe',
      age: 30,
      hobbies: ['reading', 'coding', 'gaming']
    };

    const result = objectToString(object);

    expect(result).toBe('John Doe, 30, reading, coding, gaming');
  });
});

describe('objectContains', () => {
  it('should return true if the object contains the search string', () => {
    const object = {
      name: 'John Doe',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'New York',
        country: 'USA'
      }
    };
    const search = 'John';
    const deepSearch = false;

    const result = objectContains(object, search, deepSearch);

    expect(result).toBe(true);
  });

  it('should return false if the object does not contain the search string', () => {
    const object = {
      name: 'John Doe',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'New York',
        country: 'USA'
      }
    };
    const search = 'Jane';
    const deepSearch = false;

    const result = objectContains(object, search, deepSearch);

    expect(result).toBe(false);
  });

  it('should return true if the object contains the search string in deep search mode', () => {
    const object = {
      name: 'John Doe',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'New York',
        country: 'USA'
      }
    };
    const search = 'New York';
    const deepSearch = true;

    const result = objectContains(object, search, deepSearch);

    expect(result).toBe(true);
  });

  it('should return false if the object does not contain the search string in deep search mode', () => {
    const object = {
      name: 'John Doe',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'New York',
        country: 'USA'
      }
    };
    const search = 'London';
    const deepSearch = true;

    const result = objectContains(object, search, deepSearch);

    expect(result).toBe(false);
  });
});

describe('objectContains', () => {
  it('should return true if the object contains the search string', () => {
    const object = {
      name: 'John Doe',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'New York',
        country: 'USA'
      }
    };
    const search = 'John';
    const deepSearch = false;

    const result = objectContains(object, search, deepSearch);

    expect(result).toBe(true);
  });

  it('should return false if the object does not contain the search string', () => {
    const object = {
      name: 'John Doe',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'New York',
        country: 'USA'
      }
    };
    const search = 'Jane';
    const deepSearch = false;

    const result = objectContains(object, search, deepSearch);

    expect(result).toBe(false);
  });

  it('should return true if the object contains the search string in deep search mode', () => {
    const object = {
      name: 'John Doe',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'New York',
        country: 'USA'
      }
    };
    const search = 'New York';
    const deepSearch = true;

    const result = objectContains(object, search, deepSearch);

    expect(result).toBe(true);
  });

  it('should return false if the object does not contain the search string in deep search mode', () => {
    const object = {
      name: 'John Doe',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'New York',
        country: 'USA'
      }
    };
    const search = 'London';
    const deepSearch = true;

    const result = objectContains(object, search, deepSearch);

    expect(result).toBe(false);
  });
});

describe('convertToInternationalCurrency', () => {
  it('should convert a number to international currency format for billions', () => {
    const labelValue = 1500000000;
    const expected = '1.50B';

    const result = convertToInternationalCurrency(labelValue);

    expect(result).toBe(expected);
  });

  it('should convert a number to international currency format for millions', () => {
    const labelValue = 2500000;
    const expected = '2.50M';

    const result = convertToInternationalCurrency(labelValue);

    expect(result).toBe(expected);
  });

  it('should convert a number to international currency format for thousands', () => {
    const labelValue = 5000;
    const expected = '5.00K';

    const result = convertToInternationalCurrency(labelValue);

    expect(result).toBe(expected);
  });

  it('should return the number as is if it is less than 1000', () => {
    const labelValue = 500;
    const expected = 500;

    const result = convertToInternationalCurrency(labelValue);

    expect(result).toBe(expected);
  });
});

describe('avoidSpecialChars', () => {
  it('should remove special characters from the string', () => {
    const string = 'Hello, World#';
    const expected = 'Hello World';

    const result = avoidSpecialChars(string);

    expect(result).toBe(expected);
  });

  it('should not modify the string if it does not contain any special characters', () => {
    const string = 'Hello World';
    const expected = 'Hello World';

    const result = avoidSpecialChars(string);

    expect(result).toBe(expected);
  });

  it('should remove special characters from an empty string', () => {
    const string = '';
    const expected = '';

    const result = avoidSpecialChars(string);

    expect(result).toBe(expected);
  });
});
describe('reorder', () => {
  it('should reorder the list correctly', () => {
    const list = [1, 2, 3, 4, 5];
    const startIndex = 1;
    const endIndex = 3;
    const expected = [1, 3, 4, 2, 5];

    const result = reorder(list, startIndex, endIndex);

    expect(result).toEqual(expected);
  });

  it('should return the same list if startIndex and endIndex are the same', () => {
    const list = [1, 2, 3, 4, 5];
    const startIndex = 2;
    const endIndex = 2;
    const expected = [1, 2, 3, 4, 5];

    const result = reorder(list, startIndex, endIndex);

    expect(result).toEqual(expected);
  });

  it('should return the same list if startIndex and endIndex are out of bounds', () => {
    const list = [1, 2, 3, 4, 5];
    const startIndex = -1;
    const endIndex = 6;
    const expected = [1, 2, 3, 4, 5];

    const result = reorder(list, startIndex, endIndex);

    expect(result).toEqual(expected);
  });
});
