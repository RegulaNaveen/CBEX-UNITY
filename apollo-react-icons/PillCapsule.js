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
  d: "M20.3335752,3.66642477 C22.5554749,5.88832447 22.5554749,9.49073564 20.3335752,11.7126353 L11.7126353,20.3335752 C9.49073564,22.5554749 5.88832447,22.5554749 3.66642477,20.3335752 C1.44452508,18.1116755 1.44452508,14.5092644 3.66642477,12.2873647 L12.2873647,3.66642477 C14.5092644,1.44452508 18.1116755,1.44452508 20.3335752,3.66642477 Z M9.26737967,9.36847995 L4.77761651,13.8582431 C3.29635005,15.3395096 3.29635005,17.741117 4.77761651,19.2223835 C6.25888298,20.7036499 8.66049043,20.7036499 10.1417569,19.2223835 L10.1417569,19.2223835 L14.63152,14.7326203 L9.26737967,9.36847995 Z"
}), 'PillCapsule');

exports["default"] = _default;