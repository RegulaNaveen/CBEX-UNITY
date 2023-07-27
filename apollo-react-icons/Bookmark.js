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
  d: "M5.23885715,21.8568329 C5.48120481,21.9508908 5.74045572,21.9995085 6.0022857,22 C6.53258683,22 7.04102828,21.7994695 7.41485708,21.4425162 L11.5954284,17.472885 C11.8192224,17.2616523 12.1807772,17.2616523 12.4045712,17.472885 L16.5851425,21.4425162 C17.1571608,21.9858699 18.0178517,22.1484982 18.765541,21.8545042 C19.5132303,21.5605103 20.0005207,20.8678513 20,20.099783 L20,3.0845987 C20,2.48559138 19.488325,2 18.8571425,2 L5.14285715,2 C4.5116746,2 4,2.48559138 4,3.0845987 L4,20.099783 C3.99983999,20.8695371 4.48902662,21.5633422 5.23885715,21.8568329 Z"
}), 'Bookmark');

exports["default"] = _default;