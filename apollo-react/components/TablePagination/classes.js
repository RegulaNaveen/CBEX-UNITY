"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = void 0;
var _colors = require("../../colors");
var classes = {
  root: {
    color: _colors.neutral7,
    '& p a:nth-of-type(4)': {
      marginRight: 'auto',
      marginLeft: 'auto'
    }
  },
  caption: {
    fontSize: 13,
    fontWeight: 400
  },
  toolbar: {
    borderTop: "1px solid ".concat(_colors.neutral1),
    height: 56
  },
  spacer: {
    flex: 'unset'
  },
  selectRoot: {
    marginLeft: 0,
    marginRight: 0
  },
  select: {
    paddingRight: '30px !important',
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 12
  },
  input: {
    marginLeft: 10,
    marginRight: 10
  },
  selectIcon: {
    top: 'calc(50% - 12px)',
    color: 'inherit'
  }
};
exports.classes = classes;