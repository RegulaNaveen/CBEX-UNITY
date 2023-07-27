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
  fillRule: "evenodd",
  d: "M13.724676,12.132622 C13.6894118,12.0974468 13.6695931,12.0496856 13.6695931,11.9998775 C13.6695931,11.9500693 13.6894118,11.9023081 13.724676,11.867133 L20.6716377,4.92092117 C21.110893,4.48104462 21.1103893,3.76836749 20.6705128,3.32911224 C20.2306362,2.88985698 19.5179591,2.89036063 19.0787038,3.33023717 L12.132492,10.2734491 C12.0973169,10.3087133 12.0495557,10.328532 11.9997475,10.328532 C11.9499394,10.328532 11.9021782,10.3087133 11.867003,10.2734491 L4.92079123,3.33023717 C4.48153597,2.89077482 3.7691946,2.89060693 3.32973224,3.32986219 C2.89026988,3.76911745 2.890102,4.48145882 3.32935725,4.92092117 L10.2748191,11.867133 C10.3100833,11.9023081 10.329902,11.9500693 10.329902,11.9998775 C10.329902,12.0496856 10.3100833,12.0974468 10.2748191,12.132622 L3.32935725,19.0795837 C3.04520893,19.363866 2.93430784,19.778145 3.03842937,20.1663659 C3.1425509,20.5545867 3.4458765,20.8577693 3.83414636,20.9617079 C4.22241621,21.0656464 4.6366429,20.95455 4.92079123,20.6702677 L11.867003,13.723306 C11.9021782,13.6880418 11.9499394,13.6682231 11.9997475,13.6682231 C12.0495557,13.6682231 12.0973169,13.6880418 12.132492,13.723306 L19.0787038,20.6702677 C19.5179591,21.1097301 20.2303004,21.109898 20.6697628,20.6706427 C21.1092251,20.2313875 21.109393,19.5190461 20.6701378,19.0795837 L13.724676,12.132622 Z"
}), 'Close');

exports["default"] = _default;