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
  d: "M7,18 L17,18 C17.4963203,18 18,18.6715729 18,20 C18,20.3284271 17.4963203,21 17,21 L7,21 C6.50367966,21 6,20.3284271 6,20 C6,18.6715729 6.50367966,18 7,18 Z M3,13 L21,13 C21.4403559,13 22,13.6715729 22,14 C22,15.3284271 21.4403559,16 21,16 L3,16 C2.55964406,16 2,15.3284271 2,14 C2,13.6715729 2.55964406,13 3,13 L3,13 Z M7,8 L17,8 C17.4963203,8 18,8.67157288 18,10 C18,10.3284271 17.4963203,11 17,11 L7,11 C6.50367966,11 6,10.3284271 6,10 C6,8.67157288 6.50367966,8 7,8 L7,8 Z M3,3 L21,3 C21.4403559,3 22,3.67157288 22,5 C22,5.32842712 21.4403559,6 21,6 L3,6 C2.55964406,6 2,5.32842712 2,5 C2,3.67157288 2.55964406,3 3,3 Z"
}), 'AlignCenter');
exports.default = _default;