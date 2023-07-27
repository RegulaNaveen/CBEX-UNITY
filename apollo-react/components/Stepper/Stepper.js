"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Stepper = void 0;
var _Stepper = _interopRequireDefault(require("@mui/material/Stepper"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _excluded = ["box", "children"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var Stepper = function Stepper(_ref) {
  var box = _ref.box,
    children = _ref.children,
    rest = _objectWithoutProperties(_ref, _excluded);
  return box ? /*#__PURE__*/_react.default.createElement(_Stepper.default, _extends({
    orientation: "vertical",
    connector: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null)
  }, rest), _react.default.Children.map(children, function (child) {
    return /*#__PURE__*/_react.default.cloneElement(child, {
      box: box
    });
  })) : /*#__PURE__*/_react.default.createElement(_Stepper.default, rest, children);
};
exports.Stepper = Stepper;
Stepper.propTypes = {
  /** Set the active step (zero based index). Set to -1 to disable all the steps. */
  activeStep: _propTypes.default.number,
  /**
   * If `true`, the step label is displayed under the step number, instead of
   * next to it.
   */
  alternativeLabel: _propTypes.default.bool,
  /** If `true`, the steps are displayed in outlined boxes. */
  box: _propTypes.default.bool,
  /** Two or more `Step` components. */
  children: _propTypes.default.node,
  /** The stepper orientation (layout flow direction). */
  orientation: _propTypes.default.oneOf(['horizontal', 'vertical'])
};
var _default = Stepper;
exports.default = _default;