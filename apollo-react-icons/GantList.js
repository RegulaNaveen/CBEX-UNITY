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
  d: "M21,20 C21.5522847,20 22,20.4477153 22,21 C22,21.5522847 21.5522847,22 21,22 L11,22 C10.4477153,22 10,21.5522847 10,21 C10,20.4477153 10.4477153,20 11,20 L21,20 Z M17,17 C17.5522847,17 18,17.4477153 18,18 C18,18.5522847 17.5522847,19 17,19 L7,19 C6.44771525,19 6,18.5522847 6,18 C6,17.4477153 6.44771525,17 7,17 L17,17 Z M17,14 C17.5522847,14 18,14.4477153 18,15 C18,15.5522847 17.5522847,16 17,16 L7,16 C6.44771525,16 6,15.5522847 6,15 C6,14.4477153 6.44771525,14 7,14 L17,14 Z M13,11 C13.5522847,11 14,11.4477153 14,12 C14,12.5522847 13.5522847,13 13,13 L3,13 C2.44771525,13 2,12.5522847 2,12 C2,11.4477153 2.44771525,11 3,11 L13,11 Z M17,8 C17.5522847,8 18,8.44771525 18,9 C18,9.55228475 17.5522847,10 17,10 L7,10 C6.44771525,10 6,9.55228475 6,9 C6,8.44771525 6.44771525,8 7,8 L17,8 Z M17,5 C17.5522847,5 18,5.44771525 18,6 C18,6.55228475 17.5522847,7 17,7 L7,7 C6.44771525,7 6,6.55228475 6,6 C6,5.44771525 6.44771525,5 7,5 L17,5 Z M13,2 C13.5522847,2 14,2.44771525 14,3 C14,3.55228475 13.5522847,4 13,4 L3,4 C2.44771525,4 2,3.55228475 2,3 C2,2.44771525 2.44771525,2 3,2 L13,2 Z"
}), 'GantList');

exports["default"] = _default;