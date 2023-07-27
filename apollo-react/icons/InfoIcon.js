"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _pure = _interopRequireDefault(require("@hypnosphi/recompose/pure"));
var _SvgIcon = _interopRequireDefault(require("@mui/material/SvgIcon"));
var _react = _interopRequireDefault(require("react"));
var _excluded = ["viewBox"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var Info = function Info(_ref) {
  var _ref$viewBox = _ref.viewBox,
    viewBox = _ref$viewBox === void 0 ? '0 0 32 32' : _ref$viewBox,
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/_react.default.createElement(_SvgIcon.default, _extends({
    viewBox: viewBox
  }, rest), /*#__PURE__*/_react.default.createElement("title", null, 'info'), /*#__PURE__*/_react.default.createElement("path", {
    fill: "none",
    d: "M0 0H32V32H0z"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16C31.99 7.167 24.833.01 16 0zm.333 6.667c1.105 0 2 .895 2 2 0 1.104-.895 2-2 2-1.104 0-2-.896-2-2 0-1.105.896-2 2-2zm3 18H14c-.736 0-1.333-.597-1.333-1.334 0-.736.597-1.333 1.333-1.333h1c.184 0 .333-.15.333-.333v-6c0-.184-.149-.334-.333-.334h-1c-.736 0-1.333-.597-1.333-1.333s.597-1.333 1.333-1.333h1.333c1.473 0 2.667 1.194 2.667 2.666v6.334c0 .184.15.333.333.333h1c.737 0 1.334.597 1.334 1.333 0 .737-.597 1.334-1.334 1.334z"
  }));
};
var InfoPure = (0, _pure.default)(Info);
InfoPure.muiName = 'SvgIcon';
var _default = InfoPure;
exports.default = _default;