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
  d: "M2.23228913,11.0407769 L9.54285916,18.5995648 C10.3477161,19.4301717 11.6514302,19.4301717 12.4571443,18.5995648 L16.9183609,13.986753 C18.0488553,13.9149401 19.1008252,13.5541379 20.0012093,12.9774077 L20,20.4487066 C20.0008537,20.860021 19.8422823,21.2544927 19.5611395,21.5452494 C19.2799967,21.8368926 18.897711,22 18.5,22 L3.50000001,22 C3.10228897,22 2.72000333,21.8368926 2.43886052,21.5452494 C2.15771772,21.2544927 1.99914632,20.860021 2.00000001,20.4487066 L2.00000001,11.1409461 C2.00000001,11.0842131 2.03257489,11.0327988 2.08400345,11.0106374 C2.13457487,10.9893626 2.19286057,11.0008865 2.23228913,11.0407769 Z M10.4981326,9.99992626 C11.3589118,12.0641184 13.2535349,13.5893761 15.535189,13.9288866 L11.6586814,17.7319032 C11.2934769,18.0893656 10.7030061,18.0893656 10.3386549,17.7319032 L3.10538795,10.63707 C3.00726058,10.5382865 2.97483588,10.3934598 3.0200598,10.2620275 C3.09685513,10.0217659 3.32724113,10 3.53202868,10 L10.4981326,9.99992626 Z M16.500004,2 C19.5375702,2 22.000004,4.46243388 22.000004,7.5 C22.000004,10.5375661 19.5375702,13 16.500004,13 C13.4624379,13 11.000004,10.5375661 11.000004,7.5 C11.000004,4.46243388 13.4624379,2 16.500004,2 Z M19.7813873,5.41491274 L14.5679526,10.6295053 C15.1343403,10.9636659 15.794783,11.1553846 16.500004,11.1553846 C18.6029344,11.1553846 20.3076963,9.4506227 20.3076963,7.34769231 C20.3076963,6.64216908 20.1158133,5.98146254 19.7813873,5.41491274 Z M16.500004,3.54 C14.3970736,3.54 12.6923117,5.24476191 12.6923117,7.34769231 C12.6923117,8.1320239 12.9294564,8.86096738 13.3359558,9.46673288 L18.6190446,4.1836441 C18.0132791,3.77714466 17.2843356,3.54 16.500004,3.54 Z"
}), 'EmailSpam');

exports["default"] = _default;