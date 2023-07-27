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
  d: "M20.5,18 C21.3284271,18 22,18.6715729 22,19.5 C22,20.3284271 21.3284271,21 20.5,21 L3.5,21 C2.67157288,21 2,20.3284271 2,19.5 C2,18.6715729 2.67157288,18 3.5,18 L20.5,18 Z M20.5,11 C21.3284271,11 22,11.6715729 22,12.5 C22,13.3284271 21.3284271,14 20.5,14 L3.5,14 C2.67157288,14 2,13.3284271 2,12.5 C2,11.6715729 2.67157288,11 3.5,11 L20.5,11 Z M20.5,4 C21.3284271,4 22,4.67157288 22,5.5 C22,6.32842712 21.3284271,7 20.5,7 L3.5,7 C2.67157288,7 2,6.32842712 2,5.5 C2,4.67157288 2.67157288,4 3.5,4 L20.5,4 Z"
}), 'Menu');

exports["default"] = _default;