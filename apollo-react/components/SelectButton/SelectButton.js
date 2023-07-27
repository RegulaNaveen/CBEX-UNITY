"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SelectButton = void 0;
var _withStyles = _interopRequireDefault(require("@mui/styles/withStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _ArrowDown = _interopRequireDefault(require("../../icons/ArrowDown"));
var _Button = _interopRequireDefault(require("../Button"));
var _PopperMenu = _interopRequireDefault(require("../PopperMenu"));
var _SelectItem = _interopRequireDefault(require("../Select/SelectItem"));
var _excluded = ["placeholder", "children", "size", "classes", "className", "openClassName", "selectedClassName", "noDeselect", "displayText", "value", "widthVariant", "maxItems", "forwardedRef", "PopperMenuProps", "placement"];
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
  smallSelectItem: {
    height: 32,
    fontSize: 14
  },
  arrow: {
    fontSize: 16,
    paddingLeft: 4,
    boxSizing: 'content-box'
  },
  smallArrow: {
    fontSize: 15,
    marginTop: -2
  },
  buttonPadding: {
    paddingRight: 13
  },
  buttonPaddingSmall: {
    paddingRight: 6
  }
};
var SelectButton = /*#__PURE__*/function (_React$Component) {
  _inherits(SelectButton, _React$Component);
  var _super = _createSuper(SelectButton);
  function SelectButton() {
    var _this;
    _classCallCheck(this, SelectButton);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      open: false,
      anchorEl: null,
      displayText: '',
      value: _this.props.value || _this.props.defaultValue
    });
    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      // implement defaultValue logic
      var _this$props = _this.props,
        defaultValue = _this$props.defaultValue,
        children = _this$props.children;
      if (defaultValue !== null && defaultValue !== void 0 && defaultValue.length) {
        var displayText = '';
        _react.default.Children.forEach(children, function (child) {
          if (defaultValue === child.props.value) {
            displayText = child.props.children;
          }
        });
        _this.setState({
          displayText: displayText
        });
      }
    });
    _defineProperty(_assertThisInitialized(_this), "handleClick", function () {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var anchorEl = e.currentTarget;
      _this.setState(function (state) {
        return {
          open: !state.open,
          anchorEl: anchorEl
        };
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handleClose", function () {
      _this.setState({
        open: false
      });
    });
    _defineProperty(_assertThisInitialized(_this), "changeValue", function (newValue, displayText) {
      return function () {
        var _this$props2 = _this.props,
          onChange = _this$props2.onChange,
          noDeselect = _this$props2.noDeselect,
          valueProp = _this$props2.value;
        var value = _this.state.value;
        var selectedValue = valueProp !== null && valueProp !== void 0 ? valueProp : value;
        var endValue = newValue === selectedValue && !noDeselect ? '' : newValue;
        _this.setState({
          displayText: newValue === selectedValue && !noDeselect ? '' : displayText,
          open: false,
          value: endValue
        });
        onChange && onChange(endValue);
      };
    });
    return _this;
  }
  _createClass(SelectButton, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props3 = this.props,
        placeholder = _this$props3.placeholder,
        children = _this$props3.children,
        size = _this$props3.size,
        classes = _this$props3.classes,
        className = _this$props3.className,
        openClassName = _this$props3.openClassName,
        selectedClassName = _this$props3.selectedClassName,
        noDeselect = _this$props3.noDeselect,
        displayTextProp = _this$props3.displayText,
        valueProp = _this$props3.value,
        widthVariantProp = _this$props3.widthVariant,
        _this$props3$maxItems = _this$props3.maxItems,
        maxItems = _this$props3$maxItems === void 0 ? 10 : _this$props3$maxItems,
        forwardedRef = _this$props3.forwardedRef,
        PopperMenuProps = _this$props3.PopperMenuProps,
        placement = _this$props3.placement,
        rest = _objectWithoutProperties(_this$props3, _excluded);
      var _this$state = this.state,
        open = _this$state.open,
        anchorEl = _this$state.anchorEl,
        displayText = _this$state.displayText,
        value = _this$state.value;
      var widthVariant = widthVariantProp !== null && widthVariantProp !== void 0 ? widthVariantProp : size === 'small' ? 25 : 18;
      var selectedValue = valueProp !== null && valueProp !== void 0 ? valueProp : value;
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Button.default, _extends({
        onClick: this.handleClick,
        open: open,
        size: size,
        className: (0, _classnames.default)(size === 'small' ? classes.buttonPaddingSmall : classes.buttonPadding, className, open && openClassName, selectedValue && selectedClassName),
        ref: forwardedRef
      }, rest), displayTextProp !== null && displayTextProp !== void 0 ? displayTextProp : displayText.length ? displayText : placeholder, /*#__PURE__*/_react.default.createElement(_ArrowDown.default, {
        className: (0, _classnames.default)(classes.arrow, size === 'small' && classes.smallArrow)
      })), /*#__PURE__*/_react.default.createElement(_PopperMenu.default, _extends({
        anchorEl: anchorEl,
        open: open,
        onClose: this.handleClose,
        placement: placement
      }, PopperMenuProps, {
        PaperProps: {
          style: {
            marginLeft: -widthVariant,
            marginTop: 4,
            marginBottom: 4,
            maxHeight: (size === 'small' ? 32 : 40) * maxItems,
            minWidth: anchorEl ? anchorEl.offsetWidth + widthVariant - 2 : 124
          }
        }
      }), _react.default.Children.map(children, function (child) {
        return /*#__PURE__*/_react.default.createElement(_SelectItem.default, _extends({}, child.props, {
          selected: selectedValue === child.props.value,
          onClick: _this2.changeValue(child.props.value, child.props.children),
          className: (0, _classnames.default)(size === 'small' && classes.smallSelectItem, child.props.className)
        }));
      })));
    }
  }]);
  return SelectButton;
}(_react.default.Component);
exports.SelectButton = SelectButton;
SelectButton.propTypes = {
  /** JSS styles object.
   * @ignore */
  classes: _propTypes.default.object.isRequired,
  /** The default value. Use when the component is not controlled. */
  defaultValue: _propTypes.default.any,
  /** If `true`, the component is disabled. */
  disabled: _propTypes.default.bool,
  /** The text to display in the button. */
  displayText: _propTypes.default.string,
  /** Maximum number of menu items shown in the menu. */
  maxItems: _propTypes.default.number,
  /** If `true`, selecting the previously selected value will not deselect it. */
  noDeselect: _propTypes.default.bool,
  /** Callback fired when the value changes. */
  onChange: _propTypes.default.func,
  /** If `true`, the menu is visible. */
  open: _propTypes.default.bool,
  /** The short hint displayed in the input before the user selects a value. */
  placeholder: _propTypes.default.string,
  /** Placement of the `Popper`. */
  placement: _propTypes.default.oneOf(['auto-end', 'auto-start', 'auto', 'bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),
  /** Props applied to the `PopperMenu` component. */
  PopperMenuProps: _propTypes.default.object,
  /** The size of the component. */
  size: _propTypes.default.oneOf(['small', 'medium']),
  /** The value of the component. */
  value: _propTypes.default.any
};
var _default = (0, _withStyles.default)(styles)(SelectButton);
exports.default = _default;