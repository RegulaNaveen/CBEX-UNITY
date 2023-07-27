"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = void 0;
var _colors = require("../../colors");
var classes = {
  root: {
    alignItems: 'start',
    marginRight: 24,
    '&:not(.Mui-disabled):hover': {
      '& .Mui-checked svg, & .MuiCheckbox-indeterminate svg': {
        color: _colors.primaryDark2
      },
      '& svg': {
        color: _colors.primary
      },
      '& .MuiCheckbox-root:not(.MuiCheckbox-indeterminate) rect, & circle[r="7"], & circle[r="6"]': {
        fill: _colors.primaryLight
      },
      '& .MuiSwitch-thumb': {
        color: _colors.primaryLight
      }
    },
    '&.Mui-disabled': {
      pointerEvents: 'none'
    },
    '& .MuiSwitch-root + .MuiFormControlLabel-label': {
      fontSize: 14,
      paddingTop: 'revert',
      paddingLeft: 'revert',
      paddingBottom: 5
    }
  },
  label: {
    paddingTop: 4,
    paddingBottom: 4,
    position: 'relative',
    paddingLeft: 19,
    width: '100%',
    fontSize: 16,
    '&:not(:hover)': {
      color: _colors.neutral8
    },
    '&.Mui-disabled:not(:hover)': {
      color: _colors.neutral6
    }
  }
};
exports.classes = classes;