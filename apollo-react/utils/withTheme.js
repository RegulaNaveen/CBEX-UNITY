"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withThemeOld = exports.default = void 0;
var _styles = require("@mui/material/styles");
var _react = _interopRequireDefault(require("react"));
var _theme = _interopRequireDefault(require("../theme"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var _default = function _default(displayName) {
  return function (Component) {
    var WrappedComponent = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
      return (0, _styles.useTheme)().themeName === 'Apollo' ? /*#__PURE__*/_react.default.createElement(Component, _extends({}, props, {
        ref: ref
      })) : /*#__PURE__*/_react.default.createElement(_styles.StyledEngineProvider, {
        injectFirst: true
      }, /*#__PURE__*/_react.default.createElement(_styles.ThemeProvider, {
        theme: _theme.default
      }, /*#__PURE__*/_react.default.createElement(Component, _extends({}, props, {
        ref: ref
      }))));
    });
    WrappedComponent.displayName = displayName !== null && displayName !== void 0 ? displayName : Component.displayName;
    return WrappedComponent;
  };
};
exports.default = _default;
var withThemeOld = function withThemeOld(displayName) {
  return function (Component) {
    var WrappedComponent = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
      return /*#__PURE__*/_react.default.createElement(_styles.ThemeProvider, {
        theme: _theme.default
      }, /*#__PURE__*/_react.default.createElement(Component, _extends({}, props, {
        ref: ref
      })));
    });
    WrappedComponent.displayName = displayName !== null && displayName !== void 0 ? displayName : Component.displayName;
    return WrappedComponent;
  };
};
exports.withThemeOld = withThemeOld;