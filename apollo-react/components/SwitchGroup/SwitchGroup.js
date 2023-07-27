"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SwitchGroup = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _FormGroup = _interopRequireDefault(require("../FormGroup"));
var _excluded = ["children", "row", "value", "onChange", "disabled", "size", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  columnSpacing: {
    marginTop: 20
  },
  rowSpacing: {
    marginLeft: 14
  },
  columnSpacingSmall: {
    marginTop: 26
  },
  rowSpacingSmall: {
    marginLeft: 8
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var SwitchGroup = function SwitchGroup(_ref) {
  var children = _ref.children,
    row = _ref.row,
    _ref$value = _ref.value,
    value = _ref$value === void 0 ? [] : _ref$value,
    onChange = _ref.onChange,
    disabled = _ref.disabled,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'medium' : _ref$size,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_FormGroup.default, _extends({
    row: row
  }, rest, {
    ref: ref
  }), _react.default.Children.map(children, function (child, index) {
    var _child$props$checked, _child$props$onChange, _child$props$disabled, _child$props$size;
    return /*#__PURE__*/_react.default.cloneElement(child, {
      checked: (_child$props$checked = child.props.checked) !== null && _child$props$checked !== void 0 ? _child$props$checked : value.includes(child.props.value),
      onChange: (_child$props$onChange = child.props.onChange) !== null && _child$props$onChange !== void 0 ? _child$props$onChange : function (e, checked) {
        if (checked) {
          e.target = {
            value: [].concat(_toConsumableArray(value), [child.props.value])
          };
        } else {
          e.target = {
            value: value.filter(function (item) {
              return item !== child.props.value;
            })
          };
        }
        onChange && onChange(e);
      },
      disabled: (_child$props$disabled = child.props.disabled) !== null && _child$props$disabled !== void 0 ? _child$props$disabled : disabled,
      size: (_child$props$size = child.props.size) !== null && _child$props$size !== void 0 ? _child$props$size : size,
      className: (0, _classnames.default)(child.props.className,
      // prettier-ignore
      index !== 0 && (row ? size === 'small' ? classes.rowSpacingSmall : classes.rowSpacing : size === 'small' ? classes.columnSpacingSmall : classes.columnSpacing))
    });
  }));
};
exports.SwitchGroup = SwitchGroup;
SwitchGroup.propTypes = {
  /** The switches to populate the group with. */
  children: _propTypes.default.node,
  /** If `true`, the component is disabled. */
  disabled: _propTypes.default.bool,
  /** If `true`, the component is displayed in an error state. */
  error: _propTypes.default.bool,
  /** The helper text content. */
  helperText: _propTypes.default.node,
  /** The label content. */
  label: _propTypes.default.node,
  /**
   * Callback fired when a switch is toggled on or off.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: _propTypes.default.func,
  /** If `true`, the label is displayed as optional. */
  optional: _propTypes.default.bool,
  /** If `true`, the label is displayed as required. */
  required: _propTypes.default.bool,
  /** If `true`, the switches are displayed horizontally. */
  row: _propTypes.default.bool,
  /** The size of the component. */
  size: _propTypes.default.oneOf(['small', 'medium']),
  /** The values of the selected switches. */
  value: _propTypes.default.array
};
var _default = (0, _withRef.default)()(SwitchGroup);
exports.default = _default;