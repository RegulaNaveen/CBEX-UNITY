"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = void 0;
var _colors = require("../../colors");
var classes = {
  root: {
    borderRadius: 16,
    fontSize: 16,
    cursor: 'pointer',
    marginRight: '0.5em',
    height: 32,
    fontWeight: 500,
    color: _colors.white,
    backgroundColor: _colors.primary,
    border: "1px solid ".concat(_colors.primary),
    '&&:hover': {
      backgroundColor: _colors.primaryDark,
      borderColor: _colors.primaryDark,
      color: _colors.white
    },
    '& .MuiChip-avatar': {
      height: 24,
      width: 24,
      marginLeft: 3,
      marginRight: -5
    }
  },
  label: {
    paddingLeft: 11,
    paddingRight: 0
  },
  icon: {
    fontSize: 19.22,
    padding: 0.4,
    boxSizing: 'content-box',
    color: _colors.white,
    marginLeft: 5,
    marginRight: -9
  },
  outlined: {
    boxShadow: 'none',
    border: "1px solid ".concat(_colors.primary),
    color: _colors.primary,
    backgroundColor: _colors.white,
    paddingRight: 12,
    '.MuiChip-clickable&&:hover': {
      boxShadow: 'none',
      color: _colors.primary,
      backgroundColor: _colors.primaryLight
    },
    '&&:focus': {
      backgroundColor: 'unset'
    },
    '& .MuiChip-icon': {
      marginLeft: 4
    }
  },
  deletable: {
    '&:focus': 'unset'
  },
  deleteIcon: {
    height: 19.22,
    width: 19.22,
    boxSizing: 'content-box',
    padding: '6.4px 5.4px 6.4px 2.4px !important',
    color: _colors.white,
    margin: 0,
    '&:hover': {
      color: 'unset'
    }
  },
  sizeSmall: {
    height: 24
  },
  labelSmall: {
    fontSize: 14,
    paddingRight: 4,
    paddingLeft: 7
  },
  deleteIconSmall: {
    marginRight: 0,
    padding: '6px 2.1px 6px 3.1px !important',
    width: 16,
    height: 16,
    marginLeft: -4
  },
  iconSmall: {
    height: 16.8,
    width: 16.8,
    padding: '3.6px .6px 3.6px 1.6px',
    marginLeft: 0,
    marginRight: -5
  }
};
exports.classes = classes;