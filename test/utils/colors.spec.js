// @flow
import { it, describe } from 'mocha';
import expect from 'expect';
import { colors, getRandomColor } from '../../src/utils/colors';

describe('colors utils', () => {
  describe('getRandomColor', () => {
    it('should return a random color from colors constant', () => {
      const color = getRandomColor();
      expect(colors.includes(color)).toBe(true);
    });
  });
});
