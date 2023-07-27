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
  d: "M7.93812503,2 L20.9361249,2.0017022 C21.5236869,2.0017022 22,2.47801529 22,3.06557726 C22,3.65313923 21.5236869,3.999452 20.9361249,3.999452 L20.9361249,3.999452 L18.1513256,3.999452 C18.0948248,3.99922463 18.0405724,4.02156955 18.0006199,4.061522 C17.9606675,4.10147445 17.9383232,4.15572616 17.9385506,4.212227 L17.9385506,4.212227 L17.9385506,20.9386782 C17.9385506,21.5262402 17.4622375,22.0025533 16.8746755,22.0025533 C16.2871135,22.0025533 15.8108005,21.5262402 15.8108005,20.9386782 L15.8108005,20.9386782 L15.8108005,4.212227 C15.8108005,4.09471461 15.7155378,3.999452 15.5980254,3.999452 L15.5980254,3.999452 L12.4642751,3.999452 C12.3467627,3.999452 12.2515001,4.09471461 12.2515001,4.212227 L12.2515001,4.212227 L12.2515001,20.9386782 C12.2515001,21.5262402 11.775187,22.0025533 11.187625,22.0025533 C10.600063,22.0025533 10.1237499,21.5262402 10.1237499,20.9386782 L10.1237499,20.9386782 L10.1237499,14.0890251 C10.1237499,13.9715127 10.0284873,13.8762501 9.91097494,13.8762501 L9.91097494,13.8762501 L7.93812503,13.8762501 C4.65858913,13.8762501 2,11.2176609 2,7.93812503 C2,4.65858913 4.65858913,2 7.93812503,2 L7.93812503,2 Z M9.91097494,4 L7.93812503,4 C5.83371307,4 4.12775012,5.70599034 4.12775012,7.8104023 C4.12775012,9.91481425 5.83371307,11.6207772 7.93812503,11.6207772 L7.93812503,11.6207772 L9.91437934,11.6207772 C10.0318917,11.6207772 10.1271614,11.5255146 10.1271614,11.4080022 L10.1271614,11.4080022 L10.1271614,4.2145046 C10.1276203,4.15718375 10.1049384,4.10209966 10.0642452,4.06172689 C10.023552,4.02135412 9.96829031,3.99910833 9.91097494,4 L9.91097494,4 Z"
}), 'Paragraph');

exports["default"] = _default;