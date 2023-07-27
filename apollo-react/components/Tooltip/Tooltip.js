"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Tooltip = void 0;
var _Tooltip = _interopRequireDefault(require("@mui/material/Tooltip"));
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _Typography = _interopRequireDefault(require("../Typography"));
var _styles = require("./styles");
var _excluded = ["classes", "body", "title", "subtitle", "extraLabels", "variant", "placement", "peek", "children", "PopperProps", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var useStyles = (0, _makeStyles.default)(_styles.styles);
var Tooltip = function Tooltip(_ref) {
  var _ref$classes = _ref.classes,
    classesProp = _ref$classes === void 0 ? {} : _ref$classes,
    body = _ref.body,
    title = _ref.title,
    subtitle = _ref.subtitle,
    _ref$extraLabels = _ref.extraLabels,
    extraLabels = _ref$extraLabels === void 0 ? [] : _ref$extraLabels,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? 'dark' : _ref$variant,
    placement = _ref.placement,
    peek = _ref.peek,
    children = _ref.children,
    PopperProps = _ref.PopperProps,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  var hasContent = title || title === 0 || body || subtitle;
  var size = peek || body || subtitle || extraLabels.length ? 'large' : 'small';
  var isBulletedList = Array.isArray(body);
  var bodyContent = body && !isBulletedList ? body : subtitle;
  var classKey = "".concat(size, "-").concat(variant);
  return hasContent || extraLabels.length ? /*#__PURE__*/_react.default.createElement(_Tooltip.default, _extends({
    classes: _objectSpread(_objectSpread({}, classesProp), {}, {
      popper: (0, _classnames.default)(peek ? classes["".concat(classKey, "-popper-peek")] : classes["".concat(classKey, "-popper")], classesProp.popper),
      tooltip: (0, _classnames.default)(classes["".concat(classKey, "-tooltip")], classes["".concat(size, "-").concat(placement)], classesProp.tooltip)
    }),
    title: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: classes["".concat(classKey, "-title")]
    }, title), /*#__PURE__*/_react.default.createElement("div", {
      className: classes["".concat(classKey, "-subtitle")]
    }, bodyContent), extraLabels === null || extraLabels === void 0 ? void 0 : extraLabels.map(function (_ref2, i) {
      var extraTitle = _ref2.title,
        subtitle = _ref2.subtitle;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)((title || i !== 0) && classes["".concat(classKey, "-labelSpacer")]),
        key: i
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: classes["".concat(classKey, "-title")]
      }, extraTitle), /*#__PURE__*/_react.default.createElement("div", {
        className: classes["".concat(classKey, "-subtitle")]
      }, subtitle));
    }), isBulletedList && body.map(function (listItem, i) {
      return /*#__PURE__*/_react.default.createElement(_Typography.default, {
        variant: "body2",
        key: i,
        className: classes["".concat(classKey, "-subtitle")]
      }, "\u2022 ".concat(listItem));
    }), /*#__PURE__*/_react.default.createElement("span", {
      className: classes.arrow
    })),
    placement: placement,
    PopperProps: _objectSpread(_objectSpread({}, PopperProps), {}, {
      modifiers: [{
        name: 'preventOverflow',
        options: {
          mainAxis: false
        }
      }].concat(_toConsumableArray((PopperProps === null || PopperProps === void 0 ? void 0 : PopperProps.modifiers) || []))
    })
  }, rest, {
    ref: ref
  }), children) : children;
};
exports.Tooltip = Tooltip;
Tooltip.propTypes = {
  /** Content used for body of `Tooltip`. Bulleted list. */
  body: _propTypes.default.node,
  /** Element that triggers tooltip on hover. */
  children: _propTypes.default.element,
  /** If `true`, the tooltip will not be interactive, i.e. it will close when the user hovers over the tooltip. */
  disableInteractive: _propTypes.default.bool,
  /** Additional text items to be displayed in tooltip. */
  extraLabels: _propTypes.default.arrayOf(_propTypes.default.shape({
    /** Text for an additional tooltip subtitle. */
    subtitle: _propTypes.default.node.isRequired,
    /** Text for an additional tooltip title. */
    title: _propTypes.default.node.isRequired
  })),
  /** Placement of the tooltip in relation to the anchor el. */
  placement: _propTypes.default.oneOf(['left', 'top', 'bottom', 'right', 'left-end', 'top-end', 'bottom-end', 'right-end', 'left-start', 'top-start', 'bottom-start', 'right-start']),
  /** Text for tooltip subtitle. */
  subtitle: _propTypes.default.node,
  /** Text for tooltip title. */
  title: _propTypes.default.node,
  /** The variant to use. */
  variant: _propTypes.default.oneOf(['dark', 'light'])
};
var _default = (0, _withRef.default)()(Tooltip);
exports.default = _default;