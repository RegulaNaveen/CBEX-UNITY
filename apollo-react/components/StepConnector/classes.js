"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = void 0;
var _colors = require("../../colors");
var classes = {
  line: {
    borderRadius: 1
  },
  vertical: {
    borderLeftColor: 'transparent',
    paddingTop: 4,
    paddingBottom: 4
  },
  lineVertical: {
    marginLeft: -1,
    backgroundColor: _colors.neutral5,
    borderLeftStyle: 'none',
    width: 2,
    minHeight: 40
  },
  horizontal: {
    borderTopColor: 'transparent'
  },
  lineHorizontal: {
    borderTopColor: _colors.neutral5,
    borderTopStyle: 'solid',
    borderTopWidth: 2
  },
  root: {
    '&.Mui-active': {
      '& .MuiStepConnector-line': {
        borderColor: _colors.utilityPositive,
        backgroundColor: _colors.utilityPositive,
        borderWidth: 2
      }
    },
    '&.Mui-completed': {
      '& .MuiStepConnector-line': {
        borderColor: _colors.utilityPositive,
        backgroundColor: _colors.utilityPositive,
        borderWidth: 2
      }
    }
  },
  alternativeLabel: {
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
    top: 11
  }
};
exports.classes = classes;