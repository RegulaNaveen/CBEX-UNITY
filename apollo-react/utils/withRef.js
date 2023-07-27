"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var withRef = function withRef() {
  return function (Component) {
    var WrappedComponent = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
      return /*#__PURE__*/_react.default.createElement(Component, _extends({}, props, {
        forwardedRef: ref
      }));
    });
    WrappedComponent.displayName = Component.displayName || Component.name;
    return WrappedComponent;
  };
};
var _default = withRef;
exports.default = _default;