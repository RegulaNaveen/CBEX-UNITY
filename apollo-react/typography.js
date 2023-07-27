"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fontFamily = exports.default = void 0;
require("./fonts/font.css");
var _colors = require("./colors");
var fontFamily = 'Proxima Nova, Noto Sans, Helvetica, Arial, sans-serif';
exports.fontFamily = fontFamily;
var _default = {
  fontFamily: fontFamily,
  h1: {
    color: _colors.black,
    fontSize: 40,
    fontWeight: 600,
    lineHeight: 1
  },
  h2: {
    color: _colors.black,
    fontSize: 32,
    fontWeight: 600,
    lineHeight: 1
  },
  // title1
  h3: {
    color: _colors.black,
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 1.04
  },
  // title2
  h4: {
    color: _colors.black,
    fontSize: 18,
    lineHeight: 1.17
  },
  body1: {
    color: _colors.black,
    fontSize: 16,
    lineHeight: 1.5
  },
  body2: {
    color: _colors.black,
    fontSize: 14,
    lineHeight: 1.5
  },
  caption: {
    color: _colors.black,
    fontSize: 13,
    lineHeight: 1.66
  },
  button: {
    textTransform: 'none'
  }
};
exports.default = _default;