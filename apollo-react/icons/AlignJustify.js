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
  d: "M3.25,18 L20.75,18 C21.4403559,18 22,18.6715729 22,19.5 C22,20.3284271 21.4403559,21 20.75,21 L3.25,21 C2.55964406,21 2,20.3284271 2,19.5 C2,18.6715729 2.55964406,18 3.25,18 Z M3.25,13 L20.75,13 C21.4403559,13 22,13.6715729 22,14.5 C22,15.3284271 21.4403559,16 20.75,16 L3.25,16 C2.55964406,16 2,15.3284271 2,14.5 C2,13.6715729 2.55964406,13 3.25,13 L3.25,13 Z M3.25,8 L20.75,8 C21.4403559,8 22,8.67157288 22,9.5 C22,10.3284271 21.4403559,11 20.75,11 L3.25,11 C2.55964406,11 2,10.3284271 2,9.5 C2,8.67157288 2.55964406,8 3.25,8 L3.25,8 Z M3.25,3 L20.75,3 C21.4403559,3 22,3.67157288 22,4.5 C22,5.32842712 21.4403559,6 20.75,6 L3.25,6 C2.55964406,6 2,5.32842712 2,4.5 C2,3.67157288 2.55964406,3 3.25,3 Z"
}), 'AlignJustify');
exports.default = _default;