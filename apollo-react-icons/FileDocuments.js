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
  d: "M6,5 L6,17.5 L6,17.5 C6,18.5 7,20 9,20 L17,20 L17,20 C17,21.1045695 16.1045695,22 15,22 L5,22 C3.8954305,22 3,21.1045695 3,20 L3,7 C3,5.8954305 3.8954305,5 5,5 L6,5 Z M17,2 L17,6 L21,6 L21,17 C21,18.1045695 20.1045695,19 19,19 L9,19 C7.8954305,19 7,18.1045695 7,17 L7,4 C7,2.8954305 7.8954305,2 9,2 L17,2 Z M14.5,14 L9.5,14 C9.22385763,14 9,14.2238576 9,14.5 C9,14.7761424 9.22385763,15 9.5,15 L9.5,15 L14.5,15 C14.7761424,15 15,14.7761424 15,14.5 C15,14.2238576 14.7761424,14 14.5,14 L14.5,14 Z M18.5,11 L9.5,11 C9.22385763,11 9,11.2238576 9,11.5 C9,11.7761424 9.22385763,12 9.5,12 L9.5,12 L18.5,12 C18.7761424,12 19,11.7761424 19,11.5 C19,11.2238576 18.7761424,11 18.5,11 L18.5,11 Z M18.5,8 L9.5,8 C9.22385763,8 9,8.22385763 9,8.5 C9,8.77614237 9.22385763,9 9.5,9 L9.5,9 L18.5,9 C18.7761424,9 19,8.77614237 19,8.5 C19,8.22385763 18.7761424,8 18.5,8 L18.5,8 Z M18,2 L21,5 L18,5 L18,2 Z"
}), 'FileDocuments');

exports["default"] = _default;