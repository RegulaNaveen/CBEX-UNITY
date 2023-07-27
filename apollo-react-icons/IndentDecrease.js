"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _createSvgIcon = _interopRequireDefault(require("./createSvgIcon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = (0, _createSvgIcon["default"])( /*#__PURE__*/React.createElement("path", {
  d: "M21,19 C21.6119801,19 22,19.4477153 22,20 C22,20.5522847 21.6119801,21 21,21 L21,21 L10,21 C9.38801988,21 9,20.5522847 9,20 C9,19.4477153 9.38801988,19 10,19 L10,19 Z M21,15 C21.6082492,15 22,15.4477153 22,16 C22,16.5522847 21.6082492,17 21,17 L21,17 L16,17 C15.3917508,17 15,16.5522847 15,16 C15,15.4477153 15.3917508,15 16,15 L16,15 Z M7.6957695,7.59898821 C7.85680251,7.71556257 7.96521831,7.91981441 7.99297379,8.15014933 L8,8.26720523 L8,11 L12,11 C12.5648028,11 12.942931,11.3860402 12.9940677,11.8833789 L13,12 C13,12.5128358 12.6622148,12.9355072 12.1269615,12.9932723 L12,13 L8,13 L8,15.7326654 C8,15.9701185 7.91451509,16.1917623 7.77169719,16.3359007 L7.69564082,16.4012255 C7.53459489,16.5176548 7.34238296,16.5309476 7.17453726,16.4422001 L7.09290202,16.3893281 L2.2883323,12.656598 C2.10934747,12.5175341 2,12.2685006 2,11.9999353 C2,11.7697365 2.08033692,11.5538875 2.2160038,11.4093406 L2.2883323,11.3432726 L7.09290202,7.61054255 C7.27752712,7.4674 7.50789767,7.4629848 7.6957695,7.59898821 Z M21,11 C21.6082492,11 22,11.4477153 22,12 C22,12.5522847 21.6082492,13 21,13 L21,13 L16,13 C15.3917508,13 15,12.5522847 15,12 C15,11.4477153 15.3917508,11 16,11 L16,11 Z M21,7 C21.6082492,7 22,7.44771525 22,8 C22,8.55228475 21.6082492,9 21,9 L21,9 L16,9 C15.3917508,9 15,8.55228475 15,8 C15,7.44771525 15.3917508,7 16,7 L16,7 Z M21,3 C21.6119801,3 22,3.44771525 22,4 C22,4.55228475 21.6119801,5 21,5 L21,5 L10,5 C9.38801988,5 9,4.55228475 9,4 C9,3.44771525 9.38801988,3 10,3 L10,3 Z"
}), 'Decrease');

exports["default"] = _default;