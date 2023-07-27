"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PasswordInput = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _EyeHidden = _interopRequireDefault(require("../../icons/EyeHidden"));
var _EyeShow = _interopRequireDefault(require("../../icons/EyeShow"));
var _TextField = _interopRequireDefault(require("../TextField"));
var _excluded = ["showTooltipText", "hideTooltipText"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var PasswordInput = /*#__PURE__*/function (_Component) {
  _inherits(PasswordInput, _Component);
  var _super = _createSuper(PasswordInput);
  function PasswordInput() {
    var _this;
    _classCallCheck(this, PasswordInput);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      passwordIsMasked: true
    });
    _defineProperty(_assertThisInitialized(_this), "togglePasswordMask", function () {
      _this.setState(function (_ref) {
        var passwordIsMasked = _ref.passwordIsMasked;
        return {
          passwordIsMasked: !passwordIsMasked
        };
      });
    });
    return _this;
  }
  _createClass(PasswordInput, [{
    key: "render",
    value: function render() {
      var passwordIsMasked = this.state.passwordIsMasked;
      var _this$props = this.props,
        _this$props$showToolt = _this$props.showTooltipText,
        showTooltipText = _this$props$showToolt === void 0 ? 'Show password' : _this$props$showToolt,
        _this$props$hideToolt = _this$props.hideTooltipText,
        hideTooltipText = _this$props$hideToolt === void 0 ? 'Hide password' : _this$props$hideToolt,
        rest = _objectWithoutProperties(_this$props, _excluded);
      return /*#__PURE__*/_react.default.createElement(_TextField.default, _extends({
        type: passwordIsMasked ? 'password' : 'text',
        icon: passwordIsMasked ? /*#__PURE__*/_react.default.createElement(_EyeHidden.default, null) : /*#__PURE__*/_react.default.createElement(_EyeShow.default, null),
        iconProps: {
          onClick: this.togglePasswordMask
        },
        tooltipProps: {
          title: passwordIsMasked ? showTooltipText : hideTooltipText
        }
      }, rest));
    }
  }]);
  return PasswordInput;
}(_react.Component);
exports.PasswordInput = PasswordInput;
PasswordInput.propTypes = {
  /** The default value. Use when the component is not controlled. */
  defaultValue: _propTypes.default.any,
  /** The helper text content. */
  helperText: _propTypes.default.node,
  /** Customize the text of the tooltip when password is not masked. */
  hideTooltipText: _propTypes.default.string,
  /** The label content. */
  label: _propTypes.default.node,
  /** Callback fired when the value changes. */
  onChange: _propTypes.default.func,
  /** The short hint displayed in the input before the user enters a value. */
  placeholder: _propTypes.default.string,
  /** Customize the text of the tooltip when password is masked. */
  showTooltipText: _propTypes.default.node,
  /** The value of the input element, required for a controlled component. */
  value: _propTypes.default.any
};
var _default = PasswordInput;
exports.default = _default;