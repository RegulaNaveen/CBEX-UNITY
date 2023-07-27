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
  d: "M13,2 C13.5,2 14,2.5 14,3 L14,3 L14,6 C14,7.15059323 15.3954305,8 16.5,8 L16.5,8 L19,8 C19.5,8 20,8.5 20,9 L20,9 L20,20.5 C20,21.5 19.5,22 18.5,22 L18.5,22 L5.5,22 C4.5,22 4,21.5 4,20.5 L4,20.5 L4,3.5 C4,2.5 4.5,2 5.5,2 L5.5,2 Z M15.1373247,2.01653645 C15.2199343,1.98266808 15.314798,2.00179271 15.3778457,2.06502576 L15.3778457,2.06502576 L19.9350011,6.62202048 C19.9984371,6.68531835 20.0174414,6.78064313 19.9831319,6.86344174 C19.9488223,6.94624035 19.867975,7.00016001 19.7783765,7 L19.7783765,7 L16.3273268,7 C15.5942645,7 15,6.40552528 15,5.67220398 L15,5.67220398 L15,2.21993525 C15.0005529,2.13062717 15.054715,2.05040481 15.1373247,2.01653645 Z M17.004717,12 L17.004717,16.0629685 L19,16.0629685 L19,17 L16,17 L16,12 L17.004717,12 Z M11.3762102,12 L12.4965422,15.1184408 L13.6168741,12 L15,12 L15,17 L14.011065,17 L14.011065,13.4017991 L12.7109267,17 L12.2821577,17 L10.9820194,13.4017991 L10.9820194,17 L10,17 L10,12 L11.3762102,12 Z M6.36498516,12 L7.5,13.7091454 L8.62017804,12 L9.88872404,12 L8.20474777,14.4287856 L10,17 L8.7388724,17 L7.5,15.1709145 L6.2537092,17 L5,17 L6.79525223,14.4362819 L5.11127596,12 L6.36498516,12 Z"
}), 'FileXml');

exports["default"] = _default;