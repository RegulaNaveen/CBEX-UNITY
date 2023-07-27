"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = void 0;
var _colors = require("../../colors");
var _shadows = require("../../shadows");
var classes = {
  circle: {
    strokeLinecap: 'round'
  },
  colorPrimary: {
    color: _colors.primary
  },
  colorSecondary: {
    color: _shadows.blackLight,
    position: 'absolute'
  }
};
exports.classes = classes;