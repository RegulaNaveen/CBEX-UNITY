"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = void 0;
var _colors = require("../../colors");
var _shadows = require("../../shadows");
var classes = {
  root: {
    padding: '3px 0',
    '&.Mui-disabled': {
      opacity: 0.4
    }
  },
  rail: {
    height: 4,
    backgroundColor: _colors.neutral4,
    opacity: 1,
    borderRadius: 4,
    transform: 'unset'
  },
  track: {
    height: 4,
    borderRadius: 4,
    backgroundColor: _colors.primary,
    border: 'none',
    transform: 'unset',
    '&.Mui-disabled': {
      backgroundColor: _colors.primary
    }
  },
  thumb: {
    border: "1px solid ".concat(_colors.neutral5),
    boxShadow: _shadows.shadowLevel3,
    marginTop: '2px !important',
    marginLeft: 0,
    height: 16,
    width: 16,
    '&::before': {
      boxShadow: 'unset'
    },
    '&, &.Mui-disabled': {
      backgroundColor: _colors.white,
      marginTop: '2px !important',
      marginLeft: 0,
      height: 16,
      width: 16
    },
    '&.Mui-active': {
      marginTop: '2px !important',
      marginLeft: 0,
      height: 20,
      width: 20,
      border: "1px solid ".concat(_colors.primary),
      boxShadow: _shadows.shadowLevel3
    },
    '&.Mui-focusVisible': {
      boxShadow: 'unset'
    },
    '&:hover': {
      border: "1px solid ".concat(_colors.primary),
      boxShadow: _shadows.shadowLevel3
    }
  }
};
exports.classes = classes;