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
  d: "M12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 C17.5228475,22 22,17.5228475 22,12 C21.993571,6.47981766 17.5201823,2.00642897 12,2 Z M17.7725,8.83333333 L12.0683333,16.5741667 C11.9322947,16.754658 11.7294402,16.8729209 11.5053516,16.9023815 C11.2812629,16.9318421 11.0547342,16.8700296 10.8766667,16.7308333 L6.80333333,13.4741667 C6.44388801,13.1865184 6.38568503,12.6619453 6.67333333,12.3025 C6.96098164,11.9430547 7.48555468,11.8848517 7.845,12.1725 L11.2416667,14.89 L16.4308333,7.8475 C16.6009933,7.59215835 16.8977092,7.45098554 17.2031763,7.48003127 C17.5086433,7.50907699 17.7734353,7.70364148 17.892422,7.98647701 C18.0114087,8.26931254 17.9653375,8.59465473 17.7725,8.83333333 Z"
}), 'StatusCheck');

exports["default"] = _default;