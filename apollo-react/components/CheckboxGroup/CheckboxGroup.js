"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CheckboxGroup = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _FormGroup = _interopRequireDefault(require("../FormGroup"));
var _FormHelperText = _interopRequireDefault(require("../FormHelperText"));
var _InputLabel = _interopRequireDefault(require("../InputLabel"));
var _excluded = ["classes", "disabled", "label", "helperText", "required", "asteriskPosition", "optional", "value", "onChange", "children", "error", "size", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var CheckboxGroup = function CheckboxGroup(_ref) {
  var classes = _ref.classes,
    disabled = _ref.disabled,
    label = _ref.label,
    helperText = _ref.helperText,
    required = _ref.required,
    asteriskPosition = _ref.asteriskPosition,
    optional = _ref.optional,
    _ref$value = _ref.value,
    value = _ref$value === void 0 ? [] : _ref$value,
    onChange = _ref.onChange,
    children = _ref.children,
    error = _ref.error,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'medium' : _ref$size,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, label && /*#__PURE__*/_react.default.createElement(_InputLabel.default, {
    optional: optional,
    required: required,
    asteriskPosition: asteriskPosition
  }, label), /*#__PURE__*/_react.default.createElement(_FormGroup.default, _extends({}, rest, {
    ref: ref
  }), _react.default.Children.map(children, function (child) {
    var _child$props$onChange, _child$props$checked, _child$props$disabled, _child$props$error;
    return /*#__PURE__*/_react.default.cloneElement(child, {
      onChange: (_child$props$onChange = child.props.onChange) !== null && _child$props$onChange !== void 0 ? _child$props$onChange : function (e, checked) {
        if (checked) {
          e.target = {
            value: [].concat(_toConsumableArray(value), [child.props.value])
          };
        } else {
          e.target = {
            value: value.filter(function (item) {
              return item !== child.props.value;
            })
          };
        }
        onChange && onChange(e);
      },
      checked: (_child$props$checked = child.props.checked) !== null && _child$props$checked !== void 0 ? _child$props$checked : value.includes(child.props.value),
      disabled: (_child$props$disabled = child.props.disabled) !== null && _child$props$disabled !== void 0 ? _child$props$disabled : disabled,
      error: (_child$props$error = child.props.error) !== null && _child$props$error !== void 0 ? _child$props$error : error,
      size: size
    });
  })), helperText && /*#__PURE__*/_react.default.createElement(_FormHelperText.default, {
    disabled: disabled,
    error: error
  }, helperText));
};
exports.CheckboxGroup = CheckboxGroup;
CheckboxGroup.propTypes = {
  /** Position of the asterisk when `required` is `true`. */
  asteriskPosition: _propTypes.default.oneOf(['before', 'after']),
  /** The checkboxes to populate the group with. */
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
   * Callback fired when a checkbox is selected or deselected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: _propTypes.default.func,
  /** If `true`, the label is displayed as optional. */
  optional: _propTypes.default.bool,
  /** If `true`, the label is displayed as required. */
  required: _propTypes.default.bool,
  /** If `true`, the checkboxes are displayed horizontally. */
  row: _propTypes.default.bool,
  /** The size of the component. */
  size: _propTypes.default.oneOf(['small', 'medium']),
  /** The values of the selected checkboxes. */
  value: _propTypes.default.array
};
var _default = (0, _withRef.default)()(CheckboxGroup);
exports.default = _default;