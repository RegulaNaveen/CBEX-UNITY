"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = void 0;
var _colors = require("../../colors");
var _shadows = require("../../shadows");
var classes = {
  badge: {
    minWidth: 16,
    height: 16,
    borderRadius: 10,
    boxShadow: _shadows.shadowLevel3,
    backgroundColor: _colors.fuchsia,
    color: _colors.white,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: '16px',
    padding: '0 4px'
  },
  dot: {
    height: 8,
    minWidth: 8,
    zIndex: 100,
    boxShadow: _shadows.shadowLevel3,
    backgroundColor: _colors.fuchsia
  },
  anchorOriginTopRightRectangular: {
    top: -4,
    right: -4
  }
};
exports.classes = classes;