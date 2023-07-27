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
  d: "M12.3579906,3.00835085 C16.0263946,3.15454628 19.2409784,5.51650453 20.4882006,8.9821308 C20.521436,9.07583808 20.6162294,9.13271232 20.7142019,9.11772732 L22.1227489,8.90931045 C22.2799953,8.88944802 22.4353917,8.95794488 22.5272162,9.08759476 C22.6175055,9.22011241 22.6243095,9.39278968 22.5447292,9.53205001 L20.3105685,13.4660231 C20.246124,13.57895 20.1330057,13.655361 20.0045077,13.6727659 L19.9486328,13.6727659 L19.9486328,13.6727659 C19.8385461,13.6725212 19.7330226,13.6285922 19.6550813,13.5505616 L16.5110776,10.4151014 C16.3992938,10.3034781 16.3598079,10.1381142 16.4090365,9.98776111 C16.458265,9.83740802 16.5877862,9.72778754 16.7437506,9.70447521 L18.1739804,9.49103625 C18.2385534,9.48126316 18.2948825,9.44180307 18.3262905,9.38433869 C18.3576985,9.3268743 18.3605864,9.25799032 18.3340994,9.19808081 C16.9590651,6.07347243 13.5163863,4.42527252 10.231616,5.31897589 C6.94684576,6.21267926 4.8048671,9.38032399 5.19038293,12.7741554 C5.57589875,16.1679869 8.37331863,18.7704218 11.7742234,18.899091 C14.0541386,18.989017 16.2291673,17.9343792 17.5760359,16.0858817 C17.9283509,15.6579396 18.5523346,15.5806645 18.9977246,15.9098176 C19.4431147,16.2389708 19.5548406,16.8599516 19.2522819,17.3246647 C17.5633163,19.6347714 14.8792682,20.9995958 12.0244093,21 L11.8585569,20.999163 L11.8585569,20.999163 L11.690828,20.9933039 C8.47599013,20.8942859 5.56030182,19.0745042 4.04997922,16.2243863 C2.53965662,13.3742685 2.66612639,9.93053787 4.38140573,7.19975064 C6.04623568,4.54928069 8.96019139,2.96461933 12.0682617,3.00059988 L12.3579906,3.00835085 Z"
}), 'Refresh');

exports["default"] = _default;