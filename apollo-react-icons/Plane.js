"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _createSvgIcon = _interopRequireDefault(require("./createSvgIcon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = (0, _createSvgIcon["default"])( /*#__PURE__*/React.createElement("path", {
  d: "M19.0652401,6.0958283 C20.1478803,5.64738267 21.3890985,6.16119991 21.8380066,7.24364835 C22.286355,8.32567387 21.7721176,9.56698917 20.6893376,10.0155658 L20.6893376,10.0155658 L17.0005224,11.3900634 C16.8997042,11.4275304 16.8168673,11.5018712 16.7687511,11.5980633 L16.7687511,11.5980633 L13.5859276,17.9654082 C13.5032834,18.1303276 13.3691727,18.2638422 13.2038869,18.345751 L13.2038869,18.345751 L10.9031529,19.496118 C10.5908595,19.6520638 10.2149408,19.6009656 9.95560409,19.3673189 C9.69626743,19.1336721 9.60637311,18.7651007 9.72901452,18.4382897 L9.72901452,18.4382897 L11.3896181,14.0074666 C11.4195604,13.9287589 11.3999323,13.8397868 11.3396536,13.7809828 C11.2793748,13.7221787 11.1899439,13.7047599 11.1120018,13.7366422 L11.1120018,13.7366422 L6.34328498,15.6451477 C6.02814012,15.7711699 5.66822093,15.6973831 5.42808527,15.4575233 L5.42808527,15.4575233 L2.2486577,12.2780957 C2.04925827,12.0786858 1.96188876,11.7932796 2.01549096,11.51642 C2.06909316,11.2395604 2.25667034,11.007386 2.51608619,10.8968064 L2.51608619,10.8968064 L4.7285263,9.94849648 C4.95820202,9.85134677 5.21875629,9.85878232 5.44251792,9.96887198 L5.44251792,9.96887198 L7.45969279,10.9774594 C7.57199064,11.0338408 7.70349742,11.0375715 7.81881104,10.9876472 L7.81881104,10.9876472 L19.0584483,6.0958283 Z M9.00992904,5.06431843 C9.21822004,4.97856052 9.45195619,4.97856052 9.6602472,5.06431843 L9.6602472,5.06431843 L14.1496499,6.91933825 C14.2279159,6.95267942 14.278712,7.02953177 14.278712,7.11460349 C14.278712,7.19967522 14.2279159,7.27652757 14.1496499,7.30986874 L14.1496499,7.30986874 L10.6246877,8.84397438 C10.5186244,8.88903216 10.3988001,8.88903216 10.2927368,8.84397438 L10.2927368,8.84397438 L6.98171743,7.47372175 C6.66573759,7.34211911 6.45925422,7.03276332 6.45925422,6.68968934 C6.45925422,6.34661536 6.66573759,6.03725957 6.98256641,5.90565694 L6.98256641,5.90565694 Z"
}), 'Plane');

exports["default"] = _default;