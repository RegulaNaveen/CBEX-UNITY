"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = void 0;
var _colors = require("../../colors");
var classes = {
  colorPrimary: {
    color: _colors.neutral4,
    width: 16,
    height: 16,
    top: 8,
    left: 11,
    padding: 0,
    borderRadius: 0,
    '&.MuiCheckbox-indeterminate': {
      color: _colors.primary
    },
    '&.Mui-checked.Mui-disabled, &.MuiCheckbox-indeterminate&.Mui-disabled': {
      color: _colors.primary,
      opacity: 0.4
    },
    '&.Mui-disabled': {
      color: _colors.neutral4,
      opacity: 1,
      '&:not(.MuiCheckbox-indeterminate) rect': {
        fill: _colors.neutral2
      }
    }
  }
};
exports.classes = classes;