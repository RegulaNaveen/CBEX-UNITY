"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectControls = exports.GroupButtonControls = exports.Controllers = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _MenuItem = _interopRequireDefault(require("../MenuItem"));
var _Select = _interopRequireDefault(require("../Select"));
var _constants = require("./constants");
var _excluded = ["editorState", "dataType", "width", "id"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var GroupButtonControls = function GroupButtonControls(_ref) {
  var editorState = _ref.editorState,
    onToggle = _ref.onToggle,
    dataType = _ref.dataType,
    onIndent = _ref.onIndent;
  var blockType = editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType();
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "style-button-group"
  }, dataType.map(function (_ref2, i) {
    var Icon = _ref2.Icon,
      style = _ref2.style;
    var active = editorState.getCurrentInlineStyle().has(style) || style === blockType;
    return /*#__PURE__*/_react.default.createElement(Icon, {
      key: i,
      className: (0, _classnames.default)('icon-button', active && 'active'),
      onMouseDown: style.includes('indent') ? function () {
        return onIndent(style);
      } : function () {
        return onToggle(style);
      }
    });
  }));
};
exports.GroupButtonControls = GroupButtonControls;
GroupButtonControls.propTypes = {
  dataType: _propTypes.default.arrayOf(_propTypes.default.shape({
    Icon: _propTypes.default.elementType,
    style: _propTypes.default.string
  })),
  editorState: _propTypes.default.object,
  onIndent: _propTypes.default.func,
  onToggle: _propTypes.default.func
};
var SelectControls = /*#__PURE__*/_react.default.forwardRef(function (_ref3, ref) {
  var editorState = _ref3.editorState,
    dataType = _ref3.dataType,
    width = _ref3.width,
    id = _ref3.id,
    rest = _objectWithoutProperties(_ref3, _excluded);
  var selectedStyle = '';
  var _iterator = _createForOfIteratorHelper(dataType),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;
      var key = "".concat(id, "-").concat(item.value);
      if (editorState.getCurrentInlineStyle().includes(key)) {
        selectedStyle = key;
        break;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return /*#__PURE__*/_react.default.createElement(_Select.default, _extends({
    className: "rti-select",
    value: selectedStyle,
    style: {
      width: width
    }
  }, rest, {
    ref: ref
  }), dataType.map(function (_ref4, i) {
    var label = _ref4.label,
      value = _ref4.value;
    var key = "".concat(id, "-").concat(value);
    return /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
      value: key,
      key: i
    }, label);
  }));
});
exports.SelectControls = SelectControls;
SelectControls.propTypes = {
  dataType: _propTypes.default.arrayOf(_propTypes.default.shape({
    value: _propTypes.default.any
  })),
  editorState: _propTypes.default.object,
  id: _propTypes.default.any,
  width: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
};
SelectControls.displayName = 'SelectControls';
var Controllers = function Controllers(_ref5) {
  var editorState = _ref5.editorState,
    handleChangeFontStyle = _ref5.handleChangeFontStyle,
    toggleBlockType = _ref5.toggleBlockType,
    handleIndentation = _ref5.handleIndentation,
    toggleInlineStyle = _ref5.toggleInlineStyle,
    clearFormatting = _ref5.clearFormatting,
    _ref5$formattedCustom = _ref5.formattedCustomStyles;
  _ref5$formattedCustom = _ref5$formattedCustom === void 0 ? {} : _ref5$formattedCustom;
  var fontFamily = _ref5$formattedCustom.fontFamily,
    color = _ref5$formattedCustom.color,
    backgroundColor = _ref5$formattedCustom.backgroundColor,
    fontSize = _ref5$formattedCustom.fontSize,
    _ref5$editorOptions = _ref5.editorOptions;
  _ref5$editorOptions = _ref5$editorOptions === void 0 ? {} : _ref5$editorOptions;
  var hideFontFamilySelector = _ref5$editorOptions.hideFontFamilySelector,
    hideColorSelector = _ref5$editorOptions.hideColorSelector,
    hideBackgroundColorSelector = _ref5$editorOptions.hideBackgroundColorSelector,
    hideFontSizeSelector = _ref5$editorOptions.hideFontSizeSelector,
    hideInlineStyles = _ref5$editorOptions.hideInlineStyles,
    hideClearFormat = _ref5$editorOptions.hideClearFormat,
    hideTextAlignmentStyles = _ref5$editorOptions.hideTextAlignmentStyles,
    hideBlockTypes = _ref5$editorOptions.hideBlockTypes;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !hideFontFamilySelector && /*#__PURE__*/_react.default.createElement(SelectControls, {
    placeholder: "Font Family",
    id: "fontFamily",
    dataType: fontFamily,
    editorState: editorState,
    onChange: handleChangeFontStyle(fontFamily, 'fontFamily'),
    width: 140
  }), !hideColorSelector && /*#__PURE__*/_react.default.createElement(SelectControls, {
    placeholder: "Font Color",
    id: "color",
    dataType: color,
    editorState: editorState,
    onChange: handleChangeFontStyle(color, 'color'),
    width: 114
  }), !hideBackgroundColorSelector && /*#__PURE__*/_react.default.createElement(SelectControls, {
    placeholder: "Background",
    id: "backgroundColor",
    dataType: backgroundColor,
    editorState: editorState,
    onChange: handleChangeFontStyle(backgroundColor, 'backgroundColor'),
    width: 140
  }), !hideFontSizeSelector && /*#__PURE__*/_react.default.createElement(SelectControls, {
    placeholder: "Font Size",
    id: "fontSize",
    dataType: fontSize,
    editorState: editorState,
    onChange: handleChangeFontStyle(fontSize, 'fontSize'),
    width: 114
  }), !hideInlineStyles && /*#__PURE__*/_react.default.createElement(GroupButtonControls, {
    dataType: _constants.INLINE_STYLES,
    editorState: editorState,
    onToggle: toggleInlineStyle
  }), !hideClearFormat && /*#__PURE__*/_react.default.createElement(GroupButtonControls, {
    dataType: _constants.CLEAR_FORMAT,
    editorState: editorState,
    onToggle: clearFormatting
  }), !hideTextAlignmentStyles && /*#__PURE__*/_react.default.createElement(GroupButtonControls, {
    dataType: _constants.TEXT_ALIGNMENT_STYLES,
    editorState: editorState,
    onToggle: function onToggle(alignment) {
      return toggleBlockType(alignment);
    }
  }), !hideBlockTypes && /*#__PURE__*/_react.default.createElement(GroupButtonControls, {
    dataType: _constants.BLOCK_TYPES,
    editorState: editorState,
    onToggle: toggleBlockType,
    onIndent: handleIndentation
  }));
};
exports.Controllers = Controllers;
Controllers.propTypes = {
  clearFormatting: _propTypes.default.func,
  editorOptions: _propTypes.default.shape({
    hideBackgroundColorSelector: _propTypes.default.bool,
    hideBlockTypes: _propTypes.default.bool,
    hideClearFormat: _propTypes.default.bool,
    hideColorSelector: _propTypes.default.bool,
    hideFontFamilySelector: _propTypes.default.bool,
    hideFontSizeSelector: _propTypes.default.bool,
    hideInlineStyles: _propTypes.default.bool,
    hideTextAlignmentStyles: _propTypes.default.bool
  }),
  editorState: _propTypes.default.object,
  formattedCustomStyles: _propTypes.default.shape({
    backgroundColor: _propTypes.default.any,
    color: _propTypes.default.any,
    fontFamily: _propTypes.default.arrayOf(_propTypes.default.shape({
      value: _propTypes.default.any
    })),
    fontSize: _propTypes.default.any
  }),
  handleChangeFontStyle: _propTypes.default.func,
  handleIndentation: _propTypes.default.func,
  toggleBlockType: _propTypes.default.func,
  toggleInlineStyle: _propTypes.default.func
};