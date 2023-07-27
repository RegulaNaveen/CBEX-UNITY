"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CircularProgress = void 0;
var _CircularProgress = _interopRequireDefault(require("@mui/material/CircularProgress"));
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _Typography = _interopRequireDefault(require("../Typography"));
var _excluded = ["darkMode", "size", "thickness", "className", "value", "statusText", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  circularProgressContainer: {
    display: 'inline-flex',
    flexDirection: 'column'
  },
  statusText: {
    lineHeight: '24px',
    paddingTop: 12,
    textAlign: 'center'
  },
  statusTextSmall: {
    paddingTop: 5
  },
  textDarkMode: {
    color: _colors.white
  },
  centerContainer: {
    marginLeft: 'auto',
    marginRight: 'auto'
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var small = {
  size: 22,
  thickness: 8
};
var CircularProgress = function CircularProgress(_ref) {
  var darkMode = _ref.darkMode,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 108 : _ref$size,
    _ref$thickness = _ref.thickness,
    thickness = _ref$thickness === void 0 ? 5 : _ref$thickness,
    className = _ref.className,
    value = _ref.value,
    statusText = _ref.statusText,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  var attrs = size === 'small' ? small : {
    size: size,
    thickness: thickness
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(classes.circularProgressContainer, className)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.centerContainer
  }, /*#__PURE__*/_react.default.createElement(_CircularProgress.default, _extends({}, attrs, {
    value: 100,
    variant: "determinate",
    color: "secondary"
  }, darkMode && {
    style: {
      color: _colors.neutral9
    }
  })), /*#__PURE__*/_react.default.createElement(_CircularProgress.default, _extends({}, attrs, {
    variant: "determinate",
    color: "primary",
    value: size === 'small' && value > 85 && value < 100 ? 85 : value
  }, rest, {
    ref: ref
  }))), statusText && /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "body2",
    className: (0, _classnames.default)(classes.statusText, darkMode && classes.textDarkMode, size === 'small' && classes.statusTextSmall)
  }, statusText));
};
exports.CircularProgress = CircularProgress;
CircularProgress.propTypes = {
  /** If `true`, the component has an altered appearance, for display on a dark background. */
  darkMode: _propTypes.default.bool,
  /**
   * The size of the component. If using a number, the pixel unit is assumed.
   * If using a string, you need to provide the CSS unit.
   * `small` is also an option.
   */
  size: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.oneOf(['small'])]),
  /** The label content. */
  statusText: _propTypes.default.node,
  /** The thickness of the circle.
   * @ignore */
  thickness: _propTypes.default.number,
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value: _propTypes.default.number,
  /** The variant to use. Use indeterminate when there is no progress value. */
  variant: _propTypes.default.oneOf(['determinate', 'indeterminate'])
};
var _default = (0, _withRef.default)()(CircularProgress);
exports.default = _default;