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
  d: "M3.3125,18 L14.6875,18 C15.4123737,18 16,18.6715729 16,19.5 C16,20.3284271 15.4123737,21 14.6875,21 L3.3125,21 C2.58762627,21 2,20.3284271 2,19.5 C2,18.6715729 2.58762627,18 3.3125,18 Z M3.25,13 L20.75,13 C21.4403559,13 22,13.6715729 22,14.5 C22,15.3284271 21.4403559,16 20.75,16 L3.25,16 C2.55964406,16 2,15.3284271 2,14.5 C2,13.6715729 2.55964406,13 3.25,13 L3.25,13 Z M3.3125,8 L14.6875,8 C15.4123737,8 16,8.67157288 16,9.5 C16,10.3284271 15.4123737,11 14.6875,11 L3.3125,11 C2.58762627,11 2,10.3284271 2,9.5 C2,8.67157288 2.58762627,8 3.3125,8 L3.3125,8 Z M3.25,3 L20.75,3 C21.4403559,3 22,3.67157288 22,4.5 C22,5.32842712 21.4403559,6 20.75,6 L3.25,6 C2.55964406,6 2,5.32842712 2,4.5 C2,3.67157288 2.55964406,3 3.25,3 Z"
}), 'AlignLeft');

exports["default"] = _default;