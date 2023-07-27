"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NavigationBarButton = void 0;
var _ClickAwayListener = _interopRequireDefault(require("@mui/material/ClickAwayListener"));
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _ArrowDown = _interopRequireDefault(require("../../icons/ArrowDown"));
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _Button = _interopRequireDefault(require("../Button"));
var _excluded = ["href", "onClick", "src", "icon", "text", "hasMenuItems", "handleClick", "open", "active", "className", "onClose", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  buttonDefault: {
    height: 56,
    padding: 16,
    justifyContent: 'space-between',
    color: _colors.white,
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 1.5,
    borderRadius: 0,
    '& img': {
      maxHeight: 56
    },
    '&:hover': {
      backgroundColor: _colors.transparentLight
    }
  },
  buttonActive: {
    backgroundColor: _colors.transparent,
    '&:hover': {
      backgroundColor: _colors.transparent
    }
  },
  buttonWithMenu: {
    padding: '16px 11px 16px 16px'
  },
  arrow: {
    fontSize: 16,
    padding: 4,
    boxSizing: 'content-box'
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var NavigationBarButton = function NavigationBarButton(_ref) {
  var href = _ref.href,
    _onClick = _ref.onClick,
    src = _ref.src,
    icon = _ref.icon,
    text = _ref.text,
    hasMenuItems = _ref.hasMenuItems,
    handleClick = _ref.handleClick,
    open = _ref.open,
    active = _ref.active,
    className = _ref.className,
    _ref$onClose = _ref.onClose,
    onClose = _ref$onClose === void 0 ? function () {} : _ref$onClose,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_ClickAwayListener.default, {
    onClickAway: open ? onClose : function () {}
  }, /*#__PURE__*/_react.default.createElement(_Button.default, _extends({
    className: (0, _classnames.default)(classes.buttonDefault, hasMenuItems && classes.buttonWithMenu, (open || active) && classes.buttonActive, className),
    href: href,
    onClick: function onClick(e) {
      _onClick && _onClick();
      handleClick && handleClick(e);
    }
  }, rest, {
    ref: ref
  }), src && /*#__PURE__*/_react.default.createElement("img", {
    src: src,
    alt: ""
  }), icon, text, hasMenuItems && /*#__PURE__*/_react.default.createElement(_ArrowDown.default, {
    className: classes.arrow
  })));
};
exports.NavigationBarButton = NavigationBarButton;
var _default = (0, _withRef.default)()(NavigationBarButton);
exports.default = _default;