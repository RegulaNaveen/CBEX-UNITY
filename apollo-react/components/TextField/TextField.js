"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TextField = void 0;
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _IconButton = _interopRequireDefault(require("../IconButton"));
var _InputAdornment = _interopRequireDefault(require("../InputAdornment"));
var _Tooltip = _interopRequireDefault(require("../Tooltip"));
var _excluded = ["InputLabelProps", "InputProps", "inputProps", "iconProps", "multiline", "required", "optional", "optionalText", "minRows", "sizeAdjustable", "minWidth", "minHeight", "maxWidth", "maxHeight", "label", "icon", "tooltipProps", "disabled", "className", "size", "startIcon", "margin", "asteriskPosition", "variant", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  optional: {
    color: _colors.neutral6
  },
  asterisk: {
    '& label span': {
      fontSize: 20,
      lineHeight: 1,
      fontWeight: 'bold',
      position: 'absolute',
      top: -3,
      left: 'initial'
    }
  },
  asteriskLeftLabel: {
    '& label span': {
      left: -15
    }
  },
  asteriskLeft: {
    paddingLeft: 12,
    '& label': {
      height: 0
    },
    '& label span': {
      top: 4,
      left: -11
    }
  },
  startIcon: {
    '& svg': {
      fontSize: 19.22,
      padding: 0.4,
      boxSizing: 'content-box'
    }
  },
  smallStartIcon: {
    '& svg': {
      fontSize: 16.8,
      padding: 1.1,
      boxSizing: 'content-box'
    }
  },
  noMargin: {
    '& > div': {
      margin: 0
    }
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var TextField = function TextField(_ref) {
  var InputLabelProps = _ref.InputLabelProps,
    InputProps = _ref.InputProps,
    inputProps = _ref.inputProps,
    iconProps = _ref.iconProps,
    multiline = _ref.multiline,
    required = _ref.required,
    optional = _ref.optional,
    _ref$optionalText = _ref.optionalText,
    optionalText = _ref$optionalText === void 0 ? '(optional)' : _ref$optionalText,
    _ref$minRows = _ref.minRows,
    minRows = _ref$minRows === void 0 ? 4 : _ref$minRows,
    _ref$sizeAdjustable = _ref.sizeAdjustable,
    sizeAdjustable = _ref$sizeAdjustable === void 0 ? false : _ref$sizeAdjustable,
    _ref$minWidth = _ref.minWidth,
    minWidth = _ref$minWidth === void 0 ? 176 : _ref$minWidth,
    _ref$minHeight = _ref.minHeight,
    minHeight = _ref$minHeight === void 0 ? 74 : _ref$minHeight,
    maxWidth = _ref.maxWidth,
    maxHeight = _ref.maxHeight,
    label = _ref.label,
    icon = _ref.icon,
    tooltipProps = _ref.tooltipProps,
    disabled = _ref.disabled,
    className = _ref.className,
    size = _ref.size,
    startIcon = _ref.startIcon,
    _ref$margin = _ref.margin,
    margin = _ref$margin === void 0 ? 'normal' : _ref$margin,
    asteriskPosition = _ref.asteriskPosition,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? 'standard' : _ref$variant,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_TextField.default, _extends({
    InputLabelProps: _objectSpread({
      shrink: true
    }, InputLabelProps),
    InputProps: _objectSpread(_objectSpread({
      disableUnderline: true,
      endAdornment: icon && /*#__PURE__*/_react.default.createElement(_InputAdornment.default, _extends({
        position: "end"
      }, iconProps), tooltipProps ? /*#__PURE__*/_react.default.createElement(_Tooltip.default, _extends({
        placement: "top",
        key: tooltipProps.title
      }, tooltipProps), /*#__PURE__*/_react.default.createElement(_IconButton.default, {
        size: "small"
      }, icon)) : /*#__PURE__*/_react.default.createElement(_IconButton.default, {
        size: "small"
      }, icon)),
      startAdornment: startIcon && /*#__PURE__*/_react.default.createElement(_InputAdornment.default, {
        position: "start",
        className: size === 'small' ? classes.smallStartIcon : classes.startIcon
      }, startIcon)
    }, InputProps), {}, {
      inputProps: _objectSpread(_objectSpread({
        style: {
          resize: sizeAdjustable ? 'both' : 'none',
          minWidth: sizeAdjustable ? minWidth : 'auto',
          minHeight: sizeAdjustable ? minHeight - 18 : undefined,
          maxWidth: sizeAdjustable ? maxWidth : undefined,
          maxHeight: sizeAdjustable ? maxHeight : undefined,
          paddingLeft: startIcon ? size === 'small' ? 29 : 31 : undefined,
          overflow: sizeAdjustable ? 'auto' : undefined
        }
      }, InputProps === null || InputProps === void 0 ? void 0 : InputProps.inputProps), inputProps)
    }),
    className: (0, _classnames.default)(required && [classes.asterisk, asteriskPosition === 'before' && (label ? classes.asteriskLeftLabel : classes.asteriskLeft)], margin === 'none' && !label && classes.noMargin, className),
    margin: margin,
    multiline: multiline !== null && multiline !== void 0 ? multiline : sizeAdjustable,
    minRows: multiline && minRows,
    label: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, label, optional && /*#__PURE__*/_react.default.createElement("span", {
      className: classes.optional
    }, " ".concat(optionalText))),
    required: required,
    disabled: disabled,
    size: size,
    variant: variant
  }, rest, {
    ref: ref
  }));
};
exports.TextField = TextField;
TextField.propTypes = {
  /** Position of the asterisk when `required` is `true`. */
  asteriskPosition: _propTypes.default.oneOf(['before', 'after']),
  /** The default value. Use when the component is not controlled. */
  defaultValue: _propTypes.default.any,
  /** If `true`, the component is disabled. */
  disabled: _propTypes.default.bool,
  /** If `true`, the label is displayed in an error state. */
  error: _propTypes.default.bool,
  /** If `true`, the component takes up the full width of its container. */
  fullWidth: _propTypes.default.bool,
  /** The helper text content. */
  helperText: _propTypes.default.node,
  /** Add an icon to the right on the inside of the input box. */
  icon: _propTypes.default.element,
  /** Props applied to the icon element. */
  iconProps: _propTypes.default.shape({
    /** Callback fired when the component is clicked. */
    onClick: _propTypes.default.func
  }),
  /** Props applied to the `InputLabel` component. */
  InputLabelProps: _propTypes.default.object,
  /** Props applied to the `Input` component. */
  InputProps: _propTypes.default.object,
  /** The label content. */
  label: _propTypes.default.node,
  /**
   * If `dense` or `normal`, the vertical spacing of this and contained
   * components is adjusted.
   */
  margin: _propTypes.default.oneOf(['dense', 'none', 'normal']),
  /** Maximum height of the size adjustable `TextField`. */
  maxHeight: _propTypes.default.number,
  /** Maximum width of the size adjustable `TextField`. */
  maxWidth: _propTypes.default.number,
  /** Minimum height of the size adjustable `TextField`. */
  minHeight: _propTypes.default.number,
  /** Minimum number of rows to display when multiline option is set to `true`. */
  minRows: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  /** Minimum width of the size adjustable `TextField`. */
  minWidth: _propTypes.default.number,
  /** If `true`, a textarea element is rendered instead of an input. */
  multiline: _propTypes.default.bool,
  /** Callback fired when the value changes. */
  onChange: _propTypes.default.func,
  /** If `true`, the label is displayed as optional. */
  optional: _propTypes.default.bool,
  /** Custom text for the optional label (displayed next to the main label). */
  optionalText: _propTypes.default.string,
  /** The short hint displayed in the input before the user enters a value. */
  placeholder: _propTypes.default.string,
  /** If `true`, the label is displayed as required. */
  required: _propTypes.default.bool,
  /** The size of the component. */
  size: _propTypes.default.oneOf(['small', 'medium']),
  /**
   * If `true`, allows user to adjust the text box size.
   * Used with minWidth and minHeight.
   */
  sizeAdjustable: _propTypes.default.bool,
  /** Add an icon to the left on the inside of the input box. */
  startIcon: _propTypes.default.element,
  /** Props applied to the `Tooltip` for the icon, if used. */
  tooltipProps: _propTypes.default.object,
  /** The value of the input element, required for a controlled component. */
  value: _propTypes.default.any
};
var _default = (0, _withRef.default)()(TextField);
exports.default = _default;