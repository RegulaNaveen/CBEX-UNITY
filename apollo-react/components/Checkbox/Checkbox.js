"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Checkbox = void 0;
var _Checkbox = _interopRequireDefault(require("@mui/material/Checkbox"));
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _CheckboxChecked = _interopRequireDefault(require("../../icons/CheckboxChecked"));
var _CheckboxError = _interopRequireDefault(require("../../icons/CheckboxError"));
var _CheckboxIndeterminate = _interopRequireDefault(require("../../icons/CheckboxIndeterminate"));
var _CheckboxUnchecked = _interopRequireDefault(require("../../icons/CheckboxUnchecked"));
var _colorUtils = require("../../utils/colorUtils");
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _FormControlLabel = _interopRequireDefault(require("../FormControlLabel"));
var _excluded = ["checked", "indeterminate", "disabled", "label", "required", "asteriskLeft", "value", "error", "size", "style", "className", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  asterisk: {
    color: _colors.utilityNegative,
    position: 'relative',
    fontWeight: 'bold',
    bottom: 2,
    right: 40
  },
  errorLabel: {
    '&:hover .MuiButtonBase-root .MuiSvgIcon-root rect, &:hover .a-MuiButtonBase-root .a-MuiSvgIcon-root rect': {
      fill: (0, _colorUtils.hexToRGBA)(_colors.utilityNegative, 0.08)
    },
    '& .MuiButtonBase-root .MuiSvgIcon-root, & .a-MuiButtonBase-root .a-MuiSvgIcon-root, &:hover .MuiButtonBase-root .MuiSvgIcon-root, &:hover .a-MuiButtonBase-root .a-MuiSvgIcon-root': {
      color: _colors.utilityNegative
    }
  },
  small: {
    top: 4
  },
  disabledChecked: {
    '& .MuiFormControlLabel-label': {
      color: "".concat(_colors.neutral6, " !important")
    }
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var Checkbox = function Checkbox(_ref) {
  var checked = _ref.checked,
    indeterminate = _ref.indeterminate,
    disabled = _ref.disabled,
    label = _ref.label,
    required = _ref.required,
    asteriskLeft = _ref.asteriskLeft,
    value = _ref.value,
    error = _ref.error,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'medium' : _ref$size,
    style = _ref.style,
    className = _ref.className,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_FormControlLabel.default, _extends({
    checked: checked,
    indeterminate: indeterminate,
    disabled: disabled,
    className: (0, _classnames.default)(error && !indeterminate && !checked && !disabled && classes.errorLabel, disabled && (checked || indeterminate) && classes.disabledChecked, className),
    label: label || required && asteriskLeft && /*#__PURE__*/_react.default.createElement("span", {
      className: classes.asterisk
    }, "\xA0*"),
    control: /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
      color: "primary",
      checked: checked,
      disabled: disabled,
      indeterminate: indeterminate,
      disableRipple: true,
      checkedIcon: /*#__PURE__*/_react.default.createElement(_CheckboxChecked.default, null),
      icon: error && !disabled ? /*#__PURE__*/_react.default.createElement(_CheckboxError.default, null) : /*#__PURE__*/_react.default.createElement(_CheckboxUnchecked.default, null),
      indeterminateIcon: /*#__PURE__*/_react.default.createElement(_CheckboxIndeterminate.default, null),
      required: required,
      value: value,
      className: (0, _classnames.default)(size === 'small' && classes.small)
    }),
    size: size,
    style: _objectSpread(_objectSpread({}, !label && {
      minHeight: size === 'small' ? 24 : 32
    }), style)
  }, rest, {
    ref: ref
  }));
};
exports.Checkbox = Checkbox;
Checkbox.propTypes = {
  /** If `true`, the component is checked. */
  checked: _propTypes.default.bool,
  /** If `true`, the component is disabled. */
  disabled: _propTypes.default.bool,
  /** If `true`, the component is displayed in an error state. */
  error: _propTypes.default.bool,
  /** If `true`, the component appears indeterminate. */
  indeterminate: _propTypes.default.bool,
  /** The label content. */
  label: _propTypes.default.node,
  /**
   * Callback fired when the component is selected or deselected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new checked state by accessing event.target.checked (boolean).
   */
  onChange: _propTypes.default.func,
  /** The size of the component. */
  size: _propTypes.default.oneOf(['small', 'medium']),
  /** The value of component. */
  value: _propTypes.default.any
};
var _default = (0, _withRef.default)()(Checkbox);
exports.default = _default;