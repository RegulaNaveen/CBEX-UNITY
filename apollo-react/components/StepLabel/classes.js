"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = void 0;
var _colors = require("../../colors");
var classes = {
  root: {
    padding: 0
  },
  label: {
    color: _colors.neutral6,
    fontWeight: 500,
    fontSize: 16,
    '&.Mui-active': {
      color: _colors.black,
      fontWeight: 600
    },
    '&.Mui-completed': {
      color: _colors.neutral7
    },
    '&.MuiStepLabel-alternativeLabel': {
      marginTop: 8
    }
  }
};
exports.classes = classes;