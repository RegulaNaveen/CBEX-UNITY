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
  d: "M11.7916667,4.46972737 C12.9443392,4.46434773 14.0935996,4.58230058 15.215,4.82107678 C15.47,4.86956449 16,5.23996246 16,5.41866091 L16,5.41866091 L16,12.9648404 C16,13.0875548 15.9328265,13.2024762 15.82,13.2721779 C14.2325,14.2531216 12.8333333,16.4088934 12.8333333,18.4573126 C12.8660706,19.2065536 12.2725034,19.8611445 11.4466667,19.9865404 C10.635,20.0872456 9.59666667,19.6396668 9.10666667,18.0731408 C8.93065553,16.962217 9.07997408,15.8294175 9.54,14.7856741 C9.5608191,14.7289242 9.55001105,14.6666813 9.51093073,14.6182659 C9.4718504,14.5698506 9.40922729,14.5411219 9.3425,14.5409976 L9.3425,14.5409976 L4.08333333,14.5409976 C2.9327401,14.5409976 2,13.7060481 2,12.6760857 C2.00168658,12.0045612 2.40656015,11.3857022 3.06,11.0558503 C2.81894716,10.6576916 2.76786495,10.1892318 2.9183545,9.75686141 C3.06884405,9.32449104 3.40813314,8.96490599 3.85916667,8.75977072 C3.40626153,7.93534524 3.7775858,6.9381639 4.6925,6.52187643 C4.56490456,6.28984476 4.49901942,6.03453048 4.5,5.77591167 C4.5,5.28805072 4.74333333,4.47047334 6.375,4.46972737 L6.375,4.46972737 Z M21.047619,4 C21.5736045,4 22,4.34305092 22,4.76622568 L22,4.76622568 L22,13.1947081 C22,13.6178829 21.5736045,13.9609338 21.047619,13.9609338 L21.047619,13.9609338 L17.952381,13.9609338 C17.4263955,13.9609338 17,13.6178829 17,13.2083317 L17,13.2083317 L17,4.76622568 C17,4.34305092 17.4263955,4 17.952381,4 L17.952381,4 Z M19.5,5.75 C19.0857864,5.75 18.75,6.08578644 18.75,6.5 C18.75,6.91421356 19.0857864,7.25 19.5,7.25 C19.9142136,7.25 20.25,6.91421356 20.25,6.5 C20.25,6.08578644 19.9142136,5.75 19.5,5.75 Z"
}), 'ThumbsDown');

exports["default"] = _default;