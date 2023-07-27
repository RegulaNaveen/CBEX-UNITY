"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateDate = exports.setLocale = exports.default = exports.DatePicker = void 0;
var _moment = _interopRequireDefault(require("@date-io/moment"));
var _ClickAwayListener = _interopRequireDefault(require("@mui/material/ClickAwayListener"));
var _Popper = _interopRequireDefault(require("@mui/material/Popper"));
var _withStyles = _interopRequireDefault(require("@mui/styles/withStyles"));
var _xDatePickers = require("@mui/x-date-pickers");
var _classnames = _interopRequireDefault(require("classnames"));
var _moment2 = _interopRequireDefault(require("moment"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _reactInputMask = _interopRequireDefault(require("react-input-mask"));
var _colors = require("../../colors");
var _Calendar = _interopRequireDefault(require("../../icons/Calendar"));
var _shadows = require("../../shadows");
var _Button = _interopRequireDefault(require("../Button"));
var _TextField = _interopRequireDefault(require("../TextField"));
var _excluded = ["label", "placeholder", "dateFormat", "error", "helperText", "disabled", "classes", "value", "inputValue", "mask", "defaultValue", "onChange", "fullWidth", "required", "asteriskPosition", "optional", "isValidDate", "shouldDisableDate", "inputProps", "className", "onBlur", "TextFieldProps", "onInputChange", "PopperProps", "TodayButtonProps", "todayText", "showTodayAsText", "keepInputFocus", "maskPlaceholder", "size", "margin"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
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
var setLocale = function setLocale(locale) {
  try {
    if (locale !== 'en') {
      require("moment/locale/".concat(locale));
    }
    _moment2.default.locale(locale);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error, 'Invalid language identification code. Please enter a valid Web browser language identification code.');
  }
};
exports.setLocale = setLocale;
var validateDate = function validateDate(date) {
  return _moment2.default.isMoment(date) && date.isValid();
};
exports.validateDate = validateDate;
var maskFromFormat = function maskFromFormat(format, value) {
  return (0, _moment2.default)(value).format(format).toString().replace(/[0-9]/g, '9').replace(/[A-Za-z]/g, 'a');
};
var styles = {
  popup: {
    border: "1px solid ".concat(_colors.neutral4),
    borderRadius: 4,
    boxShadow: _shadows.shadowLevel3,
    backgroundColor: _colors.white,
    zIndex: 3001
  },
  buttonsWrapper: {
    textAlign: 'center',
    paddingBottom: 16,
    marginTop: 8
  },
  calendar: {
    minWidth: '310px !important'
  },
  removeFocusStyle: {
    outline: 'none'
  },
  border: {
    '& .MuiPickersCalendarHeader-root': {
      borderBottom: "1px solid ".concat(_colors.neutral4)
    }
  }
};
var DatePicker = /*#__PURE__*/function (_React$Component) {
  _inherits(DatePicker, _React$Component);
  var _super = _createSuper(DatePicker);
  function DatePicker() {
    var _this;
    _classCallCheck(this, DatePicker);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      isDateValid: validateDate(_this.props.defaultValue && (0, _moment2.default)(_this.props.defaultValue, _this.props.dateFormat) || _this.props.value && (0, _moment2.default)(_this.props.value, _this.props.dateFormat)),
      value: _this.props.defaultValue && (0, _moment2.default)(_this.props.defaultValue, _this.props.dateFormat) || _this.props.value && (0, _moment2.default)(_this.props.value, _this.props.dateFormat) || '',
      inputValue: _this.props.defaultValue && (0, _moment2.default)(_this.props.defaultValue, _this.props.dateFormat).format(_this.props.dateFormat) || _this.props.value && (0, _moment2.default)(_this.props.value, _this.props.dateFormat).format(_this.props.dateFormat) || '',
      anchorEl: null,
      view: 'day'
    });
    _defineProperty(_assertThisInitialized(_this), "inputRef", /*#__PURE__*/_react.default.createRef());
    _defineProperty(_assertThisInitialized(_this), "handleDateChange", function (value) {
      var _this$props = _this.props,
        onChange = _this$props.onChange,
        dateFormat = _this$props.dateFormat,
        onInputChange = _this$props.onInputChange;
      if (validateDate(value)) {
        var inputValue = value.format(dateFormat);
        _this.setState({
          value: value,
          inputValue: inputValue,
          isDateValid: true,
          anchorEl: null
        });
        onChange && onChange(value, inputValue);
        onInputChange && onInputChange(inputValue);
      } else {
        _this.setState({
          isDateValid: false
        });
      }
    });
    _defineProperty(_assertThisInitialized(_this), "handleInputChange", function (e) {
      var _this$props2 = _this.props,
        dateFormat = _this$props2.dateFormat,
        onChange = _this$props2.onChange,
        onInputChange = _this$props2.onInputChange;
      var value = e.target.value;
      var momentDate = (0, _moment2.default)(value, dateFormat, true);
      var isDateValid = validateDate(momentDate);
      if (isDateValid) {
        _this.handleDateChange(momentDate);
      } else {
        _this.setState({
          isDateValid: isDateValid,
          inputValue: value,
          value: ''
        });
        onChange && onChange(null, value);
        onInputChange && onInputChange(value, e);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "handleToday", function () {
      var today = (0, _moment2.default)(new Date());
      _this.handleDateChange(today);
    });
    _defineProperty(_assertThisInitialized(_this), "openCalendar", function (e) {
      var disabled = _this.props.disabled;
      if (!disabled) {
        _this.setState({
          anchorEl: e.currentTarget
        });
      }
    });
    _defineProperty(_assertThisInitialized(_this), "closeCalendar", function () {
      _this.setState({
        anchorEl: null,
        view: 'day'
      });
    });
    _defineProperty(_assertThisInitialized(_this), "setView", function (view) {
      if (_this.state.view !== view) {
        _this.setState({
          view: view
        });
      }
    });
    return _this;
  }
  _createClass(DatePicker, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var prevValue = prevProps.value;
      var _this$props3 = this.props,
        value = _this$props3.value,
        inputProps = _this$props3.inputProps;
      if (inputProps !== null && inputProps !== void 0 && inputProps.readOnly && prevValue && !value) {
        this.setState({
          inputValue: ''
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props4 = this.props,
        label = _this$props4.label,
        placeholder = _this$props4.placeholder,
        dateFormat = _this$props4.dateFormat,
        errorProp = _this$props4.error,
        helperText = _this$props4.helperText,
        disabled = _this$props4.disabled,
        classes = _this$props4.classes,
        propValue = _this$props4.value,
        propInputValue = _this$props4.inputValue,
        mask = _this$props4.mask,
        defaultValue = _this$props4.defaultValue,
        onChange = _this$props4.onChange,
        fullWidth = _this$props4.fullWidth,
        required = _this$props4.required,
        asteriskPosition = _this$props4.asteriskPosition,
        optional = _this$props4.optional,
        isValidDate = _this$props4.isValidDate,
        shouldDisableDate = _this$props4.shouldDisableDate,
        inputProps = _this$props4.inputProps,
        className = _this$props4.className,
        _onBlur = _this$props4.onBlur,
        TextFieldProps = _this$props4.TextFieldProps,
        onInputChange = _this$props4.onInputChange,
        PopperProps = _this$props4.PopperProps,
        TodayButtonProps = _this$props4.TodayButtonProps,
        todayText = _this$props4.todayText,
        showTodayAsText = _this$props4.showTodayAsText,
        keepInputFocus = _this$props4.keepInputFocus,
        maskPlaceholder = _this$props4.maskPlaceholder,
        size = _this$props4.size,
        margin = _this$props4.margin,
        rest = _objectWithoutProperties(_this$props4, _excluded);
      var _this$state = this.state,
        isDateValid = _this$state.isDateValid,
        inputValue = _this$state.inputValue,
        anchorEl = _this$state.anchorEl,
        value = _this$state.value,
        view = _this$state.view;
      var inputMask = mask === undefined ? maskFromFormat(dateFormat, value || new Date()) : mask;
      var error = !isDateValid && typeof inputMask === 'string' && !!(inputValue !== (inputMask === null || inputMask === void 0 ? void 0 : inputMask.replace(/9/g, '_')) && inputValue.length);
      var open = Boolean(anchorEl);
      var displayValue = propInputValue !== null && propInputValue !== void 0 ? propInputValue : propValue ? propValue.format(dateFormat) : inputValue;
      var isToday = (0, _moment2.default)().isSame(propValue || value, 'day');
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactInputMask.default, {
        mask: showTodayAsText && isToday ? undefined : inputMask,
        maskPlaceholder: maskPlaceholder,
        onChange: this.handleInputChange,
        value: showTodayAsText && isToday ? todayText : displayValue,
        label: label,
        placeholder: placeholder,
        disabled: disabled,
        onBlur: function onBlur(e) {
          if (keepInputFocus) {
            var _e$relatedTarget;
            // do not trigger onBlur when clicking on elements inside the Calendar
            if (!((_e$relatedTarget = e.relatedTarget) !== null && _e$relatedTarget !== void 0 && _e$relatedTarget.classList.toString().includes('MuiPickers'))) {
              _onBlur && _onBlur(e);
            }
          } else {
            _onBlur && _onBlur(e);
          }
        }
      }, /*#__PURE__*/_react.default.createElement(_TextField.default, _extends({
        inputProps: _objectSpread({
          ref: this.inputRef
        }, inputProps),
        startIcon: /*#__PURE__*/_react.default.createElement(_Calendar.default, null),
        InputProps: {
          onClick: this.openCalendar
        },
        error: errorProp !== null && errorProp !== void 0 ? errorProp : error,
        helperText: helperText,
        disabled: disabled,
        fullWidth: fullWidth,
        required: required,
        asteriskPosition: asteriskPosition,
        optional: optional,
        size: size,
        margin: margin
      }, TextFieldProps))), /*#__PURE__*/_react.default.createElement(_Popper.default, _extends({
        anchorEl: anchorEl,
        open: open,
        className: (0, _classnames.default)(classes.popup, className),
        placement: "bottom-start",
        modifiers: [{
          name: 'offset',
          options: {
            offset: [0, 4]
          }
        }],
        disablePortal: true
      }, PopperProps), /*#__PURE__*/_react.default.createElement(_ClickAwayListener.default, {
        onClickAway: this.closeCalendar
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)('MuiPickersWrapper', classes.removeFocusStyle),
        tabIndex: "0"
      }, /*#__PURE__*/_react.default.createElement(_xDatePickers.LocalizationProvider, {
        dateAdapter: _moment.default
      }, /*#__PURE__*/_react.default.createElement(_xDatePickers.StaticDatePicker, _extends({
        views: view === 'day' && ['year', 'month', 'day'] || view === 'year' && ['day', 'year', 'month'] || view === 'month' && ['month', 'day', 'year'],
        onViewChange: this.setView,
        allowKeyboardControl: view === 'year',
        showToolbar: false,
        value: propValue !== null && propValue !== void 0 ? propValue : value,
        onChange: function onChange(date) {
          keepInputFocus && _this2.inputRef.current.focus();
          if (view === 'day') {
            _this2.handleDateChange(date);
          }
        },
        renderInput: function renderInput() {
          return true;
        },
        className: (0, _classnames.default)(classes.calendar, view !== 'day' && classes.border),
        componentsProps: {
          actionBar: {
            actions: []
          }
        },
        shouldDisableDate: shouldDisableDate ? shouldDisableDate : isValidDate ? function (date) {
          return !isValidDate(date);
        } : undefined
      }, rest))), view === 'day' && /*#__PURE__*/_react.default.createElement("div", {
        className: classes.buttonsWrapper
      }, /*#__PURE__*/_react.default.createElement(_Button.default, _extends({
        className: "MuiPickers-today",
        size: "small",
        onClick: this.handleToday
      }, TodayButtonProps), todayText))))));
    }
  }]);
  return DatePicker;
}(_react.default.Component);
exports.DatePicker = DatePicker;
DatePicker.propTypes = {
  /** JSS styles object.
   * @ignore */
  classes: _propTypes.default.object.isRequired,
  /** Position of the asterisk when `required` is `true`. */
  asteriskPosition: _propTypes.default.oneOf(['before', 'after']),
  /** The formatting of the date value. */
  dateFormat: _propTypes.default.string,
  /** The default value. Use when the component is not controlled. */
  defaultValue: _propTypes.default.oneOfType([_propTypes.default.instanceOf(Date), _propTypes.default.instanceOf(Object), _propTypes.default.string]),
  /** If `true`, the component is disabled. */
  disabled: _propTypes.default.bool,
  /** If `true`, future dates are disabled. */
  disableFuture: _propTypes.default.bool,
  /** If `true`, past dates are disabled. */
  disablePast: _propTypes.default.bool,
  /** If `true`, the component is displayed in an error state. */
  error: _propTypes.default.bool,
  /** If `true`, the component takes up the full width of its container. */
  fullWidth: _propTypes.default.bool,
  /** The helper text content. */
  helperText: _propTypes.default.node,
  /**
   * A function used to filter out dates that should be disabled.
   *
   * @param {moment} date The date to check.
   * If it returns `false`, that date will be disabled.
   */
  isValidDate: _propTypes.default.func,
  /** If `true`, the `TextField` remains focused after selecting a date from the calendar. */
  keepInputFocus: _propTypes.default.bool,
  /** The label content. */
  label: _propTypes.default.node,
  /** Mask format. Automatically generated from the `dateFormat`. */
  mask: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.array]),
  /** Placeholder to cover unfilled parts of the mask. */
  maskPlaceholder: _propTypes.default.string,
  /** Maximum selectable date. */
  maxDate: _propTypes.default.oneOfType([_propTypes.default.instanceOf(Date), _propTypes.default.instanceOf(Object), _propTypes.default.string]),
  /** Minimum selectable date. */
  minDate: _propTypes.default.oneOfType([_propTypes.default.instanceOf(Date), _propTypes.default.instanceOf(Object), _propTypes.default.string]),
  /**
   * Callback fired when a date is selected.
   *
   * @param {moment} date The selected date.
   */
  onChange: _propTypes.default.func,
  /**
   * Callback fired when the input value changes.
   *
   * @param {string} inputValue The value of the input.
   */
  onInputChange: _propTypes.default.func,
  /** If `true`, the label is displayed as optional. */
  optional: _propTypes.default.bool,
  /** The short hint displayed in the input before the user enters a value. */
  placeholder: _propTypes.default.string,
  /** Props applied to the `Popper` component. */
  PopperProps: _propTypes.default.object,
  /** If `true`, the label is displayed as required. */
  required: _propTypes.default.bool,
  /**
   * A function used to filter out dates that should be disabled.
   *
   * @param {moment} date The date to check.
   * If it returns `true`, that date will be disabled.
   */
  shouldDisableDate: _propTypes.default.func,
  /**
   * If `true`, the `todayText` prop is shown as the content of the `TextField`
   * when the current date is selected.
   */
  showTodayAsText: _propTypes.default.bool,
  /** The size of the component. */
  size: _propTypes.default.oneOf(['small', 'medium']),
  /** Props applied to the Today Button. */
  TodayButtonProps: _propTypes.default.object,
  /** The text label of the Today Button. */
  todayText: _propTypes.default.node,
  /** The value of the component. */
  value: _propTypes.default.oneOfType([_propTypes.default.instanceOf(Date), _propTypes.default.instanceOf(Object), _propTypes.default.string])
};
DatePicker.defaultProps = {
  dateFormat: 'MM/DD/YYYY',
  placeholder: 'mm/dd/yyyy',
  todayText: 'Today',
  maskPlaceholder: null
};
var _default = (0, _withStyles.default)(styles)(DatePicker);
exports.default = _default;