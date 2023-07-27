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
  d: "M13.2463319,14.2433273 C14.7807649,12.7113093 17.2236082,12.5789184 18.9149314,13.9361153 C20.6062546,15.2933123 21.0036927,17.7048779 19.8371835,19.5321353 C19.7902839,19.6052692 19.8001937,19.7010766 19.8610717,19.7630844 L19.8610717,19.7630844 L21.7913928,21.6922797 C22.075718,21.9974242 22.0715416,22.4775721 21.7743,22.7745217 C21.4770585,23.0714713 20.9964387,23.0756437 20.6940765,22.7838993 L20.6940765,22.7838993 L18.7676084,20.8547041 C18.7054116,20.7941584 18.6097075,20.7842787 18.5364322,20.8308393 C16.7066877,21.9951199 14.2929874,21.5966431 12.9354588,19.906177 C11.5779302,18.2157108 11.7118988,15.7753453 13.2463319,14.2433273 Z M16.2639704,14.5636493 C14.7744279,14.5636493 13.566915,15.7699763 13.566915,17.258056 C13.566915,18.7461358 14.7744279,19.9524628 16.2639704,19.9524628 C16.979274,19.9524628 17.6652806,19.6685886 18.1710766,19.1632893 C18.6768726,18.65799 18.9610258,17.9726571 18.9610258,17.258056 C18.9610258,15.7699763 17.753513,14.5636493 16.2639704,14.5636493 Z M9.5,1 C10.9375,1 11.9157986,1.91840278 11.9948278,2.87507234 L12,3 L16,3 C16.4642857,3 16.9285714,3.43112245 16.9925292,3.89303936 L17,4 L17,11.5 C16.5333333,11.9666667 15.6311111,11.9977778 15.1063704,11.5933333 L15,11.5 L15,6 C15,5.53571429 14.5688776,5.07142857 14.1069606,5.00747085 L14,5 L5,5 C4.53571429,5 4.07142857,5.43112245 4.00747085,5.89303936 L4,6 L4,16 C4,16.4642857 4.43112245,16.9285714 4.89303936,16.9925292 L5,17 L10,17 C10.96,17 10.9984,18.8431671 10.1152,18.9906204 L10,18.9999643 L3.25,18.9999643 C2.60279131,18.9999643 2.0704661,18.5170174 2.00645361,17.8981522 L2,17.7726697 L2,4 C2,3.5 2.5,3 3,3 C5.66666667,3.04883195 7,3.04883195 7,3 C7,2 8,1 9.5,1 Z M10.3181818,13 C10.6947396,13 11,13.4477152 11,14 C11,14.5098013 10.7398965,14.930502 10.4037076,14.9922086 L10.3181818,15 L6.68181818,15 C6.3052604,15 6,14.5522847 6,14 C6,13.4901987 6.26010353,13.069498 6.59629236,13.0077914 L6.68181818,13 L10.3181818,13 Z M12.3,10 C12.6865993,10 13,10.4477152 13,11 C13,11.5098013 12.7329604,11.930502 12.3878065,11.9922086 L12.3,12 L6.7,12 C6.31340068,12 6,11.5522847 6,11 C6,10.4901987 6.26703963,10.069498 6.61219349,10.0077914 L6.7,10 L12.3,10 Z M12.3,7 C12.6865993,7 13,7.44771525 13,8 C13,8.50980131 12.7329604,8.93050198 12.3878065,8.99220858 L12.3,9 L6.7,9 C6.31340068,9 6,8.55228475 6,8 C6,7.49019869 6.26703963,7.06949802 6.61219349,7.00779142 L6.7,7 L12.3,7 Z"
}), 'ClipboardSearch');

exports["default"] = _default;