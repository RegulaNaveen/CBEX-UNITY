"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Search = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _Search = _interopRequireDefault(require("../../icons/Search"));
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _TextField = _interopRequireDefault(require("../TextField"));
var _excluded = ["forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var Search = function Search(_ref) {
  var ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/_react.default.createElement(_TextField.default, _extends({
    type: "search",
    startIcon: /*#__PURE__*/_react.default.createElement(_Search.default, null)
  }, rest, {
    ref: ref
  }));
};
exports.Search = Search;
Search.propTypes = {
  /** If `true`, the component is disabled. */
  disabled: _propTypes.default.bool,
  /** If `true`, the component takes up the full width of its container. */
  fullWidth: _propTypes.default.bool,
  /** Callback fired when the value changes. */
  onChange: _propTypes.default.func,
  /** The short hint displayed in the input before the user enters a value. */
  placeholder: _propTypes.default.string,
  /** The size of the component. */
  size: _propTypes.default.oneOf(['small', 'medium']),
  /** The value of the input element, required for a controlled component. */
  value: _propTypes.default.any
};
var _default = (0, _withRef.default)()(Search);
exports.default = _default;