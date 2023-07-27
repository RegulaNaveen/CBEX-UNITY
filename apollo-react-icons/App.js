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
  d: "M19.5,17 C20.880625,17 22,18.119375 22,19.5 C22,20.880625 20.880625,22 19.5,22 C18.119375,22 17,20.880625 17,19.5 C17,18.119375 18.119375,17 19.5,17 Z M12,17 C13.380625,17 14.5,18.119375 14.5,19.5 C14.5,20.880625 13.380625,22 12,22 C10.619375,22 9.5,20.880625 9.5,19.5 C9.5,18.119375 10.619375,17 12,17 Z M4.5,17 C5.880625,17 7,18.119375 7,19.5 C7,20.880625 5.880625,22 4.5,22 C3.119375,22 2,20.880625 2,19.5 C2,18.119375 3.119375,17 4.5,17 Z M19.5,9.5 C20.880625,9.5 22,10.619375 22,12 C22,13.380625 20.880625,14.5 19.5,14.5 C18.119375,14.5 17,13.380625 17,12 C17,10.619375 18.119375,9.5 19.5,9.5 Z M12,9.5 C13.380625,9.5 14.5,10.619375 14.5,12 C14.5,13.380625 13.380625,14.5 12,14.5 C10.619375,14.5 9.5,13.380625 9.5,12 C9.5,10.619375 10.619375,9.5 12,9.5 Z M4.5,9.5 C5.880625,9.5 7,10.619375 7,12 C7,13.380625 5.880625,14.5 4.5,14.5 C3.119375,14.5 2,13.380625 2,12 C2,10.619375 3.119375,9.5 4.5,9.5 Z M19.5,2 C20.880625,2 22,3.119375 22,4.5 C22,5.880625 20.880625,7 19.5,7 C18.119375,7 17,5.880625 17,4.5 C17,3.119375 18.119375,2 19.5,2 Z M12,2 C13.380625,2 14.5,3.119375 14.5,4.5 C14.5,5.880625 13.380625,7 12,7 C10.619375,7 9.5,5.880625 9.5,4.5 C9.5,3.119375 10.619375,2 12,2 Z M4.5,2 C5.880625,2 7,3.119375 7,4.5 C7,5.880625 5.880625,7 4.5,7 C3.119375,7 2,5.880625 2,4.5 C2,3.119375 3.119375,2 4.5,2 Z"
}), 'App');

exports["default"] = _default;