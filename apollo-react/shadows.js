"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shadowLevel3Right = exports.shadowLevel3 = exports.shadowLevel2Hover = exports.shadowLevel2 = exports.shadowLevel1 = exports.neutral6ExtraLight = exports.greenExtraLight = exports.boxShadowSwitch = exports.blueDarkHover = exports.blueDark = exports.blackLight = exports.blackExtraLight = exports.blackDark = void 0;
var _colors = require("./colors");
var _colorUtils = require("./utils/colorUtils");
// Modal Back Drop
var blackDark = (0, _colorUtils.hexToRGBA)("".concat(_colors.black), 0.56);

// Base box shadow colors
exports.blackDark = blackDark;
var neutral6ExtraLight = (0, _colorUtils.hexToRGBA)("".concat(_colors.neutral6), 0.08);
exports.neutral6ExtraLight = neutral6ExtraLight;
var blackExtraLight = (0, _colorUtils.hexToRGBA)("".concat(_colors.black), 0.08);
exports.blackExtraLight = blackExtraLight;
var blackLight = (0, _colorUtils.hexToRGBA)("".concat(_colors.black), 0.16);
exports.blackLight = blackLight;
var blueDark = (0, _colorUtils.hexToRGBA)("".concat(_colors.primary), 0.32);
exports.blueDark = blueDark;
var blueDarkHover = (0, _colorUtils.hexToRGBA)("".concat(_colors.primaryDark2), 0.32);
exports.blueDarkHover = blueDarkHover;
var greenExtraLight = (0, _colorUtils.hexToRGBA)("".concat(_colors.green), 0.08);

// Switch box shadows
exports.greenExtraLight = greenExtraLight;
var boxShadowSwitch = "0 4px 16px 0 ".concat((0, _colorUtils.hexToRGBA)(_colors.black, 0.04));

// New shadows
exports.boxShadowSwitch = boxShadowSwitch;
var shadowLevel1 = '0 4px 16px 0 rgba(0, 0, 0, 0.04)';
exports.shadowLevel1 = shadowLevel1;
var shadowLevel2 = "0 4px 8px 0 ".concat(blueDark, ", ").concat(shadowLevel1);
exports.shadowLevel2 = shadowLevel2;
var shadowLevel2Hover = "0 4px 8px 0 ".concat(blueDarkHover, ", ").concat(shadowLevel1);
exports.shadowLevel2Hover = shadowLevel2Hover;
var shadowLevel3 = '0 8px 20px 0 rgba(0, 0, 0, 0.08)';
exports.shadowLevel3 = shadowLevel3;
var shadowLevel3Right = '13px 0px 13px 0px rgba(0, 0, 0, 0.06)';
exports.shadowLevel3Right = shadowLevel3Right;