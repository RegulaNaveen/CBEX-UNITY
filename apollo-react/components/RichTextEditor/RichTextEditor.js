"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCssStyles = exports.default = exports.RichTextEditor = void 0;
var _withStyles = _interopRequireDefault(require("@mui/styles/withStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _draftJs = require("draft-js");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _TextStyle = _interopRequireDefault(require("../../icons/TextStyle"));
var _FormHelperText = _interopRequireDefault(require("../FormHelperText"));
var _InputLabel = _interopRequireDefault(require("../InputLabel"));
var _constants = require("./constants");
var _defaultStyles = require("./defaultStyles");
var _RichTextComponents = require("./RichTextComponents");
var _styles = require("./styles");
var _StyleTag = _interopRequireDefault(require("./StyleTag"));
var _utils = require("./utils");
var _excluded = ["classes", "customStyles", "helperText", "variant", "readOnly", "label", "required", "asteriskPosition", "optional", "disabled", "value", "error"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var maxListIndentDepth = 4;
var getCssStyles = function getCssStyles(styles) {
  var cssStyles = {};
  for (var _i = 0, _Object$entries = Object.entries(styles); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
      property = _Object$entries$_i[0],
      labelArray = _Object$entries$_i[1];
    var _iterator = _createForOfIteratorHelper(labelArray),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var style = _step.value;
        var value = style.value;
        cssStyles["".concat(property, "-").concat(value)] = _defineProperty({}, property, value);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  return _objectSpread(_objectSpread({}, cssStyles), _styles.editorStyles);
};
exports.getCssStyles = getCssStyles;
var RichTextEditor = /*#__PURE__*/function (_React$Component) {
  _inherits(RichTextEditor, _React$Component);
  var _super = _createSuper(RichTextEditor);
  function RichTextEditor() {
    var _this;
    _classCallCheck(this, RichTextEditor);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "editorRef", /*#__PURE__*/_react.default.createRef());
    _defineProperty(_assertThisInitialized(_this), "state", {
      editorState: _draftJs.EditorState.createEmpty(),
      focused: false,
      showToolbar: false
    });
    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      var _this$props = _this.props,
        customStyles = _this$props.customStyles,
        defaultValue = _this$props.defaultValue;
      var editorState;
      _this.cssStyles = getCssStyles(_objectSpread(_objectSpread({}, _defaultStyles.defaultStyles), customStyles));
      try {
        editorState = _draftJs.EditorState.createWithContent((0, _draftJs.convertFromRaw)(defaultValue));
      } catch (error) {
        editorState = _draftJs.EditorState.createEmpty();
      } finally {
        _this.setState({
          editorState: editorState
        }, function () {
          return _this.onChange(editorState);
        });
      }
    });
    _defineProperty(_assertThisInitialized(_this), "onChange", function (editorState, callback) {
      var onChange = _this.props.onChange;
      var editorRef = _this.editorRef.current;
      _this.setState({
        editorState: editorState
      }, function (newState) {
        callback && callback(newState);
        onChange && onChange((0, _draftJs.convertToRaw)(editorState.getCurrentContent()), editorRef && editorRef.editor && editorRef.editor.innerHTML);
      });
    });
    _defineProperty(_assertThisInitialized(_this), "focus", function () {
      var _this$props2 = _this.props,
        readOnly = _this$props2.readOnly,
        variant = _this$props2.variant;
      var isReadOnly = readOnly || variant === 'readOnly';
      if (!isReadOnly) {
        _this.editorRef.current.focus();
        _this.setState({
          focused: true
        });
      }
    });
    _defineProperty(_assertThisInitialized(_this), "blur", function () {
      _this.setState({
        focused: false
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handleKeyCommand", function (command) {
      var editorState = _this.state.editorState;
      var newState = _draftJs.RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        _this.onChange(newState);
        return true;
      }
      return false;
    });
    _defineProperty(_assertThisInitialized(_this), "changeBlockDepth", function (block, editorState, indentation) {
      var blockKey = block.getKey();
      var depth = block.getDepth();
      var newDepth = 0;
      if (indentation === 'left-indent' && depth > 0) {
        newDepth = depth - 1;
      } else if (indentation === 'right-indent' && depth < maxListIndentDepth) {
        newDepth = depth + 1;
      } else {
        newDepth = depth;
      }
      var newBlock = block.set('depth', newDepth);
      var contentState = editorState.getCurrentContent();
      var blockMap = contentState.getBlockMap();
      var newBlockMap = blockMap.set(blockKey, newBlock);
      return _draftJs.EditorState.push(editorState, contentState.merge({
        blockMap: newBlockMap
      }), 'adjust-depth');
    });
    _defineProperty(_assertThisInitialized(_this), "onTab", function (e) {
      var editorState = _this.state.editorState;
      var selectionState = editorState.getSelection();
      var anchorKey = selectionState.getAnchorKey();
      var currentContent = editorState.getCurrentContent();
      var currentContentBlock = currentContent.getBlockForKey(anchorKey);
      var blockType = currentContentBlock.getType();
      if (blockType === 'unordered-list-item' || blockType === 'ordered-list-item') {
        e.preventDefault();
        _this.onChange(_draftJs.RichUtils.onTab(e, editorState, 4));
      }
    });
    _defineProperty(_assertThisInitialized(_this), "handleIndentation", function (indentation) {
      var editorState = _this.state.editorState;
      var selectionState = editorState.getSelection();
      var anchorKey = selectionState.getAnchorKey();
      var currentContent = editorState.getCurrentContent();
      var currentContentBlock = currentContent.getBlockForKey(anchorKey);
      var blockType = currentContentBlock.getType();
      var newEditorState = null;
      if (blockType === 'unordered-list-item' || blockType === 'ordered-list-item') {
        newEditorState = _this.changeBlockDepth(currentContentBlock, editorState, indentation);
      } else {
        if (!((blockType === 'unstyled' || blockType === null) && indentation === 'left-indent')) {
          var indentStyle = (0, _utils.getNextIndentation)(indentation, blockType);
          if (indentStyle === null && indentation === 'right-indent') {
            return;
          }
          newEditorState = _draftJs.RichUtils.toggleBlockType(editorState, indentStyle);
        }
      }
      if (newEditorState) {
        _this.onChange(newEditorState);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "toggleBlockType", function (blockType) {
      var editorState = _this.state.editorState;
      _this.onChange(_draftJs.RichUtils.toggleBlockType(editorState, blockType));
    });
    _defineProperty(_assertThisInitialized(_this), "toggleInlineStyle", function (inlineStyle) {
      _this.onChange(_draftJs.RichUtils.toggleInlineStyle(_this.state.editorState, inlineStyle), function () {
        var editorState = _this.state.editorState;
        inlineStyle === 'UPPERCASE' && editorState.getCurrentInlineStyle().has('LOWERCASE') && _this.onChange(_draftJs.RichUtils.toggleInlineStyle(editorState, 'LOWERCASE'));
        inlineStyle === 'LOWERCASE' && editorState.getCurrentInlineStyle().has('UPPERCASE') && _this.onChange(_draftJs.RichUtils.toggleInlineStyle(editorState, 'UPPERCASE'));
      });
    });
    _defineProperty(_assertThisInitialized(_this), "toggleToolbar", function () {
      _this.setState(function (state) {
        return {
          showToolbar: !state.showToolbar
        };
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handleChangeFontStyle", function (dataType, property) {
      return function (e) {
        var editorState = _this.state.editorState;
        var es = editorState;
        var esFocused = _draftJs.EditorState.forceSelection(es, es.getSelection());
        var fontStyle = e.target.value;

        // remove all inline styles of this type
        var _iterator2 = _createForOfIteratorHelper(dataType),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var style = _step2.value;
            var key = "".concat(property, "-").concat(style.value);
            if (esFocused.getCurrentInlineStyle().includes(key)) {
              esFocused = _draftJs.RichUtils.toggleInlineStyle(_draftJs.EditorState.push(esFocused, esFocused.getCurrentContent(), 'change-inline-style'), key);
            }
          }

          // apply new style
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        _this.onChange(_draftJs.RichUtils.toggleInlineStyle(_draftJs.EditorState.push(esFocused, esFocused.getCurrentContent(), 'change-inline-style'), fontStyle));
      };
    });
    _defineProperty(_assertThisInitialized(_this), "clearFormatting", function () {
      var editorState = _this.state.editorState;
      var es = editorState;
      var contentWithoutStyles = _constants.INLINE_STYLES.map(function (item) {
        return item.style;
      }).reduce(function (newContentState, style) {
        return _draftJs.Modifier.removeInlineStyle(newContentState, es.getSelection(), style);
      }, es.getCurrentContent());
      _this.onChange(_draftJs.EditorState.push(es, contentWithoutStyles, 'change-inline-style'));
    });
    _defineProperty(_assertThisInitialized(_this), "renderControllers", function () {
      var _this$props3 = _this.props,
        variant = _this$props3.variant,
        label = _this$props3.label,
        classes = _this$props3.classes,
        customControllers = _this$props3.customControllers,
        required = _this$props3.required,
        optional = _this$props3.optional,
        disabled = _this$props3.disabled,
        customStyles = _this$props3.customStyles,
        editorOptions = _this$props3.editorOptions;
      var showToolbar = _this.state.showToolbar;
      switch (variant) {
        case 'popover':
          return /*#__PURE__*/_react.default.createElement("div", {
            className: classes.popoverControllersRoot
          }, /*#__PURE__*/_react.default.createElement("div", {
            className: classes.controllerHeader
          }, /*#__PURE__*/_react.default.createElement(_InputLabel.default, {
            className: classes.label,
            optional: optional,
            required: required,
            disabled: disabled
          }, label), /*#__PURE__*/_react.default.createElement(_TextStyle.default, {
            onClick: _this.toggleToolbar,
            fontSize: "small",
            style: {
              color: showToolbar ? '3D77F6' : 'grey',
              cursor: 'pointer'
            }
          })), showToolbar && /*#__PURE__*/_react.default.createElement("div", {
            className: classes.toolbar
          }, /*#__PURE__*/_react.default.createElement(_RichTextComponents.Controllers, _extends({}, _this.state, {
            classes: classes,
            formattedCustomStyles: _objectSpread(_objectSpread({}, _defaultStyles.defaultStyles), customStyles),
            handleChangeFontStyle: _this.handleChangeFontStyle,
            toggleBlockType: _this.toggleBlockType,
            handleIndentation: _this.handleIndentation,
            toggleInlineStyle: _this.toggleInlineStyle,
            clearFormatting: _this.clearFormatting,
            editorOptions: editorOptions
          })), customControllers === null || customControllers === void 0 ? void 0 : customControllers(_this.state.editorState, _this.onChange)));
        case 'inline':
          return /*#__PURE__*/_react.default.createElement("div", {
            className: classes.inlineControllersRoot
          }, /*#__PURE__*/_react.default.createElement(_RichTextComponents.Controllers, _extends({}, _this.state, {
            classes: classes,
            formattedCustomStyles: _objectSpread(_objectSpread({}, _defaultStyles.defaultStyles), customStyles),
            handleChangeFontStyle: _this.handleChangeFontStyle,
            toggleBlockType: _this.toggleBlockType,
            handleIndentation: _this.handleIndentation,
            toggleInlineStyle: _this.toggleInlineStyle,
            clearFormatting: _this.clearFormatting,
            editorOptions: editorOptions
          })), customControllers === null || customControllers === void 0 ? void 0 : customControllers(_this.state.editorState, _this.onChange));
        default:
          return null;
      }
    });
    return _this;
  }
  _createClass(RichTextEditor, [{
    key: "render",
    value: function render() {
      var _ref, _ref2;
      var _this$props4 = this.props,
        classes = _this$props4.classes,
        customStyles = _this$props4.customStyles,
        helperText = _this$props4.helperText,
        variant = _this$props4.variant,
        readOnly = _this$props4.readOnly,
        label = _this$props4.label,
        required = _this$props4.required,
        asteriskPosition = _this$props4.asteriskPosition,
        optional = _this$props4.optional,
        disabled = _this$props4.disabled,
        value = _this$props4.value,
        error = _this$props4.error,
        rest = _objectWithoutProperties(_this$props4, _excluded);
      var _this$state = this.state,
        editorState = _this$state.editorState,
        focused = _this$state.focused;
      var contentState = editorState.getCurrentContent();
      var className = (0, _classnames.default)('RichEditor-editor', !contentState.hasText() && contentState.getBlockMap().first().getType() !== 'unstyled' && 'RichEditor-hidePlaceholder');
      var isReadOnly = readOnly || variant === 'readOnly';
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_StyleTag.default, null), (variant === 'inline' || isReadOnly) && /*#__PURE__*/_react.default.createElement(_InputLabel.default, {
        className: classes.label,
        optional: optional,
        required: required,
        asteriskPosition: asteriskPosition,
        disabled: disabled
      }, label), /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)((variant === 'inline' || isReadOnly) && classes.root, variant === 'inline' && !isReadOnly && (_ref = {}, _defineProperty(_ref, classes.withHover, true), _defineProperty(_ref, classes.withError, error), _defineProperty(_ref, classes.withFocus, focused), _ref), disabled && classes.rootDisabled)
      }, !isReadOnly && this.renderControllers(), /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)(className, variant === 'popover' && !isReadOnly && (_ref2 = {}, _defineProperty(_ref2, classes.root, true), _defineProperty(_ref2, classes.withHover, true), _defineProperty(_ref2, classes.withError, error), _defineProperty(_ref2, classes.withFocus, focused), _ref2)),
        onClick: this.focus
      }, /*#__PURE__*/_react.default.createElement(_draftJs.Editor, _extends({
        blockRenderMap: _utils.extendedBlockRenderMap,
        blockStyleFn: _utils.getBlockStyle,
        customStyleMap: this.cssStyles,
        editorState: value && _draftJs.EditorState.createWithContent(value) || editorState,
        handleKeyCommand: this.handleKeyCommand,
        onTab: this.onTab,
        onBlur: this.blur,
        ref: this.editorRef,
        readOnly: isReadOnly || variant === 'view',
        disabled: disabled
      }, rest, {
        // onChange method must override onChange prop in {...rest}
        onChange: this.onChange
      })))), helperText && variant !== 'view' && /*#__PURE__*/_react.default.createElement(_FormHelperText.default, {
        error: error
      }, helperText));
    }
  }]);
  return RichTextEditor;
}(_react.default.Component);
exports.RichTextEditor = RichTextEditor;
RichTextEditor.propTypes = {
  /** JSS styles object.
   * @ignore */
  classes: _propTypes.default.object.isRequired,
  /** Position of the asterisk when `required` is `true`. */
  asteriskPosition: _propTypes.default.oneOf(['before', 'after']),
  /** Function to render custom tools to editor menu bar. */
  customControllers: _propTypes.default.func,
  /** Custom style options available to user in menu bar. */
  customStyles: _propTypes.default.object,
  /**
   * Object containing an array of blocks,
   * which together create the default content of the text editor.
   */
  defaultValue: _propTypes.default.object,
  /** If `true`, the component is disabled. */
  disabled: _propTypes.default.bool,
  /** Options to hide font style selectors. */
  editorOptions: _propTypes.default.shape({
    /** If `true`, the background color selector is hidden. */
    hideBackgroundColorSelector: _propTypes.default.bool,
    /** If `true`, the lists and indentation selectors are hidden. */
    hideBlockTypes: _propTypes.default.bool,
    /** If `true`, the clear format button is hidden. */
    hideClearFormat: _propTypes.default.bool,
    /** If `true`, the font color selector is hidden. */
    hideColorSelector: _propTypes.default.bool,
    /** If `true`, the font family selector is hidden. */
    hideFontFamilySelector: _propTypes.default.bool,
    /** If `true`, the font size selector is hidden. */
    hideFontSizeSelector: _propTypes.default.bool,
    /** If `true`, the bold, italic, underline, strikethrough, uppercase and lowercase selectors are hidden. */
    hideInlineStyles: _propTypes.default.bool,
    /** If `true`, the text alignment selector is hidden. */
    hideTextAlignmentStyles: _propTypes.default.bool
  }),
  /** The helper text content. */
  helperText: _propTypes.default.node,
  /** The label content. */
  label: _propTypes.default.node,
  /** Callback fired when edits and selection changes occur. */
  onChange: _propTypes.default.func,
  /** If `true`, the label is displayed as optional. */
  optional: _propTypes.default.bool,
  /** The short hint displayed in the input before the user enters a value. */
  placeholder: _propTypes.default.string,
  /** If `true`, the editor content is read only. */
  readOnly: _propTypes.default.bool,
  /** If `true`, the label is displayed as required. */
  required: _propTypes.default.bool,
  /** If `true`, any misspelled words in the editor content are red underlined. */
  spellCheck: _propTypes.default.bool,
  /** The value of the component, required for a controlled component. */
  value: _propTypes.default.any,
  /** The variant to use. */
  variant: _propTypes.default.oneOf(['inline', 'popover', 'readOnly', 'view'])
};
RichTextEditor.defaultProps = {
  customStyles: {},
  readOnly: false,
  spellCheck: true,
  variant: 'inline',
  editorOptions: {}
};
var _default = (0, _withStyles.default)(_styles.classes)(RichTextEditor);
exports.default = _default;