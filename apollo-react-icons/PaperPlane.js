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
  d: "M21.6795676,2.18607636 C21.407952,1.9726761 21.0358829,1.9399811 20.7312128,2.10274114 L2.6916385,11.7037914 C2.24810794,11.9358041 1.9789653,12.4035779 2.001289,12.9036288 C2.0236127,13.4036797 2.33336713,13.8456099 2.79580752,14.0371775 L5.50753546,15.1872035 C5.50752756,15.2568256 5.5196537,15.3259164 5.5433696,15.3913748 L7.62675002,21.0131685 C7.84862434,21.6091169 8.41921672,22.0029388 9.05511563,21.999053 C9.43059439,21.9957448 9.79190903,21.85525 10.0709719,21.6040151 C10.1034726,21.5748478 12.3960245,19.0389572 12.9043693,18.4756111 C12.9638408,18.4097211 13.0586355,18.3889533 13.1402079,18.4239433 L15.7711007,19.5398018 C16.1189419,19.6869459 16.5130268,19.678761 16.8544585,19.5173013 C17.1935112,19.3571324 17.4470875,19.0586108 17.5503076,18.6981161 L21.9704075,3.08192993 C22.0643034,2.75195958 21.9493798,2.39796845 21.6795676,2.18607636 Z M6.86756619,15.370541 L14.9444154,8.65122245 C14.9821257,8.61297887 15.0343699,8.59265466 15.0880105,8.59536056 C15.1416511,8.59806647 15.1915848,8.62354506 15.2252551,8.66538944 C15.267618,8.69769428 15.2937505,8.74689688 15.2967944,8.80008485 C15.2998383,8.85327282 15.2794897,8.90513549 15.2410887,8.94206236 L9.20928578,16.3213958 C9.14024729,16.4054104 9.09505892,16.5064366 9.07844949,16.6139024 L8.55093757,19.9056434 L6.86756619,15.370541 Z"
}), 'PaperPlane');

exports["default"] = _default;