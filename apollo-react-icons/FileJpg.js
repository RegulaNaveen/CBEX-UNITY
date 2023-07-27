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
  d: "M13,2 C13.4642857,2 13.9285714,2.43112245 13.9925292,2.89303936 L14,3 L14,6 C14,7.10265184 15.2815672,7.92869321 16.3605359,7.99561566 L16.5,8 L19,8 C19.4642857,8 19.9285714,8.43112245 19.9925292,8.89303936 L20,9 L20,10 L23,10 L23,19 L20,19 L20,20.5 C20,21.4411765 19.5570934,21.9394464 18.6712803,21.9948097 L18.5,22 L5.5,22 C4.55882353,22 4.06055363,21.5570934 4.00519031,20.6712803 L4,20.5 L4,19 L1,19 L1,10 L4,10 L4,3.5 C4,2.55882353 4.44290657,2.06055363 5.32871972,2.00519031 L5.5,2 L13,2 Z M22,11 L2,11 L2,18 L22,18 L22,11 Z M16.6549964,12 C17.3187488,12 17.8372216,12.1258782 18.2104303,12.3776385 C18.5836391,12.6293988 18.8128184,12.9716602 18.9162851,13.1411609 L17.844075,13.3225594 C17.5876275,12.8344327 16.9662063,12.8344327 16.6549964,12.8344327 C16.1833188,12.8344327 15.8082922,12.9696556 15.5299052,13.2401055 C15.2515182,13.5105554 15.1123268,13.9118267 15.1123268,14.4439314 C15.1123268,15.0178129 15.2533416,15.4482176 15.5353756,15.7351583 C15.8174096,16.0220991 16.1869659,16.1655673 16.6440554,16.1655673 C16.8701689,16.1655673 17.0968868,16.1254402 17.3242159,16.0451847 C17.551545,15.9649292 17.8371011,15.8494949 18,15.7351583 L18,15 L16.5,15 L16.5,14 L19,14 L19,16.2513193 C18.7738865,16.4492094 18.4462701,16.6234601 18.0171408,16.7740765 C17.5880115,16.9246929 17.1534182,17 16.7133479,17 C16.1541426,17 15.6666687,16.8939105 15.2509117,16.6817282 C14.8351547,16.469546 14.5227338,16.1661189 14.3136397,15.771438 C14.1045455,15.376757 14,14.9474517 14,14.4835092 C14,13.9799887 14.116702,13.5325437 14.3501094,13.1411609 C14.5835168,12.7497782 14.9251132,12.4496492 15.3749088,12.2407652 C15.717726,12.0802543 16.1444176,12 16.6549964,12 Z M11.5,12 C12.5,12 13,12.7956515 13,13.5381992 C13,14.2807468 12.5,15 11.5,15 L10,15 L10,17 L9,17 L9,12 L11.5,12 Z M8,12 L8,15.1120054 C8,15.5188932 7.96370309,15.8318791 7.89110817,16.0509725 C7.79355876,16.3371353 7.5,17 6,17 C4.5,17 4,16.5 4,16 L4,15 L5,15 L5,15.5 C5,16.3074224 7,16.3074224 7,15.5 L6.99615346,12 L8,12 Z M11.3695692,13 L10,13 L10,14 L11.3695692,14 C11.7898564,14 12,13.8333333 12,13.5 C12,13.1666667 11.7898564,13 11.3695692,13 Z M15.325283,2.02601012 L15.3778457,2.06502576 L19.9350011,6.62202048 C19.9984371,6.68531835 20.0174414,6.78064313 19.9831319,6.86344174 C19.9556842,6.92968063 19.8984524,6.97743699 19.8307832,6.99380805 L19.7783765,7 L16.3273268,7 C15.6400809,7 15.0748252,6.47751245 15.0068528,5.80796338 L15,5.67220398 L15,2.21993525 C15.0005529,2.13062717 15.054715,2.05040481 15.1373247,2.01653645 C15.1992819,1.99113517 15.268132,1.99554246 15.325283,2.02601012 Z"
}), 'FileJpg');

exports["default"] = _default;