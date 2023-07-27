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
  d: "M11,3 C11,2.5 11.5,2 12,2 C12.5,2 13,2.5 13,3 C13,4 13,4 13.5,4 L19,4 L22,7 L19,10 L13.5,10 C13.1666667,10 13,10.1666667 13,10.5 C13,10.5 13,11 13,11.5 C13,12 12.9205902,12 13.5,12 L19,12 C19,12 20,12 20,13 L20,17 C20,18 19,18 19,18 L13.5,18 C13,18 13,18 13,18.5 L13,22 L11,22 L11,18.5 C11,18 11,18 10.5,18 L5,18 L2,15 L5,12 L10.5,12 C11,12 11,11.7300012 11,11.5 L11,10.5 C11,10.5 11,10 10.5,10 L5,10 C5,10 4,10 4,9 L4,5 C4,4 5,4 5,4 L10.5,4 C11,4 11,3.5 11,3 Z"
}), 'Route');

exports["default"] = _default;