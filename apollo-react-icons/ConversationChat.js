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
  d: "M16.5,11 C19.5330146,11 22,13.1580457 22,15.811597 C21.9860989,16.9301545 21.5611213,17.9994072 20.8145112,18.7943118 L20.8145112,18.7943118 L21.5658774,21.4346614 C21.6130853,21.6022483 21.5617174,21.7834019 21.4350089,21.8961803 C21.3083005,22.0089587 21.1302837,22.0319719 20.9814815,21.9548102 L20.9814815,21.9548102 L18.0595021,20.4163666 C14.4045234,21.3756936 11,18.9104872 11,15.811597 C11,13.1580457 13.4669854,11 16.5,11 Z M12,2 C17.5141667,2 22,5.50637733 22,9.8162669 C21.9978322,10.3675599 21.9202543,10.9163135 21.7691667,11.4490851 C21.7504249,11.5153489 21.6960312,11.567554 21.6258333,11.5866514 C21.5558718,11.606391 21.479997,11.5897159 21.4266667,11.5428803 C15,7 8.5,12 10.2175,17.1948228 C10.2400665,17.2630784 10.2384892,17.3371081 10.191548,17.3940191 C10.1446068,17.4509301 10.0682171,17.4791727 9.9925,17.4676106 C9.40103922,17.3766575 8.81832958,17.2412606 8.25,17.0627279 L8.25,17.0627279 L3.69,18.9667706 C3.5414086,19.028228 3.36828689,19.0031102 3.24643744,18.9024151 C3.12458799,18.80172 3.07621542,18.6437973 3.1225,18.4977945 L3.1225,18.4977945 L4.305,14.7999187 C2.85909883,13.4933208 2.02932605,11.699265 2,9.8162669 C2,5.50637733 6.48583333,2 12,2 Z"
}), 'ConversationChat');

exports["default"] = _default;