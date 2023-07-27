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

var _default = (0, _createSvgIcon["default"])( /*#__PURE__*/React.createElement("g", {
  fillRule: "evenodd"
}, /*#__PURE__*/React.createElement("path", {
  fillRule: "nonzero",
  d: "M22,3 L22,18 C22,19 21,19 21,19 L14,19 C13.5357143,19 13.502551,19 13.5001822,19.400328 L13.5,19.5 C13.5,20 13.5256584,20.3418861 14,20.5 C15.5,21 17,21 17,21 C17.5,21 17.5,22 17,22 L7,22 C6.53125,22 6.50195312,21.1210937 6.91210938,21.0112305 L7,21 C7,21 8.5,21 10,20.5 C10.4743416,20.3418861 10.5,20 10.5,19.5 C10.5,19.0357143 10.5,19.002551 10.099672,19.0001822 L3,19 C2.05555556,19 2.00308642,18.1080247 2.00017147,18.0089163 L2,3 C2,3 2,2 3,2 L21,2 C21,2 22,2 22,3 Z M19.509838,4.00028935 L4.5,4 C4.04166667,4 4.00347222,4.42013889 4.00028935,4.49016204 L4,15.5 C4,15.5 4,16 4.5,16 L19.5,16 C20,16 20,15.5 20,15.5 L20,4.5 C20,4.04166667 19.5798611,4.00347222 19.509838,4.00028935 Z"
}), /*#__PURE__*/React.createElement("path", {
  fillRule: "nonzero",
  d: "M11.9914571,11.0002345 C14.060855,10.9797131 15.8926777,12.3080123 16.477907,14.2534684 C16.5278563,14.4261117 16.492049,14.6117259 16.3812364,14.7545806 C16.2697868,14.8994855 16.0946705,14.9838148 15.9095302,14.9817362 L15.9095302,14.9817362 L8.07920754,15 C7.89624948,14.9990299 7.72439293,14.9138478 7.61516683,14.7699945 C7.50594074,14.6261411 7.47204487,14.4403424 7.52364247,14.2683077 C8.11807287,12.3349056 9.93112992,11.0087084 11.9914571,11.0002345 Z M12,5 C13.3807119,5 14.5,6.11928813 14.5,7.5 C14.5,8.88071187 13.3807119,10 12,10 C10.6192881,10 9.5,8.88071187 9.5,7.5 C9.5,6.11928813 10.6192881,5 12,5 Z"
})), 'Remote');

exports["default"] = _default;