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
  d: "M13,9 L19.5,9 C20.9859905,9.0251828 22.0230068,10.4810342 22,12 L21.9996638,21.689441 C22.0072589,21.8520936 21.8852661,21.9906466 21.7262236,22 L11.5,22 C11.3322035,22 11,21.671517 11,21.5 L11,13 C11,11 10.6462067,10.4699399 9.88565678,9.45341615 C9.81758126,9.3590918 9.80700955,9.23371098 9.85829221,9.12887148 C9.90957487,9.02403199 9.88533206,9.00092665 10,9 L12,9 L12,3 C12,2.55766668 12.5797833,2 13,2 L16,2 C16.9805055,2 18,2.96788891 18,4 C18,5.03211109 16.9805055,6 16,6 L13,6 L13,9 Z M2,13.0238095 C2,10.8015209 3.790861,9 6,9 C8.209139,9 10,10.8015209 10,13.0238095 L10,21.6904762 C10,21.8614215 9.86224146,22 9.69230769,22 L2.30769231,22 C2.13775854,22 2,21.8614215 2,21.6904762 L2,13.0238095 Z"
}), 'Mailbox');

exports["default"] = _default;