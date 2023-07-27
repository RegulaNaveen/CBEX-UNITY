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
  d: "M13,2 C13.4642857,2 13.9285714,2.43112245 13.9925292,2.89303936 L14,3 L14,6 C14,7.10265184 15.2815672,7.92869321 16.3605359,7.99561566 L16.5,8 L19,8 C19.4642857,8 19.9285714,8.43112245 19.9925292,8.89303936 L20,9 L20,20.5 C20,21.4411765 19.5570934,21.9394464 18.6712803,21.9948097 L18.5,22 L5.5,22 C4.55882353,22 4.06055363,21.5570934 4.00519031,20.6712803 L4,20.5 L4,3.5 C4,2.55882353 4.44290657,2.06055363 5.32871972,2.00519031 L5.5,2 L13,2 Z M17.2082019,12 C15.977918,12 15,13.0144928 15,14.5 C15,15.9855072 15.977918,17 17.2082019,17 C18.1671924,17 18.6971609,16.4130435 19,15.8115942 L19,15.8115942 L18.2302839,15.384058 C18.0536278,15.7826087 17.6750789,16.0869565 17.2082019,16.0869565 C16.4763407,16.0869565 15.9211356,15.4130435 15.9211356,14.5 C15.9211356,13.5869565 16.4763407,12.9130435 17.2082019,12.9130435 C17.6750789,12.9130435 18.0536278,13.2246377 18.2302839,13.615942 L18.2302839,13.615942 L19,13.1811594 C18.70347,12.5797101 18.1671924,12 17.2082019,12 Z M11.9971306,12 C10.8436155,12 10,13.0434783 10,14.5 C10,15.9565217 10.8436155,17 11.9971306,17 C13.1563845,17 14,15.9565217 14,14.5 C14,13.0434783 13.1563845,12 11.9971306,12 Z M6.70502431,12 L5,12 L5,17 L6.70502431,17 C8.05996759,17 9,16.0104948 9,14.5037481 C9,12.9970015 8.05996759,12 6.70502431,12 L6.70502431,12 Z M11.9971306,12.9130435 C12.7030129,12.9130435 13.1621234,13.5942029 13.1621234,14.5 C13.1621234,15.3985507 12.7030129,16.0869565 11.9971306,16.0869565 C11.2912482,16.0869565 10.8378766,15.3985507 10.8378766,14.5 C10.8378766,13.5942029 11.2912482,12.9130435 11.9971306,12.9130435 Z M7,13 C7.5,13 8,13.6154423 8,14.5 C8,15.3470765 7.5,16 7,16 L7,16 L6,16 L6,13 Z M15.325283,2.02601012 L15.3778457,2.06502576 L19.9350011,6.62202048 C19.9984371,6.68531835 20.0174414,6.78064313 19.9831319,6.86344174 C19.9556842,6.92968063 19.8984524,6.97743699 19.8307832,6.99380805 L19.7783765,7 L16.3273268,7 C15.6400809,7 15.0748252,6.47751245 15.0068528,5.80796338 L15,5.67220398 L15,2.21993525 C15.0005529,2.13062717 15.054715,2.05040481 15.1373247,2.01653645 C15.1992819,1.99113517 15.268132,1.99554246 15.325283,2.02601012 Z"
}), 'FileDoc');

exports["default"] = _default;