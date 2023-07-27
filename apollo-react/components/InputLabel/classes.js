"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = void 0;
var _colors = require("../../colors");
var classes = {
  root: {
    fontSize: 14,
    color: _colors.neutral8,
    lineHeight: 1.5,
    '&.Mui-focused, &.Mui-error': {
      color: _colors.neutral8
    }
  },
  formControl: {
    transform: 'none',
    position: 'relative'
  },
  shrink: {
    transform: 'none'
  },
  animated: {
    transition: 'none'
  }
};
exports.classes = classes;