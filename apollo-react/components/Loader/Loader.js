"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Loader = void 0;
var _styles = require("@mui/material/styles");
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _CircularProgress = _interopRequireDefault(require("../CircularProgress"));
var _excluded = ["isInner", "size", "overlayClassName", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  loaderOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: (0, _styles.alpha)(_colors.white, 0.87),
    zIndex: 3002
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    margin: 'auto',
    width: 50,
    height: 50
  },
  inner: {
    position: 'absolute'
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var Loader = function Loader(_ref) {
  var isInner = _ref.isInner,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 51 : _ref$size,
    overlayClassName = _ref.overlayClassName,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(classes.loaderOverlay, isInner && classes.inner, overlayClassName)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.loader
  }, /*#__PURE__*/_react.default.createElement(_CircularProgress.default, _extends({
    variant: "indeterminate",
    size: size
  }, rest, {
    ref: ref
  }))));
};
exports.Loader = Loader;
Loader.propTypes = {
  /**
   * If `true`, the loader is contained within the element.
   * Default is a fullscreen display.
   */
  isInner: _propTypes.default.bool,
  /** Additional class for background overlay. */
  overlayClassName: _propTypes.default.string,
  /**
   * The size of the component. If using a number, the pixel unit is assumed.
   * If using a string, you need to provide the CSS unit.
   * `small` is also an option.
   * @ignore
   */
  size: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.oneOf(['small'])]),
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
var _default = (0, _withRef.default)()(Loader);
exports.default = _default;