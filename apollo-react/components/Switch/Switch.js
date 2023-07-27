"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Switch = void 0;
var _Switch = _interopRequireDefault(require("@mui/material/Switch"));
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _FormControlLabel = _interopRequireDefault(require("../FormControlLabel"));
var _excluded = ["checked", "label", "disabled", "optional", "required", "size", "asteriskPosition", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  formControlLabel: {
    marginLeft: 0
  },
  label: {
    paddingTop: 0,
    paddingBottom: 5,
    left: 0,
    paddingLeft: 0,
    fontSize: 14,
    color: "".concat(_colors.neutral8, " !important")
  },
  checkedLabel: {
    fontWeight: 'normal'
  },
  optional: {
    color: _colors.neutral6
  },
  asterisk: {
    color: _colors.utilityNegative,
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 1,
    position: 'absolute',
    top: -3,
    width: 22
  },
  asteriskBefore: {
    left: -15
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var Switch = function Switch(_ref) {
  var checked = _ref.checked,
    label = _ref.label,
    disabled = _ref.disabled,
    optional = _ref.optional,
    required = _ref.required,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'medium' : _ref$size,
    asteriskPosition = _ref.asteriskPosition,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_FormControlLabel.default, _extends({
    classes: {
      root: classes.formControlLabel,
      label: (0, _classnames.default)(classes.label, classes.checkedLabel)
    },
    control: /*#__PURE__*/_react.default.createElement(_Switch.default, {
      checked: checked,
      color: "primary",
      required: required,
      size: size,
      disableRipple: true
    }),
    label: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, label, required && /*#__PURE__*/_react.default.createElement("span", {
      className: (0, _classnames.default)(classes.asterisk, asteriskPosition === 'before' && classes.asteriskBefore)
    }, "\u2009", '*') || optional && /*#__PURE__*/_react.default.createElement("span", {
      className: classes.optional
    }, ' (optional)')),
    checked: checked,
    disabled: disabled,
    labelPlacement: "top"
  }, rest, {
    ref: ref
  }));
};
exports.Switch = Switch;
Switch.propTypes = {
  /** Position of the asterisk when `required` is `true`. */
  asteriskPosition: _propTypes.default.oneOf(['before', 'after']),
  /** If `true`, the component is checked. */
  checked: _propTypes.default.bool,
  /** If `true`, the component is disabled. */
  disabled: _propTypes.default.bool,
  /** The label content. */
  label: _propTypes.default.node,
  /**
   * Callback fired when the component is toggled on or off.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new checked state by accessing event.target.checked (boolean).
   */
  onChange: _propTypes.default.func,
  /** If `true`, the label is displayed as optional. */
  optional: _propTypes.default.bool,
  /** If `true`, the label is displayed as required. */
  required: _propTypes.default.bool,
  /** The size of the component. */
  size: _propTypes.default.oneOf(['small', 'medium']),
  /** The value of component. */
  value: _propTypes.default.any
};
var _default = (0, _withRef.default)()(Switch);
exports.default = _default;