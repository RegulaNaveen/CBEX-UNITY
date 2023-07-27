"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = void 0;
var _colors = require("../../colors");
var classes = {
  root: {
    '& >.MuiTreeItem-content, &.Mui-selected.MuiTreeItem-content, &.Mui-selected.MuiTreeItem-content:hover, &.Mui-selected:focus.MuiTreeItem-content': {
      backgroundColor: 'transparent !important'
    },
    '& >.MuiTreeItem-content:hover, & >.MuiTreeItem-content.Mui-selected': {
      '&::before': {
        backgroundColor: _colors.primaryLightTransparent,
        content: "''",
        position: 'absolute',
        height: 32,
        left: 0,
        right: 0
      },
      '& > .MuiTreeItem-label': {
        color: _colors.black
      },
      '& svg': {
        color: _colors.black
      }
    },
    '& >.Mui-selected.MuiTreeItem-content, & >.Mui-expanded.MuiTreeItem-content ': {
      '& >.MuiTreeItem-label': {
        fontWeight: 600,
        color: _colors.black
      },
      '& svg': {
        color: _colors.black
      }
    }
  },
  group: {
    marginLeft: 18
  },
  content: {
    paddingLeft: 15,
    width: 'calc(100% - 15px)'
  },
  iconContainer: {
    zIndex: 1,
    '& svg': {
      fontSize: 16.8,
      boxSizing: 'content-box',
      color: _colors.neutral7
    }
  },
  label: {
    paddingLeft: 2,
    fontSize: 14,
    lineHeight: '32px',
    color: _colors.neutral8,
    display: 'flex',
    justifyContent: 'space-between',
    width: 'calc(100% - 36px)',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  }
};
exports.classes = classes;