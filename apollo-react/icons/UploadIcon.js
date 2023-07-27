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
var Upload = function Upload(_ref) {
  var _ref$viewBox = _ref.viewBox,
    viewBox = _ref$viewBox === void 0 ? '0 0 32 32' : _ref$viewBox,
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/_react.default.createElement(_SvgIcon.default, _extends({
    viewBox: viewBox
  }, rest), /*#__PURE__*/_react.default.createElement("title", null, 'upload'), /*#__PURE__*/_react.default.createElement("path", {
    fill: "none",
    d: "M0 0H32V32H0z",
    transform: "translate(-2)"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M17.667 0c.183 0 .332.148.333.33V6c0 1.84 1.492 3.333 3.333 3.333H27c.183 0 .332.148.333.331v19.67c0 1.472-1.194 2.666-2.666 2.666H3.333C1.861 32 .667 30.806.667 29.333V2.667C.667 1.194 1.86 0 3.333 0zm-2.964 8.293c-.395-.388-1.009-.391-1.407-.006l-5.664 5.62c-.187.183-.295.44-.299.708-.003.27.098.528.28.717l.292.306c.39.391 1 .406 1.407.036l2.503-2.344c.4-.372.726-.22.726.34v10.463c0 .563.439 1.2.976 1.2h.944c.537 0 1-.637 1-1.2V13.686c0-.56.327-.71.716-.33l2.515 2.42c.403.38 1.017.366 1.404-.03l.292-.307c.181-.19.282-.45.279-.719-.004-.269-.11-.525-.297-.711zm4.837-7.8c.125-.05.268-.022.363.074l6.866 6.864c.096.095.125.239.073.363-.052.125-.174.206-.309.206h-5.2c-1.104 0-2-.895-2-2V.8c.001-.135.083-.255.207-.306z"
  }));
};
Upload.muiName = 'SvgIcon';
var _default = (0, _pure.default)(Upload);
exports.default = _default;