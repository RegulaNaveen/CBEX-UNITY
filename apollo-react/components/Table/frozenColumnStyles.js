"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colors = require("../../colors");
var _shadows = require("../../shadows");
var _default = {
  frozen: {
    position: 'sticky',
    left: 0,
    backgroundColor: _colors.neutral1,
    zIndex: '2 !important'
  },
  frozenColumn: {
    position: 'sticky',
    left: 0,
    backgroundColor: _colors.white,
    zIndex: 1
  },
  columnLine: {
    borderRight: 'none',
    '&:after': {
      position: 'absolute',
      top: -1,
      right: 0,
      bottom: 0,
      width: 20,
      content: '""',
      borderRight: "1px solid ".concat(_colors.neutral5, " !important")
    }
  },
  columnShadow: {
    '&:after': {
      position: 'absolute',
      top: -1,
      right: 0,
      bottom: 0,
      width: 20,
      content: '""',
      borderRight: "1px solid ".concat(_colors.neutral5),
      boxShadow: _shadows.shadowLevel3Right
    }
  },
  selectedColumnLine: {
    '&&:after': {
      borderRight: "2px solid ".concat(_colors.primary, " !important")
    },
    '& + td': {
      borderLeft: 'none !important'
    }
  }
};
exports.default = _default;