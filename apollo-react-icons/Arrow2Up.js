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
  d: "M7.06640803,7.13455816 C7.20046464,7.44589303 7.51607592,7.64882492 7.8660932,7.64874011 L10.4849756,7.64874011 C10.5424297,7.64851748 10.5975975,7.67039597 10.638224,7.70951558 C10.6788505,7.74863518 10.7015718,7.80175661 10.7013406,7.85707963 L10.7013406,20.7499628 C10.7013406,21.4403393 11.2825602,22 11.9995308,22 C12.7165015,22 13.297721,21.4403393 13.297721,20.7499628 L13.297721,7.85707963 C13.297721,7.74201689 13.394591,7.64874011 13.5140861,7.64874011 L16.1346994,7.64874011 C16.4846879,7.64866815 16.8001812,7.44562782 16.9341059,7.13427028 C17.0680306,6.82291274 16.9940216,6.46453346 16.7465797,6.22619783 L12.6122766,2.24441281 C12.4499438,2.08792729 12.2296647,2 11.9999636,2 C11.7702624,2 11.5499834,2.08792729 11.3876505,2.24441281 L7.25248196,6.22619783 C7.00541665,6.46490205 6.93198051,6.8233965 7.06640803,7.13455816 Z"
}), 'Arrow2Up');

exports["default"] = _default;