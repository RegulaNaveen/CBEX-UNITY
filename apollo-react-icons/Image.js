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
  d: "M19,2 C20.5,2 22,3.5 22,5 L22,5 L22,19 C22,20.5 20.5,22 19,22 L19,22 L5,22 C3.5,22 2,20.5 2,19 L2,19 L2,5 C2,3.5 3.5,2 5,2 L5,2 Z M19,4 L5,4 C4.53976271,4 4,4.53976271 4,5 L4,5 L4,19 C4,19.4602373 4.53976271,20 5,20 L5,20 L19,20 C19.4602373,20 20,19.4602373 20,19 L20,19 L20,5 C20,4.53976271 19.4602373,4 19,4 L19,4 Z M14.9180576,10.0002217 C15.3913778,10.0093464 15.7949961,10.2985518 15.8921307,10.6981762 L15.8921307,10.6981762 L18.958133,17.3097628 C19.0301551,17.4647539 19.0083192,17.6404646 18.8998484,17.7787723 C18.7913776,17.9170799 18.610407,18 18.4167993,18 L18.4167993,18 L5.58345623,18 C5.3733358,18 5.17942819,17.9026137 5.07583009,17.7449551 C4.97223198,17.5872966 4.97495394,17.3937692 5.08295585,17.2383243 L5.08295585,17.2383243 L7.98329138,13.0737592 C8.19964821,12.7158426 8.61461043,12.4793578 9.08121872,12.4480562 C9.54782702,12.4167546 10.0001989,12.5950558 10.2781264,12.9198142 L10.2781264,12.9198142 L11.5521274,14.2419303 C11.6162412,14.3086246 11.715638,14.3421713 11.8152103,14.3307213 C11.9147826,14.3192714 12.0005155,14.2644364 12.0421278,14.1855844 L12.0421278,14.1855844 L13.9087959,10.6599415 C14.0265383,10.2644595 14.4447375,9.99109707 14.9180576,10.0002217 Z M8,6 C9.1045695,6 10,6.8954305 10,8 C10,9.1045695 9.1045695,10 8,10 C6.8954305,10 6,9.1045695 6,8 C6,6.8954305 6.8954305,6 8,6 Z"
}), 'Image');

exports["default"] = _default;