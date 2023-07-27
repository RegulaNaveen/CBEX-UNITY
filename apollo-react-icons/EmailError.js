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
  d: "M2.23229243,11.4031429 L9.54286246,18.712 C10.3477194,19.5151429 11.6514335,19.5151429 12.4571476,18.712 L17.0859999,14.0825729 L19.9999999,14.0825729 L20.0000033,20.5 C20.000857,20.8977143 19.8422856,21.2791429 19.5611428,21.5602857 C19.28,21.8422857 18.8977143,22 18.5000033,22 L3.50000331,22 C3.10229227,22 2.72000663,21.8422857 2.43886382,21.5602857 C2.15772102,21.2791429 1.99914962,20.8977143 2.00000331,20.5 L2.00000331,11.5 C2.00000331,11.4451429 2.03257819,11.3954286 2.08400675,11.374 C2.13457817,11.3534286 2.19286387,11.3645714 2.23229243,11.4031429 Z M10.2213839,9.99957285 C9.87763455,10.8712386 9.93583252,11.8734687 10.3845656,12.6884127 C10.8426045,13.5002881 11.6073931,14.0079151 12.4458784,14.0752714 L12.6265969,14.0829165 L15.4949999,14.0825729 L11.6625763,17.9165714 C11.2957193,18.2825714 10.7025765,18.2825714 10.3365766,17.9165714 L3.07057799,10.6522857 C2.97200658,10.5511429 2.93943516,10.4028571 2.98486372,10.2682857 C3.06200656,10.0222857 3.29343509,10 3.49914933,10 L10.2213839,9.99957285 Z M18.4735038,3.22361398 L21.751042,9.65690946 C22.1083104,10.3673317 22.0810838,11.2177624 21.6691693,11.9148946 C21.2610228,12.5880928 20.5462424,12.9984181 19.7723447,13 L13.2225051,13 C12.4538731,12.9968292 11.7406567,12.587785 11.3254017,11.9043185 C10.9193509,11.2195633 10.8912161,10.366519 11.2528072,9.65061874 L14.5260654,3.22574915 C14.7346524,2.81837608 15.058026,2.48491998 15.4542469,2.26813311 C16.5441621,1.67358126 17.8960316,2.10073725 18.4735038,3.22361398 Z M16.5,9.79166667 C15.9930833,9.79166667 15.5833333,10.2014167 15.5833333,10.7083333 C15.5833333,11.21525 15.9930833,11.625 16.5,11.625 C17.0069166,11.625 17.4166666,11.21525 17.4166666,10.7083333 C17.4166666,10.2014167 17.0069166,9.79166667 16.5,9.79166667 Z M16.5,4.75 C16.154375,4.75 15.8689772,5.00397727 15.8199432,5.33579545 L15.8125,5.4375 L15.8125,8.1875 C15.8125,8.5676875 16.1198125,8.875 16.5,8.875 C16.845625,8.875 17.1310227,8.62102273 17.1800568,8.28920455 L17.1875,8.1875 L17.1875,5.4375 L17.1828816,5.35723212 C17.1432264,5.01497864 16.8530312,4.75 16.5,4.75 Z"
}), 'EmailError');

exports["default"] = _default;