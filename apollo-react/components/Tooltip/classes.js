"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = void 0;
var _colors = require("../../colors");
var classes = {
  tooltip: {
    backgroundColor: _colors.neutral7,
    maxWidth: 256,
    boxSizing: 'border-box',
    position: 'relative',
    fontWeight: 400
  },
  tooltipPlacementLeft: {
    margin: '0 10px !important',
    '@media (min-width:600px)': {
      margin: '0 10px'
    }
  },
  tooltipPlacementRight: {
    margin: '0 12px !important',
    '@media (min-width:600px)': {
      margin: '0 12px'
    }
  },
  tooltipPlacementTop: {
    margin: '11px 0 !important',
    '@media (min-width:600px)': {
      margin: '11px 0'
    }
  },
  tooltipPlacementBottom: {
    margin: '11px 0 !important',
    '@media (min-width:600px)': {
      margin: '11px 0'
    }
  },
  popper: {
    zIndex: 3001
  }
};
exports.classes = classes;