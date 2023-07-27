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
  d: "M11.7916667,19.5302726 C12.9443392,19.5356523 14.0935996,19.4176994 15.215,19.1789232 C15.4468182,19.1348435 15.9059091,18.8247222 15.9874643,18.634442 L16,18.5813391 L16,11.0351596 C16,10.9124452 15.9328265,10.7975238 15.82,10.7278221 C14.2325,9.74687841 12.8333333,7.59110661 12.8333333,5.54268738 C12.8660706,4.79344644 12.2725034,4.13885545 11.4466667,4.01345961 C10.635,3.91275437 9.59666667,4.36033323 9.10666667,5.92685923 C8.93065553,7.03778305 9.07997408,8.17058247 9.54,9.21432593 C9.5608191,9.2710758 9.55001105,9.3333187 9.51093073,9.38173407 C9.48487718,9.41401098 9.44836017,9.43753822 9.40713928,9.44967357 L9.3425,9.45900238 L4.08333333,9.45900238 C2.9327401,9.45900238 2,10.2939519 2,11.3239143 C2.00168658,11.9954388 2.40656015,12.6142978 3.06,12.9441497 C2.81894716,13.3423084 2.76786495,13.8107682 2.9183545,14.2431386 C3.06884405,14.675509 3.40813314,15.035094 3.85916667,15.2402293 C3.40626153,16.0646548 3.7775858,17.0618361 4.6925,17.4781236 C4.56490456,17.7101552 4.49901942,17.9654695 4.5,18.2240883 C4.5,18.6916217 4.72347801,19.4619676 6.17818974,19.526008 L6.375,19.5302726 L11.7916667,19.5302726 Z M21.047619,20 C21.5331441,20 21.9338114,19.7076963 21.9925796,19.329888 L22,19.2337743 L22,10.8052919 C22,10.414669 21.6366808,10.0923173 21.1670837,10.0450362 L21.047619,10.0390662 L17.952381,10.0390662 C17.4668559,10.0390662 17.0661886,10.3313699 17.0074204,10.6984628 L17,10.7916683 L17,19.2337743 C17,19.6243972 17.3633192,19.9467488 17.8329163,19.99403 L17.952381,20 L21.047619,20 Z M19.5,18.25 C19.0857864,18.25 18.75,17.9142136 18.75,17.5 C18.75,17.0857864 19.0857864,16.75 19.5,16.75 C19.9142136,16.75 20.25,17.0857864 20.25,17.5 C20.25,17.9142136 19.9142136,18.25 19.5,18.25 Z"
}), 'ThumbsUp');

exports["default"] = _default;