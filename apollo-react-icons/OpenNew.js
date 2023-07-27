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
  d: "M20,20 L4,20 L4,4 C7,4 9.5,4 11.5,4 C12.5,4 12.5,2 11.5,2 C9.5,2 7,2 4,2 C2.89,2 2,2.9 2,4 L2,20 C2,21.1 2.89,22 4,22 L20,22 C21.1,22 22,21.1 22,20 C22,17.6666667 22,15.1666667 22,12.5 C22,11.5 20,11.5 20,12.5 C20,15.1666667 20,17.6666667 20,20 Z M15,2 C14,2 14,3.5 15,4 C16.3333333,4.66666667 17,5 17,5 C13.6666667,8.33333333 10.6666667,11.3333333 8,14 C6.5,15.5 8.5,17.5 10,16 C12.6666667,13.3333333 15.6666667,10.3333333 19,7 C19,7 19.3333333,7.66666667 20,9 C20.5,10 22,10 22,9 C22,7 22,4.66666667 22,2 C19.3333333,2 17,2 15,2 Z"
}), 'OpenNew');

exports["default"] = _default;