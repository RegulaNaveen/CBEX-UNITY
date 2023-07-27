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
  d: "M6.34588142,14.1666667 L2.41666667,14.1666667 C2.18654802,14.1666667 2,13.9801186 2,13.75 C2,11.6789322 3.67893219,10 5.75,10 C7.20799538,10 8.47165177,10.8320642 9.09202184,12.0472452 C7.98576897,12.5200429 7.03759342,13.2546258 6.34588142,14.1666667 L6.34588142,14.1666667 Z M17.6541186,14.1666667 C16.9624066,13.2546258 16.014231,12.5200429 14.9079782,12.0472452 C15.5283482,10.8320642 16.7920046,10 18.25,10 C20.3210678,10 22,11.6789322 22,13.75 C22,13.8605069 21.9561013,13.9664877 21.8779612,14.0446278 C21.799821,14.122768 21.6938402,14.1666667 21.5833333,14.1666667 L17.6541186,14.1666667 L17.6541186,14.1666667 Z M5.75,9.16666667 C4.59940677,9.16666667 3.66666667,8.23392656 3.66666667,7.08333333 C3.66666667,5.9327401 4.59940677,5 5.75,5 C6.90059323,5 7.83333333,5.9327401 7.83333333,7.08333333 C7.83333333,8.23392656 6.90059323,9.16666667 5.75,9.16666667 Z M18.25,9.16666667 C17.0994068,9.16666667 16.1666667,8.23392656 16.1666667,7.08333333 C16.1666667,5.9327401 17.0994068,5 18.25,5 C19.4005932,5 20.3333333,5.9327401 20.3333333,7.08333333 C20.3333333,8.23392656 19.4005932,9.16666667 18.25,9.16666667 Z M17.1851852,18.3333333 L6.81481481,18.3333333 C6.45685248,18.3333333 6.16666667,18.0721661 6.16666667,17.75 C6.16666667,14.8505051 8.77833896,12.5 12,12.5 C15.221661,12.5 17.8333333,14.8505051 17.8333333,17.75 C17.8333333,17.9047096 17.7650465,18.0530827 17.6434951,18.162479 C17.5219438,18.2718752 17.3570848,18.3333333 17.1851852,18.3333333 Z M12,11.6666667 C10.1590508,11.6666667 8.66666667,10.1742825 8.66666667,8.33333333 C8.66666667,6.49238417 10.1590508,5 12,5 C13.8409492,5 15.3333333,6.49238417 15.3333333,8.33333333 C15.3333333,10.1742825 13.8409492,11.6666667 12,11.6666667 Z"
}), 'User3');

exports["default"] = _default;