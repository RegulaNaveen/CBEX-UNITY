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
  fillRule: "evenodd",
  d: "M16.7826087,1 C17.2628563,1 17.6521739,1.39175084 17.6521739,1.875 L17.6521739,1.875 L17.6521739,3.40625 C17.6521739,3.52706229 17.7495033,3.625 17.8695652,3.625 L17.8695652,3.625 L20.2608696,3.625 C21.2213648,3.625 22,4.40850169 22,5.375 L22,5.375 L22,20.25 C22,21.2164983 21.2213648,22 20.2608696,22 L20.2608696,22 L3.73913043,22 C2.77863522,22 2,21.2164983 2,20.25 L2,20.25 L2,5.375 C2,4.40850169 2.77863522,3.625 3.73913043,3.625 L3.73913043,3.625 L5.04347826,3.625 C5.28360207,3.625 5.47826087,3.82087542 5.47826087,4.0625 L5.47826087,4.0625 L5.47826087,6.03125 C5.47826087,6.39368687 5.77024908,6.6875 6.13043478,6.6875 L6.13043478,6.6875 L6.22680826,6.68038456 C6.54129613,6.63351229 6.7826087,6.36073806 6.7826087,6.03125 L6.7826087,6.03125 L6.7826087,1.875 C6.7826087,1.39175084 7.1719263,1 7.65217391,1 C8.13242152,1 8.52173913,1.39175084 8.52173913,1.875 L8.52173913,1.875 L8.52173913,3.407125 C8.52221802,3.52759544 8.6194073,3.62500096 8.73913043,3.625 L8.73913043,3.625 L14.173913,3.625 C14.4140368,3.625 14.6086957,3.82087542 14.6086957,4.0625 L14.6086957,4.0625 L14.6086957,6.03125 C14.6086957,6.39368687 14.9006839,6.6875 15.2608696,6.6875 L15.2608696,6.6875 L15.357243,6.68038456 C15.6717309,6.63351229 15.9130435,6.36073806 15.9130435,6.03125 L15.9130435,6.03125 L15.9130435,1.875 C15.9130435,1.39175084 16.3023611,1 16.7826087,1 Z M19.826087,8.875 L4.17391304,8.875 C3.93378924,8.875 3.73913043,9.07087542 3.73913043,9.3125 L3.73913043,9.3125 L3.73913043,19.8125 C3.73913043,20.0541246 3.93378924,20.25 4.17391304,20.25 L4.17391304,20.25 L19.826087,20.25 C20.0662108,20.25 20.2608696,20.0541246 20.2608696,19.8125 L20.2608696,19.8125 L20.2608696,9.3125 C20.2608696,9.07087542 20.0662108,8.875 19.826087,8.875 L19.826087,8.875 Z M19,10 L19,19 L10,19 L10,10 L19,10 Z M17.125,11 L14.5,13.625 L11.875,11 L11,11.875 L13.625,14.5 L11,17.125 L11.875,18 L14.5,15.375 L17.125,18 L18,17.125 L15.375,14.5 L18,11.875 L17.125,11 Z"
}), 'CalendarTimeOff');

exports["default"] = _default;