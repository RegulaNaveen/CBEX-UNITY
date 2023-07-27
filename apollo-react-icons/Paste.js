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
  d: "M19,9.99998111 L22,13 L22,20 C22,21.172943 21.3096419,21.928928 20.1663787,21.9952305 L20,21.9999811 L13,21.9999811 C11.8141414,21.9999811 11.0698806,21.2973117 11.0046707,20.1646974 L11,20 L11,12 C11.0022271,10.8216548 11.6901176,10.0701284 12.8335747,10.0046415 L13,9.99998111 L19,9.99998111 Z M18,12 L13.9910837,12.0001715 C13.8978052,12.002915 13.1021948,12.0495542 13.0089163,12.8424211 L13,13 L13.0001715,19.0089163 C13.002915,19.1021948 13.0495542,19.8978052 13.8424211,19.9910837 L14,20 L19,20 C19,20 19.8919753,20 19.9910837,19.1575789 L20,19 L20,14 L18,12 Z M5,2.99993321 L5,5 C4.38095238,5 4.04931973,5.28741497 4.00510204,5.8622449 L4,6 L4,16 C3.97405119,16.434627 4.02963136,16.8923375 4.40056218,16.9847358 L4.5,17 L9,17 C10,17 10,18 10,18 C10,18 10,18.8920217 9.15757888,18.9911352 L9,19.000052 L3.14049605,19.000052 C2.83080317,19.000052 2.53372351,18.8746246 2.31466422,18.6508879 C2.12689912,18.4591136 2.02978914,18.2600718 2.00587537,18.0077935 L1.99993734,17.8770052 L2.00010882,3.99108308 C2.00285247,3.89779839 2.04949463,3.10213483 2.84241125,3.00885013 L3,2.99993321 L5,2.99993321 Z M18.5,17 C18.7761424,17 19,17.2238576 19,17.5 C19,17.7761424 18.7761424,18 18.5,18 L14.5,18 C14.2238576,18 14,17.7761424 14,17.5 C14,17.2238576 14.2238576,17 14.5,17 L18.5,17 Z M18.5,15 C18.7761424,15 19,15.2238576 19,15.5 C19,15.7761424 18.7761424,16 18.5,16 L14.5,16 C14.2238576,16 14,15.7761424 14,15.5 C14,15.2238576 14.2238576,15 14.5,15 L18.5,15 Z M16.5,13 C16.7761424,13 17,13.2238576 17,13.5 C17,13.7761424 16.7761424,14 16.5,14 L14.5,14 C14.2238576,14 14,13.7761424 14,13.5 C14,13.2238576 14.2238576,13 14.5,13 L16.5,13 Z M15,2.99995883 C15,2.99995883 15.8919753,2.99995883 15.9910837,3.84241464 L16,4 L16,8 C16,9.00000629 15.2750355,9.00022109 15,9.00000629 C15,9.00000629 14.1080247,9.00000629 14.0089163,8.15757987 L14,8 L14,6 C14,5.38095238 13.712585,5.04931973 13.1377551,5.00510204 L13,5 L13,2.99995883 L15,2.99995883 Z M8.99870764,1 C9.8709162,1 10.6039769,1.61119243 10.7016083,2.41980061 C10.7117444,2.50110035 10.7727786,2.56644123 10.8529345,2.58939218 L10.9161401,2.5982443 L11.5692131,2.5982443 C11.7806949,2.5982443 11.9565839,2.74041664 11.9930594,2.92790245 L12,3.00014452 L12,4.59809978 C12,4.7914967 11.8535396,4.95313853 11.6582154,4.99141558 L11.5717978,5 L6.4307869,5 C6.21930509,5 6.04341611,4.85782767 6.00694055,4.67034186 L6,4.59809978 L6,3.00014452 C6,2.80284376 6.15239101,2.63874912 6.35335241,2.60471946 L6.4307869,2.5982443 L7.08127513,2.5982443 C7.19123749,2.59884902 7.28388508,2.52178644 7.29580701,2.41980061 C7.39343841,1.61119243 8.12649908,1 8.99870764,1 Z"
}), 'Paste');

exports["default"] = _default;