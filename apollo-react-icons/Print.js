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
  d: "M19.9166667,8.00000001 C20.469201,8.00000001 20.999105,8.21691115 21.3898058,8.60301546 C21.7370954,8.94621929 21.94911,9.39811686 21.9919369,9.87779855 L22,10.0588235 L22,13.7647059 C22,14.3107398 21.7805066,14.8344097 21.3898058,15.220514 C21.0381751,15.5680078 20.6412898,15.9213964 20.1626315,15.9885992 L20,16 L18,16 L18,21 C17.9995733,21.5277445 17.6335765,21.9372454 17.1208312,21.9934166 L17,22 L7,22 C6.46597285,21.9995783 6.06186174,21.6277433 6.00648828,21.1195812 L6,21 L6,16 L4,16 C2.89943256,16 2.07443081,14.9951856 2.00477199,13.9127104 L2,13.7647059 L2,10.0588235 C2,8.97120395 2.85339548,8.08056061 3.93455017,8.00516935 L4.08333333,8.00000001 L19.9166667,8.00000001 Z M15.6190476,12 L8.38095238,12 C8.17055819,12 8,12.1783193 8,12.3982874 L8,12.3982874 L8,19.6017126 C8,19.8216807 8.17055819,20 8.38095238,20 L8.38095238,20 L15.6190476,20 C15.8294418,20 16,19.8216807 16,19.6017126 L16,19.6017126 L16,12.3982874 C16,12.1783193 15.8294418,12 15.6190476,12 L15.6190476,12 Z M13.5,17 C13.7761424,17 14,17.2238576 14,17.5 C14,17.7761424 13.7761424,18 13.5,18 L13.5,18 L9.5,18 L9.41012437,17.9919443 C9.17687516,17.9496084 9,17.7454599 9,17.5 C9,17.2238576 9.22385763,17 9.5,17 L9.5,17 Z M14.5,14 C14.7761424,14 15,14.2238576 15,14.5 C15,14.7761424 14.7761424,15 14.5,15 L14.5,15 L9.5,15 L9.41012437,14.9919443 C9.17687516,14.9496084 9,14.7454599 9,14.5 C9,14.2238576 9.22385763,14 9.5,14 L9.5,14 Z M5,10 C4.44771525,10 4,10.4477153 4,11 C4,11.5522848 4.44771525,12 5,12 C5.55228475,12 6,11.5522848 6,11 C6,10.4477153 5.55228475,10 5,10 Z M15,2 L18,5 L18,6 C18,6.5 18,7 17,7 C16.0555556,7 16.0030864,6.55401235 16.0001715,6.0832476 L16,5.5 L14.5,4 L8,4 L8,6 C8,6.5 8,7 7,7 C6.05555556,7 6.00308642,6.55401235 6.00017147,6.0832476 L6,3.5 C6,2.6306629 6.44598765,2.06544403 7.42220508,2.00532507 L7.6,2 L15,2 Z"
}), 'Print');

exports["default"] = _default;