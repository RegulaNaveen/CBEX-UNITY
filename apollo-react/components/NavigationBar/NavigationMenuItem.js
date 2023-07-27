"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NavigationMenuItem = void 0;
var _withStyles = _interopRequireDefault(require("@mui/styles/withStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _Divider = _interopRequireDefault(require("../Divider"));
var _Icon = _interopRequireDefault(require("../Icon"));
var _MenuItem = _interopRequireDefault(require("../MenuItem"));
var _PopperMenu = _interopRequireDefault(require("../PopperMenu"));
var _Typography = _interopRequireDefault(require("../Typography"));
var _NavigationBarButton = _interopRequireDefault(require("./NavigationBarButton"));
var _excluded = ["classes", "menuItems", "onClick", "checkIsActive"];
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
var styles = {
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  paper: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    minWidth: 200
  },
  selected: {
    fontWeight: 500,
    color: _colors.black
  },
  divider: {
    margin: '8px 0px'
  },
  subtitle: {
    fontSize: 13,
    fontWeight: 600,
    marginLeft: 16,
    marginTop: 8,
    lineHeight: '20px'
  }
};
var NavigationMenuItem = /*#__PURE__*/function (_React$Component) {
  _inherits(NavigationMenuItem, _React$Component);
  var _super = _createSuper(NavigationMenuItem);
  function NavigationMenuItem() {
    var _this;
    _classCallCheck(this, NavigationMenuItem);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      open: false,
      anchorEl: null
    });
    _defineProperty(_assertThisInitialized(_this), "handleClick", function () {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _this.setState({
        open: true,
        anchorEl: e.currentTarget
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handleRequestClose", function () {
      _this.setState({
        open: false
      });
    });
    return _this;
  }
  _createClass(NavigationMenuItem, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        classes = _this$props.classes,
        menuItems = _this$props.menuItems,
        _onClick = _this$props.onClick,
        checkIsActive = _this$props.checkIsActive,
        rest = _objectWithoutProperties(_this$props, _excluded);
      var _this$state = this.state,
        open = _this$state.open,
        anchorEl = _this$state.anchorEl;
      var hasMenuItems = !!menuItems;
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_NavigationBarButton.default, _extends({
        open: open,
        hasMenuItems: hasMenuItems,
        onClick: hasMenuItems ? undefined : _onClick,
        onClose: this.handleRequestClose
      }, rest, {
        handleClick: hasMenuItems && this.handleClick
      })), menuItems && /*#__PURE__*/_react.default.createElement(_PopperMenu.default, {
        open: open,
        onClose: this.handleRequestClose,
        anchorEl: anchorEl,
        classes: {
          paper: classes.paper
        },
        popperOptions: {
          strategy: 'fixed'
        }
      }, menuItems.map(function (menuItem, i) {
        var _menuItem$active;
        return Object.keys(menuItem).length === 0 ? /*#__PURE__*/_react.default.createElement(_Divider.default, {
          className: classes.divider,
          key: i
        }) : menuItem.subtitle ? /*#__PURE__*/_react.default.createElement(_Typography.default, {
          className: classes.subtitle,
          key: i
        }, menuItem.subtitle) : /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
          className: (0, _classnames.default)(((_menuItem$active = menuItem.active) !== null && _menuItem$active !== void 0 ? _menuItem$active : checkIsActive === null || checkIsActive === void 0 ? void 0 : checkIsActive(menuItem)) && classes.selected),
          onClick: function onClick() {
            menuItem.onClick && menuItem.onClick();
            _onClick && _onClick(menuItem);
            _this2.handleRequestClose();
          },
          key: i,
          disabled: menuItem.disabled
        }, /*#__PURE__*/_react.default.createElement("a", {
          className: classes.link,
          href: menuItem.href
        }, menuItem.icon && /*#__PURE__*/_react.default.createElement(_Icon.default, {
          position: "left"
        }, menuItem.icon), menuItem.text));
      })));
    }
  }]);
  return NavigationMenuItem;
}(_react.default.Component);
exports.NavigationMenuItem = NavigationMenuItem;
var _default = (0, _withStyles.default)(styles)(NavigationMenuItem);
exports.default = _default;