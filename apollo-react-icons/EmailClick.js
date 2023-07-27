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
  d: "M2.23228918,3.40314232 L9.54285781,10.7119967 C10.3477146,11.5151392 11.6514284,11.5151392 12.4571424,10.7119967 L12.7576594,10.4114796 L12.9999865,14.0000296 L3.50000298,14.0000296 C3.10228884,14.0000296 2.72000328,13.8422812 2.43886053,13.5602813 C2.15771778,13.2791385 1.99914641,12.8977101 1.99998654,12.499996 L1.99998654,3.49999943 C1.99998654,3.4451423 2.03257497,3.39542804 2.08400352,3.37399947 C2.13457493,3.35342805 2.19286062,3.36457091 2.23228918,3.40314232 Z M19.8628539,3.36371376 C19.8799967,3.36371376 19.8979967,3.36714233 19.9142824,3.37399947 C19.965711,3.39371375 19.9999967,3.44428516 19.9999967,3.49999942 L19.9999967,12.4685389 C19.928773,12.8716816 19.7859147,13.2218814 19.5714219,13.5191384 C19.4265658,13.7198888 19.2070202,13.8581839 18.9127851,13.9340236 L13.5589664,9.71738103 C13.5248485,9.71326617 13.4916331,9.71074545 13.4593202,9.70981885 L19.7659968,3.40314232 C19.7925682,3.37742804 19.8268539,3.36371376 19.8628539,3.36371376 Z M18.4991401,2 C18.7048543,2 18.9354256,2.0222857 19.0177113,2.26828561 C19.0631399,2.40371413 19.0271399,2.55199979 18.9268542,2.65228546 L11.6625713,9.9165684 C11.2957143,10.2825683 10.7025717,10.2825683 10.3365718,9.9165684 L3.07057457,2.65228546 C2.97200318,2.55114264 2.93943176,2.40285699 2.98486032,2.26828561 C3.06200315,2.0222857 3.29343163,2 3.49914584,2 L18.4991401,2 Z M13.6666667,11.1666667 L22,17.7299609 L18.9504964,18.2047813 L20.6412486,20.4879465 L18.9504964,21.9110557 L17.3483265,19.7111423 L15.3500981,22 L13.6666667,11.1666667 Z"
}), 'EmailClick');

exports["default"] = _default;