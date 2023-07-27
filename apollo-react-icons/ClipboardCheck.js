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
  d: "M12,1 C13.1518248,1 14.2240598,1.56097021 14.8924045,2.78911368 L15,3 L20,3 C20.4642857,3 20.9285714,3.43112245 20.9925292,3.89303936 L21,4 L21,21 C21,21.4642857 20.5688776,21.9285714 20.1069606,21.9925292 L20,22 L4,22 C3.53571429,22 3.07142857,21.5688776 3.00747085,21.1069606 L3,21 L3,4 C3,3.53571429 3.43112245,3.07142857 3.89303936,3.00747085 L4,3 L9,3 C9.65344866,1.62503163 10.7805849,1 12,1 Z M18,5 L6,5 L6,5 C5.5,5 5,5.5 5,6 L5,19 L5,19 C5,19.5 5.5,20 6,20 L16,20 L16,20 L19,16.5 L19,6 L19,6 C19,5.5 18.5,5 18,5 Z M16.6401844,8.23180379 C17.0318246,8.55817064 17.110795,9.12056168 16.8425391,9.53885748 L16.7682213,9.64020947 L11.7682213,15.6402095 C11.418662,16.0596807 10.8047124,16.1163597 10.3858753,15.789403 L10.2928932,15.7071319 L7.29289322,12.7071319 C6.90236893,12.3166076 6.90236893,11.6834426 7.29289322,11.2929183 C7.65337718,10.9324343 8.22060824,10.9047048 8.61289944,11.2097297 L8.70710678,11.2929183 L10.932,13.5170251 L15.2317787,8.35984067 C15.5853428,7.93556378 16.2159075,7.87823971 16.6401844,8.23180379 Z"
}), 'ClipboardCheck');

exports["default"] = _default;