"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = void 0;
var _colors = require("../../colors");
var classes = {
  root: {
    marginRight: 32,
    minWidth: 'auto',
    padding: 0,
    fontSize: 16,
    '@media (min-width:600px)': {
      minWidth: 'auto',
      padding: 0
    },
    '& > span': {
      position: 'relative'
    },
    '& .MuiBadge-anchorOriginTopRightRectangular': {
      top: -8,
      right: -4
    }
  },
  textColorPrimary: {
    color: _colors.neutral7,
    fontWeight: 500,
    opacity: 1,
    '&.Mui-selected': {
      color: _colors.black,
      fontWeight: 600
    },
    '&.Mui-disabled': {
      opacity: 0.4,
      color: _colors.neutral7
    },
    '&:hover': {
      color: _colors.black
    }
  }
};
exports.classes = classes;