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
  d: "M9.00661628,4.16784886 L16.7949811,11.4897123 C16.9259501,11.623731 17,11.8089989 17,12.002656 C17,12.196313 16.9259501,12.3815809 16.7949811,12.5155997 L9.00661628,19.8341301 C8.88178628,19.9523922 8.71736045,20.0115655 8.55092736,19.9981227 C8.38449427,19.9846799 8.23028326,19.8997703 8.12354774,19.7628046 L7.15117311,18.5296066 C6.92517905,18.2434863 6.9560394,17.8167567 7.22049461,17.5710451 L13.1240639,12.1283089 C13.1585324,12.0966507 13.1783572,12.0505259 13.1783572,12.0019894 C13.1783572,11.9534528 13.1585324,11.9073281 13.1240639,11.8756699 L7.2198701,6.43093391 C7.09335274,6.31274047 7.01569104,6.1459942 7.00378685,5.96698481 C6.98880898,5.78766808 7.04241955,5.60950907 7.15242215,5.473039 L8.12354774,4.23917436 C8.23009387,4.10142084 8.38449395,4.01577169 8.55134261,4.00186707 C8.71798405,3.98838265 8.88252371,4.04836984 9.00661628,4.16784886 Z"
}), 'ChevronRight');

exports["default"] = _default;