/* eslint-disable prefer-template */
'use strict';

module.exports = {
  displayName: 'test',
  verbose: true,
  setupFilesAfterEnv: ['./setUpTests.js'],
  snapshotSerializers: [],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist',
    'src/components/common/__tests__/TagUserList.test.js',
    'src/components/screens/Approvals/__tests__/ActionButtons.test.js',
    'src/components/screens/Approvals/__test__/ApprovalsIndex.test.js',
    'src/api/__tests__/proposal.test.js',
    'src/components/common/__tests__/CustomApolloRichText.test.js'
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/__tests__/**',
    '!**/__test__/**',
    '!src/constants/**'
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleDirectories: ['node_modules', __dirname],
  coverageDirectory: '<rootDir>/coverage',
  moduleNameMapper: {
    '\\.(css|scss|less)$': 'identity-obj-proxy'
  },
  transformIgnorePatterns: [
    'node_modules/(?!' +
      [
        '@tiptap',
        'y-protocols',
        'y-prosemirror',
        'lib0',
        'remixicon',
        'uuid',
<<<<<<< HEAD
        'sinon',
        'register-service-worker'
=======
        'register-service-worker',
        'sinon'
>>>>>>> 8abb968adc410d5a298a095f9d5e9bc00c8cb15a
      ].join('|') +
      ')'
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.svg$': 'jest-transformer-svg',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/fileTransformer.js'
  },
  testEnvironment: 'jsdom'
};
