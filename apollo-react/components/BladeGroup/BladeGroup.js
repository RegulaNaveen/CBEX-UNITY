"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BladeGroup = void 0;
var _withStyles = _interopRequireDefault(require("@mui/styles/withStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _Backdrop = _interopRequireDefault(require("../Backdrop"));
var constants = _interopRequireWildcard(require("../Blade/constants"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
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
var styles = {
  backdrop: {
    zIndex: 2
  }
};
var BladeGroup = /*#__PURE__*/function (_React$Component) {
  _inherits(BladeGroup, _React$Component);
  var _super = _createSuper(BladeGroup);
  function BladeGroup() {
    var _this;
    _classCallCheck(this, BladeGroup);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      bladeExpandedArray: Array(_react.default.Children.count(_this.props.children)).fill(true)
    });
    _defineProperty(_assertThisInitialized(_this), "onChange", function (index) {
      return function (e, expanded) {
        var bladeExpandedArray = _this.state.bladeExpandedArray;
        var newBladeExpandedArray = _toConsumableArray(bladeExpandedArray);
        newBladeExpandedArray[index] = expanded;
        _this.setState({
          bladeExpandedArray: newBladeExpandedArray
        });
      };
    });
    return _this;
  }
  _createClass(BladeGroup, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var children = this.props.children;
      var bladeExpandedArray = this.state.bladeExpandedArray;
      var prevOpenArray = _react.default.Children.map(prevProps.children, function (child) {
        return child.props.open;
      });
      var nextOpenArray = _react.default.Children.map(children, function (child) {
        return child.props.open;
      });
      var shouldUpdate = false;
      var newBladeExpandedArray = _toConsumableArray(bladeExpandedArray);
      prevOpenArray.forEach(function (prevOpenStatus, i) {
        if (prevOpenStatus === false && nextOpenArray[i] === true) {
          newBladeExpandedArray[i] = true;
          shouldUpdate = true;
        }
      });
      if (shouldUpdate) {
        this.setState({
          bladeExpandedArray: newBladeExpandedArray
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        side = _this$props.side,
        children = _this$props.children,
        width = _this$props.width,
        hasBackdrop = _this$props.hasBackdrop,
        BackdropProps = _this$props.BackdropProps,
        marginTop = _this$props.marginTop,
        classes = _this$props.classes;
      var bladeExpandedArray = this.state.bladeExpandedArray;
      var margin = 0;
      var newMargin = 0;
      var zIndex = 1200;
      var groupWidth = width;
      var hasOpen = false;
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, _react.default.Children.map(children, function (child, index) {
        var _ref, _child$props$width, _child$props$onChange, _child$props$marginTo;
        if (child === null) {
          return null;
        }
        var isExpanded = child.props.expanded || child.props.expanded !== false && bladeExpandedArray[index];
        var bladeWidth = (_ref = (_child$props$width = child.props.width) !== null && _child$props$width !== void 0 ? _child$props$width : groupWidth) !== null && _ref !== void 0 ? _ref : constants.defaultWidth;
        var expandedWidth = isExpanded ? bladeWidth : constants.collapsedWidth;
        newMargin = margin + expandedWidth;
        margin = newMargin;
        zIndex -= 1;
        hasOpen = hasOpen || child.props.open && isExpanded;
        return /*#__PURE__*/_react.default.cloneElement(child, {
          margin: child.props.open ? newMargin : undefined,
          side: side,
          zIndex: zIndex,
          onChange: (_child$props$onChange = child.props.onChange) !== null && _child$props$onChange !== void 0 ? _child$props$onChange : _this2.onChange(index),
          width: bladeWidth,
          expanded: isExpanded,
          marginTop: (_child$props$marginTo = child.props.marginTop) !== null && _child$props$marginTo !== void 0 ? _child$props$marginTo : marginTop
        });
      }), hasBackdrop && /*#__PURE__*/_react.default.createElement(_Backdrop.default, _extends({
        open: hasOpen
      }, BackdropProps, {
        className: (0, _classnames.default)(classes.backdrop, BackdropProps === null || BackdropProps === void 0 ? void 0 : BackdropProps.className)
      })));
    }
  }]);
  return BladeGroup;
}(_react.default.Component);
exports.BladeGroup = BladeGroup;
BladeGroup.propTypes = {
  /** Props applied to the `Backdrop` component. */
  BackdropProps: _propTypes.default.object,
  /** One or more `Blade` components. */
  children: _propTypes.default.node,
  /** If `true`, a backdrop will be shown when any blade is open and expanded. */
  hasBackdrop: _propTypes.default.bool,
  /** Add space above the blades for a navigation bar. */
  marginTop: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  /** Callback fired when a blade is expanded or collapsed by the user. */
  onChange: _propTypes.default.func,
  /** The side of the screen the blades open from. */
  side: _propTypes.default.string,
  /** The width of each blade. */
  width: _propTypes.default.number,
  /** Modify the z-index of the blades. */
  zIndex: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
};
var _default = (0, _withStyles.default)(styles)(BladeGroup);
exports.default = _default;