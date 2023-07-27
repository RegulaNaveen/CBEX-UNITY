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
  d: "M2.25833499,10.0455691 L10.3775018,18.2907336 C11.2723496,19.1987738 12.7226541,19.1987738 13.6175018,18.2907336 L21.740002,10.0455691 C21.7837182,10.0010654 21.8496867,9.98800463 21.9066686,10.0125716 C21.9633367,10.0362961 22.000228,10.0924803 22,10.154715 L22,20.3078164 C22,21.2423836 21.2538099,22 20.3333353,22 L3.66666834,22 C2.74619375,22 2,21.2423836 2,20.3078164 L2,10.154715 C1.99971873,10.0929575 2.03580337,10.0370027 2.09166832,10.0125716 C2.14859844,9.98751189 2.21484908,10.0006286 2.25833499,10.0455691 Z M12,10.6666667 C14.209139,10.6666667 16,12.0098124 16,13.6666667 C16,13.7550722 15.9531747,13.8398568 15.8698252,13.9023689 C15.7864757,13.9648811 15.6734296,14 15.5555556,14 L8.44444444,14 C8.19898456,14 8,13.8507616 8,13.6666667 C8,12.0098124 9.790861,10.6666667 12,10.6666667 Z M12.8399429,2.30450544 L14.5994175,3.66666669 L17.0504904,3.66666669 C17.9217628,3.66666669 18.5,4.65945543 18.5,5.5 L18.5,7 L21,9 L17,13 L17,5 L7,5 L7,13 L3,9 L3,9 L5.5,7 L5.5,5.5 C5.5,4.6598721 6.44781423,3.66666669 7.17447343,3.66666669 L9.65929744,3.66666669 L11.3848949,2.30450544 C11.7870396,1.89849819 12.4377982,1.89849819 12.8399429,2.30450544 Z M12,6 C13.1045695,6 14,6.8954305 14,8 C14,9.1045695 13.1045695,10 12,10 C10.8954305,10 10,9.1045695 10,8 C10,6.8954305 10.8954305,6 12,6 Z"
}), 'Email3RdPartyOpen');

exports["default"] = _default;