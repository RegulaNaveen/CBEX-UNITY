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
  d: "M3,6 L21.1647007,6 C21.6260238,6 22,6.36376864 22,6.8125 L22,17.1875 C22,17.6362314 21.6260238,18 21.1647007,18 L2.8352993,18 C2.37397623,18 2,17.6362314 2,17.1875 L2,6.8125 C2,6.36376864 2.37397623,6 3,6 Z M5.58658426,17 L18.4134157,17 C18.7390162,15.8286606 19.7349534,14.9064965 21,14.6050146 L21,9.39498543 C19.7349534,9.0935035 18.7390162,8.17133941 18.4134157,7 L5.58658426,7 C5.26098378,8.17133941 4.26504656,9.0935035 3,9.39498543 L3,14.6050146 C4.26504656,14.9064965 5.26098378,15.8286606 5.58658426,17 Z M12,9 C13.6568542,9 15,10.3431458 15,12 C15,13.6568542 13.6568542,15 12,15 C10.3431458,15 9,13.6568542 9,12 C9,10.3431458 10.3431458,9 12,9 Z M17,11 C17.5522847,11 18,11.4477153 18,12 C18,12.5522847 17.5522847,13 17,13 C16.4477153,13 16,12.5522847 16,12 C16,11.4477153 16.4477153,11 17,11 Z M7,11 C7.55228475,11 8,11.4477153 8,12 C8,12.5522847 7.55228475,13 7,13 C6.44771525,13 6,12.5522847 6,12 C6,11.4477153 6.44771525,11 7,11 Z"
}), 'Money');

exports["default"] = _default;