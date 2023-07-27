"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = void 0;
var _colors = require("../../colors");
var _typography = require("../../typography");
var classes = {
  root: {
    fontFamily: _typography.fontFamily,
    height: 32,
    minWidth: 56,
    borderRadius: 4,
    padding: '4px 8px !important',
    border: "1px solid ".concat(_colors.neutral4),
    backgroundColor: _colors.white,
    color: _colors.neutral7,
    fontSize: 14,
    '&.Mui-disabled': {
      opacity: 0.4,
      backgroundColor: _colors.neutral2,
      color: _colors.neutral7
    },
    '&:hover': {
      backgroundColor: _colors.primaryLight,
      color: _colors.black
    },
    '&:not(:last-child)': {
      borderRight: 0
    },
    '&&:not(:first-of-type)': {
      borderLeft: "1px solid ".concat(_colors.neutral4),
      marginLeft: 0
    },
    '&&.Mui-selected': {
      backgroundColor: _colors.primary,
      borderColor: _colors.primary,
      color: _colors.white,
      '&+button': {
        borderLeft: 'none',
        paddingLeft: '9px !important'
      },
      '&:hover': {
        backgroundColor: _colors.primaryDark,
        color: _colors.white
      },
      '&:after': {
        backgroundColor: 'unset'
      }
    },
    '& svg': {
      fontSize: 16.8,
      padding: 0.1,
      boxSizing: 'content-box'
    }
  },
  label: {
    position: 'relative'
  }
};
exports.classes = classes;