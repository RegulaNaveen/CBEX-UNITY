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
  d: "M15.75,13.3333333 C19.2002566,13.3370077 21.9963256,16.1330768 22,19.5833333 C22,19.813452 21.813452,20 21.5833333,20 L21.5833333,20 L16.1666667,20 C15.936548,20 15.75,19.813452 15.75,19.5833333 C15.7493943,17.6235423 14.9780446,15.7426103 13.6025,14.3466667 C13.5025059,14.2439226 13.4623581,14.0969859 13.4962138,13.9576699 C13.5300694,13.8183539 13.6331726,13.7062291 13.7691667,13.6608333 C14.4071208,13.4441924 15.0762651,13.3335597 15.75,13.3333333 Z M8.25,13.3333333 C11.7017797,13.3333333 14.5,16.1315536 14.5,19.5833333 C14.5,19.813452 14.313452,20 14.0833333,20 L14.0833333,20 L2.41666667,20 C2.18654802,20 2,19.813452 2,19.5833333 C2,16.1315536 4.79822031,13.3333333 8.25,13.3333333 Z M15.75,5 C17.9361271,5 19.7083333,6.77220622 19.7083333,8.95833333 C19.7083333,11.1444604 17.9361271,12.9166667 15.75,12.9166667 C14.7135948,12.9131778 13.7208229,12.4990484 12.9891667,11.765 C12.8598498,11.6391741 12.8262122,11.4444119 12.9058333,11.2825 C13.2692121,10.5616415 13.4584466,9.76560097 13.4583333,8.95833333 C13.4571545,8.15073063 13.2664887,7.35467231 12.9016667,6.63416667 C12.8220455,6.47225474 12.8556832,6.27749258 12.985,6.15166667 C13.7176774,5.41660007 14.7121497,5.00238648 15.75,5 Z M8.25,5 C10.4361271,5 12.2083333,6.7722062 12.2083333,8.95833333 C12.2083333,11.1444605 10.4361271,12.9166667 8.25,12.9166667 C6.06387286,12.9166667 4.29166667,11.1444605 4.29166667,8.95833333 C4.29166667,6.7722062 6.06387286,5 8.25,5 Z"
}), 'User2');

exports["default"] = _default;