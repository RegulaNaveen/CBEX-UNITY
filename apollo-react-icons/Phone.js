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
  d: "M18.1137834,13.783089 C18.1254502,13.7947558 21.7346817,17.4048207 21.7346817,17.4048207 C22.7855339,19.0090162 20.4596588,21.0523862 19.2071363,21.7065646 C17.8037778,22.4399111 15.7704079,21.6423968 14.4253838,21.0440527 C12.0211739,19.9757002 9.93530314,18.3706714 8.08443657,16.5198048 C6.0127327,14.4639345 4.15353264,12.2672284 2.95684449,9.57468006 C2.35850041,8.22882255 1.56098609,6.19628605 2.29349924,4.79292752 C2.94767766,3.53957168 4.99188103,1.21452992 6.59607651,2.26538213 L10.2169749,5.88628049 C11.5769993,7.24630491 8.79028258,8.90633472 8.78944923,10.074689 C8.78861588,10.8580364 9.23195718,11.5647158 9.63279771,12.2055606 C10.1086396,12.9647409 10.7286507,13.6280862 11.4561638,14.1497622 C12.1453428,14.6447711 13.0486924,15.2122813 13.9262081,15.211448 C15.0937291,15.2106146 16.7537589,12.4230645 18.1137834,13.783089 Z"
}), 'Phone');

exports["default"] = _default;