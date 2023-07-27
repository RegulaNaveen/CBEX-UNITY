"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Button = void 0;
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _IconComponent = _interopRequireDefault(require("./IconComponent"));
var _excluded = ["darkMode", "children", "icon", "size", "variant", "className", "open", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var defaultVariantProps = {
  primary: {
    color: 'primary',
    variant: 'contained'
  },
  secondary: {
    color: 'secondary',
    variant: 'outlined'
  },
  text: {
    color: 'primary',
    variant: 'text'
  }
};
var fixVariant = function fixVariant(variant) {
  return _objectSpread({
    variant: variant
  }, defaultVariantProps[variant]);
};
var styles = {
  darkMode: {
    color: _colors.white
  },
  outlinedActive: {
    border: "1px solid ".concat(_colors.primary)
  },
  secondaryActive: {
    border: "1px solid ".concat(_colors.primary)
  },
  textActive: {
    backgroundColor: _colors.primaryLightTransparent
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var Button = function Button(_ref) {
  var darkMode = _ref.darkMode,
    children = _ref.children,
    icon = _ref.icon,
    size = _ref.size,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? 'text' : _ref$variant,
    className = _ref.className,
    open = _ref.open,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_Button.default, _extends({}, fixVariant(variant), {
    size: size,
    className: (0, _classnames.default)(darkMode && classes.darkMode, open && classes["".concat(variant, "Active")], className)
  }, rest, {
    ref: ref
  }), icon && /*#__PURE__*/_react.default.createElement(_IconComponent.default, {
    key: "icon",
    size: size,
    icon: icon
  }), children);
};
exports.Button = Button;
Button.propTypes = {
  /** The content of the button. */
  children: _propTypes.default.node,
  /** If `true`, the component has a lighter appearance, for display on a dark background. */
  darkMode: _propTypes.default.bool,
  /** If `true`, the component is disabled. */
  disabled: _propTypes.default.bool,
  /** If `true`, the component takes up the full width of its container. */
  fullWidth: _propTypes.default.bool,
  /**
   * The URL to link to when the button is clicked. If defined, an `a` element
   * will be used as the root node.
   */
  href: _propTypes.default.string,
  /** Add an icon to the left of the button text. */
  icon: _propTypes.default.oneOfType([_propTypes.default.elementType, _propTypes.default.element]),
  /** Callback fired when the component is clicked. */
  onClick: _propTypes.default.func,
  /** If `true`, the button is displayed in an active state.
   * @ignore */
  open: _propTypes.default.bool,
  /** The size of the component. */
  size: _propTypes.default.oneOf(['small', 'medium']),
  /** The variant to use. */
  variant: _propTypes.default.oneOf(['primary', 'secondary', 'text'])
};
var _default = (0, _withRef.default)()(Button);
exports.default = _default;