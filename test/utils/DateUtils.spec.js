// @flow
import { it, describe } from 'mocha';
import expect from 'expect';
import { formatDate, parseDate } from '../../src/utils/DateUtils';

describe('Date Utils', () => {
  it('parseDate', () => {
    const parsedDate =
      'Thu Apr 16 2020 00:00:00 GMT-0500 (Central Daylight Time)';
    const format = 'MM/dd/yyyy';
    const date = '04/16/2020';
    expect(String(parseDate(date, format))).toBe(parsedDate);
  });

  it('formatDate', () => {
    const format = 'MM/dd/yyyy';
    const parsedDate = '04/16/2020';
    const date = new Date('2020-04-16T05:00:00.000Z');
    expect(String(formatDate(date, format))).toBe(parsedDate);
  });
});
