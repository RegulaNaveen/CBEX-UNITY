"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FileInput = void 0;
var _withStyles = _interopRequireDefault(require("@mui/styles/withStyles"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _Button = _interopRequireDefault(require("../Button"));
var _TextField = _interopRequireDefault(require("../TextField"));
var _excluded = ["buttonText", "classes", "disabled", "onChange", "accept", "inputProps"];
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
  root: {
    display: 'flex'
  },
  textFieldHide: {
    display: 'none'
  },
  button: {
    marginLeft: 30,
    marginTop: 42
  }
};
var FileInput = /*#__PURE__*/function (_React$Component) {
  _inherits(FileInput, _React$Component);
  var _super = _createSuper(FileInput);
  function FileInput() {
    var _this;
    _classCallCheck(this, FileInput);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      selectedFile: {
        name: ''
      }
    });
    _defineProperty(_assertThisInitialized(_this), "uploadFile", function (e) {
      var onChange = _this.props.onChange;
      var files = e.target.files;
      if (files.length) {
        var file = files[0];
        _this.setState({
          selectedFile: file
        });
        onChange && onChange(file);
      }
    });
    return _this;
  }
  _createClass(FileInput, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        buttonText = _this$props.buttonText,
        classes = _this$props.classes,
        disabled = _this$props.disabled,
        onChange = _this$props.onChange,
        accept = _this$props.accept,
        inputProps = _this$props.inputProps,
        rest = _objectWithoutProperties(_this$props, _excluded);
      var selectedFile = this.state.selectedFile;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: classes.root
      }, /*#__PURE__*/_react.default.createElement(_TextField.default, _extends({
        value: selectedFile.name,
        disabled: disabled
      }, rest)), /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement(_TextField.default, {
        type: "file",
        onChange: this.uploadFile,
        disabled: disabled,
        className: classes.textFieldHide,
        inputProps: _objectSpread({
          accept: accept
        }, inputProps)
      }), /*#__PURE__*/_react.default.createElement(_Button.default, {
        component: "span",
        variant: "primary",
        disabled: disabled,
        className: classes.button
      }, buttonText)));
    }
  }]);
  return FileInput;
}(_react.default.Component);
exports.FileInput = FileInput;
FileInput.propTypes = {
  /** JSS styles object.
   * @ignore */
  classes: _propTypes.default.object.isRequired,
  /**
   * The file types the file input should accept.
   * For a list of possible values, check out the
   * [Mozilla docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers).
   */
  accept: _propTypes.default.string,
  /** The button content. */
  buttonText: _propTypes.default.node,
  /** If `true`, the component is disabled. */
  disabled: _propTypes.default.bool,
  /** If `true`, the component takes up the full width of its container. */
  fullWidth: _propTypes.default.bool,
  /** The helper text content. */
  helperText: _propTypes.default.node,
  /** Attributes applied to the `input` element. */
  inputProps: _propTypes.default.object,
  /** The label content. */
  label: _propTypes.default.node,
  /** Callback fired when the value changes. */
  onChange: _propTypes.default.func,
  /** The short hint displayed in the input before the user enters a value. */
  placeholder: _propTypes.default.string,
  /** The value of the component, required for a controlled component. */
  value: _propTypes.default.any
};
var _default = (0, _withStyles.default)(styles)(FileInput);
exports.default = _default;