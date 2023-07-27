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
  d: "M8.34666732,14.1800003 C8.60985298,13.9168146 8.99345443,13.8140289 9.35297274,13.9103615 C9.71249104,14.0066942 9.9933068,14.2875099 10.0896394,14.6470282 C10.1859721,15.0065465 10.0831864,15.390148 9.82000069,15.6533336 L9.82000069,15.6533336 L6.39000061,19.0833337 C6.35086693,19.1222763 6.32886571,19.1752086 6.32886571,19.230417 C6.32886571,19.2856255 6.35086693,19.3385578 6.39000061,19.3775004 L6.39000061,19.3775004 L7.58916731,20.5775004 C7.82742391,20.8158289 7.89868557,21.1741976 7.76973229,21.4855459 C7.64077901,21.7968942 7.33699721,22.0000004 7.00000026,22.0000004 L7.00000026,22.0000004 L2.83333387,22.0000004 C2.37309657,22.0000004 2.00000026,21.6269044 2.00000026,21.1666671 L2.00000026,21.1666671 L2.00000026,17.0000003 C1.99973526,16.6628521 2.20264598,16.3587617 2.51406996,16.2295946 C2.82549394,16.1004275 3.18406476,16.1716363 3.42250055,16.4100003 L3.42250055,16.4100003 L4.62166724,17.609167 C4.66075235,17.648351 4.71382255,17.6703727 4.76916724,17.6703727 C4.82451194,17.6703727 4.87758214,17.648351 4.91666725,17.609167 L4.91666725,17.609167 Z M21.1666676,2 C21.6269049,2 22.000001,2.37309605 22.000001,2.83333335 L22.000001,2.83333335 L22.000001,7 C22.0000858,7.33702437 21.7971599,7.64091984 21.4858343,7.77000012 C21.3847245,7.81215486 21.2762125,7.83368726 21.1666676,7.83333346 C20.9455522,7.83306534 20.7336083,7.74493025 20.5775009,7.58833345 L20.5775009,7.58833345 L19.3783342,6.38916676 C19.3392491,6.34998272 19.2861789,6.32796102 19.2308342,6.32796102 C19.1754895,6.32796102 19.1224193,6.34998272 19.0833342,6.38916676 L19.0833342,6.38916676 L15.6533341,9.81916683 C15.2464844,10.2260166 14.5868506,10.2260166 14.1800008,9.81916681 C13.773151,9.41231705 13.773151,8.75268325 14.1800008,8.34583347 L14.1800008,8.34583347 L17.6100009,4.91666673 C17.6491849,4.87758162 17.6712066,4.82451142 17.6712066,4.76916673 C17.6712066,4.71382203 17.6491849,4.66075183 17.6100009,4.62166672 L17.6100009,4.62166672 L16.4108342,3.42250003 C16.1725776,3.18417148 16.1013159,2.82580284 16.2302692,2.51445455 C16.3592225,2.20310625 16.6630043,2 17.0000008,2 L17.0000008,2 Z"
}), 'Expand');

exports["default"] = _default;