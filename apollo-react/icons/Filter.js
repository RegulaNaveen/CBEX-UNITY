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
  d: "M21.9116715,2.46 C21.770386,2.17804924 21.4820408,2 21.1666715,2 L2.83333814,2 C2.51769475,2 2.22914215,2.17833531 2.08798214,2.46065534 C1.94682213,2.74297536 1.97728544,3.08081863 2.16667147,3.33333333 L10,14 L10,21 C10.006806,21.9176407 10.2490308,21.993194 11.1666715,22 C11.5273569,22.0004224 11.8783765,21.8834158 12.1666715,21.6666667 L14,20 L14,19 L14,14 L21.8333381,3.33333333 C22.0228735,3.08060191 22.053206,2.74242662 21.9116715,2.46 Z M6.51417147,3.83333333 L9.79667147,8.20833333 C9.85076402,8.28045674 9.8800048,8.36817908 9.8800048,8.45833333 L9.8800048,9.5 C9.8800048,9.679346 9.76524226,9.83857052 9.5950997,9.89528471 C9.42495715,9.95199889 9.2376124,9.8934768 9.1300048,9.75 L5.01667147,4.33333333 C4.92197845,4.20707598 4.9067468,4.03815435 4.97732681,3.89699434 C5.04790681,3.75583432 5.19218311,3.66666667 5.3500048,3.66666667 L6.18333814,3.66666667 C6.31360651,3.66745006 6.43601138,3.72911498 6.51417147,3.83333333 Z"
}), 'Filter');
exports.default = _default;