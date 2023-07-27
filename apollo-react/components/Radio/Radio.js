"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Radio = void 0;
var _Radio = _interopRequireDefault(require("@mui/material/Radio"));
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _RadioChecked = _interopRequireDefault(require("../../icons/RadioChecked"));
var _RadioError = _interopRequireDefault(require("../../icons/RadioError"));
var _RadioUnchecked = _interopRequireDefault(require("../../icons/RadioUnchecked"));
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _FormControlLabel = _interopRequireDefault(require("../FormControlLabel"));
var _excluded = ["checked", "value", "label", "disabled", "required", "asteriskLeft", "error", "size", "className", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  asterisk: {
    color: _colors.utilityNegative,
    position: 'relative',
    fontWeight: 'bold',
    right: 38
  },
  errorLabel: {
    '&:hover .MuiButtonBase-root .MuiSvgIcon-root circle[r="6"], &:hover .a-MuiButtonBase-root .a-MuiSvgIcon-root circle[r="6"]': {
      fill: '#FDEDEC'
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
var Radio = function Radio(_ref) {
  var checked = _ref.checked,
    value = _ref.value,
    label = _ref.label,
    disabled = _ref.disabled,
    required = _ref.required,
    asteriskLeft = _ref.asteriskLeft,
    error = _ref.error,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'medium' : _ref$size,
    className = _ref.className,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_FormControlLabel.default, _extends({
    control: /*#__PURE__*/_react.default.createElement(_Radio.default, {
      checkedIcon: /*#__PURE__*/_react.default.createElement(_RadioChecked.default, null),
      icon: error ? /*#__PURE__*/_react.default.createElement(_RadioError.default, null) : /*#__PURE__*/_react.default.createElement(_RadioUnchecked.default, null),
      disableRipple: true,
      checked: checked,
      disabled: disabled,
      color: "primary",
      className: (0, _classnames.default)(size === 'small' && classes.small)
    }),
    className: (0, _classnames.default)(error && !checked && !disabled && classes.errorLabel, disabled && checked && classes.disabledChecked, className),
    value: value,
    disabled: disabled,
    checked: checked,
    label: label || required && asteriskLeft && /*#__PURE__*/_react.default.createElement("span", {
      className: classes.asterisk
    }, "\xA0*"),
    size: size
  }, rest, {
    ref: ref
  }));
};
exports.Radio = Radio;
Radio.propTypes = {
  /** If `true`, the component is checked. */
  checked: _propTypes.default.bool,
  /** If `true`, the component is disabled. */
  disabled: _propTypes.default.bool,
  /** If `true`, the component is displayed in an error state. */
  error: _propTypes.default.bool,
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
var _default = (0, _withRef.default)()(Radio);
exports.default = _default;