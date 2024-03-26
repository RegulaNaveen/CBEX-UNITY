import moment from 'moment';
import getNextWorkingDay from '../utils';
describe('TasksList utils unit tests', () => {
  test('getNextWorkingDay should return the next working day if next working day is not friday', () => {
    const date = moment().day(1);
    const result = getNextWorkingDay(date);
    expect(result.day()).toBe(2);
  });
  test('getNextWorkingDay should return monday if next working day is saturday', () => {
    const date = moment().day(6);
    const result = getNextWorkingDay(date);
    expect(result.day()).toBe(1);
  });

  test('getNextWorkingDay should return monday if next working day is sunday', () => {
    const date = moment().day(0);
    const result = getNextWorkingDay(date);
    expect(result.day()).toBe(1);
  });
});
