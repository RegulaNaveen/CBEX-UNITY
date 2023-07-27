"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Banner = void 0;
var _Slide = _interopRequireDefault(require("@mui/material/Slide"));
var _Snackbar = _interopRequireDefault(require("@mui/material/Snackbar"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _InternalBannerContent = _interopRequireDefault(require("./InternalBannerContent"));
var _excluded = ["message", "variant", "onClose", "icon", "noIcon", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var Banner = function Banner(_ref) {
  var message = _ref.message,
    variant = _ref.variant,
    onClose = _ref.onClose,
    icon = _ref.icon,
    noIcon = _ref.noIcon,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/_react.default.createElement(_Snackbar.default, _extends({
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center'
    },
    onClose: onClose,
    ClickAwayListenerProps: {
      onClickAway: function onClickAway() {}
    },
    TransitionComponent: _Slide.default
  }, rest, {
    ref: ref
  }), /*#__PURE__*/_react.default.createElement(_InternalBannerContent.default, {
    message: message,
    variant: variant,
    onClose: onClose,
    icon: icon,
    noIcon: noIcon
  }));
};
exports.Banner = Banner;
Banner.propTypes = {
  /** Override the default icon. */
  icon: _propTypes.default.elementType,
  /** The message to display. */
  message: _propTypes.default.node,
  /** If `true`, no icon is displayed. */
  noIcon: _propTypes.default.bool,
  /** Callback fired when the component requests to be closed. */
  onClose: _propTypes.default.func,
  /** If `true`, the component is visible. */
  open: _propTypes.default.bool,
  /** The variant to use. */
  variant: _propTypes.default.oneOf(['error', 'info', 'success', 'warning'])
};
var _default = (0, _withRef.default)()(Banner);
exports.default = _default;