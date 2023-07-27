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
  d: "M20.0425532,2 L14.1929362,2 C13.6641529,2 13.2354894,2.47629282 13.2354894,3.06382979 C13.2354894,3.65136676 13.6641529,4.12765957 14.1929362,4.12765957 L15.024766,4.12765957 C15.0946129,4.12767649 15.1589111,4.16994809 15.1925471,4.23796419 C15.2261832,4.3059803 15.223821,4.38895023 15.186383,4.45446809 L6.46978723,19.6757447 C6.39936163,19.7983489 6.27745586,19.8724938 6.14655319,19.8723404 L3.95744681,19.8723404 C3.42866354,19.8723404 3,20.3486332 3,20.9361702 C3,21.5237072 3.42866354,22 3.95744681,22 L9.80706383,22 C10.3358471,22 10.7645106,21.5237072 10.7645106,20.9361702 C10.7645106,20.3486332 10.3358471,19.8723404 9.80706383,19.8723404 L8.97523404,19.8723404 C8.90538707,19.8723235 8.84108895,19.8300519 8.80745286,19.7620358 C8.77381677,19.6940197 8.77617904,19.6110498 8.81361702,19.5455319 L17.5302128,4.32510638 C17.6004567,4.20217693 17.7223948,4.12769132 17.8534468,4.12765957 L20.0425532,4.12765957 C20.5713365,4.12765957 21,3.65136676 21,3.06382979 C21,2.47629282 20.5713365,2 20.0425532,2 Z"
}), 'TextItalics');

exports["default"] = _default;