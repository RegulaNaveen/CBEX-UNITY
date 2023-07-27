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
  d: "M4.16784886,14.9933837 L11.4897123,7.20501893 C11.623731,7.07404989 11.8089989,7 12.002656,7 C12.196313,7 12.3815809,7.07404989 12.5155997,7.20501893 L19.8341301,14.9933837 C19.9523922,15.1182137 20.0115655,15.2826396 19.9981227,15.4490726 C19.9846799,15.6155057 19.8997703,15.7697167 19.7628046,15.8764523 L18.5296066,16.8488269 C18.2434863,17.0748209 17.8167567,17.0439606 17.5710451,16.7795054 L12.1283089,10.8759361 C12.0966507,10.8414676 12.0505259,10.8216428 12.0019894,10.8216428 C11.9534528,10.8216428 11.9073281,10.8414676 11.8756699,10.8759361 L6.43093391,16.7801299 C6.31274047,16.9066473 6.1459942,16.984309 5.96698481,16.9962132 C5.78766808,17.011191 5.60950907,16.9575804 5.473039,16.8475779 L4.23917436,15.8764523 C4.10142084,15.7699061 4.01577169,15.615506 4.00186707,15.4486574 C3.98838265,15.282016 4.04836984,15.1174763 4.16784886,14.9933837 Z"
}), 'ChevronUp');

exports["default"] = _default;