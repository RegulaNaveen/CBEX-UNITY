"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.IconButtonWithoutTheme = exports.IconButton = void 0;
var _Badge = _interopRequireDefault(require("@mui/material/Badge"));
var _IconButton = _interopRequireDefault(require("@mui/material/IconButton"));
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _Badge2 = _interopRequireDefault(require("../Badge"));
var _excluded = ["darkMode", "destructiveAction", "className", "active", "size", "open", "children", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  active: {
    color: _colors.primary,
    '&:hover, &:disabled': {
      color: _colors.primary
    }
  },
  darkMode: {
    color: _colors.white,
    '&:hover': {
      color: _colors.white,
      backgroundColor: _colors.transparentLight
    },
    '&:disabled': {
      color: _colors.white
    }
  },
  destructiveAction: {
    '&:hover': {
      color: _colors.red,
      backgroundColor: _colors.redVeryLight
    }
  },
  small: {
    width: 32,
    height: 32
  },
  open: {
    backgroundColor: _colors.primaryLight,
    color: _colors.black
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var IconButton = function IconButton(_ref) {
  var darkMode = _ref.darkMode,
    destructiveAction = _ref.destructiveAction,
    className = _ref.className,
    active = _ref.active,
    size = _ref.size,
    open = _ref.open,
    children = _ref.children,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_IconButton.default, _extends({
    className: (0, _classnames.default)(active && classes.active, darkMode && classes.darkMode, destructiveAction && classes.destructiveAction, size === 'small' && classes.small, open && classes.open, className)
  }, rest, {
    ref: ref
  }), /*#__PURE__*/_react.default.cloneElement(children, children.type === _Badge2.default || children.type === _Badge.default ? {
    children: /*#__PURE__*/_react.default.cloneElement(children.props.children, {
      fontSize: size
    })
  } : {
    fontSize: size
  }));
};
exports.IconButton = IconButton;
IconButton.propTypes = {
  /** Icon to display. */
  children: _propTypes.default.element.isRequired,
  /** If `true`, the component is shown in an active state. */
  active: _propTypes.default.bool,
  /** The color of the component. */
  color: _propTypes.default.oneOf(['default', 'primary']),
  /** If `true`, the component has a lighter appearance, for display on a dark background. */
  darkMode: _propTypes.default.bool,
  /** If `true`, IconButton will turn red on hover to indicate a destructive action. */
  destructiveAction: _propTypes.default.bool,
  /** If `true`, the component is disabled. */
  disabled: _propTypes.default.bool,
  /** Callback fired when the component is clicked. */
  onClick: _propTypes.default.func,
  /** The size of the component. */
  size: _propTypes.default.oneOf(['extraSmall', 'small', 'medium'])
};
var IconButtonWithoutTheme = (0, _withRef.default)()(IconButton);
exports.IconButtonWithoutTheme = IconButtonWithoutTheme;
var _default = (0, _withRef.default)()(IconButton);
exports.default = _default;