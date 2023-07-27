"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transitionTime = exports.textFieldHoverStyle = exports.textFieldFocusStyle = exports.textFieldFadeOut = exports.textFieldFadeIn = void 0;
var _colors = require("./colors");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var transitionTime = {
  short: '0.2s',
  long: '0.4s'
};
exports.transitionTime = transitionTime;
var textFieldFadeIn = {
  transitionProperty: 'border-color',
  transitionDuration: transitionTime.short
};
exports.textFieldFadeIn = textFieldFadeIn;
var textFieldFadeOut = {
  transitionProperty: 'border-color',
  transitionDuration: transitionTime.long
};
exports.textFieldFadeOut = textFieldFadeOut;
var textFieldHoverStyle = _objectSpread(_objectSpread({}, textFieldFadeIn), {}, {
  borderColor: _colors.primary
});
exports.textFieldHoverStyle = textFieldHoverStyle;
var textFieldFocusStyle = textFieldHoverStyle;
exports.textFieldFocusStyle = textFieldFocusStyle;