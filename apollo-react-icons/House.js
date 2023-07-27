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
  d: "M11.0304534,7.37954587 C11.5905942,6.87348471 12.4109621,6.87348471 12.9711028,7.37954587 L12.9711028,7.37954587 L19.5,12.5 C19.8512108,12.8387543 19.9869439,13.4947256 20.000143,14 L20.000143,14 L19.9999266,20.3376402 C20.0081376,21.2457467 19.32648,21.9894985 18.4763534,22 L18.4763534,22 L14.2853598,22 C13.8602054,21.9949771 13.5192525,21.6229658 13.5235732,21.1688201 L13.5235732,21.1688201 L13.5235732,16.5973308 C13.5274639,16.1433699 13.1867589,15.7716291 12.7617866,15.7661509 L12.7617866,15.7661509 L11.2382134,15.7661509 C10.8132411,15.7716291 10.4725361,16.1433699 10.4764268,16.5973308 L10.4764268,16.5973308 L10.4764268,21.1688201 C10.4807475,21.6229658 10.1397946,21.9949771 9.71464017,22 L9.71464017,22 L5.52364663,22 C4.67352004,21.9894985 3.99186236,21.2457467 4.00007341,20.3376402 L4.00007341,20.3376402 L3.99985705,14 C4.0146288,13.4962016 4.14929203,12.8372202 4.5,12.5 L4.5,12.5 Z M10.1626377,2.63785018 C11.2283477,1.78738327 12.7673962,1.78738327 13.8331062,2.63785018 L13.8331062,2.63785018 L21.5358125,8.80267081 C22.0734976,9.23839004 22.1557151,10.0089344 21.7213788,10.5418044 C21.5161393,10.7958849 21.2133491,10.9587109 20.8820264,10.9931677 C20.5507037,11.0276246 20.2190832,10.930776 19.9627545,10.7246976 L19.9627545,10.7246976 L12.2600483,4.55987698 C12.1079426,4.43800867 11.8878013,4.43800867 11.7356956,4.55987698 L11.7356956,4.55987698 L4.03298935,10.7246976 C3.77670844,10.9290115 3.44618268,11.0247749 3.1160611,10.9903596 C2.78593952,10.9559444 2.48406698,10.7942534 2.27862118,10.5418044 C1.84428491,10.0089344 1.92650236,9.23839004 2.46418753,8.80267081 L2.46418753,8.80267081 Z"
}), 'House');

exports["default"] = _default;