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
  d: "M16,17 C17.1045,17 18,17.8955 18,19 C18,20.1045 17.1045,21 16,21 C14.8955,21 14,20.1045 14,19 C14,17.8955 14.8955,17 16,17 Z M8,17 C9.1045,17 10,17.8955 10,19 C10,20.1045 9.1045,21 8,21 C6.8955,21 6,20.1045 6,19 C6,17.8955 6.8955,17 8,17 Z M16,10 C17.1045,10 18,10.8955 18,12 C18,13.1045 17.1045,14 16,14 C14.8955,14 14,13.1045 14,12 C14,10.8955 14.8955,10 16,10 Z M8,10 C9.1045,10 10,10.8955 10,12 C10,13.1045 9.1045,14 8,14 C6.8955,14 6,13.1045 6,12 C6,10.8955 6.8955,10 8,10 Z M16,3 C17.1045,3 18,3.8955 18,5 C18,6.1045 17.1045,7 16,7 C14.8955,7 14,6.1045 14,5 C14,3.8955 14.8955,3 16,3 Z M8,3 C9.1045,3 10,3.8955 10,5 C10,6.1045 9.1045,7 8,7 C6.8955,7 6,6.1045 6,5 C6,3.8955 6.8955,3 8,3 Z"
}), 'Drag');
exports.default = _default;