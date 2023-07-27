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
  d: "M21.3333333,10.7908333 C20.2787067,9.63479088 19.0734709,8.62575622 17.75,7.79083333 L21.0833333,4.46166667 C21.2999638,4.25243794 21.3868438,3.94260176 21.310581,3.6512439 C21.2343181,3.35988604 21.0067806,3.13234857 20.7154228,3.0560857 C20.4240649,2.97982284 20.1142287,3.06670285 19.905,3.28333333 L19.89,3.29833333 C19.8614124,3.38925827 19.8120548,3.47228177 19.7458333,3.54083333 L3.49583333,19.7908333 C3.48916667,19.7966667 3.48083333,19.7983333 3.47416667,19.805 C3.3235243,20.1720689 3.45258043,20.5944451 3.78265732,20.8146313 C4.1127342,21.0348175 4.55228135,20.9917425 4.83333333,20.7116667 L8.28833333,17.2566667 C9.42225601,17.7517483 10.6428966,18.0176836 11.88,18.0391667 L12.13,18.0391667 C15.6766667,18.0391667 19.2041667,15.5525 21.3391667,13.2058333 C21.9534252,12.5171579 21.9509116,11.4765333 21.3333333,10.7908333 Z M12,5.95833333 C12.9165452,5.95316097 13.8281225,6.09323055 14.7008333,6.37333333 C14.7706666,6.39633435 14.8235614,6.4539262 14.8405527,6.52545956 C14.857544,6.59699293 14.8361974,6.67221933 14.7841667,6.72416667 L14.7841667,6.72416667 L13.1666667,8.3425 C13.1143639,8.39482469 13.0377683,8.4146119 12.9666667,8.39416667 C12.6525956,8.3019396 12.3273144,8.25342783 12,8.25 C9.92893219,8.25 8.25,9.92893219 8.25,12 C8.25464942,12.327397 8.30399435,12.6526249 8.39666667,12.9666667 C8.41732377,13.0376175 8.39786157,13.1141901 8.34583333,13.1666667 L8.34583333,13.1666667 L5.80833333,15.7083333 C5.73542372,15.7807816 5.62121978,15.7909408 5.53666667,15.7325 C4.49327276,14.9967806 3.53266676,14.1501732 2.67166667,13.2075 C2.04826129,12.5216863 2.05079108,11.4736295 2.6775,10.7908333 C4.83333333,8.41666667 8.41666667,5.91 12,5.95833333 Z M15.2715929,10.3914434 C15.3391037,10.4025569 15.3969679,10.4458623 15.4266667,10.5075 C15.794207,11.3082683 15.8538379,12.2163793 15.5941667,13.0583333 C15.2267322,14.2595263 14.2918944,15.2030893 13.0941667,15.5816667 C12.2434022,15.8525755 11.322146,15.7961114 10.5108333,15.4233333 C10.4493686,15.3935164 10.4061608,15.3357665 10.394903,15.2683854 C10.3836452,15.2010042 10.4057331,15.132345 10.4541667,15.0841667 L15.0875,10.4516667 C15.1353897,10.4028015 15.204082,10.3803298 15.2715929,10.3914434 Z"
}), 'EyeHidden');

exports["default"] = _default;