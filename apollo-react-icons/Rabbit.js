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
  d: "M10.49,2.78250003 C10.9783118,2.29418827 11.7700216,2.29418826 12.2583333,2.7825 L12.2583333,2.7825 L20.805,11.3233333 L20.9449524,11.4529097 C21.5304419,12.0322558 21.8410992,12.8383877 21.7908333,13.6666667 C21.7908333,14.9166667 20.9575,15.75 19.2908333,15.75 L19.2908333,15.75 L17.2075,15.75 L14.9966667,17.3391667 C14.9427836,17.37764 14.8739121,17.3884494 14.8108333,17.3683333 C14.7477851,17.3479846 14.6982436,17.2987528 14.6775,17.2358333 C14.2983333,16.1041667 13.8491667,14.7541667 13.6316667,14.0958333 C13.5175463,13.7763312 13.1693707,13.6062196 12.8471943,13.7125559 C12.5250178,13.8188922 12.3465103,14.1628389 12.445,14.4875 C12.7966667,15.5425 13.8675,18.6758333 14.195,19.635 C14.2526979,19.8034738 14.4110868,19.9166565 14.5891667,19.9166667 L14.5891667,19.9166667 L17.6241667,19.9166667 C18.084404,19.9166667 18.4575,20.2897627 18.4575,20.75 C18.4575,21.2102373 18.084404,21.5833333 17.6241667,21.5833333 L17.6241667,21.5833333 L12.8583333,21.5833333 C12.7134166,21.5833333 12.5789798,21.5077728 12.5033333,21.3841667 C12.1666667,20.8333333 11.21,19.2758333 10.5766667,18.25 C9.29166667,16.1666667 6.89583333,14.9508333 5.22916667,13.805 C3.785,12.8116667 2.74583333,10.7608333 3.43166667,9.02416667 C2.64675137,8.80758068 2.13323343,8.05555419 2.2172127,7.2456474 C2.30119198,6.43574062 2.95808146,5.80507373 3.77073592,5.75413983 C4.58339037,5.70320593 5.31388514,6.24691716 5.49833333,7.04 C5.99553309,6.85417629 6.52255859,6.76097242 7.05333333,6.765 C8.34159958,6.74172907 9.5863999,7.23089693 10.5141667,8.125 L10.5141667,8.125 L13.7216667,11.3333333 C14.2099784,11.8216451 15.0016882,11.8216451 15.49,11.3333333 C15.9783117,10.8450216 15.9783118,10.0533118 15.49,9.565 L15.49,9.565 L10.49,4.55083333 C10.0016883,4.06252156 10.0016883,3.27081178 10.49,2.78250003 Z M8.57166667,17.8333333 C8.62831072,17.8334409 8.68246901,17.8566086 8.72166667,17.8975 C9.3004356,18.5392813 9.79626421,19.2512475 10.1975,20.0166667 C10.2366124,20.0809133 10.2380572,20.1612542 10.2012803,20.2268657 C10.1645033,20.2924771 10.0952156,20.3331705 10.02,20.3333333 L10.02,20.3333333 L7.625,20.3333333 C6.93464406,20.3333333 6.375,19.7736893 6.375,19.0833333 C6.375,18.3929774 6.93464406,17.8333333 7.625,17.8333333 L7.625,17.8333333 Z M19,12 C18.4477153,12 18,12.4477153 18,13 C18,13.5522847 18.4477153,14 19,14 C19.5522847,14 20,13.5522847 20,13 C20,12.4477153 19.5522847,12 19,12 Z"
}), 'Rabbit');

exports["default"] = _default;