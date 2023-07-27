"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Chip = void 0;
var _Chip = _interopRequireDefault(require("@mui/material/Chip"));
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _CloseCircle = _interopRequireDefault(require("../../icons/CloseCircle"));
var _shadows = require("../../shadows");
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _excluded = ["disabled", "className", "onDelete", "selected", "color", "size", "icon", "variant", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  disabledStyle: {
    opacity: 0.4,
    pointerEvents: 'none',
    paddingRight: 11,
    boxShadow: 'none !important'
  },
  disabledStyleIcon: {
    paddingRight: 7
  },
  disabledStyleSmall: {
    paddingRight: 3
  },
  selectedStyle: {
    // This is a lot of `!important` tags. We will clean this up in NOMOON-1328.
    backgroundColor: "".concat(_colors.primary, " !important"),
    border: "1px solid ".concat(_colors.primary),
    color: "".concat(_colors.white, " !important"),
    boxShadow: "".concat(_shadows.shadowLevel2),
    '&:hover': {
      backgroundColor: "".concat(_colors.primaryDark, " !important"),
      boxShadow: "".concat(_shadows.shadowLevel2Hover, " !important")
    }
  },
  whiteStyle: {
    backgroundColor: "".concat(_colors.white, " !important"),
    color: "".concat(_colors.black, " !important"),
    borderColor: "".concat(_colors.neutral4, " !important"),
    '& .MuiChip-icon, & .a-MuiChip-icon': {
      color: _colors.black
    }
  },
  whiteCloseIcon: {
    color: "".concat(_colors.neutral5, " !important"),
    transition: 'color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    '&:hover': {
      color: "".concat(_colors.red, " !important")
    }
  },
  whiteDisabled: {
    backgroundColor: "".concat(_colors.neutral3, " !important"),
    borderColor: "".concat(_colors.neutral3, " !important"),
    color: "".concat(_colors.neutral7, " !important"),
    '& .MuiChip-avatar': {
      opacity: 0.72
    },
    '& .MuiChip-icon, & .a-MuiChip-icon': {
      color: _colors.neutral7
    },
    opacity: 1
  },
  whiteHover: {
    border: 'solid 1px rgba(255, 0, 0, 0.16)',
    backgroundColor: 'rgba(226, 0, 0, 0.08) !important'
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var Chip = function Chip(_ref) {
  var disabled = _ref.disabled,
    className = _ref.className,
    onDelete = _ref.onDelete,
    selected = _ref.selected,
    color = _ref.color,
    size = _ref.size,
    icon = _ref.icon,
    variant = _ref.variant,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  var _React$useState = _react.default.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    hovering = _React$useState2[0],
    setHovering = _React$useState2[1];
  var isWhite = color === 'white';
  return /*#__PURE__*/_react.default.createElement(_Chip.default, _extends({
    className: (0, _classnames.default)(disabled && classes.disabledStyle, disabled && (isWhite || variant === 'outlined' && !selected) && classes.whiteDisabled, disabled && icon && classes.disabledStyleIcon, disabled && size === 'small' && classes.disabledStyleSmall, selected && classes.selectedStyle, isWhite && classes.whiteStyle, isWhite && hovering && classes.whiteHover, className),
    onDelete: disabled ? undefined : onDelete,
    deleteIcon: /*#__PURE__*/_react.default.createElement(_CloseCircle.default, {
      className: (0, _classnames.default)(isWhite && classes.whiteCloseIcon),
      onMouseEnter: isWhite ? function () {
        return setHovering(true);
      } : undefined,
      onMouseLeave: isWhite ? function () {
        return setHovering(false);
      } : undefined,
      "aria-label": "Delete"
    }),
    color: !isWhite ? color : undefined,
    size: size,
    icon: icon,
    variant: variant
  }, rest, {
    ref: ref
  }));
};
exports.Chip = Chip;
Chip.propTypes = {
  /** The color of the component. Default is primary blue. */
  color: _propTypes.default.oneOf(['primary', 'white']),
  /** If `true`, the component is disabled. */
  disabled: _propTypes.default.bool,
  /** Icon element. */
  icon: _propTypes.default.element,
  /** The content of the chip. */
  label: _propTypes.default.node,
  /** Callback fired when the delete icon is clicked. If set, the delete icon is shown. */
  onDelete: _propTypes.default.func,
  /** If `true`, chip is selected and selected styles are applied. */
  selected: _propTypes.default.bool,
  /** The size of the component. */
  size: _propTypes.default.oneOf(['small', 'medium']),
  /** The value of component. */
  value: _propTypes.default.any,
  /** The variant to use. */
  variant: _propTypes.default.oneOf(['filled', 'outlined'])
};
var _default = (0, _withRef.default)()(Chip);
exports.default = _default;