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
  d: "M6,4 C6.55228475,4 7,4.44771525 7,5 L7,19 C7,19.5522847 6.55228475,20 6,20 C5.44771525,20 5,19.5522847 5,19 L5,5 C5,4.44771525 5.44771525,4 6,4 Z M17.4486574,4.00186707 C17.615506,4.01577169 17.7699061,4.10142084 17.8764523,4.23917436 L17.8764523,4.23917436 L18.8475779,5.473039 C18.9575804,5.60950907 19.011191,5.78766808 18.9962132,5.96698481 C18.984309,6.1459942 18.9066473,6.31274047 18.7801299,6.43093391 L18.7801299,6.43093391 L12.8759361,11.8756699 C12.8414676,11.9073281 12.8216428,11.9534528 12.8216428,12.0019894 C12.8216428,12.0505259 12.8414676,12.0966507 12.8759361,12.1283089 L12.8759361,12.1283089 L18.7795054,17.5710451 C19.0439606,17.8167567 19.0748209,18.2434863 18.8488269,18.5296066 L18.8488269,18.5296066 L17.8764523,19.7628046 C17.7697167,19.8997703 17.6155057,19.9846799 17.4490726,19.9981227 C17.2826396,20.0115655 17.1182137,19.9523922 16.9933837,19.8341301 L16.9933837,19.8341301 L9.20501893,12.5155997 C9.07404989,12.3815809 9,12.196313 9,12.002656 C9,11.8089989 9.07404989,11.623731 9.20501893,11.4897123 L9.20501893,11.4897123 L16.9933837,4.16784886 C17.1174763,4.04836984 17.282016,3.98838265 17.4486574,4.00186707 Z"
}), 'ChevronLeft2');

exports["default"] = _default;