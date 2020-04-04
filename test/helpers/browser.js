require('@babel/register')();
require('@babel/polyfill');
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

const noop = () => null;
require.extensions['.css'] = noop;
require.extensions['.scss'] = noop;

Enzyme.configure({ adapter: new Adapter() });

// Initialize jsdom-global to simulate
// a browser environment for tests
// eslint-disable-next-line no-unused-vars
const jsdom = require('jsdom-global')('', {
  pretendToBeVisual: true,
  url: 'http://localhost:8080/'
});

global.window.Date = Date;

global.navigator = {
  userAgent: 'node.js'
};

/* eslint func-names: "off" */
global.IntersectionObserver = function(observer, options) {
  return {
    ...options,
    intersectionRatio: 0,
    isIntersecting: false,
    observe: observer,
    unobserve: () => {},
    disconnect: () => {}
  };
};
global.documentRef = document;

/**
 * CreateObjectURL and revokeObjectURL static methods are not available in JSDOM.
 * https://github.com/jsdom/jsdom/issues/1721
 *
 * Implementation details referred from below 'stackoverflow' link.
 * https://stackoverflow.com/questions/42452543/what-does-implementation-defined-value-in-fileapi-unicodebloburl-mean/42452714#42452714
 */

global.URL.createObjectURL = function(blobOrMediaSource) {
  if (
    (blobOrMediaSource &&
      blobOrMediaSource.toString() === '[object MediaSource]') ||
    blobOrMediaSource.toString() === '[object Blob]'
  ) {
    return `blob:${global.location.protocol}://${global.location.hostname}:${global.location.port}/2691603b-393d-4c5b-b2eb-b6b7fe86287e`;
  }
  throw new TypeError(
    "Failed to execute 'createObjectURL' on 'URL': No function was found that matched the signature provided."
  );
};
