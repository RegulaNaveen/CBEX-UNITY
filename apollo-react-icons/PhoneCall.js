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
  d: "M15.6967158,15.0153286 C15.7066327,15.0252451 18.7744795,18.0937092 18.7744795,18.0937092 C19.6677038,19.4572349 17.69071,21.1940479 16.6260659,21.7500831 C15.4332111,22.3734091 13.7048467,21.695542 12.5615762,21.1869647 C10.5179978,20.278892 8.74500767,18.9146579 7.17177108,17.341468 C5.41082279,15.5940301 3.83050275,13.7268853 2.81331781,11.4382871 C2.30472535,10.2943421 1.62683817,8.56673735 2.24947435,7.37391798 C2.80552601,6.30859711 4.54309888,4.33237024 5.90666503,5.22556812 L8.98442864,8.30324043 C10.1404494,9.45922691 7.77174019,10.8702104 7.77103185,11.8632821 C7.7703235,12.5291076 8.1471636,13.1297673 8.48787805,13.6744692 C8.89234365,14.3197534 9.41935311,14.8835801 10.0377392,15.3269916 C10.6235414,15.7477366 11.3913885,16.230106 12.1372769,16.2293977 C13.1296697,16.2286894 14.5406951,13.8593421 15.6967158,15.0153286 Z M13.9039633,6.2269397 C16.0432868,6.2269397 17.7837534,7.96336652 17.7837534,10.0979711 C17.7837534,10.5959046 17.3789937,11 16.8797901,11 C16.3814298,11 15.9758269,10.5959046 15.9758269,10.0979711 C15.9758269,8.95754274 15.0457229,8.03015217 13.9039633,8.03015217 C13.4047597,8.03015217 13,7.62690212 13,7.12812324 C13,6.63103513 13.4047597,6.2269397 13.9039633,6.2269397 Z M14.0279209,2 C18.4229364,2 22,5.5675371 22,9.95340973 C22,10.4513432 21.5943971,10.8554387 21.0951935,10.8554387 C20.5959899,10.8554387 20.1920735,10.4513432 20.1920735,9.95340973 C20.1920735,6.56255871 17.4270589,3.80321247 14.0279209,3.80321247 C13.5295606,3.80321247 13.1239577,3.39996243 13.1239577,2.90202893 C13.1239577,2.40325005 13.5295606,2 14.0279209,2 Z"
}), 'PhoneCall');

exports["default"] = _default;