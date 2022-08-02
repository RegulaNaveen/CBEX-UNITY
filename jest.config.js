'use strict';

module.exports = {
    displayName: 'test',
    verbose: true,
    setupFilesAfterEnv: [
      './setUpTests.js',
    ],
    snapshotSerializers: [],
    testPathIgnorePatterns : ["/node_modules/", "/dist"],
    "collectCoverageFrom": [
      "**/*.{js,jsx}",
      "!**/node_modules/**",
      "!**/dist/**"
    ],
    moduleFileExtensions: ['js', 'jsx'],
    coverageDirectory: "<rootDir>/coverage",
    moduleNameMapper: {
      "\\.(css|scss|less)$": "identity-obj-proxy"
    },
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>/fileTransformer.js'
    },
    testEnvironment: 'jsdom'
  };
