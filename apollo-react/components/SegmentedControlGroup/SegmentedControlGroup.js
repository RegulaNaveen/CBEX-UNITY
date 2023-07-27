"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SegmentedControlGroup = void 0;
var _ToggleButtonGroup = _interopRequireDefault(require("@mui/material/ToggleButtonGroup"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _Tooltip = _interopRequireDefault(require("../Tooltip"));
var _excluded = ["children", "disabled", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
// ToggleButtonGroup uses the value prop on its children to manage selected state.
// If the children are Tooltips, this code takes the value from the nested
// ToggleButton and puts it on the Tooltip, so that ToggleButtonGroup can use it.
var SegmentedControlGroup = function SegmentedControlGroup(_ref) {
  var children = _ref.children,
    disabled = _ref.disabled,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var childrenWithProps = _react.default.Children.map(children, function (child) {
    var _child$props$disabled2;
    if (child.type === _Tooltip.default) {
      var _child$props$disabled;
      return /*#__PURE__*/_react.default.cloneElement(child, {
        value: _react.default.Children.map(child.props.children, function (child) {
          return child.props.value;
        })[0],
        disabled: (_child$props$disabled = child.props.disabled) !== null && _child$props$disabled !== void 0 ? _child$props$disabled : disabled
      });
    }
    return /*#__PURE__*/_react.default.cloneElement(child, {
      disabled: (_child$props$disabled2 = child.props.disabled) !== null && _child$props$disabled2 !== void 0 ? _child$props$disabled2 : disabled
    });
  });
  return /*#__PURE__*/_react.default.createElement(_ToggleButtonGroup.default, _extends({}, rest, {
    ref: ref
  }), childrenWithProps);
};
exports.SegmentedControlGroup = SegmentedControlGroup;
SegmentedControlGroup.propTypes = {
  /** The `SegmentedControl` components of the group. */
  children: _propTypes.default.node,
  /** If `true`, the entire group is disabled. */
  disabled: _propTypes.default.bool,
  /** If `true`, only allow one of the child `SegmentedControl` values to be selected. */
  exclusive: _propTypes.default.bool,
  /** Callback fired when the value changes. */
  onChange: _propTypes.default.func,
  /**
   * The currently selected value within the group or an array of selected
   * values when exclusive is `false`. The value must have reference equality
   * with the option in order to be selected.
   */
  value: _propTypes.default.any
};
var _default = (0, _withRef.default)()(SegmentedControlGroup);
exports.default = _default;