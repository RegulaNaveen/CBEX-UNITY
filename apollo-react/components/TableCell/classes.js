"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = void 0;
var _colors = require("../../colors");
var classes = {
  root: {
    borderBottom: 'none',
    padding: '4px 8px',
    position: 'relative',
    '&:first-of-type': {
      paddingLeft: 16
    },
    '&:last-child': {
      paddingRight: 16
    }
  },
  body: {
    fontSize: 14,
    color: _colors.neutral7,
    padding: '0 4px'
  },
  head: {
    fontSize: 'inherit',
    color: _colors.neutral7,
    padding: '8px 4px'
  }
};
exports.classes = classes;