"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = void 0;
var _colors = require("../../colors");
var classes = {
  root: {
    '&.Mui-disabled': {
      color: _colors.neutral8
    },
    '&.MuiInputLabel-root': {
      overflow: 'visible'
    }
  },
  asterisk: {
    color: _colors.utilityNegative,
    position: 'relative',
    bottom: 2,
    left: 3
  }
};
exports.classes = classes;