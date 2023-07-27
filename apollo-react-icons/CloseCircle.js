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
  d: "M4.92884133,4.93003344 C8.8339631,1.02504258 15.1660983,1.02307108 19.0736526,4.92562949 C22.9754491,8.83543465 22.9754491,15.1645654 19.0736526,19.0743705 C15.1660983,22.9769289 8.8339631,22.9749574 4.92884133,19.0699666 C1.02371956,15.1649758 1.02371956,8.83502431 4.92884133,4.93003344 Z M15.9222405,8.07512091 C15.5965776,7.74934015 15.0683871,7.7491535 14.7424939,8.07470403 L14.7424939,8.07470403 L12.148636,10.6676672 C12.1095179,10.7068709 12.0564028,10.7289035 12.0010113,10.7289035 C11.9456199,10.7289035 11.8925048,10.7068709 11.8533866,10.6676672 L11.8533866,10.6676672 L9.26036285,8.07470403 C8.93031374,7.77679792 8.42450562,7.79013469 8.11062527,8.10501945 C7.79674491,8.4199042 7.78519409,8.9255819 8.08436944,9.25446058 L8.08436944,9.25446058 L10.6782273,11.8474237 C10.717394,11.8863858 10.7394139,11.9393446 10.7394139,11.9945806 C10.7394139,12.0498167 10.717394,12.1027755 10.6782273,12.1417375 L10.6782273,12.1417375 L8.08436944,14.7338669 C7.92775627,14.8902521 7.83975725,15.1024602 7.83975725,15.3237452 C7.83975725,15.5450302 7.92775627,15.7572384 8.08436944,15.9136235 C8.41363173,16.2311693 8.93527075,16.2311693 9.26453304,15.9136235 L9.26453304,15.9136235 L11.8575568,13.3206603 C11.9394039,13.2399243 12.0709592,13.2399243 12.1528062,13.3206603 L12.1528062,13.3206603 L14.7466641,15.9136235 C15.0771955,16.2077504 15.5799777,16.1926257 15.892219,15.8791628 C16.2044604,15.5657 16.2174537,15.0630316 15.9218234,14.7338669 L15.9218234,14.7338669 L13.3279656,12.1417375 C13.2468448,12.0603907 13.2468448,11.9287706 13.3279656,11.8474237 L13.3279656,11.8474237 L15.9218234,9.25446058 C16.2477166,8.92891003 16.2479033,8.40090169 15.9222405,8.07512091 Z"
}), 'CloseCircle');

exports["default"] = _default;