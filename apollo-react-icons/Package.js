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
  d: "M6,5.5 C6,4.5 6,4 5,4 L4,4 C3,4 3,2 4,2 L6,2 C7.5,2 8,3.06597865 8,4 L8,17 C7.5,16.4642857 6.5,15.9285714 6,15.9285714 L6,5.5 Z M9,18 L19.2625695,18 C19.6698411,18 20,18.4477153 20,19 C20,19.5522847 19.6698411,20 19.2625695,20 L9.30702884,20 C9.306957,19.2888805 9.19741096,18.612446 9,18 Z M5.5,22 C4.11928813,22 3,20.8807119 3,19.5 C3,18.1192881 4.11928813,17 5.5,17 C6.88071187,17 8,18.1192881 8,19.5 C8,20.8807119 6.88071187,22 5.5,22 Z M5.5,20.5 C6.05228475,20.5 6.5,20.0522847 6.5,19.5 C6.5,18.9477153 6.05228475,18.5 5.5,18.5 C4.94771525,18.5 4.5,18.9477153 4.5,19.5 C4.5,20.0522847 4.94771525,20.5 5.5,20.5 Z M9.83333333,9 L18.1666667,9 C18.626904,9 19,9.39796911 19,9.88888889 L19,16.1111111 C19,16.6020309 18.626904,17 18.1666667,17 L9.83333333,17 C9.37309604,17 9,16.6020309 9,16.1111111 L9,9.88888889 C9,9.39796911 9.37309604,9 9.83333333,9 Z M15,15.5 C15,15.7763889 15.2888571,16 15.6437143,16 L17.3571429,16 C17.712,16 18,15.7763889 18,15.5 C18,15.2243056 17.712,15 17.3571429,15 L15.6437143,15 C15.2888571,15 15,15.2243056 15,15.5 Z M9.875,3 L15.125,3 C15.6082492,3 16,3.37309604 16,3.83333333 L16,7.16666667 C16,7.62690396 15.6082492,8 15.125,8 L9.875,8 C9.39175084,8 9,7.62690396 9,7.16666667 L9,3.83333333 C9,3.37309604 9.39175084,3 9.875,3 Z M13,6.5 C13,6.77638889 13.2694922,7 13.6005598,7 L14.4002399,7 C14.7313075,7 15,6.77638889 15,6.5 C15,6.22430556 14.7313075,6 14.4002399,6 L13.6005598,6 C13.2694922,6 13,6.22430556 13,6.5 Z"
}), 'Package');

exports["default"] = _default;