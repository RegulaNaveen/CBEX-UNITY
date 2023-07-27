"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colors = require("./colors");
var palette = {
  mode: 'light',
  primary: {
    light: _colors.primaryLight2,
    main: _colors.primary,
    dark: _colors.primaryDark2
  },
  secondary: {
    light: _colors.secondaryLight,
    main: _colors.secondary,
    dark: _colors.secondaryDark
  },
  grey: _colors.themeGrey,
  error: {
    light: _colors.redLight,
    main: _colors.red,
    dark: _colors.redDark
  },
  background: {
    default: _colors.neutral1,
    paper: _colors.white
  },
  divider: _colors.primaryDivider
};
var _default = palette;
exports.default = _default;