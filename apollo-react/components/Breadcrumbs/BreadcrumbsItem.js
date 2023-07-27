"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BreadcrumbsItem = BreadcrumbsItem;
exports.default = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _truncateText = require("../../utils/truncateText");
var _Button = _interopRequireDefault(require("../Button"));
var _Typography = _interopRequireDefault(require("../Typography"));
var _excluded = ["title", "isLastNode", "onClick", "handleClick"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var TRUNCATION_LIMIT = 24;
var styles = {
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  link: {
    display: 'block',
    textDecoration: 'none'
  },
  button: {
    color: _colors.neutral6,
    '&:hover': {
      color: _colors.primary,
      transition: '300ms'
    }
  },
  last: {
    fontWeight: 600,
    marginLeft: 7
  }
};
var useStyles = (0, _makeStyles.default)(styles);
function BreadcrumbsItem(_ref) {
  var title = _ref.title,
    isLastNode = _ref.isLastNode,
    _onClick = _ref.onClick,
    handleClick = _ref.handleClick,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement("li", {
    className: classes.root
  }, !isLastNode ? /*#__PURE__*/_react.default.createElement(_Button.default, _extends({
    size: "small",
    className: classes.button,
    onClick: function onClick(e) {
      _onClick && _onClick();
      handleClick && handleClick(e);
    }
  }, rest), (0, _truncateText.truncateText)(title, TRUNCATION_LIMIT)) : /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "body2",
    className: classes.last
  }, (0, _truncateText.truncateText)(title, TRUNCATION_LIMIT)));
}
BreadcrumbsItem.propTypes = {
  /** Callback fired when the component is clicked.
   * @ignore */
  handleClick: _propTypes.default.func,
  /** URL of the page the link goes to. */
  href: _propTypes.default.string,
  /** If `true`, the breadcrumb will not be a button. */
  isLastNode: _propTypes.default.bool,
  /** Callback fired when the component is clicked. */
  onClick: _propTypes.default.func,
  /** The title of the breadcrumb. */
  title: _propTypes.default.string
};
var _default = BreadcrumbsItem;
exports.default = _default;