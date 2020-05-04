// @flow
import { it, describe } from 'mocha';
import expect from 'expect';
import { ValidateEmail } from '../../src/utils/ValidationUtils';

describe('Validation Utils', () => {
  it('ValidateEmail should return true', () => {
    const email = 'fake@mail.com';
    expect(ValidateEmail(email)).toBe(true);
  });

  it('ValidateEmail should return false', () => {
    const email = 'fakemail.com';
    expect(ValidateEmail(email)).toBe(false);
  });
});
