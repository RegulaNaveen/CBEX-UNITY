"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = void 0;
var _shadows = require("../../shadows");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
// This is a hack until we update to a version of withStyles that supports
// passing in props. We can then just grab the value prop and set it here. This
// style isn't perfectly accurate, since we don't go to each decimal place.
var widthStyles = {};
for (var i = 1; i <= 100; i++) {
  widthStyles["&[aria-valuenow=\"".concat(i, "\"]")] = {
    '& > span': {
      width: "".concat(i, "%"),
      minWidth: 12
    }
  };
}
var classes = {
  root: _objectSpread(_objectSpread({
    height: 12,
    '&[aria-valuenow="0"]': {
      '& > span': {
        minWidth: 0
      }
    }
  }, widthStyles), {}, {
    borderRadius: 24
  }),
  colorPrimary: {
    backgroundColor: _shadows.blackLight,
    height: 12
  },
  bar1Determinate: {
    width: 0,
    '&[style]': {
      transform: 'none !important'
    }
  },
  bar: {
    borderRadius: 24
  }
};
exports.classes = classes;