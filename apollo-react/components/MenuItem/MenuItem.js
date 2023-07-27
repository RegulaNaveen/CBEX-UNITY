"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MenuItem = void 0;
var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _excluded = ["className", "destructiveAction", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  destructiveAction: {
    color: _colors.red,
    '&:hover': {
      color: _colors.red,
      backgroundColor: _colors.redVeryLight
    },
    '&:active': {
      color: _colors.red,
      backgroundColor: _colors.redVeryLight
    },
    '&:focus': {
      color: "".concat(_colors.red, " !important"),
      // override .MuiIMenuItem-root:focus
      backgroundColor: "".concat(_colors.redVeryLight, " !important") // override .MuiIMenuItem-root:focus
    }
  }
};

var useStyles = (0, _makeStyles.default)(styles);
var MenuItem = function MenuItem(_ref) {
  var className = _ref.className,
    destructiveAction = _ref.destructiveAction,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_MenuItem.default, _extends({
    className: (0, _classnames.default)(destructiveAction && classes.destructiveAction, className)
  }, rest, {
    ref: ref
  }));
};
exports.MenuItem = MenuItem;
MenuItem.propTypes = {
  /** If `true`, destructive action style will be applied. */
  destructiveAction: _propTypes.default.bool
};
var _default = (0, _withRef.default)()(MenuItem);
exports.default = _default;