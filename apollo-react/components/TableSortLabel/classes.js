"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = void 0;
var _colors = require("../../colors");
var classes = {
  root: {
    '&:hover': {
      color: _colors.black,
      '&& .MuiTableSortLabel-icon': {
        color: _colors.primary,
        opacity: 1
      }
    },
    '&.Mui-active': {
      color: _colors.black,
      fontWeight: 600,
      '& .MuiTableSortLabel-icon': {
        color: _colors.black
      }
    },
    '&:not(.Mui-active)': {
      '@global svg': {
        transform: 'rotate(180deg)'
      }
    }
  },
  icon: {
    width: 16,
    height: 16
  }
};
exports.classes = classes;