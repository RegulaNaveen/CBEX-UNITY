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
  d: "M21.4184328,6.06730271 C20.6236652,4.47602954 19.1417969,3.36673945 17.4247885,3.07775904 C15.70778,2.78877862 13.9592371,3.35437565 12.7124543,4.60204653 L12.0007077,5.27126587 L11.3114635,4.62603903 C10.0669689,3.35356516 8.30144224,2.77722044 6.57093078,3.07852284 C4.85045779,3.35431447 3.36529585,4.46705448 2.58298259,6.06644584 C1.52526888,8.19754547 1.93339625,10.7876823 3.59142926,12.4664449 L11.4031405,20.7404296 C11.5600593,20.9063751 11.7755968,21 12.0007077,21 C12.2258186,21 12.4413561,20.9063751 12.5982748,20.7404296 L20.3991515,12.4818687 C22.0639878,10.8014601 22.4765551,8.20508119 21.4184328,6.06730271 Z"
}), 'Heart');

exports["default"] = _default;