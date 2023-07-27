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
  d: "M7,3.00002777 L7,5.50002777 C7,6.00002777 7,7.00002777 8.5,7.00002777 L15.5,7.00002777 C17,7.00002777 17,6.00002777 17,5.50002777 L17,3.00002777 L18.3157895,3.00002777 C19.2459533,3.00002777 20,3.76753963 20,4.71431348 L20,20.2857421 C20,21.2325159 19.2459533,22.0000278 18.3157895,22.0000278 L5.68421053,22.0000278 C4.75404674,22.0000278 4,21.2325159 4,20.2857421 L4,4.71431348 C4,3.76753963 4.75404674,3.00002777 5.68421053,3.00002777 L7,3.00002777 Z M8.5,12.6666667 C8.22385763,12.6666667 8,12.8905243 8,13.1666667 L8,14.8333333 C8,15.1094757 8.22385763,15.3333333 8.5,15.3333333 L10.6666667,15.3333333 L10.6666667,17.5 C10.6666667,17.7761424 10.8905243,18 11.1666667,18 L12.8333333,18 C13.1094757,18 13.3333333,17.7761424 13.3333333,17.5 L13.3333333,15.3333333 L15.5,15.3333333 C15.7761424,15.3333333 16,15.1094757 16,14.8333333 L16,13.1666667 C16,12.8905243 15.7761424,12.6666667 15.5,12.6666667 L13.3333333,12.6666667 L13.3333333,10.5 C13.3333333,10.2238576 13.1094757,10 12.8333333,10 L11.1666667,10 C10.8905243,10 10.6666667,10.2238576 10.6666667,10.5 L10.6666667,12.6666667 L8.5,12.6666667 Z M7.99997462,5.50002777 L8.00005838,3.00002777 C8.50005838,3.00002777 8.00008756,3.00002777 10.0000584,3.00002777 C10,1.5 11,1 12,1 C13,1 14,1.5 14,3.00002777 C15.0000389,3.00002777 15.6667257,3.00002777 16.0000604,3.00002777 L16.0000604,5.50002777 C16.0000604,5.50002777 16.0000604,6.0000283 15.5,6.0000283 L8.5,6.0000283 C7.99997462,6.0000283 7.99997462,5.50002777 7.99997462,5.50002777 Z M12,2.00002777 C11.4477153,2.00002777 11,2.44774302 11,3.00002777 C11,3.55231252 11.4477153,4.00002777 12,4.00002777 C12.5522847,4.00002777 13,3.55231252 13,3.00002777 C13,2.44774302 12.5522847,2.00002777 12,2.00002777 Z"
}), 'MedicalForm');

exports["default"] = _default;