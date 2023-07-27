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
  d: "M2.23228913,11.0407769 L9.54285915,18.5995648 C10.3477161,19.4301716 11.6514302,19.4301716 12.4571443,18.5995648 L16.9183609,13.986753 C18.0488553,13.9149401 19.1008252,13.5541379 20.0012092,12.9774077 L20,20.4487066 C20.0008537,20.860021 19.8422823,21.2544927 19.5611395,21.5452494 C19.2799967,21.8368926 18.897711,22 18.5,22 L3.5,22 C3.10228896,22 2.72000332,21.8368926 2.43886052,21.5452494 C2.15771771,21.2544927 1.99914631,20.860021 2,20.4487066 L2,11.1409461 C2,11.0842131 2.03257488,11.0327988 2.08400344,11.0106374 C2.13457486,10.9893626 2.19286056,11.0008865 2.23228913,11.0407769 Z M10.4981326,9.99992625 C11.3589118,12.0641184 13.2535348,13.5893761 15.535189,13.9288866 L11.6586813,17.7319032 C11.2934769,18.0893656 10.7030061,18.0893656 10.3386549,17.7319032 L3.10538794,10.63707 C3.00726057,10.5382865 2.97483588,10.3934598 3.02005979,10.2620275 C3.09685512,10.0217659 3.32724112,10 3.53202867,10 L10.4981326,9.99992625 Z M16.5,2 C19.5375661,2 22,4.46243388 22,7.5 C22,10.5375661 19.5375661,13 16.5,13 C13.4624339,13 11,10.5375661 11,7.5 C11,4.46243388 13.4624339,2 16.5,2 Z M18.5737359,5 C18.2862595,5 18.0117243,5.13539112 17.8360956,5.37093459 L17.8305495,5.36629791 L15.8986345,7.95263933 L15.0667094,7.11710917 C14.7043599,6.76564864 14.1275585,6.77028532 13.770755,7.1282372 C13.4139516,7.48618908 13.4093298,8.0639197 13.7596627,8.42836294 L14.886459,9.5587861 C15.1905738,9.8666618 15.6130069,10.0261637 16.045608,9.99648891 C16.4763603,9.96588681 16.8729113,9.75074475 17.1326568,9.40392091 L19.3150736,6.48373836 C19.5138112,6.21852012 19.5554075,5.8670596 19.4250726,5.56289324 C19.2965864,5.25872688 19.0146562,5.04636682 18.6855836,5.00649136 C18.6486091,5.00278201 18.6107103,5 18.5737359,5 Z"
}), 'EmailCompliant');

exports["default"] = _default;