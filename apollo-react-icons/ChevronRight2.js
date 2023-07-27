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
  d: "M18,4 C17.4477153,4 17,4.44771525 17,5 L17,19 C17,19.5522847 17.4477153,20 18,20 C18.5522847,20 19,19.5522847 19,19 L19,5 C19,4.44771525 18.5522847,4 18,4 Z M6.55134261,4.00186707 C6.41786368,4.01299077 6.29235185,4.07003096 6.19293465,4.1629319 L6.12354774,4.23917436 L5.15242215,5.473039 C5.04241955,5.60950907 4.98880898,5.78766808 5.00378685,5.96698481 C5.0133102,6.11019232 5.06491836,6.24555143 5.14995758,6.35448182 L5.2198701,6.43093391 L11.1240639,11.8756699 C11.1585324,11.9073281 11.1783572,11.9534528 11.1783572,12.0019894 C11.1783572,12.0343471 11.1695462,12.0656329 11.1534593,12.092275 L11.1240639,12.1283089 L5.22049461,17.5710451 C4.98248492,17.7921855 4.93368707,18.1599506 5.09105727,18.4398738 L5.15117311,18.5296066 L6.12354774,19.7628046 C6.23028326,19.8997703 6.38449427,19.9846799 6.55092736,19.9981227 C6.68407383,20.008877 6.81593565,19.9731569 6.92726749,19.8978885 L7.00661628,19.8341301 L14.7949811,12.5155997 C14.9259501,12.3815809 15,12.196313 15,12.002656 C15,11.8477303 14.9526081,11.6981738 14.8665952,11.5759305 L14.7949811,11.4897123 L7.00661628,4.16784886 C6.88252371,4.04836984 6.71798405,3.98838265 6.55134261,4.00186707 Z"
}), 'ChevronRight2');

exports["default"] = _default;