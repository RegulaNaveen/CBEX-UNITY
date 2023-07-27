"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TableSortLabel = void 0;
var _TableSortLabel = _interopRequireDefault(require("@mui/material/TableSortLabel"));
var _react = _interopRequireDefault(require("react"));
var _Arrow2Down = _interopRequireDefault(require("../../icons/Arrow2Down"));
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _excluded = ["forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var TableSortLabel = function TableSortLabel(_ref) {
  var ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/_react.default.createElement(_TableSortLabel.default, _extends({
    IconComponent: _Arrow2Down.default
  }, rest, {
    ref: ref
  }));
};
exports.TableSortLabel = TableSortLabel;
var _default = (0, _withRef.default)()(TableSortLabel);
exports.default = _default;