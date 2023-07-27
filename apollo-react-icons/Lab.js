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
  d: "M7.55846087,2 L16.4469654,2 C16.9384997,2 17.3358158,2.37248448 17.3358158,2.83329861 C17.3358158,3.29411275 16.9384997,3.66659723 16.4469654,3.66659723 L16.0025401,3.66659723 C15.7581063,3.66659723 15.5581149,3.85325611 15.5581149,4.08324653 L15.5581149,11.543769 C15.5581149,11.6929295 15.6007797,11.83959 15.6807763,11.967918 L19.557942,18.1201617 C20.098363,18.8867964 20.1472498,19.8700887 19.6850476,20.680055 C19.2210676,21.4900212 18.3131588,21.9966668 17.3327568,22 L6.66655135,22 C5.6737054,21.9966668 4.75858195,21.4783551 4.30082396,20.6517228 C3.84217713,19.8250906 3.91239632,18.8292988 4.48126061,18.0668305 L8.3237611,11.967918 C8.4046465,11.83959 8.44731132,11.6937628 8.44731132,11.5446023 L8.44731132,4.08324653 C8.44731132,3.85325611 8.24820882,3.66659723 8.00288609,3.66659723 L7.55846087,3.66659723 C7.06781542,3.66659723 6.66961042,3.29411275 6.66961042,2.83329861 C6.66961042,2.37248448 7.06781542,2 7.55846087,2 Z M8.66419083,14.7044706 C8.58330544,14.8336319 8.58152773,14.992792 8.65974657,15.1219533 C8.73885426,15.2519478 8.88729229,15.3319445 9.04550767,15.3327778 C12.8817862,15.3333333 14.8532565,15.3333333 14.9599186,15.3327778 C15.1199117,15.3319445 15.266572,15.2519478 15.3456797,15.1219533 C15.4238985,14.992792 15.4238985,14.8336319 15.3421243,14.7044706 L13.9039642,12.4237323 C13.8230788,12.2945711 13.780414,12.1487438 13.780414,11.9995834 L13.780414,4.08324653 C13.780414,3.85325611 13.5822004,3.66659723 13.3359888,3.66659723 L10.6694374,3.66659723 C10.4241147,3.66659723 10.2250122,3.85325611 10.2250122,4.08324653 L10.2250122,11.9995834 C10.2241234,12.1487438 10.1814585,12.2945711 10.101462,12.4237323 L8.66419083,14.7044706 Z"
}), 'Lab');

exports["default"] = _default;