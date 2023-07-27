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
  d: "M4,17 C5.1045695,17 6,17.8954305 6,19 C6,20.1045695 5.1045695,21 4,21 C2.8954305,21 2,20.1045695 2,19 C2,17.8954305 2.8954305,17 4,17 Z M21,18 C21.6201204,18 22,18.4477153 22,19 C22,19.5522847 21.6201204,20 21,20 L21,20 L9,20 C8.37987961,20 8,19.5522847 8,19 C8,18.4477153 8.37987961,18 9,18 L9,18 Z M4,10 C5.1045695,10 6,10.8954305 6,12 C6,13.1045695 5.1045695,14 4,14 C2.8954305,14 2,13.1045695 2,12 C2,10.8954305 2.8954305,10 4,10 Z M21,11 C21.6201204,11 22,11.4477153 22,12 C22,12.5522847 21.6201204,13 21,13 L21,13 L9,13 C8.37987961,13 8,12.5522847 8,12 C8,11.4477153 8.37987961,11 9,11 L9,11 Z M4,3 C5.1045695,3 6,3.8954305 6,5 C6,6.1045695 5.1045695,7 4,7 C2.8954305,7 2,6.1045695 2,5 C2,3.8954305 2.8954305,3 4,3 Z M21,4 C21.6201204,4 22,4.44771525 22,5 C22,5.55228475 21.6201204,6 21,6 L21,6 L9,6 C8.37987961,6 8,5.55228475 8,5 C8,4.44771525 8.37987961,4 9,4 L9,4 Z"
}), 'ListBullet');
exports.default = _default;