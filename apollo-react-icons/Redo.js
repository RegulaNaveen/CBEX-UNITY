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
  d: "M19.7564744,2.02896536 C19.6110523,1.97020248 19.4435868,2.0025081 19.3321745,2.11081663 L17.3149985,4.0744893 C17.2549651,4.13289246 17.1629777,4.1466926 17.0876672,4.108594 C13.8600172,2.47999756 9.97004227,2.73262597 6.99322343,4.76416207 C4.50291313,6.49747432 3.01788325,9.28850977 2.99984787,12.2686279 C2.98274177,15.2487459 4.43476307,18.0561918 6.9044708,19.8172175 C7.3383118,20.1261197 7.94724711,20.0341652 8.2645659,19.6118314 C8.58188468,19.1894975 8.48742477,18.5967135 8.05358379,18.2878113 C6.0883402,16.8858015 4.93302695,14.6513319 4.94705156,12.2795257 C4.96107617,9.90771954 6.14273706,7.68634523 8.12443019,6.30645225 C10.2782582,4.83371798 13.0506583,4.52009535 15.4940126,5.47278188 C15.5547979,5.49641411 15.5993107,5.54820626 15.6124787,5.6106211 C15.6256466,5.67303595 15.6057062,5.73771434 15.5594092,5.78275568 L14.1191253,7.18483767 C14.0080591,7.2932967 13.974973,7.45617344 14.035274,7.59762122 C14.0955751,7.739069 14.2374081,7.83127872 14.3947256,7.83131115 L19.6108889,7.83131115 C19.8258746,7.83131115 20.0001549,7.66165345 20.0001549,7.45237008 L20.0001549,2.37910692 C19.9996118,2.22501853 19.9032753,2.08659385 19.7564744,2.02896536 Z"
}), 'Redo');

exports["default"] = _default;