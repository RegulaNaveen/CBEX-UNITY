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
  d: "M21.2608333,6.96166667 L20.2075,5.90833333 L20.9416667,5.175 C21.5652882,4.55206883 21.5658478,3.5415382 20.9429167,2.91791667 C20.3199855,2.29429514 19.3094549,2.29373549 18.6858333,2.91666667 L9.53333333,12.0708333 C7.33429429,10.9772569 4.66677216,11.6383516 3.2329109,13.6322734 C1.79904964,15.6261951 2.02135399,18.3654106 3.7579717,20.1020283 C5.49458942,21.838646 8.23380486,22.0609504 10.2277266,20.6270891 C12.2216484,19.1932278 12.8827431,16.5257057 11.7891667,14.3266667 L14.905,11.2125 L15.54,11.8475 C15.9084301,12.2159302 16.4454288,12.3598185 16.9487137,12.2249637 C17.4519987,12.090109 17.845109,11.6969987 17.9799637,11.1937137 C18.1148185,10.6904288 17.9709302,10.1534301 17.6025,9.785 L16.9666667,9.15 L18.1466667,7.96916667 L19.2,9.02166667 C19.7761941,9.57331634 20.6846392,9.57331634 21.2608333,9.02166667 C21.8282953,8.45223777 21.8282953,7.53109557 21.2608333,6.96166667 L21.2608333,6.96166667 Z M7.31333333,14.045 C8.69404521,14.045 9.81333333,15.1642881 9.81333333,16.545 C9.81333333,17.9257119 8.69404521,19.045 7.31333333,19.045 C5.93262146,19.045 4.81333333,17.9257119 4.81333333,16.545 C4.81425337,15.164939 5.93327207,14.0466664 7.31333333,14.0466667 L7.31333333,14.045 Z"
}), 'Key');

exports["default"] = _default;