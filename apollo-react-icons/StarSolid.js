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
  d: "M21.920037,9.21793946 C21.7322716,8.71782485 21.2514021,8.38553732 20.7131368,8.38395472 L15.4881003,8.38395472 C15.3058779,8.38408488 15.1434367,8.27012641 15.0829389,8.0997191 L13.2073508,2.82944614 C13.0192192,2.33061993 12.538487,2 12.0013091,2 C11.4641311,2 10.9833989,2.33061993 10.7952673,2.82944614 L10.7909753,2.84306222 L8.91967916,8.0997191 C8.85928606,8.26983184 8.69728343,8.38372394 8.51537619,8.38395472 L3.28862287,8.38395472 C2.74667143,8.38355073 2.2624789,8.71962373 2.07744042,9.22462387 C1.89240193,9.729624 2.04613299,10.2954341 2.46199067,10.6399685 L6.91189857,14.2992894 C7.04813642,14.4113742 7.10097607,14.5948903 7.04494944,14.761385 L5.17537008,20.3192976 C4.9980752,20.8466058 5.18533328,21.4270381 5.63838329,21.7544709 C6.09143329,22.0819038 6.70612136,22.0810621 7.15825728,21.7523897 L11.7472248,18.4164508 C11.8982327,18.3067685 12.103527,18.3067685 12.2545349,18.4164508 L16.8417856,21.7515387 C17.2937483,22.0813448 17.9091178,22.0829563 18.3628316,21.755522 C18.8165454,21.4280876 19.004087,20.8470344 18.8263896,20.3192976 L16.9568103,14.757981 C16.9007836,14.5914863 16.9536233,14.4079702 17.0898611,14.2958853 L21.548353,10.6314585 C21.9588083,10.2840703 22.1071894,9.71977497 21.920037,9.21793946 Z"
}), 'StarSolid');

exports["default"] = _default;