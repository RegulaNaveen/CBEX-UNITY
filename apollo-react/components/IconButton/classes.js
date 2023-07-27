"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = void 0;
var _colors = require("../../colors");
var classes = {
  root: {
    height: 40,
    width: 40,
    padding: 0,
    color: _colors.neutral7,
    '&:hover': {
      color: _colors.black,
      backgroundColor: _colors.primaryLight
    },
    '&.Mui-disabled': {
      color: 'unset',
      opacity: 0.4
    }
  },
  colorPrimary: {
    color: _colors.primary,
    '&:hover, &:disabled': {
      color: _colors.primary
    }
  },
  colorSecondary: {
    color: _colors.secondary,
    '&:hover, &:disabled': {
      color: _colors.secondary
    }
  },
  label: {
    position: 'relative'
  }
};
exports.classes = classes;