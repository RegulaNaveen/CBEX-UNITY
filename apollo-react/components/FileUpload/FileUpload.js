"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preventDefault = exports.normalizeFileList = exports.default = exports.FileUpload = void 0;
var _withStyles = _interopRequireDefault(require("@mui/styles/withStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _InputLabel = _interopRequireDefault(require("../InputLabel"));
var _DropArea = _interopRequireDefault(require("./DropArea"));
var _FileList = _interopRequireDefault(require("./FileList"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
    width: 238
  },
  hide: {
    display: 'none'
  }
};
var normalizeFileList = function normalizeFileList(list) {
  return Object.keys(list).map(function (item) {
    return item !== 'length' ? list[item] : null;
  });
};
exports.normalizeFileList = normalizeFileList;
var preventDefault = function preventDefault(e) {
  e.preventDefault();
  e.stopPropagation();
};
exports.preventDefault = preventDefault;
var FileUpload = /*#__PURE__*/function (_React$Component) {
  _inherits(FileUpload, _React$Component);
  var _super = _createSuper(FileUpload);
  function FileUpload() {
    var _this;
    _classCallCheck(this, FileUpload);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      isActive: false,
      isHover: false
    });
    _defineProperty(_assertThisInitialized(_this), "dropArea", /*#__PURE__*/_react.default.createRef());
    _defineProperty(_assertThisInitialized(_this), "handleDragOver", function (e) {
      preventDefault(e);
      _this.setState({
        isActive: true
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handleDragLeave", function (e) {
      preventDefault(e);
      _this.setState({
        isActive: false
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handleMouseOver", function (e) {
      preventDefault(e);
      _this.setState({
        isHover: true
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handleMouseOut", function (e) {
      preventDefault(e);
      _this.setState({
        isHover: false
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handleDrop", function (e) {
      var _this$props = _this.props,
        onUpload = _this$props.onUpload,
        maxItems = _this$props.maxItems,
        existingFiles = _this$props.value;
      preventDefault(e);
      var files = normalizeFileList(e.type === 'change' ? _this.dropArea.current.files : e.dataTransfer.files)
      // can't upload same file
      .filter(function (_ref) {
        var name = _ref.name;
        return !existingFiles.map(function (existingFile) {
          return existingFile.name;
        }).includes(name);
      });

      // remove exceeded files
      if (maxItems !== undefined && existingFiles.length + files.length > maxItems) {
        var leftover = existingFiles.length + files.length - maxItems;
        files.splice(-leftover, leftover);
      }
      onUpload && onUpload(files);

      // prevents a bug where you can't select, delete, and select a file again
      _this.dropArea.current.value = '';
      _this.setState({
        isActive: false
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handleClick", function () {
      _this.dropArea.current.click();
    });
    return _this;
  }
  _createClass(FileUpload, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
        classes = _this$props2.classes,
        disabled = _this$props2.disabled,
        value = _this$props2.value,
        onFileDelete = _this$props2.onFileDelete,
        label = _this$props2.label,
        required = _this$props2.required,
        asteriskPosition = _this$props2.asteriskPosition,
        optional = _this$props2.optional,
        maxItems = _this$props2.maxItems,
        fullWidth = _this$props2.fullWidth,
        dropAreaHeight = _this$props2.dropAreaHeight,
        dropAreaLabels = _this$props2.dropAreaLabels,
        accept = _this$props2.accept;
      var _this$state = this.state,
        isActive = _this$state.isActive,
        isHover = _this$state.isHover;
      var maxReached = value.length >= maxItems;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)(!fullWidth && classes.root)
      }, /*#__PURE__*/_react.default.createElement("input", {
        ref: this.dropArea,
        type: "file",
        accept: accept,
        className: classes.hide,
        multiple: true,
        onChange: this.handleDrop
      }), label && /*#__PURE__*/_react.default.createElement(_InputLabel.default, {
        required: required,
        optional: optional,
        disabled: disabled,
        asteriskPosition: asteriskPosition
      }, label), /*#__PURE__*/_react.default.createElement(_DropArea.default, {
        isActive: isActive,
        isHover: isHover,
        maxReached: maxReached,
        onDragLeave: this.handleDragLeave,
        onDragOver: this.handleDragOver,
        onDrop: this.handleDrop,
        onClick: this.handleClick,
        onMouseOver: this.handleMouseOver,
        onMouseOut: this.handleMouseOut,
        height: dropAreaHeight,
        dropAreaLabels: dropAreaLabels,
        disabled: disabled
      }), value.length > 0 && /*#__PURE__*/_react.default.createElement(_FileList.default, {
        files: value,
        onFileDelete: onFileDelete
      }));
    }
  }]);
  return FileUpload;
}(_react.default.Component);
exports.FileUpload = FileUpload;
FileUpload.propTypes = {
  /** JSS styles object.
   * @ignore */
  classes: _propTypes.default.object.isRequired,
  /**
   * The file types the file input should accept.
   * For a list of possible values, check out the
   * [Mozilla docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers).
   */
  accept: _propTypes.default.string,
  /** Position of the asterisk when `required` is `true`. */
  asteriskPosition: _propTypes.default.oneOf(['before', 'after']),
  /** If `true`, the component is disabled. */
  disabled: _propTypes.default.bool,
  /** The height of the drop area. */
  dropAreaHeight: _propTypes.default.number,
  /** The labels shown inside the drop area. */
  dropAreaLabels: _propTypes.default.shape({
    /** The text shown when dragging a file over the drop area. */
    activeText: _propTypes.default.node,
    /** The text shown in the "browse" link, after defaultText. */
    browseLinkText: _propTypes.default.node,
    /** The text shown by default in the drop area. */
    defaultText: _propTypes.default.node,
    /** The text shown when `disabled` is true. */
    disabledText: _propTypes.default.node,
    /** The text shown when hovering over the drop area. */
    hoverText: _propTypes.default.node,
    /** The text shown when the maximum amount of files is reached. */
    maxText: _propTypes.default.node
  }),
  /** If `true`, the component takes up the full width of its container. */
  fullWidth: _propTypes.default.bool,
  /** The label content. */
  label: _propTypes.default.node,
  /** The maximum number of files allowed. */
  maxItems: _propTypes.default.number,
  /**
   * Callback fired when the delete button of a selected file is pressed.
   *
   * @param {object} file The file to be deleted.
   */
  onFileDelete: _propTypes.default.func,
  /**
   * Callback fired when files are selected.
   *
   * @param {array} files The files that have just been selected.
   */
  onUpload: _propTypes.default.func,
  /** If `true`, the label is displayed as optional. */
  optional: _propTypes.default.bool,
  /** If `true`, the label is displayed as required. */
  required: _propTypes.default.bool,
  /** The selected files. */
  value: _propTypes.default.array
};
FileUpload.defaultProps = {
  value: [],
  dropAreaLabels: {
    activeText: 'Drop here to upload!',
    browseLinkText: 'browse',
    defaultText: 'Drag files here or ',
    disabledText: 'Not available',
    hoverText: 'Click to browse',
    maxText: 'Upload limit reached'
  }
};
var _default = (0, _withStyles.default)(styles)(FileUpload);
exports.default = _default;