"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SplitButton = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _colors = require("../../colors");
var _ArrowDown = _interopRequireDefault(require("../../icons/ArrowDown"));
var _shadows = require("../../shadows");
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _Button = _interopRequireDefault(require("../Button"));
var _MenuItem = _interopRequireDefault(require("../MenuItem"));
var _PopperMenu = _interopRequireDefault(require("../PopperMenu"));
var _excluded = ["className", "id", "size", "variant", "label", "onClick", "disabled", "forwardedRef", "menuItems", "maxItems", "PopperMenuProps", "placement", "forwardedRef"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  root: {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    borderRadius: 4,
    '& button': {
      boxShadow: 'none'
    }
  },
  dropDownWidth: {
    width: 40,
    minWidth: 40
  },
  dropdownSmallWidth: {
    width: 32,
    minWidth: 32
  },
  menuSmall: {
    '&:ul': {
      minWidth: 72
    }
  },
  menuItemSmall: {
    fontSize: 14,
    paddingLeft: 8,
    paddingRight: 8
  },
  mainButton: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    '&:hover': {
      boxShadow: 'none'
    }
  },
  mainButtonSecondary: {
    borderRight: 'none !important',
    '&:hover + button': {
      borderLeft: '1px solid #6aa3fd'
    }
  },
  dropdownButton: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    '&:hover': {
      boxShadow: 'none'
    }
  },
  dropdownButtonPrimary: {
    borderLeft: '1px solid #6aa3fd'
  },
  dropdownButtonPrimaryFocus: {
    backgroundColor: _colors.primaryDark,
    boxShadow: _shadows.shadowLevel2Hover
  },
  dropdownButtonSecondaryFocus: {
    backgroundColor: _colors.primaryLight,
    border: "1px solid ".concat(_colors.primary)
  },
  primarySplitButton: {
    boxShadow: _shadows.shadowLevel2
  },
  secondarySplitButton: {
    boxShadow: _shadows.shadowLevel1
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var SplitButton = function SplitButton(_ref) {
  var _PopperMenuProps$modi;
  var className = _ref.className,
    id = _ref.id,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'medium' : _ref$size,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? 'primary' : _ref$variant,
    label = _ref.label,
    onClick = _ref.onClick,
    disabled = _ref.disabled,
    forwardedRef = _ref.forwardedRef,
    _ref$menuItems = _ref.menuItems,
    menuItems = _ref$menuItems === void 0 ? [] : _ref$menuItems,
    _ref$maxItems = _ref.maxItems,
    maxItems = _ref$maxItems === void 0 ? 10 : _ref$maxItems,
    PopperMenuProps = _ref.PopperMenuProps,
    placement = _ref.placement,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    open = _useState2[0],
    setOpen = _useState2[1];
  var anchorRef = (0, _react.useRef)(null);
  var classes = useStyles();
  var handleClose = function handleClose() {
    setOpen(false);
  };
  var handleToggle = function handleToggle() {
    setOpen(function (prevOpen) {
      return !prevOpen;
    });
  };
  var handleMenuItemClick = function handleMenuItemClick(onClick) {
    onClick();
    setOpen(false);
  };
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _classnames.default)(classes.root, variant === 'primary' && !disabled && classes.primarySplitButton, variant === 'secondary' && !disabled && classes.secondarySplitButton, className)
  }, rest, {
    ref: ref
  }), /*#__PURE__*/_react.default.createElement(_Button.default, {
    size: size,
    variant: variant,
    disabled: disabled,
    onClick: onClick,
    className: (0, _classnames.default)(classes.mainButton, variant === 'secondary' && classes.mainButtonSecondary)
  }, label), /*#__PURE__*/_react.default.createElement(_Button.default, {
    size: size,
    variant: variant,
    disabled: disabled,
    onClick: handleToggle,
    ref: anchorRef,
    className: (0, _classnames.default)(classes.dropdownButton, variant === 'primary' && classes.dropdownButtonPrimary, size === 'small' ? classes.dropdownSmallWidth : classes.dropDownWidth, open && (variant === 'primary' && classes.dropdownButtonPrimaryFocus || variant === 'secondary' && classes.dropdownButtonSecondaryFocus))
  }, /*#__PURE__*/_react.default.createElement(_ArrowDown.default, {
    fontSize: "extraSmall"
  })), /*#__PURE__*/_react.default.createElement(_PopperMenu.default, _extends({
    id: id,
    anchorEl: anchorRef.current,
    open: open,
    onClose: handleClose,
    placement: placement
  }, PopperMenuProps, {
    className: (0, _classnames.default)(size === 'small' && classes.menuSmall, PopperMenuProps === null || PopperMenuProps === void 0 ? void 0 : PopperMenuProps.className),
    PaperProps: {
      sx: {
        maxHeight: (size === 'small' ? 32 : 40) * maxItems
      }
    },
    modifiers: [{
      name: 'offset',
      options: {
        offset: [0, 4]
      }
    }].concat(_toConsumableArray((_PopperMenuProps$modi = PopperMenuProps === null || PopperMenuProps === void 0 ? void 0 : PopperMenuProps.modifiers) !== null && _PopperMenuProps$modi !== void 0 ? _PopperMenuProps$modi : []))
  }), menuItems.map(function (_ref2) {
    var label = _ref2.label,
      _onClick = _ref2.onClick;
    return /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
      key: label,
      onClick: function onClick() {
        return handleMenuItemClick(_onClick);
      },
      className: (0, _classnames.default)(size === 'small' && classes.menuItemSmall)
    }, label);
  })));
};
exports.SplitButton = SplitButton;
SplitButton.propTypes = {
  /** If `true`, the component is disabled. */
  disabled: _propTypes.default.bool,
  /** ID of the menu. */
  id: _propTypes.default.string,
  /** The content of the main button. */
  label: _propTypes.default.node,
  /** Maximum number of menu items shown in the menu. */
  maxItems: _propTypes.default.number,
  /** The menu items to display in the dropdown. */
  menuItems: _propTypes.default.arrayOf(_propTypes.default.shape({
    /** The content of the menu item. */
    label: _propTypes.default.node,
    /** Callback fired when the menu item is clicked. */
    onClick: _propTypes.default.func
  })),
  /** Callback fired when the main button is clicked. */
  onClick: _propTypes.default.func,
  /** Placement of the `Popper`. */
  placement: _propTypes.default.oneOf(['auto-end', 'auto-start', 'auto', 'bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),
  /** Props applied to the `PopperMenu` component. */
  PopperMenuProps: _propTypes.default.object,
  /** The size of the component. */
  size: _propTypes.default.oneOf(['medium', 'small']),
  /** The variant to use. */
  variant: _propTypes.default.oneOf(['primary', 'secondary'])
};
var _default = (0, _withRef.default)()(SplitButton);
exports.default = _default;