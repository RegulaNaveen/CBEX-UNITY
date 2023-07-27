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
  d: "M15.6967158,15 C15.7066327,15.0099166 18.7744795,18.0937092 18.7744795,18.0937092 C19.6677038,19.457235 17.69071,21.194048 16.6260659,21.7500831 C15.4332111,22.3734092 13.7048467,21.6955421 12.5615762,21.1869647 C10.5179978,20.278892 8.74500767,18.914658 7.17177109,17.341468 C5.41082279,15.5940302 3.83050275,13.7268853 2.81331781,11.4382871 C2.30472535,10.2943422 1.62683817,8.5667374 2.24947435,7.37391802 C2.80552601,6.30859716 4.54309888,4.33237028 5.90666503,5.22556817 L8.98442864,8.30324048 C10.1404494,9.45922695 7.77174019,10.8702104 7.77103185,11.8632822 C7.7703235,12.5291077 8.1471636,13.1297673 8.48787805,13.6744693 C8.89234365,14.3197534 9.41935312,14.8835801 10.0377392,15.3269916 C10.6235414,15.7477367 11.3913885,16.2301061 12.1372769,16.2293977 C13.1296697,16.2286894 14.5406951,13.8440136 15.6967158,15 Z M17,2 C19.7614237,2 22,4.23857625 22,7 C22,9.76142375 19.7614237,12 17,12 C14.2385763,12 12,9.76142375 12,7 C12,4.23857625 14.2385763,2 17,2 Z M17,4 C15.3431458,4 14,5.34314575 14,7 C14,8.65685425 15.3431458,10 17,10 C18.6568542,10 20,8.65685425 20,7 C20,5.34314575 18.6568542,4 17,4 Z M17,5.5 L17,7.00000003 L17,7.00000003 L18,7 C18.5,7 18.5,8.00000003 18,8.00000003 L16.5,8.00000003 L16.5,8.00000003 C16.0357143,8.00000003 16.002551,7.56887756 16.0001822,7.10696064 L16,5.5 L16,5.5 C16,4.99999999 17,4.99999998 17,5.5 Z"
}), 'PhoneCallLast');

exports["default"] = _default;