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
  d: "M21.4866667,20.0158333 L16.0458333,14.575 C18.5101294,11.3355954 18.0430695,6.74077224 14.977347,4.06348948 C11.9116245,1.38620671 7.29575702,1.54213032 4.41769367,4.42019367 C1.53963032,7.29825702 1.38370671,11.9141245 4.06098948,14.979847 C6.73827224,18.0455695 11.3330954,18.5126294 14.5725,16.0483333 L20.0133333,21.4891667 C20.4231123,21.8888822 21.0768877,21.8888822 21.4866667,21.4891667 C21.8931325,21.0821579 21.8931325,20.4228421 21.4866667,20.0158333 Z M4.29166667,9.91666667 C4.29166667,6.81006495 6.81006495,4.29166667 9.91666667,4.29166667 C13.0232684,4.29166667 15.5416667,6.81006495 15.5416667,9.91666667 C15.5416667,13.0232684 13.0232684,15.5416667 9.91666667,15.5416667 C6.81158786,15.5379931 4.29534023,13.0217455 4.29166667,9.91666667 Z"
}), 'Search');
exports.default = _default;