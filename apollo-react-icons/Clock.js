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
  d: "M12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 C17.5228475,22 22,17.5228475 22,12 C21.9940293,6.47962754 17.5203725,2.00597071 12,2 Z M16.3333333,16.3508333 C16.0192151,16.6832693 15.4978618,16.7061454 15.1558333,16.4025 L11.0233333,12.6141667 C10.850027,12.4569056 10.7508324,12.2340202 10.75,12 L10.75,7.41666667 C10.75,6.95642938 11.123096,6.58333333 11.5833333,6.58333333 C12.0435706,6.58333333 12.4166667,6.95642938 12.4166667,7.41666667 L12.4166667,11.6333333 L16.2783333,15.1733333 C16.4420703,15.3221859 16.5398805,15.5300501 16.5501979,15.751094 C16.5605154,15.972138 16.4824929,16.1882093 16.3333333,16.3516667 L16.3333333,16.3508333 Z"
}), 'Clock');

exports["default"] = _default;