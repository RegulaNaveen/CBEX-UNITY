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
  d: "M12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 C17.5228475,22 22,17.5228475 22,12 C21.9940293,6.47962754 17.5203725,2.00597071 12,2 Z M12.2083333,6.16666667 C12.8986893,6.16666667 13.4583333,6.72631073 13.4583333,7.41666667 C13.4583333,8.1070226 12.8986893,8.66666667 12.2083333,8.66666667 C11.5179774,8.66666667 10.9583333,8.1070226 10.9583333,7.41666667 C10.9583333,6.72631073 11.5179774,6.16666667 12.2083333,6.16666667 Z M14.0833333,17.4166667 L10.75,17.4166667 C10.2897627,17.4166667 9.91666667,17.0435706 9.91666667,16.5833333 C9.91666667,16.123096 10.2897627,15.75 10.75,15.75 L11.375,15.75 C11.4900593,15.75 11.5833333,15.656726 11.5833333,15.5416667 L11.5833333,11.7916667 C11.5833333,11.6766073 11.4900593,11.5833333 11.375,11.5833333 L10.75,11.5833333 C10.2897627,11.5833333 9.91666667,11.2102373 9.91666667,10.75 C9.91666667,10.2897627 10.2897627,9.91666667 10.75,9.91666667 L11.5833333,9.91666667 C12.5038079,9.91666667 13.25,10.6628588 13.25,11.5833333 L13.25,15.5416667 C13.25,15.656726 13.343274,15.75 13.4583333,15.75 L14.0833333,15.75 C14.5435706,15.75 14.9166667,16.123096 14.9166667,16.5833333 C14.9166667,17.0435706 14.5435706,17.4166667 14.0833333,17.4166667 Z"
}), 'Info');
exports.default = _default;