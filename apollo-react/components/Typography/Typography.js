"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Typography = void 0;
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _excluded = ["darkMode", "variant", "className", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var fixVariant = function fixVariant(variant) {
  if (variant === 'title1') {
    return 'h3';
  } else if (variant === 'title2') {
    return 'h4';
  } else {
    return variant;
  }
};
var styles = {
  darkMode: {
    color: _colors.white
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var Typography = function Typography(_ref) {
  var darkMode = _ref.darkMode,
    variant = _ref.variant,
    className = _ref.className,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_Typography.default, _extends({
    className: (0, _classnames.default)(darkMode && classes.darkMode, className),
    variant: fixVariant(variant)
  }, rest, {
    ref: ref
  }));
};
exports.Typography = Typography;
Typography.propTypes = {
  /** If `true`, the component has a lighter appearance, for display on a dark background. */
  darkMode: _propTypes.default.bool,
  /** If `true`, the text has a bottom margin added. */
  gutterBottom: _propTypes.default.bool,
  /**
   * If `true`, the text truncates with an overflow ellipsis.
   * Note that text overflow can only happen with block or inline-block level
   * elements (the element needs to have a width in order to overflow).
   */
  noWrap: _propTypes.default.bool,
  /** Applies the theme typography styles. */
  variant: _propTypes.default.oneOf(['h1', 'h2', 'h3', 'h4', 'title1', 'title2', 'subtitle1', 'body1', 'body2', 'caption'])
};
var _default = (0, _withRef.default)()(Typography);
exports.default = _default;