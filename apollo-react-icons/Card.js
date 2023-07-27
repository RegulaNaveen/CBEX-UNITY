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
  d: "M10,13 C10.5522847,13 11,13.4477153 11,14 L11,21 C11,21.5522847 10.5522847,22 10,22 L3,22 C2.44771525,22 2,21.5522847 2,21 L2,14 C2,13.4477153 2.44771525,13 3,13 L10,13 Z M21,13 C21.5522847,13 22,13.4477153 22,14 L22,21 C22,21.5522847 21.5522847,22 21,22 L14,22 C13.4477153,22 13,21.5522847 13,21 L13,14 C13,13.4477153 13.4477153,13 14,13 L21,13 Z M10,2 C10.5522847,2 11,2.44771525 11,3 L11,10 C11,10.5522847 10.5522847,11 10,11 L3,11 C2.44771525,11 2,10.5522847 2,10 L2,3 C2,2.44771525 2.44771525,2 3,2 L10,2 Z M21,2 C21.5522847,2 22,2.44771525 22,3 L22,10 C22,10.5522847 21.5522847,11 21,11 L14,11 C13.4477153,11 13,10.5522847 13,10 L13,3 C13,2.44771525 13.4477153,2 14,2 L21,2 Z"
}), 'Card');

exports["default"] = _default;