"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RadialProgress = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _InternalRadialProgress = _interopRequireDefault(require("./InternalRadialProgress"));
var _excluded = ["variant", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var colors = {
  default: _colors.primary,
  positive: _colors.utilityPositive,
  negative: _colors.utilityNegative,
  warning: _colors.utilityWarning
};
var RadialProgress = function RadialProgress(_ref) {
  var variant = _ref.variant,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var color = variant ? colors[variant] : colors.default;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_InternalRadialProgress.default, _extends({
    size: 25,
    thickness: 7,
    style: {
      color: color + '30'
    },
    variant: "determinate",
    color: "secondary"
  }, rest, {
    value: 100
  })), /*#__PURE__*/_react.default.createElement(_InternalRadialProgress.default, _extends({
    size: 25,
    thickness: 7,
    style: {
      color: color
    },
    variant: "determinate",
    color: "primary"
  }, rest, {
    ref: ref
  })));
};
exports.RadialProgress = RadialProgress;
RadialProgress.propTypes = {
  /** The variant to use. */
  variant: _propTypes.default.oneOf(['default', 'positive', 'negative', 'warning'])
};
var _default = (0, _withRef.default)()(RadialProgress);
exports.default = _default;