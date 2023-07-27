"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = void 0;
var _colors = require("../../colors");
var classes = {
  select: {
    borderRadius: 4,
    '&:focus': {
      borderRadius: 4,
      backgroundColor: _colors.white
    },
    height: 'auto',
    boxSizing: 'border-box',
    paddingLeft: 8,
    paddingTop: 7,
    paddingBottom: 7,
    alignItems: 'center',
    '&:not([class=*"truncate"])': {
      display: 'flex'
    },
    '&.MuiInputBase-input': {
      paddingRight: 30
    },
    '&:hover, &[aria-pressed="true"]': {
      borderColor: _colors.primary
    }
  },
  icon: {
    color: _colors.neutral7,
    right: 4,
    fontSize: 16,
    paddingRight: 4,
    boxSizing: 'content-box',
    '&.Mui-disabled': {
      color: _colors.neutral5
    }
  },
  iconOpen: {
    transform: 'none'
  }
};
exports.classes = classes;