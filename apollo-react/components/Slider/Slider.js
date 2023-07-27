"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Slider = void 0;
var _Slider = _interopRequireDefault(require("@mui/material/Slider"));
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _FormHelperText = _interopRequireDefault(require("../FormHelperText"));
var _InputLabel = _interopRequireDefault(require("../InputLabel"));
var _TextField = _interopRequireDefault(require("../TextField"));
var _Tooltip = _interopRequireDefault(require("../Tooltip"));
var _excluded = ["disabled", "error", "helperText", "label", "optional", "required", "asteriskPosition", "discrete", "value", "onInputChange", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  label: {
    marginTop: 3,
    marginBottom: 10
  },
  helperText: {
    paddingTop: 12
  },
  discreteSliderMargin: {
    marginRight: 58
  },
  discreteContainer: {
    position: 'relative'
  },
  discreteTextField: {
    position: 'absolute',
    right: 0,
    bottom: -21,
    width: 42
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var ThumbValueLabel = function ThumbValueLabel(_ref) {
  var children = _ref.children,
    value = _ref.value;
  return /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    placement: "top",
    title: value
  }, children);
};
var Slider = function Slider(_ref2) {
  var disabled = _ref2.disabled,
    error = _ref2.error,
    helperText = _ref2.helperText,
    label = _ref2.label,
    optional = _ref2.optional,
    required = _ref2.required,
    asteriskPosition = _ref2.asteriskPosition,
    discrete = _ref2.discrete,
    value = _ref2.value,
    onInputChange = _ref2.onInputChange,
    ref = _ref2.forwardedRef,
    rest = _objectWithoutProperties(_ref2, _excluded);
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.label
  }, /*#__PURE__*/_react.default.createElement(_InputLabel.default, {
    disabled: disabled,
    optional: optional,
    required: required,
    asteriskPosition: asteriskPosition
  }, label)), /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(discrete && classes.discreteSliderMargin)
  }, /*#__PURE__*/_react.default.createElement(_Slider.default, _extends({
    value: value,
    disabled: disabled,
    valueLabelDisplay: discrete ? 'off' : 'auto',
    slots: {
      valueLabel: discrete ? undefined : ThumbValueLabel
    }
  }, rest, {
    ref: ref
  }))), discrete && /*#__PURE__*/_react.default.createElement("div", {
    className: classes.discreteContainer
  }, /*#__PURE__*/_react.default.createElement(_TextField.default, {
    className: classes.discreteTextField,
    value: value,
    disabled: disabled,
    error: error,
    onChange: function onChange(event) {
      onInputChange && onInputChange(event, Number(event.target.value));
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.helperText
  }, /*#__PURE__*/_react.default.createElement(_FormHelperText.default, {
    error: error,
    disabled: disabled
  }, helperText)));
};
exports.Slider = Slider;
Slider.propTypes = {
  /** Position of the asterisk when `required` is `true`. */
  asteriskPosition: _propTypes.default.oneOf(['before', 'after']),
  /** If `true`, the component is disabled. */
  disabled: _propTypes.default.bool,
  /** If `true`, the component includes a `TextField`. */
  discrete: _propTypes.default.bool,
  /** If `true`, the component is displayed in an error state. */
  error: _propTypes.default.bool,
  /** The helper text content. */
  helperText: _propTypes.default.node,
  /** The label content. */
  label: _propTypes.default.node,
  /** The maximum allowed value of the slider. Should not be equal to min. */
  max: _propTypes.default.number,
  /** The minimum allowed value of the slider. Should not be equal to max. */
  min: _propTypes.default.number,
  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event object that triggers onChange.<br/>
   * @param {number} value The value of the input.
   */
  onChange: _propTypes.default.func,
  /**
   * Callback fired when the value changes.
   *
   * @param {event} event The event object that triggers onChange.<br/>
   * @param {number} value The value of the input.
   */
  onInputChange: _propTypes.default.func,
  /** If `true`, the label is displayed as optional. */
  optional: _propTypes.default.bool,
  /** If `true`, the label is displayed as required. */
  required: _propTypes.default.bool,
  /** The value of the component. */
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
};
var _default = (0, _withRef.default)()(Slider);
exports.default = _default;