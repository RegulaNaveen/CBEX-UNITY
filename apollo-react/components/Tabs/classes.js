"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = void 0;
var _colors = require("../../colors");
var classes = {
  root: {
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      borderBottom: "1px solid ".concat(_colors.neutral4),
      height: 0,
      width: '100%',
      bottom: 0,
      marginBottom: 2
    }
  },
  indicator: {
    height: 5,
    borderRadius: 4
  }
};
exports.classes = classes;