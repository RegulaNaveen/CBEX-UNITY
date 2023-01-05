'use strict';

module.exports = {
  displayName: 'test',
  verbose: true,
  setupFilesAfterEnv: ['./setUpTests.js'],
  snapshotSerializers: [],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist',
    'src/components/screens/Approvals/__tests__/ActionButtons.test.js',
    'src/components/screens/Approvals/__test__/index.test.js',
    'src/utils/__tests__/emailUtils.test.js',
    'src/components/views/modals/__test__/AnswerHistory.test.js',
    'src/components/common/__tests__/TagUserList.test.js',
    'src/components/screens/Approvals/__test__/Approvals.test.jsx',
    'src/components/screens/Opportunity/__tests__/Documents.test.js',
    'src/components/screens/Profile/__test__/indexProfile.test.js',
    'src/components/screens/Profile/__test__/sideNav.test.js',
    'src/context/__tests__/SocketContext.test.jsx',
    'src/components/screens/Profile/__test__/AccountPreference.test.js',
    'src/components/screens/Approvals/__test__/utils.test.js',
    'src/api/__tests__/proposal.test.js',
    'src/components/common/__tests__/CustomApolloRichText.test.js',
    'src/components/screens/Proposal/__tests__/Sidebar.test.js',
    'src/components/common/__tests__/Footer.test.js',
    'src/components/screens/Approvals/__test__/Section.test.jsx',
    'src/components/screens/Approvals/__test__/Filters.test.js'
  ],
  collectCoverageFrom: ['**/*.{js,jsx}', '!**/node_modules/**', '!**/dist/**'],
  moduleFileExtensions: ['js', 'jsx'],
  coverageDirectory: '<rootDir>/coverage',
  moduleNameMapper: {
    '\\.(css|scss|less)$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/fileTransformer.js'
  },
  testEnvironment: 'jsdom'
};
