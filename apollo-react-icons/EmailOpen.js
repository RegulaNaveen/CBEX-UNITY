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
  d: "M7.00000163,5 L7.00000163,13 C7.00000163,13 3.00000163,9 3.00000163,9 L5.50000163,7 L5.50000163,5.5 C5.50000163,4.6598721 6.44781587,3.66666669 7.17447507,3.66666669 L9.65929907,3.66666669 L11.3848966,2.30450544 C11.7870413,1.89849819 12.4377998,1.89849819 12.8399445,2.30450544 L14.5994191,3.66666669 L17.0504921,3.66666669 C17.9217644,3.66666669 18.5000016,4.65945543 18.5000016,5.5 L18.5000016,7 L21.0000016,9 L17.0000016,13 L17.0000016,5 L7.00000163,5 Z M2.25833662,10.0455691 L10.3775034,18.2907336 C11.2723512,19.1987738 12.7226557,19.1987738 13.6175035,18.2907336 L21.7400036,10.0455691 C21.7837199,10.0010654 21.8496883,9.98800463 21.9066703,10.0125716 C21.9633383,10.0362961 22.0002296,10.0924803 22.0000016,10.154715 L22.0000016,20.3078164 C22.0000016,21.2423836 21.2538115,22 20.3333369,22 L3.66666998,22 C2.74619538,22 2.00000163,21.2423836 2.00000163,20.3078164 L2.00000163,10.154715 C1.99972036,10.0929575 2.035805,10.0370027 2.09166995,10.0125716 C2.14860008,9.98751189 2.21485071,10.0006286 2.25833662,10.0455691 Z M13.5,13 C13.7761424,13 14,13.2238576 14,13.5 C14,13.7761424 13.7761424,14 13.5,14 L9.5,14 C9.22385763,14 9,13.7761424 9,13.5 C9,13.2238576 9.22385763,13 9.5,13 L13.5,13 Z M14.5,10 C14.7761424,10 15,10.2238576 15,10.5 C15,10.7761424 14.7761424,11 14.5,11 L9.5,11 C9.22385763,11 9,10.7761424 9,10.5 C9,10.2238576 9.22385763,10 9.5,10 L14.5,10 Z M13.5,7 C13.7761424,7 14,7.22385763 14,7.5 C14,7.77614237 13.7761424,8 13.5,8 L9.5,8 C9.22385763,8 9,7.77614237 9,7.5 C9,7.22385763 9.22385763,7 9.5,7 L13.5,7 Z"
}), 'EmailOpen');

exports["default"] = _default;