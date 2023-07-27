"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RadioGroup = void 0;
var _RadioGroup = _interopRequireDefault(require("@mui/material/RadioGroup"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _FormHelperText = _interopRequireDefault(require("../FormHelperText"));
var _InputLabel = _interopRequireDefault(require("../InputLabel"));
var _excluded = ["value", "children", "label", "helperText", "optional", "required", "asteriskPosition", "disabled", "error", "size", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var RadioGroup = function RadioGroup(_ref) {
  var value = _ref.value,
    children = _ref.children,
    label = _ref.label,
    helperText = _ref.helperText,
    optional = _ref.optional,
    required = _ref.required,
    asteriskPosition = _ref.asteriskPosition,
    disabled = _ref.disabled,
    error = _ref.error,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'medium' : _ref$size,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, label && /*#__PURE__*/_react.default.createElement(_InputLabel.default, {
    optional: optional,
    required: required,
    asteriskPosition: asteriskPosition
  }, label), /*#__PURE__*/_react.default.createElement(_RadioGroup.default, _extends({
    value: value,
    disabled: disabled
  }, rest, {
    ref: ref
  }), _react.default.Children.map(children, function (child) {
    var _child$props$disabled, _child$props$error;
    return /*#__PURE__*/_react.default.cloneElement(child, {
      checked: child.props.value === value,
      disabled: (_child$props$disabled = child.props.disabled) !== null && _child$props$disabled !== void 0 ? _child$props$disabled : disabled,
      error: (_child$props$error = child.props.error) !== null && _child$props$error !== void 0 ? _child$props$error : error,
      size: size
    });
  })), helperText && /*#__PURE__*/_react.default.createElement(_FormHelperText.default, {
    disabled: disabled,
    error: error
  }, helperText));
};
exports.RadioGroup = RadioGroup;
RadioGroup.propTypes = {
  /** Position of the asterisk when `required` is `true`. */
  asteriskPosition: _propTypes.default.oneOf(['before', 'after']),
  /** The radio buttons to populate the group with. */
  children: _propTypes.default.node,
  /** If `true`, the component is disabled. */
  disabled: _propTypes.default.bool,
  /** If `true`, the component is displayed in an error state. */
  error: _propTypes.default.bool,
  /** The helper text content. */
  helperText: _propTypes.default.node,
  /** The label content. */
  label: _propTypes.default.node,
  /**
   * Callback fired when a radio button is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: _propTypes.default.func,
  /** If `true`, the label is displayed as optional. */
  optional: _propTypes.default.bool,
  /** If `true`, the label is displayed as required. */
  required: _propTypes.default.bool,
  /** If `true`, the radio buttons are displayed horizontally. */
  row: _propTypes.default.bool,
  /** The size of the component. */
  size: _propTypes.default.oneOf(['small', 'medium']),
  /** The value of the selected radio button. The DOM API casts this to a string. */
  value: _propTypes.default.any
};
var _default = (0, _withRef.default)()(RadioGroup);
exports.default = _default;