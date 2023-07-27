"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transparencyToOpaque = exports.hexToRGBA = void 0;
// takes in a hex color and opacity
// returns a transparent rgba
var hexToRGBA = function hexToRGBA(hex) {
  var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var r = parseInt(hex.slice(1, 3), 16);
  var g = parseInt(hex.slice(3, 5), 16);
  var b = parseInt(hex.slice(5, 7), 16);
  return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(alpha, ")");
};

// takes in a hex color and opacity
// returns an opaque rgba equivalent to the transparent hex color on white background
exports.hexToRGBA = hexToRGBA;
var transparencyToOpaque = function transparencyToOpaque(hex) {
  var opacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var rgbArray = hexToRGBA(hex).match(/\d+/g);
  var adjustedRgbArray = rgbArray.map(function (n) {
    return Math.round(255 - (255 - n) * opacity);
  });
  return "rgba(".concat(adjustedRgbArray[0], ", ").concat(adjustedRgbArray[1], ", ").concat(adjustedRgbArray[2], ", 1)");
};
exports.transparencyToOpaque = transparencyToOpaque;