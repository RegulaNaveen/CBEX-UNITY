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
  d: "M16.933592,16.8654418 C16.7995354,16.554107 16.4839241,16.3511751 16.1339068,16.3512599 L13.5150244,16.3512599 C13.4575703,16.3514825 13.4024025,16.329604 13.361776,16.2904844 C13.3211495,16.2513648 13.2984282,16.1982434 13.2986594,16.1429204 L13.2986594,3.25003715 C13.2986594,2.5596607 12.7174398,2 12.0004692,2 C11.2834985,2 10.702279,2.5596607 10.702279,3.25003715 L10.702279,16.1429204 C10.702279,16.2579831 10.605409,16.3512599 10.4859139,16.3512599 L7.86530061,16.3512599 C7.51531208,16.3513318 7.19981884,16.5543722 7.06589414,16.8657297 C6.93196944,17.1770873 7.00597839,17.5354665 7.25342029,17.7738022 L11.3877234,21.7555872 C11.5500562,21.9120727 11.7703353,22 12.0000364,22 C12.2297376,22 12.4500166,21.9120727 12.6123495,21.7555872 L16.747518,17.7738022 C16.9945834,17.5350979 17.0680195,17.1766035 16.933592,16.8654418 Z"
}), 'Arrow2Down');
exports.default = _default;