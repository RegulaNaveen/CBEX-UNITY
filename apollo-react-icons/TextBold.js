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
  d: "M16.2923767,11.1175219 C17.8473538,9.60122245 18.321868,7.31962405 17.4963165,5.32863852 C16.670765,3.33765298 14.7062131,2.02572186 12.5118451,2 L5.08635965,2 C4.48637978,2 4,2.47625229 4,3.06373926 C4,3.65122623 4.48637978,4.12747851 5.08635965,4.12747851 L5.96674551,4.12747851 C6.08674149,4.12747851 6.18401744,4.22272897 6.18401744,4.34022636 L6.18401744,19.6597736 C6.18401744,19.777271 6.08674149,19.8725215 5.96674551,19.8725215 L5.08635965,19.8725215 C4.48637978,19.8725215 4,20.3487738 4,20.9362607 C4,21.5237477 4.48637978,22 5.08635965,22 L13.7450806,22 C16.4583058,21.9775674 18.800889,20.1340616 19.4069559,17.5443633 C20.0130228,14.954665 18.7240158,12.2962836 16.2915076,11.1192239 L16.2923767,11.1175219 Z M12.5118451,4.12747851 C14.2965249,4.15597267 15.7280493,5.58073156 15.7280493,7.32848268 C15.7280493,9.0762338 14.2965249,10.5009927 12.5118451,10.5294869 L8.57400867,10.5294869 C8.4540127,10.5294869 8.35673674,10.4342364 8.35673674,10.316739 L8.35673674,4.34192835 C8.35673674,4.22443095 8.4540127,4.1291805 8.57400867,4.1291805 L12.5118451,4.12747851 Z M13.7459497,19.8708195 L8.57400867,19.8708195 C8.4540127,19.8708195 8.35673674,19.775569 8.35673674,19.6580717 L8.35673674,12.8697132 C8.35673674,12.7522158 8.4540127,12.6569654 8.57400867,12.6569654 L12.5118451,12.6569654 C12.5266196,12.6569654 12.540525,12.6569654 12.5544304,12.6569654 L12.5657286,12.6569654 L13.7459497,12.6569654 C15.7583013,12.6872326 17.37343,14.29321 17.37343,16.2638924 C17.37343,18.2345749 15.7583013,19.8405523 13.7459497,19.8708195 L13.7459497,19.8708195 Z"
}), 'TextBold');

exports["default"] = _default;