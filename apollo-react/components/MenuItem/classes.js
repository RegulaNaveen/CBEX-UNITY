"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = void 0;
var _colors = require("../../colors");
var classes = {
  root: {
    margin: 0,
    padding: 16,
    borderRadius: 0,
    height: 40,
    minHeight: 'none',
    boxSizing: 'border-box',
    fontSize: 16,
    color: _colors.neutral8,
    fontWeight: 400,
    '&:hover, &.Mui-selected:hover, &:focus:not([data-value=""])': {
      backgroundColor: _colors.primaryLightTransparent,
      color: _colors.black
    },
    '&:focus[data-value=""]': {
      backgroundColor: _colors.white
    },
    '&.Mui-selected': {
      backgroundColor: 'transparent',
      '&:not([data-value=""])': {
        color: _colors.black,
        fontWeight: 500
      }
    },
    '& > svg': {
      position: 'absolute',
      left: 8
    },
    '@media (min-width:600px)': {
      minHeight: 'none'
    }
  },
  gutters: {
    paddingLeft: 16,
    paddingRight: 16
  }
};
exports.classes = classes;