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
  d: "M20.2608696,3.625 L18.2173913,3.59 C18.0973294,3.59 18,3.50081229 18,3.38 L18,1.96875 C18,1.48550084 17.6106824,1 17.1304348,1 C16.6501872,1 16.2608696,1.48550084 16.2608696,1.96875 L16.2608696,6 C16.26,7 14.61,7 14.6086957,6 L14.6086957,4.0625 C14.6086957,3.82087542 14.4140368,3.625 14.173913,3.625 L8.95652174,3.59375 C8.83679861,3.59375096 8.73960933,3.49634544 8.73913043,3.375875 L8.73913043,1.84375 C8.73913043,1.36050084 8.34981283,1 7.86956522,1 C7.38931761,1 7,1.36050084 7,1.84375 L7,6 C7,7 5.5,7 5.47826087,6 L5.47826087,4.0625 C5.47826087,3.82087542 5.28360207,3.625 5.04347826,3.625 L3.73913043,3.625 C2.77863522,3.625 2,4.40850169 2,5.375 L2,20.25 C2,21.2164983 2.77863522,22 3.73913043,22 L20.2608696,22 C21.2213648,22 22,21.2164983 22,20.25 L22,5.375 C22,4.40850169 21.2213648,3.625 20.2608696,3.625 Z M19.5789474,20 L4.42105263,20 C4.18851168,20 4,19.810582 4,19.5769231 L4,9.42307692 C4,9.18941799 4.18851168,9 4.42105263,9 L19.5789474,9 C19.8114883,9 20,9.18941799 20,9.42307692 L20,19.5769231 C20,19.810582 19.8114883,20 19.5789474,20 Z"
}), 'Calendar');
exports.default = _default;