"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Tag = void 0;
var _compose = _interopRequireDefault(require("@hypnosphi/recompose/compose"));
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _withStyledEngineProvider = _interopRequireDefault(require("../../utils/withStyledEngineProvider"));
var _Typography = _interopRequireDefault(require("../Typography"));
var _excluded = ["className", "color", "darkText", "label", "status", "Icon", "variant", "style", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  root: {
    display: 'inline-block',
    position: 'relative',
    padding: '0 8px',
    height: 20,
    borderRadius: 2,
    verticalAlign: 'middle',
    fontWeight: 600,
    lineHeight: 1.62,
    fontSize: 13
  },
  withIcon: {
    paddingLeft: 26
  },
  default: {
    backgroundColor: _colors.primary
  },
  positive: {
    backgroundColor: _colors.utilityPositive
  },
  negative: {
    backgroundColor: _colors.utilityNegative
  },
  warning: {
    backgroundColor: _colors.utilityWarning
  },
  blue: {
    backgroundColor: _colors.blue
  },
  purple: {
    backgroundColor: _colors.purple
  },
  orange: {
    backgroundColor: _colors.orange
  },
  green: {
    backgroundColor: _colors.green
  },
  fuchsia: {
    backgroundColor: _colors.fuchsia
  },
  blueDark: {
    backgroundColor: _colors.blueDark
  },
  red: {
    backgroundColor: _colors.red
  },
  grey: {
    backgroundColor: _colors.neutral7
  },
  gray: {
    backgroundColor: _colors.neutral7
  },
  black: {
    backgroundColor: _colors.black
  },
  icon: {
    position: 'absolute',
    fontSize: 16.8,
    padding: 0.6,
    boxSizing: 'content-box',
    left: 6,
    top: 1,
    marginRight: 2
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var Tag = function Tag(_ref) {
  var className = _ref.className,
    color = _ref.color,
    darkText = _ref.darkText,
    label = _ref.label,
    _ref$status = _ref.status,
    status = _ref$status === void 0 ? 'default' : _ref$status,
    Icon = _ref.Icon,
    variant = _ref.variant,
    style = _ref.style,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_Typography.default, _extends({
    style: color ? _objectSpread({
      backgroundColor: color
    }, style) : style,
    className: (0, _classnames.default)(classes.root, Icon && classes.withIcon, classes[variant], classes[status], className),
    darkMode: !darkText
  }, rest, {
    ref: ref
  }), Icon && /*#__PURE__*/_react.default.createElement(Icon, {
    className: classes.icon
  }), label);
};
exports.Tag = Tag;
Tag.propTypes = {
  /** The content of the tag. */
  label: _propTypes.default.string.isRequired,
  /** A custom color for the tag. */
  color: _propTypes.default.string,
  /** If `true`, the text of the tag is dark. */
  darkText: _propTypes.default.bool,
  /** Coloring of the tag based on a status. */
  status: _propTypes.default.oneOf(['default', 'positive', 'negative', 'warning']),
  /** Coloring of the tag. */
  variant: _propTypes.default.oneOf(['blue', 'purple', 'orange', 'green', 'fuchsia', 'blueDark', 'red', 'grey', 'black'])
};
var _default = (0, _compose.default)((0, _withStyledEngineProvider.default)(), (0, _withRef.default)())(Tag);
exports.default = _default;