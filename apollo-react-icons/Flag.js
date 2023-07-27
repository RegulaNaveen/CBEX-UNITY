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
  d: "M3.5,2 C4.32842712,2 5,2.67157288 5,3.5 L5,20.5 C5,21.3284271 4.32842712,22 3.5,22 C2.67157288,22 2,21.3284271 2,20.5 L2,3.5 C2,2.67157288 2.67157288,2 3.5,2 Z M9.00010225,3 C12.0001373,3 13.9924263,5 17,5 C20.0075737,5 20,4.01007192 21,4 C21.6666874,3.99328539 22.000031,4.3098322 22.000031,4.94964043 L22,16.998 L21.999991,16.9943302 C21.9820309,17.1095497 21.7000292,19 17,19 C14.0000155,19 13.0052757,17 10,17 C6.99472433,17 6.00000002,17 6.00597422,15.0824906 L6.00000002,5 C6.00000002,3.66666667 7.0000341,3 9.00010225,3 Z"
}), 'Flag');

exports["default"] = _default;