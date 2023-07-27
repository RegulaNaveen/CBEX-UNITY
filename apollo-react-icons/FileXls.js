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
  d: "M13,2 C13.4642857,2 13.9285714,2.43112245 13.9925292,2.89303936 L14,3 L14,6 C14,7.10265184 15.2815672,7.92869321 16.3605359,7.99561566 L16.5,8 L19,8 C19.4642857,8 19.9285714,8.43112245 19.9925292,8.89303936 L20,9 L20,20.5 C20,21.4411765 19.5570934,21.9394464 18.6712803,21.9948097 L18.5,22 L5.5,22 C4.55882353,22 4.06055363,21.5570934 4.00519031,20.6712803 L4,20.5 L4,3.5 C4,2.55882353 4.44290657,2.06055363 5.32871972,2.00519031 L5.5,2 L13,2 Z M6.37931034,12 L5.11244378,12 L6.81409295,14.4362819 L5,17 L6.26686657,17 L7.52623688,15.1709145 L8.77811094,17 L10.0524738,17 L8.23838081,14.4287856 L9.94002999,12 L8.65817091,12 L7.52623688,13.7091454 L6.37931034,12 Z M12.0644678,12 L11,12 L11,17 L14.1784108,17 L14.1784108,16.0629685 L12.0644678,16.0629685 L12.0644678,12 Z M16.9956459,12 C15.8563135,12 15.1596517,12.6531205 15.1596517,13.4586357 C15.1596517,14.5399129 16.1756168,14.7576197 16.9666183,14.9390421 C17.5253991,15.0696662 17.946299,15.1930334 17.946299,15.5558781 C17.946299,15.8316401 17.670537,16.1001451 17.1044993,16.1001451 C16.436865,16.1001451 15.9071118,15.8026125 15.5660377,15.4470247 L15.5660377,15.4470247 L15,16.2307692 C15.4571843,16.6879536 16.1248186,17 17.053701,17 C18.3599419,17 18.9912917,16.3323657 18.9912917,15.4470247 C18.9912917,14.3730044 17.9753266,14.1335269 17.1770682,13.9521045 C16.6182874,13.8214804 16.2119013,13.7198839 16.2119013,13.3933237 C16.2119013,13.1030479 16.4586357,12.8998549 16.9230769,12.8998549 C17.394775,12.8998549 17.9172714,13.0667634 18.3091437,13.4296081 L18.3091437,13.4296081 L18.8824383,12.6748911 C18.4034833,12.2322206 17.7648766,12 16.9956459,12 Z M15.325283,2.02601012 L15.3778457,2.06502576 L19.9350011,6.62202048 C19.9984371,6.68531835 20.0174414,6.78064313 19.9831319,6.86344174 C19.9556842,6.92968063 19.8984524,6.97743699 19.8307832,6.99380805 L19.7783765,7 L16.3273268,7 C15.6400809,7 15.0748252,6.47751245 15.0068528,5.80796338 L15,5.67220398 L15,2.21993525 C15.0005529,2.13062717 15.054715,2.05040481 15.1373247,2.01653645 C15.1992819,1.99113517 15.268132,1.99554246 15.325283,2.02601012 Z"
}), 'FileXls');

exports["default"] = _default;