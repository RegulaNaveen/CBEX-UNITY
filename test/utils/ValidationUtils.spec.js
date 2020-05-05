// @flow
import { it, describe } from 'mocha';
import expect from 'expect';
import { isEmailValid, isTextValid } from '../../src/utils/ValidationUtils';

describe('Validation Utils', () => {
  it('isEmailValid should return true', () => {
    const email = 'fake@mail.com';
    expect(isEmailValid(email)).toBe(true);
  });

  it('isEmailValid should return false', () => {
    const email = 'fakemail.com';
    expect(isEmailValid(email)).toBe(false);
  });

  it('isTextValid should return true', () => {
    const text = 'faketext';
    expect(isTextValid(text)).toBe(true);
  });

  it('isTextValid should return false', () => {
    const text = '';
    expect(isTextValid(text)).toBe(false);
  });
});
