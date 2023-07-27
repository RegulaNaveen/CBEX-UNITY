"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = void 0;
var _shadows = require("../../shadows");
var classes = {
  root: {
    minHeight: 48,
    width: '100%',
    borderRadius: 0,
    maxWidth: '100%',
    padding: 0,
    flexGrow: 1,
    position: 'relative',
    boxShadow: _shadows.shadowLevel3,
    boxSizing: 'border-box'
  },
  message: {
    width: '100%',
    padding: '12px 0',
    display: 'flex',
    justifyContent: 'center'
  },
  action: {
    top: 8,
    right: 16,
    position: 'absolute',
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 0
  }
};
exports.classes = classes;