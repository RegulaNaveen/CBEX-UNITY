"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MenuButton = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _DropMenu = _interopRequireDefault(require("../DropMenu"));
var _InternalMenuButton = _interopRequireDefault(require("./InternalMenuButton"));
var _excluded = ["id", "buttonText"];
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
var MenuButton = /*#__PURE__*/function (_React$Component) {
  _inherits(MenuButton, _React$Component);
  var _super = _createSuper(MenuButton);
  function MenuButton() {
    var _this;
    _classCallCheck(this, MenuButton);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "buttonRef", /*#__PURE__*/_react.default.createRef());
    _defineProperty(_assertThisInitialized(_this), "state", {
      minMenuWidth: 80
    });
    _defineProperty(_assertThisInitialized(_this), "getButtonWidth", function () {
      if (_this.buttonRef.current) {
        var buttonWidth = _this.buttonRef.current.getBoundingClientRect().width;
        _this.setState({
          minMenuWidth: Math.max(buttonWidth, 80)
        });
      }
    });
    return _this;
  }
  _createClass(MenuButton, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getButtonWidth();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var buttonText = this.props.buttonText;
      if (buttonText !== prevProps.buttonText) {
        this.getButtonWidth();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var minMenuWidth = this.state.minMenuWidth;
      var _this$props = this.props,
        id = _this$props.id,
        buttonText = _this$props.buttonText,
        rest = _objectWithoutProperties(_this$props, _excluded);
      var menuId = id !== null && id !== void 0 ? id : "".concat(buttonText, "-menu");
      return /*#__PURE__*/_react.default.createElement("div", {
        ref: this.buttonRef,
        style: {
          display: 'inline'
        }
      }, /*#__PURE__*/_react.default.createElement(_DropMenu.default, _extends({
        minMenuWidth: minMenuWidth,
        MenuAnchor: _InternalMenuButton.default,
        id: menuId,
        buttonText: buttonText
      }, rest)));
    }
  }]);
  return MenuButton;
}(_react.default.Component);
exports.MenuButton = MenuButton;
MenuButton.defaultProps = {
  maxItems: 10
};
MenuButton.propTypes = {
  /**
   * This is the point on the anchor where the popover's `anchorEl` will attach to.
   *
   * Options:
   * vertical: [top, center, bottom]
   * horizontal: [left, center, right]
   *
   * @deprecated Use `placement` instead.
   */
  anchorOrigin: _propTypes.default.shape({
    horizontal: _propTypes.default.oneOfType([_propTypes.default.oneOf(['center', 'left', 'right']), _propTypes.default.number]).isRequired,
    vertical: _propTypes.default.oneOfType([_propTypes.default.oneOf(['bottom', 'center', 'top']), _propTypes.default.number]).isRequired
  }),
  /** The button content. */
  buttonText: _propTypes.default.node,
  /** If `true`, the component is disabled. */
  disabled: _propTypes.default.bool,
  /** If `true`, the component takes up the full width of its container. */
  fullWidth: _propTypes.default.bool,
  /** ID of the menu. */
  id: _propTypes.default.string,
  /** Maximum number of menu items shown in the menu. */
  maxItems: _propTypes.default.number,
  /** The menu items to display in the dropdown. */
  menuItems: _propTypes.default.arrayOf(_propTypes.default.shape({
    /** If `true`, destructive action style will be applied. */
    destructiveAction: _propTypes.default.bool,
    /** If `true`, the component is disabled. */
    disabled: _propTypes.default.bool,
    /** Callback fired when the component is clicked. */
    onClick: _propTypes.default.func,
    /** The content of the menu item. */
    text: _propTypes.default.node
  })),
  /** Placement of the `Popper`. */
  placement: _propTypes.default.oneOf(['auto-end', 'auto-start', 'auto', 'bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),
  /** Props applied to the `PopperMenu` component. */
  PopperMenuProps: _propTypes.default.object,
  /** The size of the component. */
  size: _propTypes.default.oneOf(['small', 'medium']),
  /**
   * This is the point on the popover which
   * will attach to the anchor's origin.
   *
   * Options:
   * vertical: [top, center, bottom, x(px)]
   * horizontal: [left, center, right, x(px)]
   *
   * @deprecated Use `placement` instead.
   */
  transformOrigin: _propTypes.default.shape({
    horizontal: _propTypes.default.oneOfType([_propTypes.default.oneOf(['center', 'left', 'right']), _propTypes.default.number]).isRequired,
    vertical: _propTypes.default.oneOfType([_propTypes.default.oneOf(['bottom', 'center', 'top']), _propTypes.default.number]).isRequired
  })
};
var _default = MenuButton;
exports.default = _default;