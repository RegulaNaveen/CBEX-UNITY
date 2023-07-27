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
  d: "M9.7215646,3.0015302 C10.7445824,3.02984504 11.7179811,3.45162814 12.4242572,4.17923217 C13.1809815,4.95880791 13.5957411,6.43247656 13.5,7.5 C13.5,10.0926714 12.6909576,10.718013 11.9002999,11.5638893 C11.717456,12.0719377 11.6939688,12.6212877 11.8328149,13.1423186 C11.8961342,13.351157 11.9786159,13.4458627 12.0344368,13.466099 L12.0344368,13.466099 L12.6501333,13.6814129 C14.6896801,14.3864447 17,15.1853728 17,18.3810851 L17,18.3810851 L17,19.5952616 C17,19.7031648 16.9556574,19.806602 16.8768124,19.8825965 C16.7979673,19.958591 16.6911519,20.0008503 16.5800933,20.0001013 L16.5800933,20.0001013 L2.41657409,20.0001013 C2.18650657,20.0001013 2,19.8187853 2,19.5952616 L2,19.5952616 L2,18.3851324 C2,15.1797066 4.30282159,14.3880636 6.33237058,13.6903169 C6.54482337,13.6174663 6.75727616,13.5438063 6.9672295,13.4685273 C7.02305043,13.4458627 7.1055321,13.351157 7.16885137,13.144747 C7.30920454,12.6218078 7.28482523,12.0699828 7.09886692,11.5606515 C6.31237503,10.7204414 5.5,10.090243 5.5,7.5 C5.40350251,6.43207601 5.82125575,4.96016862 6.57806875,4.18003766 C7.33488176,3.3999067 8.39869539,2.97107675 9.5016663,3.00151714 Z M16.6688972,7.00127406 C17.4646763,6.97643846 19.5,8 19.5,10 C19.5,12 19.230968,12.7905079 18.4121678,13.7378638 C18.3125826,14.0800091 18.5135766,14.766732 18.5704654,14.8375159 L18.5704654,14.8375159 L19,15 C20.4523447,15.5491962 22,16.3814797 22,18.9007952 L22,18.9007952 L22,19.5937898 C22,19.8181335 21.8295131,20 21.6192069,20 L21.6192069,20 L18.4950132,19.9997965 C18.4429066,19.9965398 18,19.9411765 18,19 L18,19 L18,18 C18,15 16,14 14,13 C13,12.5 13.4641953,11.5502397 13.5,11.5 C14,10.5 14.5,9.5 14.5,8 C14.5023143,7.92208977 15.5,7 16.6688972,7.00127406 Z"
}), 'People');

exports["default"] = _default;