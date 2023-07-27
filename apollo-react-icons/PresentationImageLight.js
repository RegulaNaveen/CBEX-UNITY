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
  d: "M22,3.5 C22,5 21,5 21,5 L21,17 C21.5,17 22,17.5 22,18 C22,18.5 21.5,19 21,19 L12.8316501,19.024843 C12.7763185,19.0246156 12.7231889,19.0469636 12.6840633,19.0869227 C12.6449377,19.1268818 12.6230558,19.1811433 12.6232785,19.2376535 L12.6232785,19.5049436 C12.6245023,19.5730295 12.6576819,19.6363688 12.7124615,19.675192 C13.1608092,19.9939529 13.3546008,20.5730997 13.191042,21.1054309 C13.0274831,21.637762 12.5444508,22 11.9981637,22 C11.4518767,22 10.9688444,21.637762 10.8052855,21.1054309 C10.6417266,20.5730997 10.8355183,19.9939529 11.2838659,19.675192 C11.3386455,19.6363688 11.3718252,19.5730295 11.373049,19.5049436 L11.373049,19.2376535 C11.3732716,19.1811433 11.3513898,19.1268818 11.3122641,19.0869227 C11.2731385,19.0469636 11.2200089,19.0246156 11.1646774,19.024843 L3,19 C2.5,19 2,18.5 2,18 C2,17.5 2.5,17 3,17 L3,5 C3,5 2,5 2,3.5 C2,2.13043478 2.83364839,2.01134215 2.97863072,2.00098627 L21.0213693,2.00098627 C21.1663516,2.01134215 22,2.13043478 22,3.5 Z M20,5 L4,5 L4,17 L20,17 L20,5 Z M14.9180576,9.00019402 C15.3913778,9.0081781 15.7949961,9.26123281 15.8921307,9.61090417 L15.8921307,9.61090417 L18.958133,15.3960425 C19.0301551,15.5316597 19.0083192,15.6854066 18.8998484,15.8064257 C18.7913776,15.9274449 18.610407,16 18.4167993,16 L18.4167993,16 L5.58345623,16 C5.3733358,16 5.17942819,15.914787 5.07583009,15.7768357 C4.97223198,15.6388845 4.97495394,15.469548 5.08295585,15.3335337 L5.08295585,15.3335337 L7.98329138,11.6895393 C8.19964821,11.3763622 8.61461043,11.1694381 9.08121872,11.1420492 C9.54782702,11.1146602 10.0001989,11.2706738 10.2781264,11.5548374 L10.2781264,11.5548374 L11.5521274,12.711689 C11.6162412,12.7700466 11.715638,12.7993999 11.8152103,12.7893812 C11.9147826,12.7793624 12.0005155,12.7313818 12.0421278,12.6623863 L12.0421278,12.6623863 L13.9087959,9.5774488 C14.0265383,9.23140204 14.4447375,8.99220994 14.9180576,9.00019402 Z M7.5,6 C8.32842712,6 9,6.67157288 9,7.5 C9,8.32842712 8.32842712,9 7.5,9 C6.67157288,9 6,8.32842712 6,7.5 C6,6.67157288 6.67157288,6 7.5,6 Z"
}), 'PresentationImageLight');

exports["default"] = _default;