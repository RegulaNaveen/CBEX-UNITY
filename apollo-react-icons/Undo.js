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
  d: "M3.24368047,2.02896536 C3.38910251,1.97020248 3.55656807,2.0025081 3.66798032,2.11081663 L5.68515631,4.0744893 C5.74518972,4.13289246 5.83717715,4.1466926 5.91248761,4.108594 C9.14013768,2.47999756 13.0301126,2.73262597 16.0069314,4.76416207 C18.4972417,6.49747432 19.9822716,9.28850977 20.0001549,12.2686279 C20.0174131,15.2487459 18.5653918,18.0561918 16.0956841,19.8172175 C15.6618431,20.1261197 15.0529077,20.0341652 14.735589,19.6118314 C14.4182702,19.1894975 14.5127301,18.5967135 14.9465711,18.2878113 C16.9118147,16.8858015 18.0671279,14.6513319 18.0531033,12.2795257 C18.0390787,9.90771954 16.8574178,7.68634523 14.8757247,6.30645225 C12.7218967,4.83371798 9.94949657,4.52009535 7.50614228,5.47278188 C7.44535697,5.49641411 7.40084415,5.54820626 7.38767619,5.6106211 C7.37450822,5.67303595 7.3944487,5.73771434 7.44074561,5.78275568 L8.88102951,7.18483767 C8.99209571,7.2932967 9.02518188,7.45617344 8.96488081,7.59762122 C8.90457973,7.739069 8.7627468,7.83127872 8.60542924,7.83131115 L3.38926592,7.83131115 C3.17428029,7.83131115 3,7.66165345 3,7.45237008 L3,2.37910692 C3.0005431,2.22501853 3.09687954,2.08659385 3.24368047,2.02896536 Z"
}), 'Undo');

exports["default"] = _default;