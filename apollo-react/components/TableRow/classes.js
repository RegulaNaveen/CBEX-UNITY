"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = void 0;
var _colors = require("../../colors");
var classes = {
  root: {
    '& td:first-of-type': {
      border: 'none'
    },
    borderTop: "1px solid ".concat(_colors.neutral1),
    '&:first-of-type': {
      border: 'none'
    },
    '&.MuiTableRow-hover:hover': {
      backgroundColor: _colors.primaryLight,
      '& td': {
        color: _colors.black
      }
    },
    '&:not(:last-child) td:first-of-type::before': {
      content: '""',
      display: 'block',
      backgroundColor: _colors.white,
      position: 'absolute',
      left: 0,
      top: '100%',
      width: 15,
      height: 1
    }
  },
  head: {
    height: 40
  }
};
exports.classes = classes;