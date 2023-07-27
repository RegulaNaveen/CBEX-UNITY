"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = void 0;
var _colors = require("../../colors");
var classes = {
  root: {
    color: _colors.neutral7,
    padding: '0 32px',
    minHeight: 48,
    '&:hover': {
      background: _colors.primaryLight,
      color: _colors.black
    },
    '&.Mui-disabled': {
      opacity: 1,
      '& div': {
        opacity: 0.4
      }
    },
    '&.Mui-expanded': {
      minHeight: 48,
      color: _colors.black
    }
  },
  content: {
    minHeight: 48,
    lineHeight: '24px',
    margin: 0,
    alignItems: 'center',
    display: 'block',
    '&.Mui-expanded': {
      margin: 0
    }
  },
  expandIconWrapper: {
    left: '8px !important'
  }
};
exports.classes = classes;