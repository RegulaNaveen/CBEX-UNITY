"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ProfileMenu = void 0;
var _withStyles = _interopRequireDefault(require("@mui/styles/withStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _Button = _interopRequireDefault(require("../Button"));
var _Divider = _interopRequireDefault(require("../Divider"));
var _MenuItem = _interopRequireDefault(require("../MenuItem"));
var _NavigationBarButton = _interopRequireDefault(require("../NavigationBar/NavigationBarButton"));
var _PopperMenu = _interopRequireDefault(require("../PopperMenu"));
var _Typography = _interopRequireDefault(require("../Typography"));
var _excluded = ["classes", "onClick", "menuItems", "title", "logoutText", "email", "name", "icon", "checkIsActive", "hideLogout", "logoutButtonProps", "extraContent"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
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
  menu: {
    minHeight: 270
  },
  arrow: {
    marginLeft: 8,
    fontSize: 16
  },
  title: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 1.5
  },
  menuHeader: {
    outline: 'none',
    padding: '8px 16px 8px 16px'
  },
  email: {
    color: _colors.neutral7,
    fontSize: 14,
    lineHeight: 1.71
  },
  divider: {
    marginTop: 16
  },
  menuItem: {
    paddingLeft: 46,
    color: _colors.neutral8,
    '&:hover': {
      color: _colors.black
    }
  },
  icon: {
    color: _colors.neutral8,
    marginLeft: 5,
    fontSize: 19.22,
    padding: 0.4,
    boxSizing: 'content-box'
  },
  logoutButton: {
    margin: '8px 16px 8px 16px',
    width: 248
  },
  paper: {
    boxSizing: 'border-box',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    width: 280
  },
  selected: {
    fontWeight: 500,
    color: _colors.black
  }
};
var ProfileMenu = /*#__PURE__*/function (_React$Component) {
  _inherits(ProfileMenu, _React$Component);
  var _super = _createSuper(ProfileMenu);
  function ProfileMenu() {
    var _this;
    _classCallCheck(this, ProfileMenu);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      anchorEl: null,
      open: false
    });
    _defineProperty(_assertThisInitialized(_this), "handleClick", function () {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (!_this.props.menuItems && _this.props.onClick) {
        _this.props.onClick();
      } else {
        _this.setState({
          open: true,
          anchorEl: e.currentTarget
        });
      }
    });
    _defineProperty(_assertThisInitialized(_this), "handleRequestClose", function () {
      _this.setState({
        open: false
      });
    });
    return _this;
  }
  _createClass(ProfileMenu, [{
    key: "render",
    value: function render() {
      var _this2 = this,
        _logoutButtonProps$te;
      var _this$props = this.props,
        classes = _this$props.classes,
        _onClick = _this$props.onClick,
        menuItems = _this$props.menuItems,
        title = _this$props.title,
        _this$props$logoutTex = _this$props.logoutText,
        logoutText = _this$props$logoutTex === void 0 ? 'Log out' : _this$props$logoutTex,
        email = _this$props.email,
        name = _this$props.name,
        icon = _this$props.icon,
        checkIsActive = _this$props.checkIsActive,
        hideLogout = _this$props.hideLogout,
        logoutButtonProps = _this$props.logoutButtonProps,
        extraContent = _this$props.extraContent,
        rest = _objectWithoutProperties(_this$props, _excluded);
      var _this$state = this.state,
        open = _this$state.open,
        anchorEl = _this$state.anchorEl;
      var hasMenuItems = !!menuItems;
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_NavigationBarButton.default, _extends({
        open: open,
        text: name,
        icon: icon,
        hasMenuItems: hasMenuItems,
        handleClick: this.handleClick,
        onClose: this.handleRequestClose
      }, rest)), hasMenuItems && open && /*#__PURE__*/_react.default.createElement(_PopperMenu.default, {
        open: open,
        onClose: this.handleRequestClose,
        anchorEl: anchorEl,
        className: classes.menu,
        classes: {
          paper: classes.paper
        },
        placement: "bottom-end",
        popperOptions: {
          strategy: 'fixed'
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: classes.menuHeader
      }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
        className: classes.title,
        variant: "title2"
      }, title), /*#__PURE__*/_react.default.createElement(_Typography.default, {
        className: classes.email
      }, email), menuItems.length > 0 && /*#__PURE__*/_react.default.createElement(_Divider.default, {
        className: classes.divider
      })), menuItems.map(function (item, i) {
        var _item$active;
        var MenuIcon = item.icon;
        return /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
          className: (0, _classnames.default)(classes.menuItem, ((_item$active = item.active) !== null && _item$active !== void 0 ? _item$active : checkIsActive === null || checkIsActive === void 0 ? void 0 : checkIsActive(item)) && classes.selected),
          onClick: function onClick() {
            item.onClick && item.onClick();
            _onClick && _onClick(item);
            _this2.handleRequestClose();
          },
          key: i
        }, item.icon && /*#__PURE__*/_react.default.createElement(MenuIcon, {
          className: classes.icon
        }), /*#__PURE__*/_react.default.createElement("span", null, item.text));
      }), !hideLogout && /*#__PURE__*/_react.default.createElement(_Button.default, _extends({
        className: classes.logoutButton,
        variant: "secondary",
        onClick: function onClick() {
          (logoutButtonProps === null || logoutButtonProps === void 0 ? void 0 : logoutButtonProps.onClick) && logoutButtonProps.onClick(_objectSpread({
            text: logoutText
          }, logoutButtonProps)) || _onClick && _onClick(_objectSpread({
            text: logoutText
          }, logoutButtonProps));
          _this2.handleRequestClose();
        }
      }, logoutButtonProps), (_logoutButtonProps$te = logoutButtonProps === null || logoutButtonProps === void 0 ? void 0 : logoutButtonProps.text) !== null && _logoutButtonProps$te !== void 0 ? _logoutButtonProps$te : logoutText), extraContent));
    }
  }]);
  return ProfileMenu;
}(_react.default.Component);
exports.ProfileMenu = ProfileMenu;
ProfileMenu.propTypes = {
  /** JSS styles object.
   * @ignore */
  classes: _propTypes.default.object.isRequired,
  /** A function that determines which menu is styled as active. */
  checkIsActive: _propTypes.default.func,
  /** The email address of the active user. */
  email: _propTypes.default.node,
  /** Custom content shown at the end of the menu. */
  extraContent: _propTypes.default.node,
  /** If `true`, the logout button is hidden. */
  hideLogout: _propTypes.default.bool,
  /** Add an icon to the profile menu button. */
  icon: _propTypes.default.element,
  /** Props applied to the logout button. */
  logoutButtonProps: _propTypes.default.shape({
    /** URL of the page the link goes to. */
    href: _propTypes.default.string,
    /** Callback fired when the component is clicked. */
    onClick: _propTypes.default.func,
    /** Path of the menu item. Used in `checkIsActive`. */
    pathname: _propTypes.default.string,
    /** Text displayed in the logout button. */
    text: _propTypes.default.node
  }),
  /** Text displayed in the logout button. */
  logoutText: _propTypes.default.node,
  /** The list of navigation items. */
  menuItems: _propTypes.default.arrayOf(_propTypes.default.shape({
    /** Add an icon to the menu item. */
    icon: _propTypes.default.elementType,
    /** Path of the menu item. Used in `checkIsActive`. */
    pathname: _propTypes.default.string,
    /** The content of the menu item. */
    text: _propTypes.default.node
  })),
  /** The name of the active user. */
  name: _propTypes.default.node,
  /** Callback fired when a navigation item is clicked. */
  onClick: _propTypes.default.func,
  /** The business title of the active user. */
  title: _propTypes.default.node
};
var _default = (0, _withStyles.default)(styles)(ProfileMenu);
exports.default = _default;