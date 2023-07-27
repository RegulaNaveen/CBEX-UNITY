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
  d: "M13,2 C13.5,2 14,2.5 14,3 L14,3 L14,6 C14,7.15059323 15.3954305,8 16.5,8 L16.5,8 L19,8 C19.5,8 20,8.5 20,9 L20,9 L20,20.5 C20,21.5 19.5,22 18.5,22 L18.5,22 L5.5,22 C4.5,22 4,21.5 4,20.5 L4,20.5 L4,3.5 C4,2.5 4.5,2 5.5,2 L5.5,2 Z M15.1373247,2.01653645 C15.2199343,1.98266808 15.314798,2.00179271 15.3778457,2.06502576 L15.3778457,2.06502576 L19.9350011,6.62202048 C19.9984371,6.68531835 20.0174414,6.78064313 19.9831319,6.86344174 C19.9488223,6.94624035 19.867975,7.00016001 19.7783765,7 L19.7783765,7 L16.3273268,7 C15.5942645,7 15,6.40552528 15,5.67220398 L15,5.67220398 L15,2.21993525 C15.0005529,2.13062717 15.054715,2.05040481 15.1373247,2.01653645 Z M14.5,12 L17.5,12 C17.7761424,12 18,12.2238576 18,12.5 C18,12.7761424 17.7761424,13 17.5,13 L14.5,13 C14.2238576,13 14,12.7761424 14,12.5 C14,12.2238576 14.2238576,12 14.5,12 Z M13.5,15 L17.5,15 C17.7761424,15 18,15.2238576 18,15.5 C18,15.7761424 17.7761424,16 17.5,16 L13.5,16 C13.2238576,16 13,15.7761424 13,15.5 C13,15.2238576 13.2238576,15 13.5,15 Z M6.5,18 L17.5,18 C17.7761424,18 18,18.2238576 18,18.5 C18,18.7761424 17.7761424,19 17.5,19 L6.5,19 C6.22385763,19 6,18.7761424 6,18.5 C6,18.2238576 6.22385763,18 6.5,18 Z M10.1214521,11.4110189 L7.2375106,10.2698868 C6.43149953,9.86313125 5.9409789,8.97772473 5.99921287,8.03471698 C5.99149357,6.8479168 6.84167896,5.85146883 7.9580681,5.73886792 C8.06225927,5.72184158 8.13902336,5.62674137 8.13863535,5.51516981 L8.13863535,4.90566038 C8.13863535,4.40547796 8.52177618,4 8.99440435,4 C9.46703251,4 9.85017334,4.40547796 9.85017334,4.90566038 L9.85017334,5.47169811 C9.85017334,5.59674372 9.94595855,5.69811321 10.0641156,5.69811321 L11.1338268,5.69811321 C11.606455,5.69811321 11.9895958,6.10359117 11.9895958,6.60377358 C11.9895958,7.103956 11.606455,7.50943396 11.1338268,7.50943396 L8.45954873,7.50943396 C7.71075086,7.50943396 7.71075086,7.90430189 7.71075086,8.03471698 C7.69715992,8.2335216 7.75287374,8.43070578 7.86735658,8.58898113 L10.7512981,9.73011321 C11.558832,10.1374908 12.0496363,11.0252042 11.9895958,11.9698113 C11.9950911,13.1548789 11.1454857,14.1486831 10.0307406,14.2611321 C9.92654943,14.2781584 9.84978533,14.3732586 9.85017334,14.4848302 L9.85017334,15.0943396 C9.85017334,15.594522 9.46703251,16 8.99440435,16 C8.52177618,16 8.13863535,15.594522 8.13863535,15.0943396 L8.13863535,14.5283019 C8.13863535,14.4032563 8.04285015,14.3018868 7.92469311,14.3018868 L6.85498186,14.3018868 C6.3823537,14.3018868 5.99921287,13.8964088 5.99921287,13.3962264 C5.99921287,12.896044 6.3823537,12.490566 6.85498186,12.490566 L9.52925997,12.490566 C10.2780578,12.490566 10.2780578,12.0956981 10.2780578,11.965283 C10.2916488,11.7664784 10.235935,11.5692942 10.1214521,11.4110189 Z"
}), 'FileFinancials');

exports["default"] = _default;