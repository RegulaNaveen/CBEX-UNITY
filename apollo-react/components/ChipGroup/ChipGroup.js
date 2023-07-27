"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ChipGroup = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _StatusCheck = _interopRequireDefault(require("../../icons/StatusCheck"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
var ChipGroup = /*#__PURE__*/function (_React$Component) {
  _inherits(ChipGroup, _React$Component);
  var _super = _createSuper(ChipGroup);
  function ChipGroup() {
    var _this;
    _classCallCheck(this, ChipGroup);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      value: _this.props.value
    });
    _defineProperty(_assertThisInitialized(_this), "handleChange", function (_, value) {
      _this.setState({
        value: value
      });
      _this.props.onChange && _this.props.onChange(_, value);
    });
    return _this;
  }
  _createClass(ChipGroup, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        children = _this$props.children,
        value = _this$props.value,
        disabled = _this$props.disabled;
      var stateValue = this.state.value;
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, _react.default.Children.map(children, function (child) {
        var _child$props$disabled;
        if (! /*#__PURE__*/_react.default.isValidElement(child)) {
          return null;
        }
        var isSelected = (value !== null && value !== void 0 ? value : stateValue) === child.props.value;
        var icon = isSelected ? /*#__PURE__*/_react.default.createElement(_StatusCheck.default, {
          "aria-label": "selected"
        }) : undefined;
        return /*#__PURE__*/_react.default.cloneElement(child, {
          variant: 'outlined',
          selected: isSelected,
          onClick: function onClick(e) {
            return _this2.handleChange(e, child.props.value);
          },
          disabled: (_child$props$disabled = child.props.disabled) !== null && _child$props$disabled !== void 0 ? _child$props$disabled : disabled,
          icon: icon
        });
      }));
    }
  }]);
  return ChipGroup;
}(_react.default.Component);
exports.ChipGroup = ChipGroup;
ChipGroup.propTypes = {
  /** If `true`, the component is disabled. */
  disabled: _propTypes.default.bool,
  /** Callback fired when chip selection is changed. */
  onChange: _propTypes.default.func,
  /** The value of the selected chip. */
  value: _propTypes.default.any
};
var _default = ChipGroup;
exports.default = _default;