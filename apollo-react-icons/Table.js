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
  d: "M22,19.5 C22,20.8807119 20.8807119,22 19.5,22 L19.5,22 L4.5,22 C3.11928813,22 2,20.8807119 2,19.5 L2,19.5 L2,4.5 C2,3.11928813 3.11928813,2 4.5,2 L4.5,2 L19.5,2 C20.8807119,2 22,3.11928813 22,4.5 L22,4.5 Z M11,13 L4,13 L4,19.2 C4,19.607841 4.30518815,19.9444016 4.6996497,19.9937669 L4.8,20 L11,20 L11,13 Z M20,13 L13,13 L13,20 L19.2,20 C19.607841,20 19.9444016,19.6948119 19.9937669,19.3003503 L20,19.2 L20,13 Z M11,4 L4.8,4 C4.3581722,4 4,4.3581722 4,4.8 L4,4.8 L4,11 L11,11 L11,4 Z M19.2,4 L13,4 L13,11 L20,11 L20,4.8 C20,4.39215895 19.6948119,4.05559842 19.3003503,4.00623314 L19.2,4 Z"
}), 'Table');

exports["default"] = _default;