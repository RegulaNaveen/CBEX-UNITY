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
  d: "M21.4941465,10.7793271 L13.2202413,2.50542194 C12.5461419,1.83152602 11.4534266,1.83152602 10.7793271,2.50542194 L2.50542194,10.7801902 C1.83152602,11.4542897 1.83152602,12.547005 2.50542194,13.2211044 L10.7793271,21.4941465 C11.4534266,22.1680424 12.5461419,22.1680424 13.2202413,21.4941465 L21.4941465,13.2211044 C21.818032,12.8973501 22,12.4581663 22,12.0002158 C22,11.5422652 21.818032,11.1030814 21.4941465,10.7793271 Z M11,6.875 C11,6.39175084 11.4477153,6 12,6 C12.5522847,6 13,6.39175084 13,6.875 L13,12.125 C13,12.6082492 12.5522847,13 12,13 C11.4477153,13 11,12.6082492 11,12.125 L11,6.875 Z M12.0509988,18 L12.0229995,18 C11.203803,17.9968594 10.5326403,17.3486119 10.5010355,16.53 C10.4861983,16.1340089 10.6313171,15.7487029 10.9036964,15.460892 C11.1760757,15.1730811 11.552803,15.0069759 11.9490012,15 L11.9770005,15 C12.7966142,15.0021127 13.4683725,15.6509353 13.4989645,16.47 C13.5138017,16.8659911 13.3686829,17.2512971 13.0963036,17.539108 C12.8239243,17.8269189 12.447197,17.9930241 12.0509988,18 Z"
}), 'StatusExclamation');

exports["default"] = _default;