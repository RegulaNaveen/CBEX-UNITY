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
  d: "M3,19 C2.38801988,19 2,19.4477153 2,20 C2,20.5128358 2.33456816,20.9355072 2.87234915,20.9932723 L3,21 L14,21 C14.6119801,21 15,20.5522847 15,20 C15,19.4871642 14.6654318,19.0644928 14.1276508,19.0067277 L14,19 L3,19 Z M3,15 C2.39175084,15 2,15.4477153 2,16 C2,16.5128358 2.33778517,16.9355072 2.87303851,16.9932723 L3,17 L8,17 C8.60824916,17 9,16.5522847 9,16 C9,15.4871642 8.66221483,15.0644928 8.12696149,15.0067277 L8,15 L3,15 Z M16.3042305,7.59898821 C16.1431975,7.71556257 16.0347817,7.91981441 16.0070262,8.15014933 L16,8.26720523 L16,11 L12,11 C11.4351972,11 11.057069,11.3860402 11.0059323,11.8833789 L11,12 C11,12.5128358 11.3377852,12.9355072 11.8730385,12.9932723 L12,13 L16,13 L16,15.7326654 C16,15.9701185 16.0854849,16.1917623 16.2283028,16.3359007 L16.3043592,16.4012255 C16.4654051,16.5176548 16.657617,16.5309476 16.8254627,16.4422001 L16.907098,16.3893281 L21.7116677,12.656598 C21.8906525,12.5175341 22,12.2685006 22,11.9999353 C22,11.7697365 21.9196631,11.5538875 21.7839962,11.4093406 L21.7116677,11.3432726 L16.907098,7.61054255 C16.7224729,7.4674 16.4921023,7.4629848 16.3042305,7.59898821 Z M3,11 C2.39175084,11 2,11.4477153 2,12 C2,12.5128358 2.33778517,12.9355072 2.87303851,12.9932723 L3,13 L8,13 C8.60824916,13 9,12.5522847 9,12 C9,11.4871642 8.66221483,11.0644928 8.12696149,11.0067277 L8,11 L3,11 Z M3,7 C2.39175084,7 2,7.44771525 2,8 C2,8.51283584 2.33778517,8.93550716 2.87303851,8.99327227 L3,9 L8,9 C8.60824916,9 9,8.55228475 9,8 C9,7.48716416 8.66221483,7.06449284 8.12696149,7.00672773 L8,7 L3,7 Z M3,3 C2.38801988,3 2,3.44771525 2,4 C2,4.51283584 2.33456816,4.93550716 2.87234915,4.99327227 L3,5 L14,5 C14.6119801,5 15,4.55228475 15,4 C15,3.48716416 14.6654318,3.06449284 14.1276508,3.00672773 L14,3 L3,3 Z"
}), 'Increase');

exports["default"] = _default;