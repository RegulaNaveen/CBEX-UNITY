"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NavigationBarLogo = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireDefault(require("react"));
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _Typography = _interopRequireDefault(require("../Typography/Typography"));
var _excluded = ["className", "text", "src", "href", "alt", "onClick", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  root: {
    marginRight: 40,
    display: 'inline'
  },
  img: {
    verticalAlign: 'middle',
    maxHeight: 56
  },
  textLogo: {
    display: 'inline'
  },
  pointer: {
    cursor: 'pointer'
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var NavigationBarLogo = function NavigationBarLogo(_ref) {
  var className = _ref.className,
    text = _ref.text,
    src = _ref.src,
    href = _ref.href,
    alt = _ref.alt,
    onClick = _ref.onClick,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _classnames.default)(classes.root, className)
  }, rest, {
    ref: ref
  }), /*#__PURE__*/_react.default.createElement("a", {
    href: href,
    onClick: onClick,
    className: onClick && classes.pointer
  }, src && /*#__PURE__*/_react.default.createElement("img", {
    src: src,
    alt: alt,
    className: classes.img
  }), text && /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "title2",
    darkMode: true,
    className: classes.textLogo
  }, text)));
};
exports.NavigationBarLogo = NavigationBarLogo;
var _default = (0, _withRef.default)()(NavigationBarLogo);
exports.default = _default;