"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.InternalBannerContent = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _Close = _interopRequireDefault(require("../../icons/Close"));
var _Info = _interopRequireDefault(require("../../icons/Info"));
var _StatusCheck = _interopRequireDefault(require("../../icons/StatusCheck"));
var _StatusExclamation = _interopRequireDefault(require("../../icons/StatusExclamation"));
var _StatusNegative = _interopRequireDefault(require("../../icons/StatusNegative"));
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _BannerContent = _interopRequireDefault(require("../BannerContent"));
var _IconButton = _interopRequireDefault(require("../IconButton"));
var _Typography = _interopRequireDefault(require("../Typography"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var styles = {
  info: {
    backgroundColor: _colors.white,
    border: "solid 1px ".concat(_colors.neutral4),
    '& .MuiSnackbarContent-message': {
      paddingTop: 11,
      paddingBottom: 11,
      marginLeft: -1
    },
    '& .MuiSnackbarContent-action': {
      marginTop: -1,
      marginRight: -1
    }
  },
  success: {
    backgroundColor: _colors.bannerSuccess
  },
  warning: {
    backgroundColor: _colors.bannerWarning
  },
  error: {
    backgroundColor: _colors.bannerError
  },
  icon: {
    marginLeft: -1.6,
    marginRight: 6.4,
    alignSelf: 'flex-start',
    marginTop: 1,
    fontSize: 19.22,
    padding: 0.4,
    boxSizing: 'content-box'
  },
  contentContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    marginLeft: 16,
    marginRight: 64,
    '& p': {
      fontWeight: 600
    }
  },
  content: {
    color: _colors.white
  },
  contentInfo: {
    color: _colors.black
  },
  closeIcon: {
    fontSize: '15px !important'
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var icons = {
  success: _StatusCheck.default,
  warning: _StatusExclamation.default,
  error: _StatusNegative.default,
  info: _Info.default
};
var InternalBannerContent = function InternalBannerContent(_ref) {
  var variant = _ref.variant,
    message = _ref.message,
    onClose = _ref.onClose,
    icon = _ref.icon,
    noIcon = _ref.noIcon,
    ref = _ref.forwardedRef;
  var classes = useStyles();
  var fixedVariant = ['success', 'warning', 'error'].indexOf(variant) > -1 ? variant : 'info';
  var Icon = icon !== null && icon !== void 0 ? icon : icons[fixedVariant];
  var contentClass = fixedVariant !== 'info' ? classes.content : classes.contentInfo;
  return /*#__PURE__*/_react.default.createElement(_BannerContent.default, {
    className: classes[fixedVariant],
    message: /*#__PURE__*/_react.default.createElement("div", {
      className: classes.contentContainer
    }, !noIcon && /*#__PURE__*/_react.default.createElement(Icon, {
      className: (0, _classnames.default)(contentClass, classes.icon)
    }), /*#__PURE__*/_react.default.createElement(_Typography.default, {
      variant: "body1",
      className: contentClass
    }, message)),
    action: /*#__PURE__*/_react.default.createElement(_IconButton.default, {
      key: "close",
      "aria-label": "Close",
      onClick: onClose,
      darkMode: fixedVariant !== 'info',
      size: "small"
    }, /*#__PURE__*/_react.default.createElement(_Close.default, {
      className: classes.closeIcon
    })),
    ref: ref
  });
};
exports.InternalBannerContent = InternalBannerContent;
var _default = (0, _withRef.default)()(InternalBannerContent);
exports.default = _default;