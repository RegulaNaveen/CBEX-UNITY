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
  d: "M13,2 C13.4642857,2 13.9285714,2.43112245 13.9925292,2.89303936 L14,3 L14,6 C14,7.10265184 15.2815672,7.92869321 16.3605359,7.99561566 L16.5,8 L19,8 C19.4642857,8 19.9285714,8.43112245 19.9925292,8.89303936 L20,9 L20,20.5 C20,21.4411765 19.5570934,21.9394464 18.6712803,21.9948097 L18.5,22 L5.5,22 C4.55882353,22 4.06055363,21.5570934 4.00519031,20.6712803 L4,20.5 L4,3.5 C4,2.55882353 4.44290657,2.06055363 5.32871972,2.00519031 L5.5,2 L13,2 Z M18,12 L15,12 L15,13 L16,13 L16,17 L17,17 L17,13 L18,13 L18,12 Z M10.8649852,12 L9.61127596,12 L11.2952522,14.4362819 L9.5,17 L10.7537092,17 L12,15.1709145 L13.2388724,17 L14.5,17 L12.7047478,14.4287856 L14.388724,12 L13.120178,12 L12,13.7091454 L10.8649852,12 Z M9,12 L6,12 L6,13 L7,13 L7,17 L8,17 L8,13 L9,13 L9,12 Z M15.325283,2.02601012 L15.3778457,2.06502576 L19.9350011,6.62202048 C19.9984371,6.68531835 20.0174414,6.78064313 19.9831319,6.86344174 C19.9556842,6.92968063 19.8984524,6.97743699 19.8307832,6.99380805 L19.7783765,7 L16.3273268,7 C15.6400809,7 15.0748252,6.47751245 15.0068528,5.80796338 L15,5.67220398 L15,2.21993525 C15.0005529,2.13062717 15.054715,2.05040481 15.1373247,2.01653645 C15.1992819,1.99113517 15.268132,1.99554246 15.325283,2.02601012 Z"
}), 'FileTxt');

exports["default"] = _default;