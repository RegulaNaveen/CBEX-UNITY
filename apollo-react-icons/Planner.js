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
  d: "M18,2 C19,2 20.0000403,3 20.0000403,4 L20.0000403,6 L20.0000403,6 C19.5,6 19,6 18.5,6.5 C13.2134658,12.02636 10.5467992,14.8596933 10.5,15 C10.4391388,15.1824655 8.6046567,19.5585071 9.09521857,20.3936087 C9.17048258,20.5217334 9.48042316,20.8248077 9.61355923,20.8866871 C10.4710682,21.285243 14.8761763,19.1392116 15,19 L19.9987255,13.5295542 L20.0000403,20 C20.0000403,21 19,22 18,22 L6,22 C5,22 4,21 4,20 L4,18 L6,18 L6,17 L3,17 C2.5,17 2,16.5 2,16 C2,15.5 2.5,15 3,15 L4,15 L4,13 L6,13 L6,12 L3,12 C2.5,12 2,11.5 2,11 C2,10.5 2.5,10 3,10 L4,10 L4,8 L6,8 L6,7 L3,7 C2.5,7 2,6.5 2,6 C2,5.5 2.5,5 3,5 L4,5 L4,4 C4,3 5,2 6,2 C13.4918324,2.01847143 17.2146284,2 18,2 Z M11.3036577,15.8643179 L13.9624057,18.5230658 C13.9562567,18.5260612 13.9500469,18.5289179 13.9437811,18.5316348 L10.6412862,19.9638466 C10.4670609,20.0387997 10.2694757,19.9952459 10.1371034,19.851417 C10.0057044,19.7086009 9.96385135,19.4948833 10.0329575,19.3064877 L11.3036577,15.8643179 Z M16.9944256,9.55508575 L19.7425756,12.3032357 L15.0027123,17.4420522 L12.254249,14.6935889 L16.9944256,9.55508575 Z M20.1321875,7 C20.6091172,7 21.0860469,7.19548577 21.4529908,7.58544444 C21.8043615,7.96426142 22,8.47981716 22,9.0156305 C22,9.55448247 21.8043615,10.0700382 21.4529908,10.4488552 L20.7604007,11.1997405 L18.012318,8.45165781 L18.8113842,7.58544444 C19.1783281,7.19548577 19.6552578,7 20.1321875,7 Z"
}), 'Planner');

exports["default"] = _default;