"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DropAreaText = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _Typography = _interopRequireDefault(require("../Typography"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var styles = {
  blueLink: {
    color: _colors.primary
  },
  typography: {
    marginTop: 2,
    paddingLeft: 4,
    color: _colors.neutral7,
    fontWeight: 400
  },
  disabledText: {
    color: _colors.neutral6
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var DropAreaText = function DropAreaText(_ref) {
  var maxReached = _ref.maxReached,
    isHover = _ref.isHover,
    isActive = _ref.isActive,
    disabled = _ref.disabled,
    _ref$dropAreaLabels = _ref.dropAreaLabels,
    activeText = _ref$dropAreaLabels.activeText,
    hoverText = _ref$dropAreaLabels.hoverText,
    maxText = _ref$dropAreaLabels.maxText,
    defaultText = _ref$dropAreaLabels.defaultText,
    browseLinkText = _ref$dropAreaLabels.browseLinkText,
    disabledText = _ref$dropAreaLabels.disabledText;
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "body2",
    className: (0, _classnames.default)(classes.typography, (maxReached || disabled) && classes.disabledText)
  }, disabled ? disabledText : isActive ? activeText : isHover ? hoverText : maxReached ? maxText : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, defaultText, /*#__PURE__*/_react.default.createElement("span", {
    className: classes.blueLink
  }, browseLinkText)));
};
exports.DropAreaText = DropAreaText;
DropAreaText.propTypes = {
  dropAreaLabels: _propTypes.default.shape({
    activeText: _propTypes.default.node,
    browseLinkText: _propTypes.default.node,
    defaultText: _propTypes.default.node,
    hoverText: _propTypes.default.node,
    maxText: _propTypes.default.node
  }),
  isActive: _propTypes.default.bool,
  isHover: _propTypes.default.bool,
  maxItems: _propTypes.default.number,
  value: _propTypes.default.array
};
var _default = DropAreaText;
exports.default = _default;