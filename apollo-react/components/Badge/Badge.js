"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Badge = void 0;
var _Badge = _interopRequireDefault(require("@mui/material/Badge"));
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _Button = _interopRequireDefault(require("../Button"));
var _IconButton = _interopRequireDefault(require("../IconButton"));
var _IconMenuButton = _interopRequireDefault(require("../IconMenuButton"));
var _excluded = ["children", "classes", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  badge: {
    top: -2,
    right: -2
  },
  dot: {
    top: -2,
    right: -2
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var Badge = function Badge(_ref) {
  var _children$type;
  var children = _ref.children,
    classesProp = _ref.classes,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  var shouldFlip = [_Button.default, _IconButton.default, _IconMenuButton.default].includes(children.type);
  var inner = /*#__PURE__*/_react.default.createElement(_Badge.default, _extends({
    classes: _objectSpread(_objectSpread({}, (((_children$type = children.type) === null || _children$type === void 0 ? void 0 : _children$type.muiName) === 'SvgIcon' || children.type === _IconButton.default) && classes), classesProp),
    overlap: "rectangular",
    ref: shouldFlip ? null : ref
  }, rest), shouldFlip ? children.props.children : children);
  return shouldFlip ? /*#__PURE__*/_react.default.createElement(children.type, _extends({}, children.props, {
    ref: ref
  }), inner) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, inner);
};
exports.Badge = Badge;
Badge.propTypes = {
  /** Content rendered within the badge. */
  badgeContent: _propTypes.default.node,
  /** The badge is added relative to this node. */
  children: _propTypes.default.node,
  /** If `true`, the badge will be invisible. */
  invisible: _propTypes.default.bool,
  /** Maximum count to show. */
  max: _propTypes.default.number,
  /** If `true`, the badge is still shown when badgeContent is zero. */
  showZero: _propTypes.default.bool,
  /** The variant to use. */
  variant: _propTypes.default.oneOf(['standard', 'dot'])
};
var _default = (0, _withRef.default)()(Badge);
exports.default = _default;