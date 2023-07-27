"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ranges = exports.getCaretPosition = exports.default = exports.TimePicker = void 0;
var _withStyles = _interopRequireDefault(require("@mui/styles/withStyles"));
var _moment = _interopRequireDefault(require("moment"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _reactInputMask = _interopRequireDefault(require("react-input-mask"));
var _colors = require("../../colors");
var _Clock = _interopRequireDefault(require("../../icons/Clock"));
var _TextField = _interopRequireDefault(require("../TextField"));
var _TimeController = _interopRequireDefault(require("./TimeController"));
var _TimeDropdown = _interopRequireDefault(require("./TimeDropdown"));
var _excluded = ["classes", "defaultValue", "error", "size", "showNowOption", "showNowAsTime", "nowSelected", "nowText", "value", "disabled"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
  root: {
    '& input': {
      '&::selection': {
        background: _colors.primaryLight
      }
    },
    '& input::placeholder': {
      textTransform: 'none'
    }
  }
};
var regex = [/[0-2]/, /[0-9]/, ':', /[0-5]/, /[0-9]/, ' ', /([AaPp])/, /([Mm])/];
var ranges = {
  hours: [0, 2],
  minutes: [3, 5],
  period: [6, 8]
};
exports.ranges = ranges;
var getCaretPosition = function getCaretPosition(selectionStart) {
  return Object.keys(ranges).reduce(function (caret, key) {
    return selectionStart >= ranges[key][0] && selectionStart <= ranges[key][1] ? caret + key : caret;
  }, '');
};
exports.getCaretPosition = getCaretPosition;
var TimePicker = /*#__PURE__*/function (_React$Component) {
  _inherits(TimePicker, _React$Component);
  var _super = _createSuper(TimePicker);
  function TimePicker() {
    var _this;
    _classCallCheck(this, TimePicker);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      value: _this.props.defaultValue || _this.props.value || '',
      caretPosition: 'hours',
      anchorEl: null,
      nowSelected: false
    });
    _defineProperty(_assertThisInitialized(_this), "input", /*#__PURE__*/_react.default.createRef());
    _defineProperty(_assertThisInitialized(_this), "handleInputClick", function (e) {
      var nowSelectedState = _this.state.nowSelected;
      var _this$props = _this.props,
        disabled = _this$props.disabled,
        nowSelectedProp = _this$props.nowSelected,
        nowText = _this$props.nowText;
      var currentTarget = e.currentTarget,
        target = e.target;
      var selectionStart = target.selectionStart;
      var nowSelected = nowSelectedProp !== null && nowSelectedProp !== void 0 ? nowSelectedProp : nowSelectedState;
      if (!disabled) {
        if (nowSelected) {
          _this.setState({
            anchorEl: currentTarget,
            caretPosition: 'now'
          }, function () {
            target.setSelectionRange && target.setSelectionRange(0, nowText.length);
          });
        } else {
          var caretPosition = getCaretPosition(selectionStart) || 'hours';
          _this.setState({
            anchorEl: currentTarget,
            caretPosition: caretPosition
          }, function () {
            caretPosition && target.setSelectionRange && target.setSelectionRange(ranges[caretPosition][0], ranges[caretPosition][1]);
          });
        }
      }
    });
    _defineProperty(_assertThisInitialized(_this), "closeCalendar", function () {
      _this.setState({
        anchorEl: null
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handleChange", function (e) {
      var nowSelected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var onChange = _this.props.onChange;
      var value = _typeof(e) === 'object' ? e.target.value.toUpperCase() : e;
      if (e.type !== 'blur') {
        _this.setState(_objectSpread({
          value: value,
          anchorEl: null,
          nowSelected: nowSelected
        }, nowSelected && {
          caretPosition: 'now'
        }));
        onChange && onChange(value, nowSelected);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "handleTime", function (e, increase) {
      e.stopPropagation();
      var onChange = _this.props.onChange;
      var _this$state = _this.state,
        oldValue = _this$state.value,
        caretPosition = _this$state.caretPosition;
      var momentValue = (0, _moment.default)(oldValue || '12:00 PM', 'hh:mm A');
      var time = caretPosition === 'period' ? 12 : 1;
      var type = caretPosition === 'period' || caretPosition === 'now' ? 'hours' : caretPosition;
      var value = increase ? momentValue.add(time, type).format('hh:mm A') : momentValue.subtract(time, type).format('hh:mm A');
      _this.setState({
        value: value,
        nowSelected: false,
        caretPosition: caretPosition
      }, function () {
        _this.input.current.focus();
        caretPosition && caretPosition === 'now' ? _this.input.current.setSelectionRange(ranges.hours[0], ranges.hours[1]) : _this.input.current.setSelectionRange(ranges[caretPosition][0], ranges[caretPosition][1]);
      });
      onChange && onChange(value, false);
    });
    return _this;
  }
  _createClass(TimePicker, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
        classes = _this$props2.classes,
        defaultValue = _this$props2.defaultValue,
        error = _this$props2.error,
        size = _this$props2.size,
        showNowOption = _this$props2.showNowOption,
        showNowAsTime = _this$props2.showNowAsTime,
        nowSelectedProp = _this$props2.nowSelected,
        nowText = _this$props2.nowText,
        valueProp = _this$props2.value,
        disabled = _this$props2.disabled,
        rest = _objectWithoutProperties(_this$props2, _excluded);
      var _this$state2 = this.state,
        anchorEl = _this$state2.anchorEl,
        valueState = _this$state2.value,
        nowSelectedState = _this$state2.nowSelected;
      var value = valueProp !== null && valueProp !== void 0 ? valueProp : valueState;
      var nowSelected = nowSelectedProp !== null && nowSelectedProp !== void 0 ? nowSelectedProp : nowSelectedState;
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactInputMask.default, _extends({
        className: classes.root
      }, rest, {
        mask: !showNowAsTime && nowSelected ? [nowText] : regex,
        maskPlaceholder: "",
        value: !showNowAsTime && nowSelected ? nowText : value,
        onChange: this.handleChange,
        error: error,
        disabled: disabled
      }), /*#__PURE__*/_react.default.createElement(_TextField.default, {
        InputProps: {
          endAdornment: /*#__PURE__*/_react.default.createElement(_TimeController.default, {
            size: size,
            onChange: this.handleTime,
            error: error,
            disabled: disabled
          })
        },
        startIcon: /*#__PURE__*/_react.default.createElement(_Clock.default, null),
        inputProps: {
          ref: this.input,
          onClick: this.handleInputClick
        },
        size: size
      })), /*#__PURE__*/_react.default.createElement(_TimeDropdown.default, {
        anchorEl: anchorEl,
        selected: value,
        onClose: this.closeCalendar,
        onChange: this.handleChange,
        showNowOption: showNowOption,
        nowSelected: nowSelected,
        size: size,
        nowText: nowText
      }));
    }
  }]);
  return TimePicker;
}(_react.default.Component);
exports.TimePicker = TimePicker;
TimePicker.propTypes = {
  /** JSS styles object.
   * @ignore */
  classes: _propTypes.default.object.isRequired,
  /**
   * The default value. Use when the component is not controlled.
   * format: HH:MM AM|PM
   */
  defaultValue: _propTypes.default.string,
  /** If `true`, the component is disabled. */
  disabled: _propTypes.default.bool,
  /** If `true`, the component is displayed in an error state. */
  error: _propTypes.default.bool,
  /** If `true`, the component takes up the full width of its container. */
  fullWidth: _propTypes.default.bool,
  /** The helper text content. */
  helperText: _propTypes.default.node,
  /** The label content. */
  label: _propTypes.default.node,
  /** If `true`, the 'Now' option is selected. */
  nowSelected: _propTypes.default.bool,
  /** Customize the label of the 'Now' option. */
  nowText: _propTypes.default.string,
  /**
   * Callback fired when a time is selected.
   *
   * @param {String} time The selected time.
   */
  onChange: _propTypes.default.func,
  /** If `true`, the label is displayed as optional. */
  optional: _propTypes.default.bool,
  /** The short hint displayed in the input before the user enters a value. */
  placeholder: _propTypes.default.string,
  /** If `true`, the label is displayed as required. */
  required: _propTypes.default.bool,
  /**
   * If `true`, (and showNowOption contains a value) the current time is displayed
   * in the text box when 'now' is clicked (instead of the string 'Now').
   */
  showNowAsTime: _propTypes.default.bool,
  /** Show 'Now' as a list item, an overlay, or not at all. */
  showNowOption: _propTypes.default.oneOf(['listItem', 'overlay', true, false]),
  /** The size of the component. */
  size: _propTypes.default.oneOf(['small', 'medium']),
  /**
   * The value of the component.
   * format: HH:MM AM|PM
   */
  value: _propTypes.default.string
};
TimePicker.defaultProps = {
  placeholder: 'hh:mm',
  nowText: 'Now'
};
var _default = (0, _withStyles.default)(styles)(TimePicker);
exports.default = _default;