"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TEXT_ALIGNMENT_STYLES = exports.INLINE_STYLES = exports.CLEAR_FORMAT = exports.BLOCK_TYPES = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireDefault(require("react"));
var _AlignCenter = _interopRequireDefault(require("../../icons/AlignCenter"));
var _AlignJustify = _interopRequireDefault(require("../../icons/AlignJustify"));
var _AlignLeft = _interopRequireDefault(require("../../icons/AlignLeft"));
var _AlignRight = _interopRequireDefault(require("../../icons/AlignRight"));
var _IndentDecrease = _interopRequireDefault(require("../../icons/IndentDecrease"));
var _IndentIncrease = _interopRequireDefault(require("../../icons/IndentIncrease"));
var _ListBullet = _interopRequireDefault(require("../../icons/ListBullet"));
var _ListNumber = _interopRequireDefault(require("../../icons/ListNumber"));
var _StrikeThrough = _interopRequireDefault(require("../../icons/StrikeThrough"));
var _TextBold = _interopRequireDefault(require("../../icons/TextBold"));
var _TextClear = _interopRequireDefault(require("../../icons/TextClear"));
var _TextItalics = _interopRequireDefault(require("../../icons/TextItalics"));
var _TextUnderline = _interopRequireDefault(require("../../icons/TextUnderline"));
var _excluded = ["className"],
  _excluded2 = ["className"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var UpperCase = function UpperCase(_ref) {
  var className = _ref.className,
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _classnames.default)('text', className)
  }, rest), 'AA');
};
var LowerCase = function LowerCase(_ref2) {
  var className = _ref2.className,
    rest = _objectWithoutProperties(_ref2, _excluded2);
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _classnames.default)('text', className)
  }, rest), 'aa');
};
var BLOCK_TYPES = [{
  style: 'ordered-list-item',
  Icon: _ListNumber.default
}, {
  style: 'unordered-list-item',
  Icon: _ListBullet.default
}, {
  style: 'left-indent',
  Icon: _IndentDecrease.default
}, {
  style: 'right-indent',
  Icon: _IndentIncrease.default
}];
exports.BLOCK_TYPES = BLOCK_TYPES;
var INLINE_STYLES = [{
  style: 'BOLD',
  Icon: _TextBold.default
}, {
  style: 'ITALIC',
  Icon: _TextItalics.default
}, {
  style: 'UNDERLINE',
  Icon: _TextUnderline.default
}, {
  style: 'STRIKETHROUGH',
  Icon: _StrikeThrough.default
}, {
  style: 'UPPERCASE',
  Icon: UpperCase
}, {
  style: 'LOWERCASE',
  Icon: LowerCase
}];
exports.INLINE_STYLES = INLINE_STYLES;
var TEXT_ALIGNMENT_STYLES = [{
  style: 'LeftAlignedBlock',
  Icon: _AlignLeft.default
}, {
  style: 'CenterAlignedBlock',
  Icon: _AlignCenter.default
}, {
  style: 'RightAlignedBlock',
  Icon: _AlignRight.default
}, {
  style: 'JustifiedBlock',
  Icon: _AlignJustify.default
}];
exports.TEXT_ALIGNMENT_STYLES = TEXT_ALIGNMENT_STYLES;
var CLEAR_FORMAT = [{
  style: 'Clear',
  Icon: _TextClear.default
}];
exports.CLEAR_FORMAT = CLEAR_FORMAT;