"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Avatar = void 0;
var _Avatar = _interopRequireDefault(require("@mui/material/Avatar"));
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _excluded = ["className", "size", "color", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  small: {
    height: 32,
    width: 32,
    fontSize: 14,
    '& svg': {
      fontSize: 16.8
    },
    '& img': {
      height: 32,
      width: 32
    }
  },
  medium: {
    height: 56,
    width: 56,
    fontSize: 20,
    '& svg': {
      fontSize: 24
    },
    '& img': {
      height: 56,
      width: 56
    }
  },
  large: {
    height: 80,
    width: 80,
    fontSize: 32,
    '& svg': {
      fontSize: 38.4
    },
    '& img': {
      height: 80,
      width: 80
    }
  },
  extraLarge: {
    height: 120,
    width: 120,
    fontSize: 40,
    '& svg': {
      fontSize: 48
    },
    '& img': {
      height: 120,
      width: 120
    }
  },
  dark: {
    backgroundColor: _colors.neutral4
  },
  light: {
    backgroundColor: _colors.white
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var Avatar = function Avatar(_ref) {
  var className = _ref.className,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'medium' : _ref$size,
    _ref$color = _ref.color,
    color = _ref$color === void 0 ? 'dark' : _ref$color,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_Avatar.default, _extends({
    className: (0, _classnames.default)(classes[size], classes[color], className)
  }, rest, {
    ref: ref
  }));
};
exports.Avatar = Avatar;
Avatar.propTypes = {
  /**
   * Used in combination with `src` or `srcSet` to provide alternative text for
   * the rendered `img` element.
   */
  alt: _propTypes.default.string,
  /**
   * Used to render icon or text elements inside the `Avatar` if `src` is not set.
   * This can be an element, or just a string.
   */
  children: _propTypes.default.node,
  /** The color of the component. */
  color: _propTypes.default.oneOf(['dark', 'light']),
  /**
   * Attributes applied to the `img` element if the component is used to display
   * an image. It can be used to listen for the loading error event.
   */
  imgProps: _propTypes.default.object,
  /** The size of the component. */
  size: _propTypes.default.oneOf(['small', 'medium', 'large', 'extraLarge']),
  /** The `src` attribute for the `img` element. */
  src: _propTypes.default.string
};
var _default = (0, _withRef.default)()(Avatar);
exports.default = _default;