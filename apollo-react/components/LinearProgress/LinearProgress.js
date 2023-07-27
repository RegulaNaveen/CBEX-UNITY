"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.LinearProgress = void 0;
var _LinearProgress = _interopRequireDefault(require("@mui/material/LinearProgress"));
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _Typography = _interopRequireDefault(require("../Typography"));
var _excluded = ["forwardedRef", "style", "darkMode", "statusText"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  statusText: {
    lineHeight: '24px',
    paddingTop: 8,
    textAlign: 'center'
  },
  textDarkMode: {
    color: _colors.white
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var LinearProgress = function LinearProgress(_ref) {
  var ref = _ref.forwardedRef,
    style = _ref.style,
    darkMode = _ref.darkMode,
    statusText = _ref.statusText,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_LinearProgress.default, _extends({}, rest, {
    style: darkMode ? _objectSpread({
      backgroundColor: _colors.neutral9
    }, style) : style,
    ref: ref
  })), statusText && /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "body2",
    className: (0, _classnames.default)(classes.statusText, darkMode && classes.textDarkMode)
  }, statusText));
};
exports.LinearProgress = LinearProgress;
LinearProgress.propTypes = {
  /** If `true`, the component has an altered appearance, for display on a dark background. */
  darkMode: _propTypes.default.bool,
  /** The label content. */
  statusText: _propTypes.default.node,
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value: _propTypes.default.number,
  /** The variant to use. Use indeterminate when there is no progress value. */
  variant: _propTypes.default.oneOf(['determinate', 'indeterminate'])
};
var _default = (0, _withRef.default)()(LinearProgress);
exports.default = _default;