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
  d: "M4.66041167,2 C5.58088625,2 6.32707834,2.74619208 6.32707834,3.66666667 C6.32707834,4.58714125 5.58088625,5.33333333 4.66041167,5.33333333 L3.82707834,5.33333333 L3.8286715,9.67756382 C3.8286715,11.518513 5.32105566,13.0108972 7.16200483,13.0108972 L7.83176864,13.011004 C9.67271781,13.011004 11.165102,11.5186198 11.165102,9.67767062 L11.1635088,5.33344014 L10.3301755,5.33344014 C9.4097009,5.33344014 8.66350882,4.58724806 8.66350882,3.66677347 C8.66350882,2.74629889 9.4097009,2 10.3301755,2 L11.1635088,2 L11.1635088,2.83344014 C12.0839834,2.83344014 12.8301755,3.57963222 12.8301755,4.50010681 L12.8317686,9.67767062 C12.8317686,12.2987174 10.8150034,14.4487235 8.24862061,14.6605413 C8.45269791,18.6836377 9.94471167,20.3333333 12.8333333,20.3333333 C15.9936159,20.3333333 17.9695705,17.3533611 18.2035261,14.2777846 C16.7259233,13.9359498 15.6245267,12.6116796 15.6245267,11.0301645 C15.6245267,9.18921536 17.1169108,7.69683119 18.95786,7.69683119 C20.7988092,7.69683119 22.2911933,9.18921536 22.2911933,11.0301645 C22.2911933,12.551982 21.2713765,13.8356085 19.8778726,14.2349143 C19.6486207,18.1380581 17.2110926,22 12.8333333,22 C8.94414476,22 6.98566496,19.5677366 6.74635116,14.7186407 C6.74641637,14.7186407 6.74644897,14.6992742 6.74644897,14.6605413 C4.17944909,14.4493406 2.16200483,12.2990519 2.16200483,9.67756382 L2.16041167,4.5 C2.16041167,3.57952542 2.90660375,2.83333333 3.82707834,2.83333333 L3.82707834,2 L4.66041167,2 Z M19,9 C17.8954305,9 17,9.8954305 17,11 C17,12.1045695 17.8954305,13 19,13 C20.1045695,13 21,12.1045695 21,11 C21,9.8954305 20.1045695,9 19,9 Z M19,10 C19.5522847,10 20,10.4477153 20,11 C20,11.5522847 19.5522847,12 19,12 C18.4477153,12 18,11.5522847 18,11 C18,10.4477153 18.4477153,10 19,10 Z"
}), 'Stethoscope');

exports["default"] = _default;