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
  d: "M21.5266667,10.77 C19.3225,8.345 15.6666667,5.78166667 12,5.83333333 C8.33333333,5.78083333 4.6775,8.34583333 2.47333333,10.77 C1.84775789,11.4694146 1.84775789,12.5272521 2.47333333,13.2266667 C4.65166667,15.6258333 8.25583333,18.1666667 11.8658333,18.1666667 L12.1225,18.1666667 C15.745,18.1666667 19.3483333,15.6258333 21.5291667,13.2258333 C22.1539135,12.5260557 22.152837,11.4685042 21.5266667,10.77 Z M12,8.16666667 C14.1170915,8.16666667 15.8333333,9.88290846 15.8333333,12 C15.8333333,14.1170915 14.1170915,15.8333333 12,15.8333333 C9.88290846,15.8333333 8.16666667,14.1170915 8.16666667,12 C8.16666667,9.88290846 9.88290846,8.16666667 12,8.16666667 Z M12,10.3333333 C11.0795254,10.3333333 10.3333333,11.0795254 10.3333333,12 C10.3333333,12.9204746 11.0795254,13.6666667 12,13.6666667 C12.9204746,13.6666667 13.6666667,12.9204746 13.6666667,12 C13.6666667,11.0795254 12.9204746,10.3333333 12,10.3333333 Z"
}), 'EyeShow');

exports["default"] = _default;