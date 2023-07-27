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
  d: "M18.6666667,2 C20.5076158,2 22,3.49238417 22,5.33333333 C22,7.1742825 20.5076158,8.66666667 18.6666667,8.66666667 C17.6562853,8.66666667 16.7508994,8.2171273 16.1396076,7.50714704 L8.57836138,11.2345491 C8.63611478,11.48033 8.66666667,11.7365971 8.66666667,12 C8.66666667,12.1970692 8.64956515,12.3901442 8.61676521,12.5778218 L16.1995043,16.425154 C16.809255,15.7544172 17.6887861,15.3333333 18.6666667,15.3333333 C20.5076158,15.3333333 22,16.8257175 22,18.6666667 C22,20.5076158 20.5076158,22 18.6666667,22 C16.8257175,22 15.3333333,20.5076158 15.3333333,18.6666667 C15.3333333,18.4194125 15.3602539,18.1784459 15.4113239,17.9465382 L7.89480361,14.1331992 C7.28335428,14.8666065 6.36284875,15.3333333 5.33333333,15.3333333 C3.49238417,15.3333333 2,13.8409492 2,12 C2,10.1590508 3.49238417,8.66666667 5.33333333,8.66666667 C6.29042895,8.66666667 7.15331156,9.07004047 7.7612508,9.71605771 L15.3911251,5.95459724 C15.3531821,5.75331481 15.3333333,5.54564203 15.3333333,5.33333333 C15.3333333,3.49238417 16.8257175,2 18.6666667,2 Z"
}), 'Share');

exports["default"] = _default;