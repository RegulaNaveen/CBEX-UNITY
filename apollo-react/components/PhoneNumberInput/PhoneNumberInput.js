"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PhoneNumberInput = void 0;
var _withStyles = _interopRequireDefault(require("@mui/styles/withStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _reactPhoneInput = _interopRequireDefault(require("react-phone-input-2"));
var _colors = require("../../colors");
var _shadows = require("../../shadows");
var _sharedStyles = require("../../sharedStyles");
var _typography = require("../../typography");
var _FormHelperText = _interopRequireDefault(require("../FormHelperText"));
var _InputAdornment = _interopRequireDefault(require("../InputAdornment"));
var _InputLabel = _interopRequireDefault(require("../InputLabel"));
var _excluded = ["error", "classes", "fullWidth", "label", "helperText", "className", "optional", "required", "asteriskPosition", "disabled", "icon"];
var _default, _disabled, _fullWidth;
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
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var inputSelector = '& .react-tel-input input[type=tel]';
var arrowSelector = '& div > .flag-dropdown > .selected-flag > div > .up';
var buttonSelector = '& div > .flag-dropdown';
var commonSelectors = "".concat(inputSelector, ", ").concat(buttonSelector);
var styles = {
  default: (_default = {
    '& .react-tel-input': {
      display: 'inline-block',
      width: 'auto'
    },
    '&:not($error):not($disabled) .react-tel-input:hover': {
      '& input[type=tel], & .flag-dropdown': _sharedStyles.textFieldHoverStyle
    },
    // Disables native input clear "X" icon on Edge.
    '@global input::-ms-clear': {
      display: 'none'
    }
  }, _defineProperty(_default, commonSelectors, _objectSpread(_objectSpread({}, _sharedStyles.textFieldFadeOut), {}, {
    borderWidth: 1,
    borderColor: _colors.neutral4,
    backgroundColor: _colors.white,
    fontFamily: _typography.fontFamily,
    height: 40
  })), _defineProperty(_default, buttonSelector, {
    '&.open-dropdown': {
      borderRadius: '3px 0 3px 3px'
    },
    '& .selected-flag': {
      zIndex: 1
    }
  }), _defineProperty(_default, arrowSelector, {
    borderTop: '4px solid #555',
    borderBottom: 'none'
  }), _defineProperty(_default, '& .react-tel-input .country-list', {
    boxShadow: _shadows.shadowLevel3
  }), _default),
  focus: _defineProperty({}, commonSelectors, _sharedStyles.textFieldFocusStyle),
  error: _defineProperty({}, commonSelectors, {
    borderWidth: 2,
    borderColor: _colors.utilityNegative
  }),
  disabled: (_disabled = {}, _defineProperty(_disabled, commonSelectors, {
    cursor: 'auto',
    color: _colors.neutral7
  }), _defineProperty(_disabled, inputSelector, {
    backgroundColor: _colors.neutral2
  }), _defineProperty(_disabled, buttonSelector, {
    backgroundColor: 'transparent',
    borderTop: 'none',
    borderBottom: 'none',
    borderLeft: 'none'
  }), _disabled),
  fullWidth: (_fullWidth = {}, _defineProperty(_fullWidth, inputSelector, {
    width: '100%'
  }), _defineProperty(_fullWidth, '& .react-tel-input', {
    width: '100%'
  }), _fullWidth),
  icon: {
    zIndex: 99,
    position: 'absolute',
    right: 14,
    bottom: 20,
    '& svg': {
      fontSize: 19.22,
      padding: 0.4,
      boxSizing: 'content-box',
      color: _colors.neutral6
    }
  },
  wrapper: {
    marginTop: 5,
    position: 'relative',
    display: 'inline-block'
  },
  wrapperFullWidth: {
    display: 'block'
  }
};
var PhoneNumberInput = /*#__PURE__*/function (_React$Component) {
  _inherits(PhoneNumberInput, _React$Component);
  var _super = _createSuper(PhoneNumberInput);
  function PhoneNumberInput() {
    var _this$props$value;
    var _this;
    _classCallCheck(this, PhoneNumberInput);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      phone: (_this$props$value = _this.props.value) !== null && _this$props$value !== void 0 ? _this$props$value : '',
      focused: false
    });
    _defineProperty(_assertThisInitialized(_this), "handleOnChange", function (value, country) {
      var onChange = _this.props.onChange;
      _this.setState({
        phone: value
      });
      onChange && onChange(value, country);
    });
    _defineProperty(_assertThisInitialized(_this), "handleFocus", function (e) {
      var onFocus = _this.props.onFocus;
      _this.setState({
        focused: true
      });
      onFocus && onFocus(e);
    });
    _defineProperty(_assertThisInitialized(_this), "handleBlur", function (e) {
      var onBlur = _this.props.onBlur;
      _this.setState({
        focused: false
      });
      onBlur && onBlur(e);
    });
    return _this;
  }
  _createClass(PhoneNumberInput, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        error = _this$props.error,
        classes = _this$props.classes,
        fullWidth = _this$props.fullWidth,
        label = _this$props.label,
        helperText = _this$props.helperText,
        className = _this$props.className,
        optional = _this$props.optional,
        required = _this$props.required,
        asteriskPosition = _this$props.asteriskPosition,
        disabled = _this$props.disabled,
        icon = _this$props.icon,
        rest = _objectWithoutProperties(_this$props, _excluded);
      var _this$state = this.state,
        focused = _this$state.focused,
        phone = _this$state.phone;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)(classes.default, focused && classes.focus, error && classes.error, disabled && classes.disabled, fullWidth && classes.fullWidth, className)
      }, /*#__PURE__*/_react.default.createElement(_InputLabel.default, {
        optional: optional,
        required: required,
        disabled: disabled,
        asteriskPosition: asteriskPosition
      }, label), /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)(classes.wrapper, fullWidth && classes.wrapperFullWidth)
      }, /*#__PURE__*/_react.default.createElement(_reactPhoneInput.default, _extends({
        value: phone
      }, rest, {
        disabled: disabled,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        onChange: this.handleOnChange
      })), icon && !disabled && /*#__PURE__*/_react.default.createElement(_InputAdornment.default, {
        position: "end",
        className: classes.icon
      }, icon)), /*#__PURE__*/_react.default.createElement(_FormHelperText.default, {
        error: error,
        disabled: disabled
      }, helperText));
    }
  }]);
  return PhoneNumberInput;
}(_react.default.Component);
exports.PhoneNumberInput = PhoneNumberInput;
PhoneNumberInput.propTypes = {
  /** JSS styles object.
   * @ignore */
  classes: _propTypes.default.object.isRequired,
  /** Position of the asterisk when `required` is `true`. */
  asteriskPosition: _propTypes.default.oneOf(['before', 'after']),
  /** Default country flag and code to display in input. */
  defaultCountry: _propTypes.default.string,
  /** Array of countries to be excluded. Two letter string for each country. */
  excludeCountries: _propTypes.default.arrayOf(_propTypes.default.string),
  /** The helper text content. */
  helperText: _propTypes.default.node,
  /** The label content. */
  label: _propTypes.default.node,
  /** Callback fired when the value changes. */
  onChange: _propTypes.default.func,
  /** Array of countries to be included. Two letter string for each country. */
  onlyCountries: _propTypes.default.arrayOf(_propTypes.default.string),
  /** The value of the input element, required for a controlled component. */
  value: _propTypes.default.any
};
var _default2 = (0, _withStyles.default)(styles)(PhoneNumberInput);
exports.default = _default2;