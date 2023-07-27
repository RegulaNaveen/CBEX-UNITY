"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Peek = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _Tooltip = _interopRequireDefault(require("../Tooltip"));
var _useMousePosition2 = _interopRequireDefault(require("./useMousePosition"));
var _excluded = ["content", "anchor", "placement", "followCursor", "PopperProps", "forwardedRef"];
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
var styles = {
  content: {
    padding: '12px 4px'
  },
  tooltip: {
    backgroundColor: '#f6f7fb',
    maxWidth: 'none'
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var Peek = function Peek(_ref) {
  var content = _ref.content,
    anchor = _ref.anchor,
    placement = _ref.placement,
    followCursor = _ref.followCursor,
    PopperProps = _ref.PopperProps,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  var _useMousePosition = (0, _useMousePosition2.default)(followCursor),
    x = _useMousePosition.x,
    y = _useMousePosition.y;
  return /*#__PURE__*/_react.default.createElement(_Tooltip.default, _extends({
    variant: "light",
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: classes.content
    }, content),
    placement: placement,
    classes: {
      tooltip: classes.tooltip
    },
    size: "large",
    peek: true,
    PopperProps: followCursor ? _objectSpread(_objectSpread({
      anchorEl: {
        clientWidth: 0,
        clientHeight: 0,
        getBoundingClientRect: function getBoundingClientRect() {
          return {
            top: y + 2.5,
            right: x + 5,
            bottom: y + 15,
            left: x,
            height: 0,
            width: 0
          };
        }
      }
    }, PopperProps), {}, {
      modifiers: [{
        name: 'offset',
        options: {
          offset: [0, 12.5]
        }
      }].concat(_toConsumableArray((PopperProps === null || PopperProps === void 0 ? void 0 : PopperProps.modifiers) || []))
    }) : PopperProps
  }, rest, {
    ref: ref
  }), /*#__PURE__*/_react.default.createElement("span", null, anchor));
};
exports.Peek = Peek;
Peek.propTypes = {
  /** Element that shows the `Peek` on hover. */
  anchor: _propTypes.default.node,
  /** Body content of the `Peek`. */
  content: _propTypes.default.node,
  /** If `true`, the `Peek` follows the cursor over the wrapped element. */
  followCursor: _propTypes.default.bool,
  /** Placement of the `Peek` in relation to the anchor el. */
  placement: _propTypes.default.oneOf(['left', 'top', 'bottom', 'right', 'left-end', 'top-end', 'bottom-end', 'right-end', 'left-start', 'top-start', 'bottom-start', 'right-start'])
};
var _default = (0, _withRef.default)()(Peek);
exports.default = _default;