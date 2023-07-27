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
  d: "M17.1428571,16 C17.6162441,16 18,16.3837559 18,16.8571429 C18,17.3305298 17.6162441,17.7142857 17.1428571,17.7142857 L17.1428571,17.7142857 L16.5625714,17.7142857 L15.84,21.3142857 C15.7585254,21.7134282 15.4073731,22.0000831 15,22 L15,22 L9,22 C8.5926269,22.0000831 8.24147461,21.7134282 8.16,21.3142857 L8.16,21.3142857 L7.44257143,17.7142857 L6.85714286,17.7142857 C6.38375593,17.7142857 6,17.3305298 6,16.8571429 C6,16.3837559 6.38375593,16 6.85714286,16 L6.85714286,16 Z M12.7079311,18.2937684 C12.422127,18.0072768 11.9918277,17.9212815 11.617864,18.0759186 C11.2439003,18.2305556 11,18.5953374 11,19.0000119 C11.0004378,19.5511708 11.4464291,19.998235 11.9975856,20 C12.4022589,20.0009683 12.7676258,19.7579465 12.9231611,19.3843555 C13.0786963,19.0107646 12.9937352,18.5802601 12.7079311,18.2937684 Z M20.3333333,2 C21.2538079,2 22,2.72753728 22,3.625 L22,3.625 L22,13.375 C22,14.2724627 21.2538079,15 20.3333333,15 L20.3333333,15 L18,15 C17.5397627,15 17.1666667,14.6362314 17.1666667,14.1875 C17.1666667,13.7387686 17.5397627,13.375 18,13.375 L18,13.375 L19.9166667,13.375 C20.1467853,13.375 20.3333333,13.1931157 20.3333333,12.96875 L20.3333333,12.96875 L20.3333333,4.03125 C20.3333333,3.80688432 20.1467853,3.625 19.9166667,3.625 L19.9166667,3.625 L4.08333333,3.625 C3.85321469,3.625 3.66666667,3.80688432 3.66666667,4.03125 L3.66666667,4.03125 L3.66666667,12.96875 C3.66666667,13.1931157 3.85321469,13.375 4.08333333,13.375 L4.08333333,13.375 L6,13.375 C6.46023729,13.375 6.83333333,13.7387686 6.83333333,14.1875 C6.83333333,14.6362314 6.46023729,15 6,15 L6,15 L3.66666667,15 C2.74619208,15 2,14.2724627 2,13.375 L2,13.375 L2,3.625 C2,2.72753728 2.74619208,2 3.66666667,2 L3.66666667,2 Z M11.9924063,12.0001759 C13.8318711,11.9847848 15.460158,12.9810092 15.9803618,14.4401013 C16.0247611,14.5695838 15.9929325,14.7087944 15.8944323,14.8159354 C15.795366,14.9246141 15.6397071,14.9878611 15.475138,14.9863022 L15.475138,14.9863022 L8.51485114,15 C8.35222176,14.9992724 8.19946039,14.9353859 8.10237052,14.8274958 C8.00528065,14.7196058 7.975151,14.5802568 8.02101553,14.4512308 C8.54939811,13.0011792 10.1610044,12.0065313 11.9924063,12.0001759 Z M12,7 C13.1045695,7 14,7.8954305 14,9 C14,10.1045695 13.1045695,11 12,11 C10.8954305,11 10,10.1045695 10,9 C10,7.8954305 10.8954305,7 12,7 Z"
}), 'PresentationSpeaker');

exports["default"] = _default;