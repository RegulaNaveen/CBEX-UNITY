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
  d: "M20.2608696,3.625 L17.8695652,3.625 C17.7495033,3.625 17.6521739,3.52706229 17.6521739,3.40625 L17.6521739,1.875 C17.6521739,1.39175084 17.2628563,1 16.7826087,1 C16.3023611,1 15.9130435,1.39175084 15.9130435,1.875 L15.9130435,6.03125 C15.9130435,6.39368687 15.6210553,6.6875 15.2608696,6.6875 L15.2608696,6.6875 C14.9006839,6.6875 14.6086957,6.39368687 14.6086957,6.03125 L14.6086957,4.0625 C14.6086957,3.82087542 14.4140368,3.625 14.173913,3.625 L8.73913043,3.625 C8.6194073,3.62500096 8.52221802,3.52759544 8.52173913,3.407125 L8.52173913,1.875 C8.52173913,1.39175084 8.13242152,1 7.65217391,1 C7.1719263,1 6.7826087,1.39175084 6.7826087,1.875 L6.7826087,6.03125 C6.7826087,6.39368687 6.49062049,6.6875 6.13043478,6.6875 L6.13043478,6.6875 C5.77024908,6.6875 5.47826087,6.39368687 5.47826087,6.03125 L5.47826087,4.0625 C5.47826087,3.82087542 5.28360207,3.625 5.04347826,3.625 L3.73913043,3.625 C2.77863522,3.625 2,4.40850169 2,5.375 L2,20.25 C2,21.2164983 2.77863522,22 3.73913043,22 L20.2608696,22 C21.2213648,22 22,21.2164983 22,20.25 L22,5.375 C22,4.40850169 21.2213648,3.625 20.2608696,3.625 Z M19.826087,20.25 L4.17391304,20.25 C3.93378924,20.25 3.73913043,20.0541246 3.73913043,19.8125 L3.73913043,9.3125 C3.73913043,9.07087542 3.93378924,8.875 4.17391304,8.875 L19.826087,8.875 C20.0662108,8.875 20.2608696,9.07087542 20.2608696,9.3125 L20.2608696,19.8125 C20.2608696,20.0541246 20.0662108,20.25 19.826087,20.25 Z M15.6778667,10.4308804 C15.9922327,9.97679623 16.6151846,9.86353223 17.0692688,10.1778982 C17.4884235,10.4680822 17.6171751,11.0212034 17.3872455,11.4617314 L17.322251,11.5693004 L12.822251,18.0693004 C12.5224739,18.5023118 11.944377,18.6235786 11.5000369,18.36623 L11.4000589,18.3000904 L7.40005885,15.3000904 C6.95823105,14.9687196 6.868688,14.3419182 7.20005885,13.9000904 C7.50593964,13.4922494 8.06354818,13.3845799 8.4950337,13.6310608 L8.60005885,13.7000904 L11.7680589,16.0760904 L15.6778667,10.4308804 Z"
}), 'CalendarCheck');

exports["default"] = _default;