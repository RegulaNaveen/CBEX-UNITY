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
var _default = (0, _createSvgIcon.default)( /*#__PURE__*/React.createElement("g", {
  fillRule: "evenodd"
}, /*#__PURE__*/React.createElement("path", {
  d: "M6,4 L18,4 C19.1045695,4 20,4.8954305 20,6 L20,18 C20,19.1045695 19.1045695,20 18,20 L6,20 C4.8954305,20 4,19.1045695 4,18 L4,6 C4,4.8954305 4.8954305,4 6,4 Z"
}), /*#__PURE__*/React.createElement("path", {
  fill: "#FFF",
  d: "M9.52170255,15.7628538 C8.96941781,15.7628538 8.52170255,15.3151385 8.52170255,14.7628538 C8.52170255,14.210569 8.96941781,13.7628538 9.52170255,13.7628538 L13.5217026,13.7628538 L13.5217026,5.76285377 C13.5217026,5.21056902 13.9694178,4.76285377 14.5217026,4.76285377 C15.0739873,4.76285377 15.5217026,5.21056902 15.5217026,5.76285377 L15.5217026,14.7628538 L15.5217026,14.7628538 C15.5217026,15.2756896 15.1356624,15.6983609 14.6383237,15.756126 L14.5217026,15.7628538 L14.5217026,15.7628538 L9.52170255,15.7628538 Z",
  transform: "rotate(35 12.022 10.263)"
})), 'CheckboxChecked');
exports.default = _default;