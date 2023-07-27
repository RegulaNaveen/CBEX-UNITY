"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.convertToPlacement = void 0;
var mapping = {
  left_right_top: 'left-start',
  left_right_bottom: 'left-end',
  left_right_center: 'left',
  left_left_bottom: 'top-start',
  left_center_top: 'bottom-end',
  left_center_bottom: 'top-end',
  right_left_top: 'right-start',
  right_left_bottom: 'right-end',
  right_left_center: 'right',
  right_right_top: 'bottom-end',
  right_right_center: 'bottom-end',
  right_right_bottom: 'top-end',
  right_center_bottom: 'top-start',
  center_left_bottom: 'top-start',
  center_right_top: 'bottom-end',
  center_right_bottom: 'top-end',
  center_center_top: 'bottom',
  center_center_center: 'bottom',
  center_center_bottom: 'top'
};
var convertToPlacement = function convertToPlacement() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref$anchorOrigin = _ref.anchorOrigin,
    anchorOrigin = _ref$anchorOrigin === void 0 ? {
      vertical: 'bottom',
      horizontal: 'left'
    } : _ref$anchorOrigin,
    _ref$transformOrigin = _ref.transformOrigin,
    transformOrigin = _ref$transformOrigin === void 0 ? {
      vertical: 'top',
      horizontal: 'left'
    } : _ref$transformOrigin;
  return mapping["".concat(anchorOrigin.horizontal, "_").concat(transformOrigin.horizontal, "_").concat(transformOrigin.vertical)] || 'bottom-start';
};
exports.convertToPlacement = convertToPlacement;
var _default = convertToPlacement;
exports.default = _default;