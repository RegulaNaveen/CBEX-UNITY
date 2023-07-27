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
  d: "M20,5.00000001 C21,5.00000001 22,6.00000001 22,7.00000001 L22,17 C22,18 21,19 20,19 L4,19 C3,19 2,18 2,17 L2,7.00000001 C2,6.00000001 3,5.00000001 4,5.00000001 L20,5.00000001 Z M7.4995793,13.375 C5.55555556,13.3728239 4,14.5404577 4,15.7080915 C4,16 4.38888889,16 4.38888889,16 L10.6244475,15.9995996 C10.6927298,15.9963962 11,15.9675657 11,15.7080915 C11,14.5404577 9.44444444,13.3728239 7.4995793,13.375 Z M17.2291667,9 L15.7708333,9 C15.5292088,9 15.3333333,9.19587542 15.3333333,9.4375 L15.3333333,11.3333333 L13.4375,11.3333333 C13.1958754,11.3333333 13,11.5292088 13,11.7708333 L13,13.2291667 C13,13.4707912 13.1958754,13.6666667 13.4375,13.6666667 L15.3333333,13.6666667 L15.3333333,15.5625 C15.3333333,15.8041246 15.5292088,16 15.7708333,16 L17.2291667,16 C17.4707912,16 17.6666667,15.8041246 17.6666667,15.5625 L17.6666667,13.6666667 L19.5625,13.6666667 C19.8041246,13.6666667 20,13.4707912 20,13.2291667 L20,11.7708333 C20,11.5292088 19.8041246,11.3333333 19.5625,11.3333333 L17.6666667,11.3333333 L17.6666667,9.4375 C17.6666667,9.19587542 17.4707912,9 17.2291667,9 Z M7.5,9 C6.53350169,9 5.75,9.78350169 5.75,10.75 C5.75,11.7164983 6.53350169,12.5 7.5,12.5 C8.46649831,12.5 9.25,11.7164983 9.25,10.75 C9.25,9.78350169 8.46649831,9 7.5,9 Z M14,6.00000001 L10,6.00000001 L10,7.00000001 L14,7.00000001 L14,6.00000001 Z"
}), 'MedicalCard');

exports["default"] = _default;