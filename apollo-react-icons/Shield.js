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
  d: "M19.645693,2 L4.35431172,2 C3.60508286,2.00412463 3,2.56256238 3,3.24999992 L3,8.46916624 C2.97843356,14.1102952 6.36064002,19.2993099 11.7874707,21.950832 C11.8527951,21.9830896 11.9258178,22 12,22 C12.0743897,22 12.1476839,21.9835724 12.2134423,21.9516654 C17.6394844,19.2990792 21.021071,14.1101585 21,8.46916624 L21,3.24999992 C21,2.56256238 20.3949218,2.00412463 19.645693,2 Z M17.7389475,7.294722 L12.2671234,14.6799999 C12.1366259,14.8522008 11.9420341,14.9650316 11.727073,14.993139 C11.512112,15.0212464 11.2948103,14.9622731 11.1239958,14.8294704 L7.21657778,11.7223905 C6.87177341,11.4479546 6.81594116,10.9474764 7.09187295,10.6045413 C7.36780474,10.2616062 7.87101083,10.2060766 8.2158152,10.4805125 L11.4741286,13.0731911 L16.4519297,6.35417041 C16.6151587,6.11055722 16.8997888,5.97586883 17.1928135,6.00358042 C17.4858383,6.031292 17.7398447,6.21691966 17.8539848,6.48676386 C17.968125,6.75660807 17.9239303,7.06700649 17.7389475,7.294722 Z"
}), 'Shield');

exports["default"] = _default;