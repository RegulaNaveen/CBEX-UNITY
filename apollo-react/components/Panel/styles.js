"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colors = require("../../colors");
var _shadows = require("../../shadows");
var styles = {
  hide: {
    transition: 'visibility 225ms',
    visibility: 'hidden'
  },
  hideLeftBorder: {
    borderLeft: 'none !important'
  },
  animate: {
    transition: 'width 225ms cubic-bezier(0, 0, 0.6, 1) 0ms, background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 20ms, border-color 100ms cubic-bezier(0.4, 0, 0.2, 1) 30ms'
  },
  container: {
    position: 'relative',
    flexShrink: 0,
    '&:last-child': {
      flexShrink: 1
    },
    height: '100%',
    backgroundColor: _colors.white,
    borderLeft: "1px solid ".concat(_colors.neutral3),
    borderRight: "1px solid ".concat(_colors.neutral3)
  },
  //closed panel style
  closedPanel: {
    display: 'flex',
    height: '100%',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: _colors.primaryLight,
      borderColor: _colors.primary,
      '& > button': {
        color: _colors.primary,
        borderColor: _colors.primary,
        backgroundColor: _colors.primaryLight
      }
    }
  },
  toggleButton: {
    boxSizing: 'border-box',
    position: 'absolute',
    right: -12,
    top: 24,
    height: 24,
    width: 24,
    color: _colors.neutral7,
    backgroundColor: _colors.white,
    border: "1px solid ".concat(_colors.neutral4),
    borderRadius: '50%',
    boxShadow: _shadows.shadowLevel1,
    cursor: 'pointer',
    zIndex: 2,
    transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 20ms, border-color 100ms cubic-bezier(0.4, 0, 0.2, 1) 20ms',
    '&:hover': {
      backgroundColor: _colors.primaryLight,
      color: _colors.primary,
      borderColor: _colors.primary
    }
  },
  handleContainer: {
    zIndex: 1,
    position: 'absolute',
    right: -6,
    top: 0,
    bottom: 0,
    padding: 4,
    cursor: 'ew-resize',
    backgroundColor: 'transparent',
    '&:hover div': {
      backgroundColor: _colors.primary,
      width: 3,
      right: 4
    }
  },
  handle: {
    position: 'absolute',
    right: 5,
    top: 0,
    height: '100%',
    width: 1,
    backgroundColor: _colors.neutral3
  },
  chevron: {
    fontSize: 14
  }
};
var _default = styles;
exports.default = _default;