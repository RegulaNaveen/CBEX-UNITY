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

var _default = (0, _createSvgIcon["default"])( /*#__PURE__*/React.createElement("g", {
  fillRule: "evenodd"
}, /*#__PURE__*/React.createElement("path", {
  d: "M14,14 L14,18 C14,18.5 13.5,19 13,19 L5,19 C4.5,19 4,18.5 4,18 L4,6 C4,5.5 4.5,5 5,5 L13,5 C13.5,5 14,5.5 14,6 C14,6.17198486 14,6.5053182 14,7 L16,7 C16,6.55817704 16,6.22484371 16,6 C16,4.5 14.5,3 13,3 L5,3 C3.5,3 2,4.5 2,6 L2,18 C2,19.5 3.5,21 5,21 L13,21 C14.5,21 16,19.5 16,18 L16,14 L14,14 Z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M23,10.5 L19,5 C19,5 18,5 18,6 C18,6.66666667 18,7.66666667 18,9 L12,9 C9,9 7.5,10.5 7.5,13 L7.5,14.5 C7.5,15.5 8.5,16 9,16 C9.5,16 10.5,15.5 10.5,14.5 L10.5,13.5 C10.5,12 11,12 14,12 L18,12 C18,13.3333333 18,14.3333333 18,15 C18,16 19,16 19,16 L23,10.5 Z"
})), 'Export');

exports["default"] = _default;