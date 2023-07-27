"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Select = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _ArrowDown = _interopRequireDefault(require("../../icons/ArrowDown"));
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _TextField = require("../TextField/TextField");
var _SelectItem = _interopRequireDefault(require("./SelectItem"));
var _excluded = ["placeholder", "children", "SelectProps", "multiple", "value", "onChange", "canDeselect", "forwardedRef", "name", "size", "labelId", "maxItems"],
  _excluded2 = ["className"],
  _excluded3 = ["children", "className"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  hint: {
    color: _colors.neutral6
  },
  menu: {
    marginLeft: -24,
    marginTop: 4
  },
  truncate: {
    display: 'block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  smallSelectItem: {
    height: 32,
    fontSize: 14
  },
  smallIcon: {
    fontSize: 15,
    top: 'calc(50% - 0.55em)'
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var Select = function Select(_ref) {
  var placeholder = _ref.placeholder,
    children = _ref.children,
    SelectProps = _ref.SelectProps,
    multiple = _ref.multiple,
    _ref$value = _ref.value,
    value = _ref$value === void 0 ? '' : _ref$value,
    onChange = _ref.onChange,
    _ref$canDeselect = _ref.canDeselect,
    canDeselect = _ref$canDeselect === void 0 ? true : _ref$canDeselect,
    ref = _ref.forwardedRef,
    name = _ref.name,
    size = _ref.size,
    labelId = _ref.labelId,
    _ref$maxItems = _ref.maxItems,
    maxItems = _ref$maxItems === void 0 ? 10 : _ref$maxItems,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  var normalizeValue = function normalizeValue(e) {
    if (e.target.value === value && canDeselect) {
      e.target.value = '';
    }
    if (Array.isArray(e.target.value)) {
      if (e.target.value.length === 2 && e.target.value[0] === '') {
        e.target.value.shift();
      }
    }
    onChange(e);
  };
  return /*#__PURE__*/_react.default.createElement(_TextField.TextField, _extends({
    SelectProps: _objectSpread({
      classes: {
        select: (0, _classnames.default)(!value.toString() && classes.hint, classes.truncate)
      },
      displayEmpty: true,
      MenuProps: {
        transitionDuration: 0,
        classes: {
          paper: classes.menu
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'left'
        },
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left'
        },
        PaperProps: {
          style: {
            maxHeight: (size === 'small' ? 32 : 40) * maxItems
          }
        }
      },
      multiple: multiple,
      labelId: labelId,
      IconComponent: size === 'small' ? function (_ref2) {
        var className = _ref2.className,
          rest = _objectWithoutProperties(_ref2, _excluded2);
        return /*#__PURE__*/_react.default.createElement(_ArrowDown.default, _extends({
          className: (0, _classnames.default)(size === 'small' && classes.smallIcon, className)
        }, rest));
      } : _ArrowDown.default
    }, SelectProps),
    select: true,
    value: Array.isArray(value) && !value.length ? [''] : value,
    onChange: onChange && normalizeValue,
    name: name,
    size: size
  }, rest, {
    ref: ref
  }), placeholder && /*#__PURE__*/_react.default.createElement(_SelectItem.default, {
    value: "",
    isPlaceholder: true
  }, placeholder), _react.default.Children.map(children, function (_ref3) {
    var _ref3$props = _ref3.props,
      children = _ref3$props.children,
      className = _ref3$props.className,
      rest = _objectWithoutProperties(_ref3$props, _excluded3);
    return /*#__PURE__*/_react.default.createElement(_SelectItem.default, _extends({}, rest, {
      className: (0, _classnames.default)(size === 'small' && classes.smallSelectItem, className),
      size: size,
      multiple: multiple,
      onClick: onChange && function (e) {
        if (value === rest.value) {
          e.target = {
            value: rest.value,
            name: name
          };
          normalizeValue(e);
        }
      }
    }), children instanceof Array ? children.join('') : children);
  }));
};
exports.Select = Select;
Select.propTypes = {
  /** If `true`, a selected item can be clicked again to be deselected. */
  canDeselect: _propTypes.default.bool,
  /** The option elements to populate the select with. */
  children: _propTypes.default.node,
  /** If `true`, the component is disabled. */
  disabled: _propTypes.default.bool,
  /** If `true`, the label is displayed in an error state. */
  error: _propTypes.default.bool,
  /** If `true`, the component takes up the full width of its container. */
  fullWidth: _propTypes.default.bool,
  /** The helper text content. */
  helperText: _propTypes.default.node,
  /** The label content. */
  label: _propTypes.default.node,
  /**
   * The ID of an element that acts as an additional label.
   * The `Select` will be labelled by the additional label and the selected value.
   */
  labelId: _propTypes.default.string,
  /** Maximum number of menu items shown in the menu. */
  maxItems: _propTypes.default.number,
  /** If `true`, `value` must be an array and the menu will support multiple selections. */
  multiple: _propTypes.default.bool,
  /** Name attribute of the input element. */
  name: _propTypes.default.string,
  /** Callback fired when the value changes. */
  onChange: _propTypes.default.func,
  /** If `true`, the label is displayed as optional. */
  optional: _propTypes.default.bool,
  /** The short hint displayed in the input before the user selects a value. */
  placeholder: _propTypes.default.string,
  /** Props applied to the `Select` component. */
  SelectProps: _propTypes.default.object,
  /** The size of the component. */
  size: _propTypes.default.oneOf(['small', 'medium']),
  /** The value of the component. */
  value: _propTypes.default.any
};
var _default = (0, _withRef.default)()(Select);
exports.default = _default;