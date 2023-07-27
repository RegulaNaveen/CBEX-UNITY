"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Status = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _Lock = _interopRequireDefault(require("../../icons/Lock"));
var _StatusCheck = _interopRequireDefault(require("../../icons/StatusCheck"));
var _StatusExclamation = _interopRequireDefault(require("../../icons/StatusExclamation"));
var _StatusNegative = _interopRequireDefault(require("../../icons/StatusNegative"));
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _Typography = _interopRequireDefault(require("../Typography"));
var _excluded = ["variant", "label", "icon", "className", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    display: 'flex',
    margin: 3
  },
  text: {
    alignItems: 'center'
  },
  negative: {
    color: _colors.utilityNegative
  },
  warning: {
    color: _colors.utilityWarning
  },
  positive: {
    color: _colors.utilityPositive
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var icons = {
  negative: _StatusNegative.default,
  warning: _StatusExclamation.default,
  positive: _StatusCheck.default
};
var Status = function Status(_ref) {
  var _ref2;
  var variant = _ref.variant,
    label = _ref.label,
    icon = _ref.icon,
    className = _ref.className,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  var Icon = (_ref2 = icon !== null && icon !== void 0 ? icon : icons[variant]) !== null && _ref2 !== void 0 ? _ref2 : _Lock.default;
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _classnames.default)(classes.root, className)
  }, rest, {
    ref: ref
  }), /*#__PURE__*/_react.default.createElement(Icon, {
    className: (0, _classnames.default)(classes.icon, classes[variant])
  }), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "body2",
    className: classes.text
  }, label));
};
exports.Status = Status;
Status.propTypes = {
  /** Override the default icon. */
  icon: _propTypes.default.elementType,
  /** The content of the component. */
  label: _propTypes.default.node,
  /** The variant to use. */
  variant: _propTypes.default.oneOf(['default', 'negative', 'positive', 'warning'])
};
var _default = (0, _withRef.default)()(Status);
exports.default = _default;