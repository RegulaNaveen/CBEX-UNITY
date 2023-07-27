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
  d: "M11.1750871,2.86633002 L11.1750871,2.83333333 C11.1750871,2.37309604 11.5491309,2 12.0105374,2 C12.4719438,2 12.8459877,2.37309604 12.8459877,2.83333333 L12.8459877,2.86799484 C17.4801719,3.24949282 21.2310469,6.7380525 22,11.2403788 C21.7086376,11.1923246 21.4019189,11.1666667 21.085256,11.1666667 C19.7836705,11.1666667 18.6500893,11.6001498 18.0603498,12.2406231 C17.4706102,11.6001498 16.3370291,11.1666667 15.0354436,11.1666667 C13.7338581,11.1666667 12.600277,11.6001498 12.0105374,12.2406231 C11.4207978,11.6001498 10.2872167,11.1666667 8.98563119,11.1666667 C7.68404572,11.1666667 6.55046456,11.6001498 5.96072499,12.2406231 C5.37098543,11.6001498 4.23740427,11.1666667 2.9358188,11.1666667 C2.61151117,11.1666667 2.29763367,11.1935784 2,11.2438982 C2.76872889,6.73324107 6.5302717,3.23931969 11.1750871,2.86633002 L11.1750871,2.86633002 Z M12.8459877,12.8785785 L12.8459877,18.6666667 C12.8459877,19.126904 12.4719438,19.5 12.0105374,19.5 C11.5491309,19.5 11.1750871,19.126904 11.1750871,18.6666667 L11.1750871,12.8785785 C11.1985261,12.9004749 11.2206491,12.9227085 11.2414029,12.9452477 L12.0105374,13.7805488 L12.7796718,12.9452477 C12.8004257,12.9227085 12.8225487,12.9004749 12.8459877,12.8785785 L12.8459877,12.8785785 Z M10.3404487,18.7191219 C10.3682264,19.6153237 11.1053188,20.3333333 12.0105374,20.3333333 C12.915756,20.3333333 13.6528484,19.6153237 13.6806261,18.7191219 C16.5637212,18.9040693 18.6941396,19.5566607 18.6941396,20.3333333 C18.6941396,21.2538079 15.701789,22 12.0105374,22 C8.31928578,22 5.32693513,21.2538079 5.32693513,20.3333333 C5.32693513,19.5566607 7.45735362,18.9040693 10.3404487,18.7191219 L10.3404487,18.7191219 Z M7.6244234,9.5033679 C7.6244234,8.30731072 8.23922336,7.12360184 9.51358913,5.93930535 C9.76678266,5.70400696 9.78080498,5.3085261 9.54490885,5.05597413 C9.30901272,4.80342216 8.91252721,4.78943538 8.65933367,5.02473377 C7.14886516,6.42844581 6.37124798,7.92563582 6.37124798,9.5033679 C6.37124798,9.84854587 6.65178085,10.1283679 6.99783569,10.1283679 C7.34389053,10.1283679 7.6244234,9.84854587 7.6244234,9.5033679 Z"
}), 'Holiday');

exports["default"] = _default;