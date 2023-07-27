"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = void 0;
var _colors = require("../../colors");
var _shadows = require("../../shadows");
var _typography = require("../../typography");
var classes = {
  root: {
    borderRadius: 4,
    whiteSpace: 'nowrap',
    fontFamily: _typography.fontFamily,
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '24px',
    padding: '0 16px',
    height: 40,
    minWidth: 56,
    '&.Mui-disabled': {
      opacity: 0.4
    }
  },
  contained: {
    boxShadow: 'none',
    color: _colors.neutral8,
    backgroundColor: _colors.neutral2,
    '&:hover': {
      backgroundColor: _colors.neutral4,
      boxShadow: 'none'
    },
    '&:active': {
      boxShadow: 'unset'
    },
    '&.Mui-disabled': {
      backgroundColor: _colors.neutral2,
      color: _colors.neutral8
    }
  },
  containedPrimary: {
    backgroundColor: _colors.primary,
    color: _colors.white,
    boxShadow: _shadows.shadowLevel2,
    '&:hover': {
      backgroundColor: _colors.primaryDark,
      boxShadow: _shadows.shadowLevel2Hover
    },
    '&.Mui-disabled': {
      backgroundColor: _colors.primary,
      color: _colors.white
    }
  },
  outlinedSecondary: {
    padding: '0 16px',
    color: _colors.primary,
    backgroundColor: _colors.white,
    border: "1px solid ".concat(_colors.neutral4),
    boxShadow: _shadows.shadowLevel1,
    '&:hover': {
      backgroundColor: _colors.primaryLight,
      border: "1px solid ".concat(_colors.primary)
    },
    '&.Mui-disabled': {
      backgroundColor: _colors.white,
      color: _colors.primary,
      boxShadow: 'none',
      borderColor: 'rgba(0, 0, 0, .24)'
    }
  },
  sizeSmall: {
    height: 32,
    fontSize: 14,
    padding: '0 8px'
  },
  text: {
    padding: '0 16px 0 16px'
  },
  textPrimary: {
    '&:hover': {
      backgroundColor: _colors.primaryLightTransparent
    },
    '&.Mui-disabled': {
      color: _colors.primary
    }
  },
  label: {
    position: 'relative'
  }
};
exports.classes = classes;