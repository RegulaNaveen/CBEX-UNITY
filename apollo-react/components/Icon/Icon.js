"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Icon = void 0;
var _Icon = _interopRequireDefault(require("@mui/material/Icon"));
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _excluded = ["position", "className", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  left: {
    marginRight: 4
  },
  right: {
    marginLeft: 4
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var Icon = function Icon(_ref) {
  var position = _ref.position,
    className = _ref.className,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_Icon.default, _extends({
    className: (0, _classnames.default)(classes[position], className)
  }, rest, {
    ref: ref
  }));
};
exports.Icon = Icon;
Icon.propTypes = {
  /** Size of the icon. */
  fontSize: _propTypes.default.oneOf(['extraSmall', 'medium', 'small', 'large']),
  /**
   * Position of icon to indicate where margin should be added.
   * Will add margin between icon and other element children.
   */
  position: _propTypes.default.oneOf(['left', 'right'])
};
var _default = (0, _withRef.default)()(Icon);
exports.default = _default;