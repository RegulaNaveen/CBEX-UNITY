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
  d: "M14.2359931,19 C14.3634164,18.9993018 14.4706351,19.09528 14.4839923,19.2220035 C14.4948894,19.3142659 14.5002324,19.4070998 14.5,19.5 C14.5,20.8807133 13.3807076,22 12,22 C10.6192924,22 9.5,20.8807133 9.5,19.5 C9.49976764,19.4070998 9.50511059,19.3142659 9.51600769,19.2220035 C9.53023971,19.0957295 9.63693385,19.0002209 9.76400693,19 L9.76400693,19 Z M11.9997886,2 C12.6974676,2 13.2630482,2.5372583 13.2630482,3.2 L13.2630482,3.2 L13.2630482,4.1088 C13.9629634,4.22762741 14.6310854,4.47725136 15.2286801,4.8432 C17.3120861,6.23643026 18.5319009,8.52092223 18.4845211,10.9408 L18.4845211,11.5552 C18.4875887,13.5924435 18.991084,15.6008992 19.9549553,17.4208 L19.9549553,17.4208 L19.9857412,17.4967602 C20.0152676,17.6017438 19.9988083,17.7150234 19.9375689,17.8095867 C19.8610196,17.9277909 19.7254418,18 19.5793461,18 L19.5793461,18 L4.42023108,18 C4.27437844,17.9997184 4.13906572,17.9277602 4.06256716,17.8097972 C3.9860686,17.6918343 3.97927948,17.5446674 4.0446219,17.4208 C5.0084932,15.6008992 5.51198845,13.5924435 5.51505606,11.5552 L5.51505606,11.5552 L5.51585651,10.6613472 C5.56465042,8.52375719 6.5908063,6.50615349 8.33549362,5.1408 C9.04053816,4.62629459 9.86298566,4.27635707 10.736529,4.1192 L10.736529,4.1192 L10.736529,3.2 C10.736529,2.5372583 11.3021096,2 11.9997886,2 Z"
}), 'Bell');

exports["default"] = _default;