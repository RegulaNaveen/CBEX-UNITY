"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _createSvgIcon = _interopRequireDefault(require("./createSvgIcon"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var _default = (0, _createSvgIcon.default)( /*#__PURE__*/React.createElement("path", {
  fillRule: "evenodd",
  d: "M14.9933837,4.16784886 L7.20501893,11.4897123 C7.07404989,11.623731 7,11.8089989 7,12.002656 C7,12.196313 7.07404989,12.3815809 7.20501893,12.5155997 L14.9933837,19.8341301 C15.1182137,19.9523922 15.2826396,20.0115655 15.4490726,19.9981227 C15.6155057,19.9846799 15.7697167,19.8997703 15.8764523,19.7628046 L16.8488269,18.5296066 C17.0748209,18.2434863 17.0439606,17.8167567 16.7795054,17.5710451 L10.8759361,12.1283089 C10.8414676,12.0966507 10.8216428,12.0505259 10.8216428,12.0019894 C10.8216428,11.9534528 10.8414676,11.9073281 10.8759361,11.8756699 L16.7801299,6.43093391 C16.9066473,6.31274047 16.984309,6.1459942 16.9962132,5.96698481 C17.011191,5.78766808 16.9575804,5.60950907 16.8475779,5.473039 L15.8764523,4.23917436 C15.7699061,4.10142084 15.615506,4.01577169 15.4486574,4.00186707 C15.282016,3.98838265 15.1174763,4.04836984 14.9933837,4.16784886 Z"
}), 'ChevronLeft');
exports.default = _default;