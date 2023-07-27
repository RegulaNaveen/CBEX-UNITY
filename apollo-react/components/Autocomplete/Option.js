"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchAnywhere = exports.default = exports.Option = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _match = _interopRequireDefault(require("autosuggest-highlight/match"));
var _parse = _interopRequireDefault(require("autosuggest-highlight/parse"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _Checkbox = require("../Checkbox/Checkbox");
var _Tooltip = _interopRequireDefault(require("../Tooltip"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var matchAnywhere = function matchAnywhere(source, inputValue) {
  if (!source || !inputValue) {
    return [];
  }
  var source2 = source.toLowerCase();
  var inputValue2 = inputValue.toLowerCase();
  var result = [];
  for (var i = 0; i < source2.length; i++) {
    if (source2.substring(i, i + inputValue2.length) === inputValue2) {
      result.push([i, i + inputValue2.length]);
      i = i + inputValue2.length - 1;
    }
  }
  return result;
};
exports.matchAnywhere = matchAnywhere;
var matchFuncs = {
  start: _match.default,
  any: matchAnywhere
};
var styles = {
  notBold: {
    color: _colors.neutral7
  },
  bold: {
    color: _colors.black,
    fontWeight: 600
  },
  checkbox: {
    marginRight: 2,
    marginLeft: -3,
    minHeight: '18px !important',
    marginTop: -17,
    '& .MuiCheckbox-root': {
      left: -6
    }
  },
  allSelected: {
    fontWeight: 500,
    color: _colors.black
  },
  truncation: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  noMatches: {
    padding: '6px 16px',
    color: 'rgba(0, 0, 0, 0.54)'
  },
  noMatchesInline: {
    padding: '14px 16px 6px'
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var Option = function Option(_ref) {
  var showCheckboxes = _ref.showCheckboxes,
    allSelected = _ref.allSelected,
    matchFrom = _ref.matchFrom,
    option = _ref.option,
    inputValue = _ref.inputValue,
    selected = _ref.selected,
    noWrap = _ref.noWrap,
    isSelectAllOption = _ref.isSelectAllOption,
    tooltipText = _ref.tooltipText,
    TooltipProps = _ref.TooltipProps,
    listItemProps = _ref.listItemProps,
    noOptionsText = _ref.noOptionsText,
    inlineMenu = _ref.inlineMenu,
    _ref$shouldHighlight = _ref.shouldHighlight,
    shouldHighlight = _ref$shouldHighlight === void 0 ? true : _ref$shouldHighlight;
  var matchFunc = matchFuncs[matchFrom] || _match.default;
  var matches = matchFunc(option.label, inputValue);
  var classes = useStyles();
  var _React$useState = _react.default.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    shouldTruncate = _React$useState2[0],
    setShouldTruncate = _React$useState2[1];
  var parts = shouldHighlight ? (0, _parse.default)(option.label, matches) : [{
    text: option.label,
    highlight: false
  }];
  var content = option.noMatches ? /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(classes.noMatches, inlineMenu && classes.noMatchesInline)
  }, noOptionsText) : /*#__PURE__*/_react.default.createElement("li", _extends({}, listItemProps, {
    className: (0, _classnames.default)(noWrap && classes.truncation, listItemProps.className),
    ref: function ref(node) {
      if (noWrap && node) {
        setShouldTruncate(node.offsetWidth < node.scrollWidth);
      }
    }
  }), showCheckboxes && /*#__PURE__*/_react.default.createElement(_Checkbox.Checkbox, {
    checked: selected || isSelectAllOption && allSelected,
    className: classes.checkbox
  }), parts.map(function (part, index) {
    return /*#__PURE__*/_react.default.createElement("span", {
      key: index,
      className: (0, _classnames.default)(inputValue && matches.length && (part.highlight ? classes.bold : classes.notBold), allSelected && classes.allSelected)
    }, part.text);
  }));
  return tooltipText || TooltipProps || option.TooltipProps || noWrap && shouldTruncate ? /*#__PURE__*/_react.default.createElement(_Tooltip.default, _extends({
    subtitle: tooltipText || noWrap && shouldTruncate && option.label,
    placement: "top"
  }, TooltipProps, option.TooltipProps), /*#__PURE__*/_react.default.createElement("span", null, content)) : content;
};
exports.Option = Option;
Option.propTypes = {
  /** If `true`, all menu items are displayed as selected. */
  allSelected: _propTypes.default.bool,
  /** The input value. */
  inputValue: _propTypes.default.string,
  /** If `true`, the option represents the "select all" option. Only matters when `showCheckboxes` is `true`. */
  isSelectAllOption: _propTypes.default.bool,
  /** The matching strategy.
   *
   * `start`: exact match from the beginning of the text
   *
   * `any`: exact match anywhere within the text
   **/
  matchFrom: _propTypes.default.oneOf(['start', 'any']),
  /** If `true`, text in the menu truncates with an overflow ellipsis. */
  noWrap: _propTypes.default.bool,
  /** The option to render. */
  option: _propTypes.default.any,
  /** If `true`, the option will display as selected. */
  selected: _propTypes.default.bool,
  /** If `true`, checkboxes are displayed in the menu. */
  showCheckboxes: _propTypes.default.bool
};
var _default = Option;
exports.default = _default;