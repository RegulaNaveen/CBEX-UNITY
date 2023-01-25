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
    'src/components/screens/Approvals/__test__/index.test.js',
    'src/components/views/modals/__test__/AnswerHistory.test.js',
    'src/components/screens/Approvals/__test__/Approvals.test.jsx',
    'src/context/__tests__/SocketContext.test.jsx',
    'src/components/screens/Approvals/__test__/utils.test.js',
    'src/components/screens/Proposal/__tests__/Sidebar.test.js',
    'src/components/screens/Approvals/__test__/Section.test.jsx',
    'src/components/screens/Opportunity/__tests__/QuestionsSectionMapping.test.jsx'
  ],
  collectCoverageFrom: ['**/*.{js,jsx}', '!**/node_modules/**', '!**/dist/**'],
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
        'uuid'
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
