"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.maskFromFormat = exports.default = exports.DateRangePicker = void 0;
var _moment = _interopRequireDefault(require("@date-io/moment"));
var _DesktopDateRangePicker = _interopRequireDefault(require("@mui/lab/DesktopDateRangePicker"));
var _LocalizationProvider = _interopRequireDefault(require("@mui/lab/LocalizationProvider"));
var _withStyles = _interopRequireDefault(require("@mui/styles/withStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _moment2 = _interopRequireDefault(require("moment"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _colors = require("../../colors");
var _Calendar = _interopRequireDefault(require("../../icons/Calendar"));
var _shadows = require("../../shadows");
var _TextField = _interopRequireDefault(require("../TextField"));
var _excluded = ["classes", "placeholder", "helperText", "startProps", "endProps", "fullWidth", "dateFormat", "shouldDisableDate", "isValidDate", "required", "asteriskPosition", "optional", "disabled", "error", "endLabel", "startLabel", "value", "size", "margin"],
  _excluded2 = ["helperText"],
  _excluded3 = ["helperText"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
var styles = {
  block: {
    display: 'block'
  },
  input: {
    width: 159
  },
  inputResponsive: {
    width: '50%'
  },
  endDate: {
    marginLeft: 16
  },
  endDateSmall: {
    marginLeft: 8
  },
  popper: {
    '& .MuiPaper-root': {
      borderRadius: 4,
      boxShadow: _shadows.shadowLevel3
    },
    zIndex: 3001,
    '& .MuiTypography-subtitle1': {
      fontWeight: 'bold',
      fontSize: 18,
      lineHeight: 1.78,
      color: _colors.neutral8
    },
    '& .MuiTypography-caption': {
      borderRight: '0 !important',
      height: 24,
      fontSize: 16,
      lineHeight: 1.5,
      color: _colors.neutral8,
      margin: '0 2px'
    },
    '& .MuiIconButton-root': {
      height: 32,
      width: 32
    },
    width: 634,
    '& div div': {
      border: '0 !important',
      margin: 'unset'
    },
    '& > div > div > div > div': {
      marginRight: 8
    },
    '& .PrivatePickersSlideTransition-root': {
      minHeight: '262px !important'
    }
  }
};
var maskFromFormat = function maskFromFormat(format) {
  return (0, _moment2.default)().format(format).toString().replace(/[A-Za-z0-9]/g, '_');
};
exports.maskFromFormat = maskFromFormat;
var DateRangePicker = /*#__PURE__*/function (_Component) {
  _inherits(DateRangePicker, _Component);
  var _super = _createSuper(DateRangePicker);
  function DateRangePicker() {
    var _this;
    _classCallCheck(this, DateRangePicker);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      value: _this.props.value || _this.props.defaultValue || [null, null],
      open: false
    });
    _defineProperty(_assertThisInitialized(_this), "handleChange", function (value, inputValue) {
      var onChange = _this.props.onChange;
      _this.setState({
        value: value
      });
      onChange && onChange(value, inputValue);
    });
    _defineProperty(_assertThisInitialized(_this), "handleOpen", function () {
      _this.setState({
        open: true
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handleClose", function () {
      _this.setState({
        open: false
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handleFocus", function (e) {
      var _e$relatedTarget;
      if ((_e$relatedTarget = e.relatedTarget) !== null && _e$relatedTarget !== void 0 && _e$relatedTarget.classList.toString().includes('MuiButtonBase-root')) {
        setTimeout(function () {
          return e.target.blur();
        }, 25);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "handleClick", function () {
      setTimeout(function () {
        return _this.handleOpen();
      }, 25);
    });
    return _this;
  }
  _createClass(DateRangePicker, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        classes = _this$props.classes,
        placeholder = _this$props.placeholder,
        helperText = _this$props.helperText,
        startProps = _this$props.startProps,
        endProps = _this$props.endProps,
        fullWidth = _this$props.fullWidth,
        dateFormat = _this$props.dateFormat,
        shouldDisableDate = _this$props.shouldDisableDate,
        isValidDate = _this$props.isValidDate,
        required = _this$props.required,
        asteriskPosition = _this$props.asteriskPosition,
        optional = _this$props.optional,
        disabled = _this$props.disabled,
        error = _this$props.error,
        endLabel = _this$props.endLabel,
        startLabel = _this$props.startLabel,
        value = _this$props.value,
        size = _this$props.size,
        margin = _this$props.margin,
        rest = _objectWithoutProperties(_this$props, _excluded);
      var _this$state = this.state,
        stateValue = _this$state.value,
        open = _this$state.open;
      var inputProps = {
        variant: 'standard',
        startIcon: /*#__PURE__*/_react.default.createElement(_Calendar.default, null),
        asteriskPosition: asteriskPosition,
        required: required,
        optional: optional,
        size: size,
        margin: margin
      };
      return /*#__PURE__*/_react.default.createElement(_LocalizationProvider.default, {
        dateAdapter: _moment.default
      }, /*#__PURE__*/_react.default.createElement(_DesktopDateRangePicker.default, _extends({}, rest, {
        onOpen: this.handleOpen,
        onClose: this.handleClose,
        open: open,
        endText: endLabel,
        startText: startLabel,
        inputFormat: dateFormat,
        mask: maskFromFormat(dateFormat),
        onChange: this.handleChange,
        value: value !== null && value !== void 0 ? value : stateValue,
        shouldDisableDate: shouldDisableDate ? shouldDisableDate : isValidDate ? function (date) {
          return !isValidDate(date);
        } : undefined,
        renderInput: function renderInput(_ref, _ref2) {
          var _ = _ref.helperText,
            start = _objectWithoutProperties(_ref, _excluded2);
          var __ = _ref2.helperText,
            end = _objectWithoutProperties(_ref2, _excluded3);
          return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_TextField.default, _extends({}, start, {
            disabled: disabled !== null && disabled !== void 0 ? disabled : start.disabled,
            error: error
          }, inputProps, startProps, {
            inputProps: _objectSpread(_objectSpread({}, start.inputProps), {}, {
              placeholder: placeholder
            }),
            helperText: helperText,
            className: (0, _classnames.default)(fullWidth ? classes.inputResponsive : classes.input),
            onFocus: _this2.handleFocus,
            onClick: _this2.handleClick
          })), /*#__PURE__*/_react.default.createElement(_TextField.default, _extends({}, end, {
            disabled: disabled !== null && disabled !== void 0 ? disabled : end.disabled,
            error: error
          }, inputProps, endProps, {
            inputProps: _objectSpread(_objectSpread({}, end.inputProps), {}, {
              placeholder: placeholder
            }),
            className: (0, _classnames.default)(fullWidth ? classes.inputResponsive : classes.input, size === 'small' ? classes.endDateSmall : classes.endDate),
            onFocus: _this2.handleFocus,
            onClick: _this2.handleClick
          })));
        },
        PopperProps: {
          className: classes.popper,
          placement: 'bottom-start',
          modifiers: helperText || endProps !== null && endProps !== void 0 && endProps.helperText || startProps !== null && startProps !== void 0 && startProps.helperText ? [{
            name: 'offset',
            options: {
              offset: [0, -23]
            }
          }] : [{
            name: 'offset',
            options: {
              offset: [0, -4]
            }
          }]
        }
      })));
    }
  }]);
  return DateRangePicker;
}(_react.Component);
exports.DateRangePicker = DateRangePicker;
DateRangePicker.propTypes = {
  /** JSS styles object.
   * @ignore */
  classes: _propTypes.default.object.isRequired,
  /** Position of the asterisk when `required` is `true`. */
  asteriskPosition: _propTypes.default.oneOf(['before', 'after']),
  /** The formatting of the date value. */
  dateFormat: _propTypes.default.string,
  /** If `true`, the component is disabled. */
  disabled: _propTypes.default.bool,
  /** If `true`, future dates are disabled. */
  disableFuture: _propTypes.default.bool,
  /** If `true`, past dates are disabled. */
  disablePast: _propTypes.default.bool,
  /** Label for the end input. */
  endLabel: _propTypes.default.node,
  /** Props applied to the end input. */
  endProps: _propTypes.default.shape({
    /** If `true`, the component is disabled. */
    disabled: _propTypes.default.bool,
    /** If `true`, the input is displayed in an error state. */
    error: _propTypes.default.bool,
    /** If `true`, the label is displayed as optional. */
    optional: _propTypes.default.bool,
    /** If `true`, the label is displayed as required. */
    required: _propTypes.default.bool
  }),
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
  /** Maximum selectable date. */
  maxDate: _propTypes.default.oneOfType([_propTypes.default.instanceOf(Date), _propTypes.default.instanceOf(Object)]),
  /** Minimum selectable date. */
  minDate: _propTypes.default.oneOfType([_propTypes.default.instanceOf(Date), _propTypes.default.instanceOf(Object)]),
  /**
   * Callback fired when the value changes.
   *
   * @param {array} value The selected date range.<br/>
   * @param {string} keyboardInputValue The value of the input.
   */
  onChange: _propTypes.default.func,
  /** If `true`, the labels are displayed as optional. */
  optional: _propTypes.default.bool,
  /** The short hint displayed in the input before the user enters a value. */
  placeholder: _propTypes.default.string,
  /** If `true`, the labels are displayed as required. */
  required: _propTypes.default.bool,
  /**
   * A function used to filter out dates that should be disabled.
   *
   * @param {moment} date The date to check.
   * If it returns `true`, that date will be disabled.
   */
  shouldDisableDate: _propTypes.default.func,
  /** The size of the component. */
  size: _propTypes.default.oneOf(['small', 'medium']),
  /** Label for the start input. */
  startLabel: _propTypes.default.node,
  /** Props applied to the start input. */
  startProps: _propTypes.default.shape({
    /** If `true`, the component is disabled. */
    disabled: _propTypes.default.bool,
    /** If `true`, the input is displayed in an error state. */
    error: _propTypes.default.bool,
    /** If `true`, the label is displayed as optional. */
    optional: _propTypes.default.bool,
    /** If `true`, the label is displayed as required. */
    required: _propTypes.default.bool
  }),
  /** The value of the component. */
  value: _propTypes.default.array
};
DateRangePicker.defaultProps = {
  startLabel: 'Start date',
  endLabel: 'End date',
  dateFormat: 'MM/DD/YYYY',
  placeholder: 'mm/dd/yyyy'
};
var _default = (0, _withStyles.default)(styles)(DateRangePicker);
exports.default = _default;