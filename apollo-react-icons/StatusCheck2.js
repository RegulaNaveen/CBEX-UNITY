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
  d: "M12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 Z M12,3.5 C7.30557963,3.5 3.5,7.30557963 3.5,12 C3.5,16.6944204 7.30557963,20.5 12,20.5 C16.6944204,20.5 20.5,16.6944204 20.5,12 C20.5,7.30557963 16.6944204,3.5 12,3.5 Z M16.9126177,7.48003127 C17.2180848,7.50907699 17.4828767,7.70364148 17.6018634,7.98647701 C17.7208501,8.26931254 17.6747789,8.59465473 17.4819414,8.83333333 L11.7777747,16.5741667 C11.6417361,16.754658 11.4388816,16.8729209 11.214793,16.9023815 C10.9907043,16.9318421 10.7641756,16.8700296 10.5861081,16.7308333 L6.51277474,13.4741667 C6.15332942,13.1865184 6.09512644,12.6619453 6.38277474,12.3025 C6.67042305,11.9430547 7.19499608,11.8848517 7.55444141,12.1725 L10.9511081,14.89 L16.1402747,7.8475 C16.3104347,7.59215835 16.6071506,7.45098554 16.9126177,7.48003127 Z"
}), 'StatusCheck2');

exports["default"] = _default;