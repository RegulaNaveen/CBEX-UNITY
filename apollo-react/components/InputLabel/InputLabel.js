"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.InputLabel = void 0;
var _InputLabel = _interopRequireDefault(require("@mui/material/InputLabel"));
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _excluded = ["optional", "required", "asteriskPosition", "children", "className", "optionalText", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  label: {
    position: 'relative'
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
var InputLabel = function InputLabel(_ref) {
  var optional = _ref.optional,
    required = _ref.required,
    asteriskPosition = _ref.asteriskPosition,
    children = _ref.children,
    className = _ref.className,
    _ref$optionalText = _ref.optionalText,
    optionalText = _ref$optionalText === void 0 ? 'optional' : _ref$optionalText,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_InputLabel.default, _extends({}, rest, {
    className: (0, _classnames.default)(className, classes.label),
    ref: ref
  }), required && asteriskPosition === 'before' && /*#__PURE__*/_react.default.createElement("span", {
    "aria-hidden": true,
    className: (0, _classnames.default)(classes.asterisk, classes.asteriskBefore)
  }, "\u2009", '*'), children, optional && /*#__PURE__*/_react.default.createElement("span", {
    className: classes.optional
  }, " (".concat(optionalText, ")")), required && asteriskPosition !== 'before' && /*#__PURE__*/_react.default.createElement("span", {
    "aria-hidden": true,
    className: classes.asterisk
  }, "\u2009", '*'));
};
exports.InputLabel = InputLabel;
InputLabel.propTypes = {
  /** Position of the asterisk when `required` is `true`. */
  asteriskPosition: _propTypes.default.oneOf(['before', 'after']),
  /** The content of the label. */
  children: _propTypes.default.node,
  /** If `true`, the label is displayed as optional. */
  optional: _propTypes.default.bool,
  /** Text to show when `optional` is `true`. */
  optionalText: _propTypes.default.string,
  /** If `true`, the label is displayed as required. */
  required: _propTypes.default.bool
};
var _default = (0, _withRef.default)()(InputLabel);
exports.default = _default;