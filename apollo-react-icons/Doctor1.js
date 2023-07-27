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
  d: "M11.9989182,13.0074549 C17,13 21,17 21,21 C21,22 20,22 20,22 L3.99108368,21.9998285 C3.89197531,21.9969136 3,21.9444444 3,21 C3,17 7,13 11.9989182,13.0074549 Z M12.625,15 L11.375,15 C11.1678932,15 11,15.1678932 11,15.375 L11,17 L9.375,17 C9.16789322,17 9,17.1678932 9,17.375 L9,18.625 C9,18.8321068 9.16789322,19 9.375,19 L11,19 L11,20.625 C11,20.8321068 11.1678932,21 11.375,21 L12.625,21 C12.8321068,21 13,20.8321068 13,20.625 L13,19 L14.625,19 C14.8321068,19 15,18.8321068 15,18.625 L15,17.375 C15,17.1678932 14.8321068,17 14.625,17 L13,17 L13,15.375 C13,15.1678932 12.8321068,15 12.625,15 Z M12,2 C14.7614237,2 17,4.23857625 17,7 C17,9.76142375 14.7614237,12 12,12 C9.23857625,12 7,9.76142375 7,7 C7,4.23857625 9.23857625,2 12,2 Z"
}), 'Doctor1');

exports["default"] = _default;