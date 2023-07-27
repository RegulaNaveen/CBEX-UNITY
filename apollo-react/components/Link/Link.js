"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Link = void 0;
var _Link = _interopRequireDefault(require("@mui/material/Link"));
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _typography = require("../../typography");
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _excluded = ["className", "disabled", "size", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  root: {
    cursor: 'pointer',
    fontFamily: _typography.fontFamily,
    textDecoration: 'none',
    '&:hover': {
      borderBottom: '1px solid',
      textDecoration: 'none'
    }
  },
  disabled: {
    display: 'inline-block',
    opacity: 0.4,
    textDecoration: 'none',
    pointerEvents: 'none'
  },
  small: {
    fontSize: 14
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var Link = function Link(_ref) {
  var className = _ref.className,
    disabled = _ref.disabled,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'medium' : _ref$size,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_Link.default, _extends({
    className: (0, _classnames.default)(classes.root, disabled && classes.disabled, size === 'small' && classes.small, className),
    disabled: disabled
  }, rest, {
    ref: ref,
    underline: "hover"
  }));
};
exports.Link = Link;
Link.propTypes = {
  /** The content of the link. */
  children: _propTypes.default.node,
  /** If `true`, the component is disabled. */
  disabled: _propTypes.default.bool,
  /** Callback fired when the component is clicked. */
  onClick: _propTypes.default.func,
  /** The size of the component. */
  size: _propTypes.default.oneOf(['small', 'medium'])
};
var _default = (0, _withRef.default)()(Link);
exports.default = _default;