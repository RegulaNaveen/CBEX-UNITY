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
  d: "M18.8571425,2 C19.4462462,2 19.9312455,2.42300404 19.9932939,2.96641972 L20,3.0845987 L20,20.099783 C20.0005207,20.8678513 19.5132303,21.5605103 18.765541,21.8545042 C18.0712581,22.1274986 17.2795401,22.0067728 16.71199,21.5530941 L16.5851425,21.4425162 L12.4045712,17.472885 C12.2056432,17.2851226 11.8978672,17.2642601 11.6747507,17.4102975 L11.5954284,17.472885 L7.41485708,21.4425162 C7.04102828,21.7994695 6.53258683,22 6.0022857,22 C5.74045572,21.9995085 5.48120481,21.9508908 5.23885715,21.8568329 C4.53901533,21.5829082 4.0662233,20.9602653 4.00642486,20.2526251 L4,20.099783 L4,3.0845987 C4,2.5255252 4.44572543,2.06524959 5.01833028,2.00636428 L5.14285715,2 L18.8571425,2 Z M18,4 L6,4 L5.999,20 L6.02630223,19.9971332 L6.03770677,19.9921862 L10.2226222,16.0184424 C11.1718801,15.1224654 12.6417487,15.0817391 13.6421132,15.8998406 L13.7817215,16.022555 L17.9676582,19.9950023 L18,19.999 L18,4 Z"
}), 'BookmarkOutline');

exports["default"] = _default;