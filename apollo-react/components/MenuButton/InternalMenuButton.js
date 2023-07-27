"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.InternalMenuButton = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _ArrowDown = _interopRequireDefault(require("../../icons/ArrowDown"));
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _Button = _interopRequireDefault(require("../Button"));
var _excluded = ["buttonText", "open", "size", "className", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  buttonPadding: {
    paddingRight: 16
  },
  buttonPaddingSmall: {
    paddingRight: 7
  },
  icon: {
    fontSize: 16,
    paddingLeft: 3,
    boxSizing: 'content-box'
  },
  iconSmall: {
    fontSize: 15
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var InternalMenuButton = function InternalMenuButton(_ref) {
  var buttonText = _ref.buttonText,
    open = _ref.open,
    size = _ref.size,
    className = _ref.className,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_Button.default, _extends({
    variant: "secondary",
    open: open,
    className: (0, _classnames.default)(size === 'small' ? classes.buttonPaddingSmall : classes.buttonPadding, className),
    size: size
  }, rest, {
    ref: ref
  }), buttonText, /*#__PURE__*/_react.default.createElement(_ArrowDown.default, {
    className: (0, _classnames.default)(classes.icon, size === 'small' && classes.iconSmall)
  }));
};
exports.InternalMenuButton = InternalMenuButton;
InternalMenuButton.propTypes = {
  /** The button content. */
  buttonText: _propTypes.default.node,
  /** If `true`, the menu is visible. */
  open: _propTypes.default.bool,
  /** The size of the component. */
  size: _propTypes.default.oneOf(['small', 'medium'])
};
var _default = (0, _withRef.default)()(InternalMenuButton);
exports.default = _default;