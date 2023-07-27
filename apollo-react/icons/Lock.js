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
  d: "M19,10 L18,10 L18,7.5 C18,4.39339828 15.3551299,2 12,2 C8.64487014,2 6,4.39339828 6,7.5 L6,10 L5,10 C4.00588745,10 3,11.0795254 3,12 L3,20 C3,20.9204746 4.00588745,22 5,22 L19,22 C19.9941125,22 21,20.9204746 21,20 L21,12 C21,11.0795254 19.9941125,10 19,10 Z M10,14.7199316 C9.99562928,13.8881328 10.6902728,13.1739933 11.6466568,13.0270808 C12.6030407,12.8801682 13.5443873,13.3429992 13.8780966,14.1242106 C14.2118059,14.9054219 13.8413023,15.778931 12.9998267,16.1948431 L12.9998267,18.1439863 C12.9998267,18.6167496 12.5521404,19 11.9998913,19 C11.4476423,19 10.999956,18.6167496 10.999956,18.1439863 L10.999956,16.1948431 C10.3830864,15.8911789 10.0020148,15.3290955 10,14.7199316 Z M8,7.64285712 C8,5.63096268 9.79086102,4 12,4 C14.209139,4 16,5.63096268 16,7.64285712 L16,9.57142857 C16,9.80812203 15.7893105,10 15.5294118,10 L8.47058824,10 C8.21068953,10 8,9.80812203 8,9.57142857 L8,7.64285712 Z"
}), 'Lock');
exports.default = _default;