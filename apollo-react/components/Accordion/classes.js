"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = void 0;
var _colors = require("../../colors");
var classes = {
  root: {
    boxShadow: 'none',
    borderBottom: "solid 1px ".concat(_colors.neutral3),
    '&.Mui-disabled': {
      backgroundColor: _colors.white
    },
    '&::before': {
      display: 'none'
    },
    '&.Mui-expanded': {
      margin: '0'
    },
    '&.MuiPaper-elevation1': {
      borderWidth: '0 0 1px 0'
    },
    '.MuiAccordionSummary-expandIconWrapper': {
      position: 'absolute',
      color: 'inherit',
      right: 'unset',
      top: 24,
      left: -4,
      transform: 'translateY(-50%) rotate(-90deg)',
      '&.Mui-expanded': {
        transform: 'translateY(-50%) rotate(0deg)'
      }
    }
  }
};
exports.classes = classes;