"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InternalDialogTitle = InternalDialogTitle;
exports.default = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _Close = _interopRequireDefault(require("../../icons/Close"));
var _IconButton = _interopRequireDefault(require("../IconButton"));
var _Typography = _interopRequireDefault(require("../Typography"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var styles = {
  padding: {
    padding: '24px 24px 16px 24px'
  },
  title: {
    position: 'relative',
    lineHeight: 1.2,
    paddingRight: 56
  },
  subtitle: {
    lineHeight: 1.5,
    fontSize: 16
  },
  bar: {
    height: 4
  },
  defaultBar: {
    backgroundImage: _colors.gradientHorizontal
  },
  errorTitle: {
    color: _colors.utilityNegative
  },
  errorBar: {
    backgroundColor: _colors.utilityNegative
  },
  warningTitle: {
    color: _colors.utilityWarning
  },
  warningBar: {
    backgroundColor: _colors.utilityWarning
  },
  successTitle: {
    color: _colors.utilityPositive
  },
  successBar: {
    backgroundColor: _colors.utilityPositive
  },
  icon: {
    position: 'absolute',
    top: -4,
    right: 0
  },
  close: {
    fontSize: '15px !important'
  }
};
var useStyles = (0, _makeStyles.default)(styles);
function InternalDialogTitle(_ref) {
  var onClose = _ref.onClose,
    subtitle = _ref.subtitle,
    title = _ref.title,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? 'default' : _ref$variant,
    image = _ref.image;
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(classes.bar, !image && classes["".concat(variant, "Bar")])
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.padding
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    className: (0, _classnames.default)(classes.title, classes["".concat(variant, "Title")]),
    variant: "title1"
  }, title, variant !== 'error' && /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    size: "small",
    className: classes.icon,
    onClick: onClose,
    "aria-label": "Close"
  }, /*#__PURE__*/_react.default.createElement(_Close.default, {
    className: classes.close
  }))), variant === 'default' && subtitle && /*#__PURE__*/_react.default.createElement(_Typography.default, {
    className: classes.subtitle,
    variant: "title2"
  }, subtitle)));
}
InternalDialogTitle.propTypes = {
  title: _propTypes.default.node.isRequired,
  error: _propTypes.default.bool,
  image: _propTypes.default.string,
  onClose: _propTypes.default.func,
  subtitle: _propTypes.default.node,
  success: _propTypes.default.bool,
  warning: _propTypes.default.bool
};
var _default = InternalDialogTitle;
exports.default = _default;