"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Modal = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _shadows = require("../../shadows");
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _ButtonGroup = _interopRequireDefault(require("../ButtonGroup"));
var _ButtonGroup2 = require("../ButtonGroup/ButtonGroup");
var _CardMedia = _interopRequireDefault(require("../CardMedia"));
var _CustomDialog = _interopRequireDefault(require("../CustomDialog"));
var _DialogActions = _interopRequireDefault(require("../DialogActions"));
var _DialogContent = _interopRequireDefault(require("../DialogContent"));
var _DialogContentText = _interopRequireDefault(require("../DialogContentText"));
var _InternalDialogTitle = _interopRequireDefault(require("./InternalDialogTitle"));
var _excluded = ["image", "alt", "buttonProps", "children", "message", "open", "onClose", "subtitle", "title", "variant", "className", "scroll", "hideButtons", "style", "disableBackdropClick", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  cardMedia: {
    borderTopLeftRadius: 'unset',
    borderTopRightRadius: 'unset',
    backgroundColor: _shadows.blackDark
  },
  dialogContent: {
    padding: '0 24px 24px'
  },
  divider: {
    marginTop: 16
  },
  scrollButtonGroup: {
    margin: '16px 0px -8px 0px'
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var Modal = function Modal(_ref) {
  var image = _ref.image,
    alt = _ref.alt,
    _ref$buttonProps = _ref.buttonProps,
    buttonProps = _ref$buttonProps === void 0 ? _ButtonGroup2.defaultButtonProps : _ref$buttonProps,
    children = _ref.children,
    message = _ref.message,
    open = _ref.open,
    onClose = _ref.onClose,
    subtitle = _ref.subtitle,
    title = _ref.title,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? 'default' : _ref$variant,
    className = _ref.className,
    scroll = _ref.scroll,
    hideButtons = _ref.hideButtons,
    style = _ref.style,
    disableBackdropClick = _ref.disableBackdropClick,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  var onCloseModal = function onCloseModal() {
    if (onClose && !disableBackdropClick) {
      onClose();
    }
  };
  return /*#__PURE__*/_react.default.createElement(_CustomDialog.default, _extends({
    open: open,
    onClose: onCloseModal,
    classes: {
      paper: className
    },
    scroll: scroll,
    style: _objectSpread({
      zIndex: 3001
    }, style)
  }, rest, {
    ref: ref
  }), image && /*#__PURE__*/_react.default.createElement(_CardMedia.default, {
    className: classes.cardMedia,
    image: image,
    alt: alt
  }), /*#__PURE__*/_react.default.createElement(_InternalDialogTitle.default, {
    variant: variant,
    onClose: onClose,
    title: title,
    subtitle: subtitle,
    image: image
  }), /*#__PURE__*/_react.default.createElement(_DialogContent.default, {
    dividers: scroll === 'paper',
    className: classes.dialogContent
  }, children !== null && children !== void 0 ? children : /*#__PURE__*/_react.default.createElement(_DialogContentText.default, {
    className: (0, _classnames.default)(scroll === 'paper' && classes.divider)
  }, message)), !hideButtons && /*#__PURE__*/_react.default.createElement(_DialogActions.default, null, /*#__PURE__*/_react.default.createElement(_ButtonGroup.default, {
    className: (0, _classnames.default)(scroll === 'paper' && classes.scrollButtonGroup),
    buttonProps: buttonProps.map(function (button) {
      return button.onClick ? button : _objectSpread(_objectSpread({}, button), {}, {
        onClick: onClose
      });
    })
  })));
};
exports.Modal = Modal;
Modal.propTypes = {
  /** Alternative text for the image. Use with the `image` prop. */
  alt: _propTypes.default.string,
  /** Array of props for the `Button`s. */
  buttonProps: _propTypes.default.arrayOf(_propTypes.default.shape({
    /** The content of the button. */
    label: _propTypes.default.node,
    /** Callback fired when the component is clicked. */
    onClick: _propTypes.default.func,
    /** The variant to use. */
    variant: _propTypes.default.oneOf(['primary', 'secondary', 'tertiary', 'text', 'contained', 'outlined'])
  })),
  /**
   * The content of the component.
   * Use this instead of the `message` prop for a more custom modal.
   */
  children: _propTypes.default.node,
  /** If `true`, clicking the backdrop will not fire onClose. */
  disableBackdropClick: _propTypes.default.bool,
  /** If `true`, the action buttons are hidden. */
  hideButtons: _propTypes.default.bool,
  /**
   * Image included at top of modal content.
   * Use with the `alt` prop.
   */
  image: _propTypes.default.node,
  /**
   * Modal content message.
   * Use this instead of the `children` prop for a simple modal.
   */
  message: _propTypes.default.node,
  /** Callback fired when the component requests to be closed. */
  onClose: _propTypes.default.func,
  /** If `true`, the component is visible. */
  open: _propTypes.default.bool,
  /** If added, the modal content overflow is scrollable. */
  scroll: _propTypes.default.oneOf(['paper']),
  /** The subtitle of the modal. */
  subtitle: _propTypes.default.node,
  /** The title of the modal. */
  title: _propTypes.default.node,
  /** The variant to use. */
  variant: _propTypes.default.oneOf(['default', 'error', 'success', 'warning'])
};
var _default = (0, _withRef.default)()(Modal);
exports.default = _default;