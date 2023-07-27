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
  d: "M21.1666667,20 C21.626904,20 22,20.4477153 22,21 C22,21.5522847 21.626904,22 21.1666667,22 L21.1666667,22 L2.83333333,22 C2.37309604,22 2,21.5522847 2,21 C2,20.4477153 2.37309604,20 2.83333333,20 L2.83333333,20 Z M5.24999924,12 C5.66421239,12 5.99999416,12.4132754 5.99999416,12.9230763 L5.99999416,12.9230763 L5.99999416,17.769229 C6.00019885,17.8305081 5.98050881,17.8893485 5.94530224,17.9326797 C5.91009568,17.9760108 5.86228787,18.0002447 5.81249868,18 L5.81249868,18 L3.18750132,18 C3.13771213,18.0002447 3.08990432,17.9760108 3.05469776,17.9326797 C3.01949119,17.8893485 2.99980115,17.8305081 2.99999416,17.769229 L2.99999416,17.769229 L2.99999416,12.9230763 C2.99999416,12.4132754 3.33578761,12 3.75000076,12 L3.75000076,12 Z M20.2499992,2 C20.6642124,2 20.9999914,2.4054779 20.9999914,2.90566024 L20.9999914,2.90566024 L20.9999914,17.7735831 C21.0001988,17.833706 20.9805088,17.8914362 20.9453022,17.9339498 C20.9100957,17.9764634 20.8622879,18.0002401 20.8124987,18 L20.8124987,18 L18.1875013,18 C18.1377121,18.0002401 18.0899043,17.9764634 18.0546978,17.9339498 C18.0194912,17.8914362 17.9998012,17.833706 17.9999914,17.7735831 L17.9999914,17.7735831 L17.9999914,2.90566024 C17.9999914,2.4054779 18.3357876,2 18.7500008,2 L18.7500008,2 Z M10.2499992,6 C10.6642124,6 10.9999928,6.37987951 10.9999928,6.84848464 L10.9999928,6.84848464 L10.9999928,17.7878771 C11.0001988,17.8442043 10.9805088,17.89829 10.9453022,17.9381197 C10.9100957,17.9779493 10.8622879,18.000225 10.8124987,18 L10.8124987,18 L8.18750132,18 C8.13771213,18.000225 8.08990432,17.9779493 8.05469776,17.9381197 C8.01949119,17.89829 7.99980115,17.8442043 7.99999276,17.7878771 L7.99999276,17.7878771 L7.99999276,6.84848464 C7.99999276,6.37987951 8.33578761,6 8.75000076,6 L8.75000076,6 Z M15.2499992,9 C15.6642124,9 15.9999873,9.35817208 15.9999873,9.79999974 L15.9999873,9.79999974 L15.9999873,17.7999984 C16.0001988,17.853107 15.9805088,17.904102 15.9453022,17.9416557 C15.9100957,17.9792094 15.8622879,18.0002121 15.8124987,18 L15.8124987,18 L13.1875013,18 C13.1377121,18.0002121 13.0899043,17.9792094 13.0546978,17.9416557 C13.0194912,17.904102 12.9998012,17.853107 12.9999873,17.7999984 L12.9999873,17.7999984 L12.9999873,9.79999974 C12.9999873,9.35817208 13.3357876,9 13.7500008,9 L13.7500008,9 Z"
}), 'ChartBar');

exports["default"] = _default;