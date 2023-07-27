"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DropMenu = void 0;
var _compose = _interopRequireDefault(require("@hypnosphi/recompose/compose"));
var _withStyles = _interopRequireDefault(require("@mui/styles/withStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _MenuItem = _interopRequireDefault(require("../MenuItem"));
var _PopperMenu = _interopRequireDefault(require("../PopperMenu"));
var _excluded = ["menuItems", "id", "MenuAnchor", "minMenuWidth", "size", "classes", "PopperMenuProps", "disablePortal", "forwardedRef", "maxItems", "anchorOrigin", "transformOrigin", "placement"],
  _excluded2 = ["onClick", "text", "label", "className"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
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
var ITEM_HEIGHT = 40;
var SMALL_ITEM_HEIGHT = 32;
var MAX_ITEMS = 10;
var styles = {
  smallSelectItem: {
    height: 32,
    fontSize: 14,
    padding: '0 8px'
  }
};
var DropMenu = /*#__PURE__*/function (_React$Component) {
  _inherits(DropMenu, _React$Component);
  var _super = _createSuper(DropMenu);
  function DropMenu() {
    var _this;
    _classCallCheck(this, DropMenu);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      anchorEl: null,
      open: false
    });
    _defineProperty(_assertThisInitialized(_this), "handleClick", function (e) {
      _this.setState({
        open: true,
        anchorEl: e.currentTarget
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handleClose", function () {
      _this.setState({
        open: false
      });
    });
    return _this;
  }
  _createClass(DropMenu, [{
    key: "render",
    value: function render() {
      var _PopperMenuProps$modi,
        _PopperMenuProps$Pape,
        _this2 = this;
      var _this$props = this.props,
        _this$props$menuItems = _this$props.menuItems,
        menuItems = _this$props$menuItems === void 0 ? [] : _this$props$menuItems,
        id = _this$props.id,
        MenuAnchor = _this$props.MenuAnchor,
        _this$props$minMenuWi = _this$props.minMenuWidth,
        minMenuWidth = _this$props$minMenuWi === void 0 ? 80 : _this$props$minMenuWi,
        size = _this$props.size,
        classes = _this$props.classes,
        _this$props$PopperMen = _this$props.PopperMenuProps,
        PopperMenuProps = _this$props$PopperMen === void 0 ? {} : _this$props$PopperMen,
        _this$props$disablePo = _this$props.disablePortal,
        disablePortal = _this$props$disablePo === void 0 ? false : _this$props$disablePo,
        ref = _this$props.forwardedRef,
        _this$props$maxItems = _this$props.maxItems,
        maxItems = _this$props$maxItems === void 0 ? MAX_ITEMS : _this$props$maxItems,
        anchorOrigin = _this$props.anchorOrigin,
        transformOrigin = _this$props.transformOrigin,
        _this$props$placement = _this$props.placement,
        placement = _this$props$placement === void 0 ? 'bottom-start' : _this$props$placement,
        rest = _objectWithoutProperties(_this$props, _excluded);
      var _this$state = this.state,
        open = _this$state.open,
        anchorEl = _this$state.anchorEl;
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(MenuAnchor, _extends({
        onClick: this.handleClick,
        "aria-owns": open ? id : null,
        "aria-haspopup": "true",
        open: open,
        size: size,
        ref: ref
      }, rest)), /*#__PURE__*/_react.default.createElement(_PopperMenu.default, _extends({
        id: id,
        open: open,
        anchorEl: anchorEl,
        placement: placement,
        disablePortal: disablePortal,
        onClose: this.handleClose,
        anchorOrigin: anchorOrigin,
        transformOrigin: transformOrigin
      }, PopperMenuProps, {
        modifiers: [{
          name: 'offset',
          options: {
            offset: [0, 4]
          }
        }].concat(_toConsumableArray((_PopperMenuProps$modi = PopperMenuProps.modifiers) !== null && _PopperMenuProps$modi !== void 0 ? _PopperMenuProps$modi : [])),
        PaperProps: _objectSpread(_objectSpread({}, PopperMenuProps === null || PopperMenuProps === void 0 ? void 0 : PopperMenuProps.PaperProps), {}, {
          sx: _objectSpread({
            maxHeight: (size === 'small' ? SMALL_ITEM_HEIGHT : ITEM_HEIGHT) * maxItems,
            minWidth: minMenuWidth,
            overflowX: 'hidden',
            overflowY: 'auto'
          }, PopperMenuProps === null || PopperMenuProps === void 0 ? void 0 : (_PopperMenuProps$Pape = PopperMenuProps.PaperProps) === null || _PopperMenuProps$Pape === void 0 ? void 0 : _PopperMenuProps$Pape.sx)
        })
      }), menuItems.map(function (_ref) {
        var _onClick = _ref.onClick,
          text = _ref.text,
          label = _ref.label,
          className = _ref.className,
          rest = _objectWithoutProperties(_ref, _excluded2);
        return /*#__PURE__*/_react.default.createElement(_MenuItem.default, _extends({
          onClick: function onClick() {
            _onClick && _onClick();
            _this2.handleClose();
          },
          key: text !== null && text !== void 0 ? text : label,
          className: (0, _classnames.default)(size === 'small' && classes.smallSelectItem, className)
        }, rest), text !== null && text !== void 0 ? text : label);
      })));
    }
  }]);
  return DropMenu;
}(_react.default.Component);
exports.DropMenu = DropMenu;
DropMenu.propTypes = {
  /** JSS styles object.
   * @ignore */
  classes: _propTypes.default.object.isRequired,
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
  /** The component used to position the dropdown. */
  MenuAnchor: _propTypes.default.elementType,
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
  /** The minimum width of the menu. */
  minMenuWidth: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
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
var _default = (0, _compose.default)((0, _withRef.default)(), (0, _withStyles.default)(styles))(DropMenu);
exports.default = _default;