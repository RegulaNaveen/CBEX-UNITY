"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = void 0;
var _colors = require("../../colors");
var _shadows = require("../../shadows");
var classes = {
  rounded: {
    borderRadius: 4
  },
  elevation1: {
    boxShadow: _shadows.shadowLevel1,
    border: "1px solid ".concat(_colors.neutral3)
  },
  elevation8: {
    border: "1px solid ".concat(_colors.neutral4),
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: _colors.white
  }
};
exports.classes = classes;