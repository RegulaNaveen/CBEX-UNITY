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
  d: "M10.125,2 C10.6082492,2 11,2.37309604 11,2.83333333 L11,2.83333333 L11,7 C10.9978863,8.4122026 10.0636434,9.67060396 8.666375,10.1433333 C8.4918109,10.2022444 8.37510614,10.3594529 8.375,10.5358333 L8.375,10.5358333 L8.375,21.1666667 C8.375,21.626904 7.98324916,22 7.5,22 C7.01675084,22 6.625,21.626904 6.625,21.1666667 L6.625,21.1666667 L6.625,10.5358333 C6.62489386,10.3594529 6.5081891,10.2022444 6.333625,10.1433333 C4.93635659,9.67060396 4.00211368,8.4122026 4,7 L4,7 L4,2.83333333 C4,2.37309604 4.39175084,2 4.875,2 C5.35824916,2 5.75,2.37309604 5.75,2.83333333 L5.75,2.83333333 L5.75,7 C5.74963549,7.435716 5.92907244,7.85411788 6.249625,8.165 C6.31211481,8.22486698 6.40626529,8.24309168 6.48833585,8.21120723 C6.57040641,8.17932279 6.62430842,8.10357964 6.625,8.01916667 L6.625,8.01916667 L6.625,2.83333333 C6.625,2.37309604 7.01675084,2 7.5,2 C7.98324916,2 8.375,2.37309604 8.375,2.83333333 L8.375,2.83333333 L8.375,8.02083333 C8.37569158,8.10524631 8.42959359,8.18098946 8.51166415,8.2128739 C8.59373471,8.24475835 8.68788519,8.22653365 8.750375,8.16666667 C9.07135296,7.85537314 9.2508241,7.43629283 9.25,7 L9.25,7 L9.25,2.83333333 C9.25,2.37309604 9.64175084,2 10.125,2 Z M16.5,2 C18.4329966,2 20,3.49238417 20,5.33333333 L20,5.33333333 L20,7 C19.9978863,8.4122026 19.0636434,9.67060396 17.666375,10.1433333 C17.4918109,10.2022444 17.3751061,10.3594529 17.375,10.5358333 L17.375,10.5358333 L17.375,21.1666667 C17.375,21.6269039 16.9832491,22 16.5,22 C16.0167509,22 15.625,21.6269039 15.625,21.1666667 L15.625,21.1666667 L15.625,10.5358333 C15.6248939,10.3594529 15.5081891,10.2022444 15.333625,10.1433333 C13.9363566,9.67060396 13.0021137,8.4122026 13,7 L13,7 L13,5.33333333 C13,3.49238417 14.5670034,2 16.5,2 Z M16.0625,3.25 C15.0960017,3.25 14.3125,3.99619208 14.3125,4.91666667 C14.3125,5.14678531 14.5083754,5.33333333 14.75,5.33333333 C14.9916246,5.33333333 15.1875,5.14678531 15.1875,4.91666667 C15.1875,4.45642938 15.5792508,4.08333333 16.0625,4.08333333 C16.3041246,4.08333333 16.5,3.89678531 16.5,3.66666667 C16.5,3.43654802 16.3041246,3.25 16.0625,3.25 Z"
}), 'Dining');

exports["default"] = _default;