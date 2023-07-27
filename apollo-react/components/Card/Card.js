"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Card = void 0;
var _Card = _interopRequireDefault(require("@mui/material/Card"));
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _shadows = require("../../shadows");
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _excluded = ["className", "interactive", "disabled", "color", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  interactive: {
    '&:hover': {
      borderColor: _colors.neutral4,
      boxShadow: _shadows.shadowLevel3
    }
  },
  darkInteractive: {
    '&:hover': {
      backgroundColor: _colors.primaryLight
    }
  },
  disabled: {
    opacity: 0.4,
    boxShadow: 'none'
  },
  dark: {
    backgroundColor: '#f6f7fb',
    boxShadow: 'none',
    border: 'none'
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var Card = function Card(_ref) {
  var className = _ref.className,
    interactive = _ref.interactive,
    disabled = _ref.disabled,
    _ref$color = _ref.color,
    color = _ref$color === void 0 ? 'light' : _ref$color,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_Card.default, _extends({
    className: (0, _classnames.default)(interactive && (color === 'dark' ? classes.darkInteractive : classes.interactive), disabled && classes.disabled, classes[color], className)
  }, rest, {
    ref: ref
  }));
};
exports.Card = Card;
Card.propTypes = {
  /** The content of the component. */
  children: _propTypes.default.node,
  /** The color of the component. */
  color: _propTypes.default.oneOf(['dark', 'light']),
  /** If `true`, the component is disabled. */
  disabled: _propTypes.default.bool,
  /** If `true`, the component is given a hover state. */
  interactive: _propTypes.default.bool
};
var _default = (0, _withRef.default)()(Card);
exports.default = _default;