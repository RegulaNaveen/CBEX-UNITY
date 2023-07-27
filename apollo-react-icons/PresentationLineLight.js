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
  d: "M22,3.5 C22,5 21,5 21,5 L21,17 C21.5,17 22,17.5 22,18 C22,18.5 21.5,19 21,19 L12.8316501,19.024843 C12.7763185,19.0246156 12.7231889,19.0469636 12.6840633,19.0869227 C12.6449377,19.1268818 12.6230558,19.1811433 12.6232785,19.2376535 L12.6232785,19.5049436 C12.6245023,19.5730295 12.6576819,19.6363688 12.7124615,19.675192 C13.1608092,19.9939529 13.3546008,20.5730997 13.191042,21.1054309 C13.0274831,21.637762 12.5444508,22 11.9981637,22 C11.4518767,22 10.9688444,21.637762 10.8052855,21.1054309 C10.6417266,20.5730997 10.8355183,19.9939529 11.2838659,19.675192 C11.3386455,19.6363688 11.3718252,19.5730295 11.373049,19.5049436 L11.373049,19.2376535 C11.3732716,19.1811433 11.3513898,19.1268818 11.3122641,19.0869227 C11.2731385,19.0469636 11.2200089,19.0246156 11.1646774,19.024843 L3,19 C2.5,19 2,18.5 2,18 C2,17.5 2.5,17 3,17 L3,5 C3,5 2,5 2,3.5 C2,2.13043478 2.83364839,2.01134215 2.97863072,2.00098627 L21.0213693,2.00098627 C21.1663516,2.01134215 22,2.13043478 22,3.5 Z M20,5 L4,5 L4,17 L20,17 L20,5 Z M15.7001611,6.57468974 L13.1558398,10.2995306 C13.0624933,10.4405424 12.8808462,10.4804515 12.7395651,10.3913213 L10.8272244,9.18473895 C10.2633614,8.83087907 9.53424999,8.99184541 9.15455702,9.55722304 L6.23306557,13.897993 C5.82940526,14.4979584 5.96311774,15.3280658 6.53328792,15.7537619 C7.10093522,16.179458 7.88807281,16.0397765 8.29173312,15.4384807 L10.363015,12.3495234 C10.4601458,12.2098419 10.6443158,12.1686026 10.7830741,12.259063 L12.6865847,13.455003 C13.1798071,13.7702841 13.8155721,13.6904661 14.2255396,13.2621094 C14.2734742,13.2088974 14.3176246,13.1556854 14.3567292,13.0958219 L17.7474757,8.1284805 C18.0224693,7.74269341 18.0767112,7.23185809 17.8912797,6.79152869 C17.7058483,6.35119928 17.311018,6.05188171 16.8569002,6.0066515 C16.8177956,6.0026606 16.7774296,6 16.738325,6 C16.3245732,6 15.9360501,6.21284805 15.7001611,6.57468974 Z"
}), 'PresentationLineLight');

exports["default"] = _default;