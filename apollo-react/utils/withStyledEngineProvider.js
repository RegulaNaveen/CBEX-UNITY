"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _styles = require("@mui/material/styles");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var _default = function _default() {
  return function (Component) {
    var WrappedComponent = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
      return /*#__PURE__*/_react.default.createElement(_styles.StyledEngineProvider, {
        injectFirst: true
      }, /*#__PURE__*/_react.default.createElement(Component, _extends({}, props, {
        ref: ref
      })));
    });
    WrappedComponent.displayName = Component.displayName;
    return WrappedComponent;
  };
};
exports.default = _default;