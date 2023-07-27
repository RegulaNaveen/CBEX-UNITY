"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SelectItem = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _Check = _interopRequireDefault(require("../../icons/Check"));
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _Checkbox = require("../Checkbox/Checkbox");
var _MenuItem = _interopRequireDefault(require("../MenuItem"));
var _excluded = ["selected", "disabled", "children", "className", "isPlaceholder", "size", "multiple", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  root: {
    paddingLeft: 32,
    paddingRight: 32
  },
  multiple: {
    paddingLeft: 16,
    '&:hover svg, &:focus svg': {
      color: _colors.primary
    }
  },
  multipleSelected: {
    '&:hover svg, &:focus svg': {
      color: _colors.primaryDark2
    }
  },
  check: {
    fontSize: '16px !important',
    padding: 2,
    boxSizing: 'content-box'
  },
  checkSmall: {
    fontSize: '14px !important',
    padding: 3,
    boxSizing: 'content-box'
  },
  checkbox: {
    minHeight: '18px !important',
    marginTop: -15,
    marginRight: 19
  },
  hide: {
    display: 'none'
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var SelectItem = function SelectItem(_ref) {
  var selected = _ref.selected,
    disabled = _ref.disabled,
    children = _ref.children,
    className = _ref.className,
    isPlaceholder = _ref.isPlaceholder,
    size = _ref.size,
    multiple = _ref.multiple,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_MenuItem.default, _extends({
    selected: selected,
    disabled: isPlaceholder || disabled,
    className: (0, _classnames.default)(classes.root, multiple && classes.multiple, multiple && selected && classes.multipleSelected, isPlaceholder && classes.hide, className)
  }, rest, {
    ref: ref
  }), !multiple && selected && !(disabled || isPlaceholder) && /*#__PURE__*/_react.default.createElement(_Check.default, {
    className: size === 'small' ? classes.checkSmall : classes.check
  }), multiple && /*#__PURE__*/_react.default.createElement(_Checkbox.Checkbox, {
    checked: selected,
    className: classes.checkbox
  }), children);
};
exports.SelectItem = SelectItem;
var _default = (0, _withRef.default)()(SelectItem);
exports.default = _default;