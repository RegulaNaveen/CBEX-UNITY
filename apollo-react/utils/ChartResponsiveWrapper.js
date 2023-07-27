"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
var _default = function _default(ChartResponsiveWrapper) {
  return /*#__PURE__*/function (_React$Component) {
    _inherits(ResponsiveChart, _React$Component);
    var _super = _createSuper(ResponsiveChart);
    function ResponsiveChart() {
      var _this;
      _classCallCheck(this, ResponsiveChart);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _super.call.apply(_super, [this].concat(args));
      _defineProperty(_assertThisInitialized(_this), "state", {
        parentHeight: _this.props.height || 456,
        parentWidth: _this.props.width || 400
      });
      _defineProperty(_assertThisInitialized(_this), "fitParentContainer", function () {
        var _this$chartContainer, _this$chartContainer2;
        var _this$state = _this.state,
          parentWidth = _this$state.parentWidth,
          parentHeight = _this$state.parentHeight;
        var currentContainerWidth = (_this$chartContainer = _this.chartContainer) === null || _this$chartContainer === void 0 ? void 0 : _this$chartContainer.getBoundingClientRect().width;
        var currentContainerHeight = (_this$chartContainer2 = _this.chartContainer) === null || _this$chartContainer2 === void 0 ? void 0 : _this$chartContainer2.getBoundingClientRect().height;
        var shouldResize = parentWidth !== currentContainerWidth || parentHeight !== currentContainerHeight;
        if (shouldResize) {
          _this.setState({
            parentWidth: currentContainerWidth,
            parentHeight: currentContainerHeight || 456
          });
        }
      });
      return _this;
    }
    _createClass(ResponsiveChart, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.fitParentContainer();
        window && window.addEventListener('resize', this.fitParentContainer);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        window && window.removeEventListener('resize', this.fitParentContainer);
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;
        var _this$state2 = this.state,
          parentWidth = _this$state2.parentWidth,
          parentHeight = _this$state2.parentHeight;
        return /*#__PURE__*/_react.default.createElement("div", {
          ref: function ref(el) {
            _this2.chartContainer = el;
          },
          style: {
            width: '100%',
            height: '100%'
          }
        }, /*#__PURE__*/_react.default.createElement(ChartResponsiveWrapper, _extends({}, this.props, {
          parentWidth: parentWidth,
          parentHeight: parentHeight
        })));
      }
    }]);
    return ResponsiveChart;
  }(_react.default.Component);
};
exports.default = _default;