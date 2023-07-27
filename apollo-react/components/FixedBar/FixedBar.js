"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FixedBar = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _Close = _interopRequireDefault(require("../../icons/Close"));
var _shadows = require("../../shadows");
var _IconButton = _interopRequireDefault(require("../IconButton"));
var _Typography = _interopRequireDefault(require("../Typography"));
var _excluded = ["variant", "title", "subtitle", "onClose", "children", "className", "fixed", "shadow", "size"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var fixed = {
  position: 'absolute',
  width: '100%',
  boxSizing: 'border-box'
};
var styles = {
  root: {
    background: _colors.white,
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: 72,
    boxSizing: 'border-box'
  },
  top: {
    borderBottom: "solid 1px ".concat(_colors.neutral3)
  },
  bottom: {
    borderTop: "solid 1px ".concat(_colors.neutral3)
  },
  title: {
    lineHeight: 1.6
  },
  subtitle: {
    lineHeight: 1.5
  },
  content: {
    display: 'flex',
    marginLeft: 16
  },
  closeWrapper: {
    marginLeft: 16
  },
  buttonsWrapper: {
    display: 'flex',
    alignItems: 'center',
    '& button:not(:first-of-type)': {
      marginLeft: 8
    }
  },
  singleLine: {
    display: 'flex',
    alignItems: 'center'
  },
  fixedTop: _objectSpread(_objectSpread({}, fixed), {}, {
    top: 0
  }),
  fixedBottom: _objectSpread(_objectSpread({}, fixed), {}, {
    bottom: 0
  }),
  shadow: {
    boxShadow: _shadows.shadowLevel3
  },
  small: {
    minHeight: 64
  },
  closeIcon: {
    fontSize: '15px !important'
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var FixedBar = function FixedBar(_ref) {
  var variant = _ref.variant,
    title = _ref.title,
    subtitle = _ref.subtitle,
    onClose = _ref.onClose,
    children = _ref.children,
    className = _ref.className,
    fixed = _ref.fixed,
    shadow = _ref.shadow,
    size = _ref.size,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _classnames.default)(classes.root, classes[variant], fixed && (variant === 'bottom' ? classes.fixedBottom : classes.fixedTop), shadow && classes.shadow, size === 'small' && classes.small, className)
  }, rest), /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)((title === undefined || subtitle === undefined) && classes.singleLine)
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "title1",
    className: classes.title
  }, title), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    className: classes.subtitle
  }, subtitle)), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.content
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.buttonsWrapper
  }, _react.default.Children.map(children, function (child) {
    var _child$props$size;
    return /*#__PURE__*/_react.default.cloneElement(child, {
      size: (_child$props$size = child.props.size) !== null && _child$props$size !== void 0 ? _child$props$size : size
    });
  })), onClose && /*#__PURE__*/_react.default.createElement("div", {
    className: classes.closeWrapper
  }, /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    size: "small",
    onClick: onClose,
    "aria-label": "Close"
  }, /*#__PURE__*/_react.default.createElement(_Close.default, {
    className: classes.closeIcon
  })))));
};
exports.FixedBar = FixedBar;
FixedBar.propTypes = {
  /** Callback fired when the component requests to be closed. */
  onClose: _propTypes.default.func,
  /** The size of the component. */
  size: _propTypes.default.oneOf(['small', 'medium']),
  /** The subtitle of the fixed bar. */
  subtitle: _propTypes.default.node,
  /** The title of the fixed bar. */
  title: _propTypes.default.node,
  /** The placement of the fixed bar. */
  variant: _propTypes.default.oneOf(['top', 'bottom'])
};
FixedBar.defaultProps = {
  variant: 'top',
  size: 'medium'
};
var _default = FixedBar;
exports.default = _default;