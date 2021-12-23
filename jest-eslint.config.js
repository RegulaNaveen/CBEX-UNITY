'use strict';

module.exports = {
  runner: 'jest-runner-eslint',
  displayName: 'lint',
  testMatch: ['<rootDir>/**/*.js', '<rootDir>/**/*.jsx'],
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
};
