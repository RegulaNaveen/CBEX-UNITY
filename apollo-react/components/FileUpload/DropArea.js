"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DropArea = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _InfoIcon = _interopRequireDefault(require("../../icons/InfoIcon"));
var _UploadIcon = _interopRequireDefault(require("../../icons/UploadIcon"));
var _DropAreaText = _interopRequireDefault(require("./DropAreaText"));
var _excluded = ["isActive", "isHover", "maxReached", "height", "dropAreaLabels", "disabled"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var getBorder = function getBorder(color) {
  return "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='4' ry='4' stroke='%23".concat(color.slice(1), "' stroke-width='2' stroke-dasharray='2%2c 6' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e\")");
};
var activeStyle = {
  backgroundColor: _colors.primaryLight,
  backgroundImage: getBorder(_colors.primary),
  color: _colors.primary,
  cursor: 'pointer',
  '& p': {
    color: _colors.primary
  }
};
var styles = {
  dropArea: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    backgroundColor: _colors.neutral2,
    backgroundImage: getBorder(_colors.neutral5),
    height: 94,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    '&:hover': activeStyle
  },
  activeDropArea: activeStyle,
  dropMessage: {
    textAlign: 'center'
  },
  disabledPointer: {
    pointerEvents: 'none'
  },
  icon: {
    fontSize: '32px !important',
    color: _colors.neutral7
  },
  iconActive: {
    color: _colors.primary
  },
  iconDisabled: {
    color: _colors.neutral5
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var DropArea = function DropArea(_ref) {
  var isActive = _ref.isActive,
    isHover = _ref.isHover,
    maxReached = _ref.maxReached,
    height = _ref.height,
    dropAreaLabels = _ref.dropAreaLabels,
    disabled = _ref.disabled,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _classnames.default)(classes.dropArea, isActive && !maxReached && classes.activeDropArea, (maxReached || disabled) && classes.disabledPointer),
    style: {
      height: height
    }
  }, rest), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.dropMessage
  }, maxReached || disabled ? /*#__PURE__*/_react.default.createElement(_InfoIcon.default, {
    className: (0, _classnames.default)(classes.icon, classes.iconDisabled)
  }) : /*#__PURE__*/_react.default.createElement(_UploadIcon.default, {
    className: (0, _classnames.default)(classes.icon, (isHover || isActive) && classes.iconActive)
  }), /*#__PURE__*/_react.default.createElement(_DropAreaText.default, {
    isActive: isActive,
    isHover: isHover,
    disabled: disabled,
    maxReached: maxReached,
    dropAreaLabels: dropAreaLabels
  })));
};
exports.DropArea = DropArea;
DropArea.propTypes = {
  dropAreaLabels: _propTypes.default.shape({
    activeText: _propTypes.default.node,
    browseLinkText: _propTypes.default.node,
    defaultText: _propTypes.default.node,
    hoverText: _propTypes.default.node,
    maxText: _propTypes.default.node
  }),
  isActive: _propTypes.default.bool,
  maxReached: _propTypes.default.bool
};
var _default = DropArea;
exports.default = _default;