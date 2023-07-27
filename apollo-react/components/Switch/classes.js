"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = void 0;
var _colors = require("../../colors");
var _shadows = require("../../shadows");
var classes = {
  root: {
    position: 'relative',
    padding: 0,
    boxSizing: 'content-box'
  },
  colorPrimary: {
    '&.Mui-checked': {
      color: _colors.white,
      transform: 'translateX(24px)',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: _colors.utilityPositive,
        boxShadow: 'none'
      },
      '& .MuiSwitch-thumb': {
        boxShadow: _shadows.boxShadowSwitch
      },
      '&&:hover': {
        background: 'none'
      }
    },
    '&:hover': {
      background: 'none'
    }
  },
  track: {
    width: 56,
    height: 32,
    borderRadius: 16,
    backgroundColor: _colors.neutral6,
    boxShadow: 'none',
    opacity: 1
  },
  switchBase: {
    top: -5,
    left: -5,
    '&.Mui-disabled, &.Mui-checked.Mui-disabled': {
      opacity: 1,
      '& + .MuiSwitch-track': {
        opacity: 0.4
      },
      '& .MuiSwitch-thumb': {
        color: _colors.white,
        boxShadow: _shadows.boxShadowSwitch
      },
      '&.MuiSwitch-switchBase': {
        '& + .MuiSwitch-track': {
          backgroundColor: _colors.neutral6
        },
        '&.Mui-checked': {
          '& + .MuiSwitch-track': {
            backgroundColor: _colors.utilityPositive,
            boxShadow: 'none'
          }
        }
      }
    }
  },
  thumb: {
    width: 24,
    height: 24,
    boxShadow: _shadows.boxShadowSwitch,
    color: _colors.white
  },
  sizeSmall: {
    padding: 0,
    width: 48,
    '& .MuiSwitch-track': {
      width: 48,
      height: 24
    },
    '& .MuiSwitch-thumb': {
      width: 16,
      height: 16
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      top: 2,
      left: 2,
      '&.Mui-checked': {
        transform: 'translateX(24px)'
      }
    }
  }
};
exports.classes = classes;