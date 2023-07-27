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
  d: "M6.57093078,3.07852284 C8.21903693,2.79156817 9.89890287,3.30066531 11.1301942,4.44901222 L11.3114635,4.62603903 L12.0007077,5.27126587 L12.7124543,4.60204653 C13.9592371,3.35437565 15.70778,2.78877862 17.4247885,3.07775904 C19.1417969,3.36673945 20.6236652,4.47602954 21.4184328,6.06730271 C22.4400681,8.13136469 22.0906919,10.6229448 20.5668999,12.3048222 L12.5982748,20.7404296 C12.4413561,20.9063751 12.2258186,21 12.0007077,21 C11.8131153,21 11.632171,20.9349827 11.4862577,20.817277 L11.4031405,20.7404296 L3.59142926,12.4664449 C1.93339625,10.7876823 1.52526888,8.19754547 2.58298259,6.06644584 C3.36529585,4.46705448 4.85045779,3.35431447 6.57093078,3.07852284 Z M9.88161761,6.02444548 C9.14837642,5.27471929 8.13850473,4.91102893 7.12998301,5.01858783 L6.8874892,5.05331163 C5.81339762,5.22548839 4.87792541,5.92637988 4.37446414,6.95559929 C3.72628785,8.26155594 3.93629171,9.84066565 4.90251856,10.9397716 L5.04568433,11.0934401 L12.001,18.46 L18.9783701,11.0742537 C19.9918702,10.0512735 20.2802974,8.47955497 19.7156662,7.14926223 L19.6291877,6.96094809 C19.1181838,5.93782286 18.1756428,5.23225991 17.0928478,5.05002053 C16.0883593,4.8809605 15.0645297,5.17920425 14.2530265,5.89854708 L12.0037068,8.01367367 L10.633885,6.73133295 L9.88161761,6.02444548 Z"
}), 'HeartOutline');

exports["default"] = _default;