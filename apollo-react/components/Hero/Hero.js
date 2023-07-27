"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Hero = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _Button = _interopRequireDefault(require("../Button"));
var _Typography = _interopRequireDefault(require("../Typography"));
var _excluded = ["label"],
  _excluded2 = ["className", "title", "subtitle", "buttonProps", "children", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  root: {
    padding: '24px 28px',
    color: _colors.white,
    background: _colors.gradientHorizontal
  },
  topContainer: {
    display: 'flex',
    position: 'relative'
  },
  button: {
    position: 'absolute',
    marginTop: 14,
    right: 0,
    left: 'auto'
  },
  title: {
    fontSize: 24,
    lineHeight: 1.5
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var Hero = function Hero(_ref) {
  var className = _ref.className,
    title = _ref.title,
    subtitle = _ref.subtitle,
    _ref$buttonProps = _ref.buttonProps;
  _ref$buttonProps = _ref$buttonProps === void 0 ? {} : _ref$buttonProps;
  var label = _ref$buttonProps.label,
    buttonProps = _objectWithoutProperties(_ref$buttonProps, _excluded),
    children = _ref.children,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded2);
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _classnames.default)(classes.root, className)
  }, rest, {
    ref: ref
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.topContainer
  }, title && /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "title1",
    darkMode: true,
    className: classes.title
  }, title), (label || Object.keys(buttonProps).length !== 0) && /*#__PURE__*/_react.default.createElement(_Button.default, _extends({
    variant: "secondary",
    size: "small",
    className: classes.button
  }, buttonProps), label)), subtitle && /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "body1",
    darkMode: true
  }, subtitle), children);
};
exports.Hero = Hero;
Hero.propTypes = {
  /** Props applied to the `Button` component. */
  buttonProps: _propTypes.default.shape({
    /** The content of the button. */
    label: _propTypes.default.node,
    /** Callback fired when the component is clicked. */
    onClick: _propTypes.default.func
  }),
  /** The content of the hero. */
  children: _propTypes.default.node,
  /** The subtitle of the hero. */
  subtitle: _propTypes.default.node,
  /** The title of the hero. */
  title: _propTypes.default.node
};
var _default = (0, _withRef.default)()(Hero);
exports.default = _default;