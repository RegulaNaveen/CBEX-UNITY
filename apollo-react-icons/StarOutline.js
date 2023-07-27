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
  d: "M12.0013104,2 C11.2034589,2 10.4894443,2.49135628 10.2100191,3.2326951 L8.53856869,7.92939346 L3.91340689,7.92976242 C3.10900474,7.92916223 2.38985065,8.42862268 2.11501952,9.17913698 L2.0667284,9.33032061 C1.87236291,10.0403081 2.10969696,10.8046751 2.68617846,11.2825749 L6.65101934,14.545538 L4.98453557,19.5023061 C4.7211743,20.2860674 4.99930213,21.1486864 5.67220133,21.6353062 L5.80983951,21.7261254 C6.46575743,22.1195938 7.30284448,22.0881109 7.9296166,21.6322132 L12.000032,18.6707871 L16.0705752,21.6313947 C16.7408425,22.1208005 17.6548291,22.1231954 18.3287143,21.6365734 L18.4503989,21.5410261 C19.035299,21.0423182 19.2646529,20.2373905 19.0172207,19.5021048 L17.3500009,14.5417438 L21.3214486,11.2764582 C21.9390079,10.753568 22.1593932,9.91493113 21.8814224,9.16911999 L21.8199199,9.02377488 C21.5068542,8.36175306 20.8357829,7.93195803 20.090544,7.92976555 L15.4624516,7.92939346 L13.797163,3.2451488 C13.5131765,2.49135628 12.7991619,2 12.0013104,2 Z M12.0013104,3.42282678 C12.2007733,3.42282678 12.3792769,3.54566585 12.4491332,3.73100055 L14.1856626,8.61386142 C14.3427281,9.05654532 14.7649474,9.35292755 15.2385822,9.35258901 L20.0884171,9.3525892 C20.2871528,9.353177 20.4665973,9.4772509 20.5366651,9.66399028 C20.6056124,9.84898468 20.5505161,10.0586439 20.3981074,10.1877131 L16.2672565,13.5848174 C15.912876,13.8765484 15.7755344,14.3538355 15.9211596,14.7868534 L17.6566052,19.9523055 C17.7226965,20.148707 17.6530593,20.3645924 17.484588,20.4862479 C17.3161167,20.6079034 17.08762,20.6073047 16.919799,20.484768 L12.6604811,17.3862168 C12.2677137,17.100763 11.7341103,17.100763 11.3416084,17.3860238 L7.08148094,20.4847935 C6.91360126,20.6069048 6.68535763,20.6072175 6.51713283,20.4855626 C6.34890803,20.3639077 6.27937607,20.1482529 6.34520853,19.952336 L8.08068981,14.7899396 C8.22628956,14.3569973 8.08894802,13.8797102 7.7348368,13.5882008 L3.60390493,10.1891231 C3.45151105,10.0627832 3.39442822,9.85256116 3.46313601,9.66493259 C3.53184379,9.47730401 3.71163231,9.3524389 3.91286766,9.352589 L8.76535216,9.3525892 C9.23908561,9.35198841 9.66016499,9.05577881 9.81713955,8.61335106 L11.5662625,3.69404465 C11.6233439,3.54566585 11.8018475,3.42282678 12.0013104,3.42282678 Z"
}), 'StarOutline');

exports["default"] = _default;