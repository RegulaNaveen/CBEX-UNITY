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
  d: "M21,16 C21.4990163,16 22,16.375 22,17 L22,17 L22,18.6708333 C22,20.5117825 20.4927316,22.0041667 18.6334217,22.0041667 L18.6334217,22.0041667 L5.36237007,22.0041667 C3.50470385,22.0018675 2,20.5101565 2,18.6708333 L2,18.6708333 L2,17 C2,16.4421924 2.43662912,16 3,16 C3.56337088,16 3.97992678,16.4521924 3.97992678,17.01 L3.97992678,17.01 L4,18.6708333 C4.00092825,19.3933502 4.63264678,19.999541 5.36237007,20 L5.36237007,20 L18.6334217,20 C19.363145,19.999541 19.9990717,19.3933502 20,18.6708333 L20,18.6708333 L20.0242814,17.01 C20.0242814,16.4521924 20.5009837,16 21,16 Z M12,2 C12.9203766,2 13.6664893,2.73996413 13.6664893,3.65275614 L13.6664893,3.65275614 L13.6664893,11.3803926 C13.6664893,11.4980811 13.7626875,11.5934865 13.8813539,11.5934865 L13.8813539,11.5934865 L16.1666531,11.5934865 C16.4931383,11.5936187 16.7894986,11.7827468 16.9249057,12.0773804 C17.0603128,12.3720139 17.0098431,12.7179212 16.7957764,12.9624016 L16.7957764,12.9624016 L12.6291234,17.7152475 C12.4709412,17.89611 12.2414099,18 12,18 C11.7585901,18 11.5290588,17.89611 11.3708766,17.7152475 L11.3708766,17.7152475 L7.20422356,12.9624016 C6.99015689,12.7179212 6.9396872,12.3720139 7.07509432,12.0773804 C7.21050145,11.7827468 7.50686165,11.5936187 7.83334692,11.5934865 L7.83334692,11.5934865 L10.1186461,11.5934865 C10.2373125,11.5934865 10.3335107,11.4980811 10.3335107,11.3803926 L10.3335107,11.3803926 L10.3335107,3.65275614 C10.3335107,2.73996413 11.0796234,2 12,2 Z"
}), 'Download');

exports["default"] = _default;