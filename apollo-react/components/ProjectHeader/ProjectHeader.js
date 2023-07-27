"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ProjectHeader = void 0;
var _utils = require("@mui/material/utils");
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _reactMeasure = _interopRequireDefault(require("react-measure"));
var _throttleDebounce = require("throttle-debounce");
var _colors = require("../../colors");
var _Info = _interopRequireDefault(require("../../icons/Info"));
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _IconButton = _interopRequireDefault(require("../IconButton"));
var _Tooltip = _interopRequireDefault(require("../Tooltip"));
var _Typography = _interopRequireDefault(require("../Typography"));
var _excluded = ["menuItems", "className", "infoOnClick", "infoTooltipText", "maxCellWidth", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var FIRST_ITEM_WIDTH = 320;
var CELL_PADDING = 32;
var PLUS_TEXT_WIDTH = 28;
var styles = {
  root: {
    position: 'fixed',
    display: 'flex',
    top: 56,
    right: 0,
    left: 0,
    height: 56,
    backgroundColor: _colors.white,
    borderBottom: "1px solid ".concat(_colors.neutral4),
    zIndex: 3000
  },
  firstItem: {
    boxSizing: 'border-box',
    padding: '4px 16px 4px 24px',
    flexGrow: 0
  },
  firstItemMobile: {
    flexGrow: 1
  },
  item: {
    boxSizing: 'border-box',
    padding: '4px 16px',
    borderLeft: "1px solid ".concat(_colors.neutral4),
    flexGrow: 1,
    paddingLeft: 16
  },
  itemOverflow: {
    visibility: 'hidden',
    position: 'absolute'
  },
  firstTextContainer: {
    display: 'block'
  },
  textContainer: {
    display: 'inline-block'
  },
  label: {
    fontSize: 14,
    lineHeight: '24px',
    color: _colors.neutral8,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  value: {
    fontSize: 16,
    fontWeight: 500,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  infoContainer: {
    borderLeft: "1px solid ".concat(_colors.neutral4),
    padding: '8px 16px',
    display: 'block'
  },
  truncate: {
    display: 'inline-block',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  plusText: {
    display: 'inline-block',
    overflow: 'hidden'
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var ProjectHeader = function ProjectHeader(_ref) {
  var _ref$menuItems = _ref.menuItems,
    menuItems = _ref$menuItems === void 0 ? [] : _ref$menuItems,
    className = _ref.className,
    infoOnClick = _ref.infoOnClick,
    _ref$infoTooltipText = _ref.infoTooltipText,
    infoTooltipText = _ref$infoTooltipText === void 0 ? 'More info' : _ref$infoTooltipText,
    maxCellWidth = _ref.maxCellWidth,
    forwardedRef = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  var itemCount = menuItems.length;
  var _React$useState = _react.default.useState(itemCount),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    overflowIndex = _React$useState2[0],
    setOverflowIndex = _React$useState2[1];
  var ref = _react.default.useRef();
  var localRef = (0, _utils.useForkRef)(ref, forwardedRef);
  var _React$useState3 = _react.default.useState(Array(itemCount).fill().map(function () {
      return /*#__PURE__*/_react.default.createRef();
    })),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    refs = _React$useState4[0],
    setRefs = _React$useState4[1];
  _react.default.useEffect(function () {
    setOverflowIndex(itemCount);
    setRefs(Array(itemCount).fill().map(function () {
      return /*#__PURE__*/_react.default.createRef();
    }));
  }, [itemCount]);
  var checkOverflow = _react.default.useCallback((0, _throttleDebounce.throttle)(100, function () {
    var widths = refs.map(function (ref) {
      var _ref$current;
      return (((_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.getBoundingClientRect().width) || 0) + 34;
    });
    if (widths.length && widths[0] > 42) {
      var headerWidth = ref.current.getBoundingClientRect().width;
      var width = 0;
      var newStart = -1;
      for (var i = 0; i < widths.length; i++) {
        width += i === 0 ? FIRST_ITEM_WIDTH : widths[i];
        if (width > headerWidth) {
          if (width - widths[i] + 72 > headerWidth) {
            newStart = i - 1;
          } else {
            newStart = i;
          }
          break;
        }
      }
      if (width < headerWidth) {
        newStart = widths.length;
      }
      if (newStart !== -1) {
        setOverflowIndex(newStart);
      }
    }
  }), [refs]);
  _react.default.useEffect(function () {
    checkOverflow();
  }, [checkOverflow]);
  return /*#__PURE__*/_react.default.createElement(_reactMeasure.default, {
    onResize: checkOverflow,
    innerRef: localRef
  }, function (_ref2) {
    var measureRef = _ref2.measureRef;
    return /*#__PURE__*/_react.default.createElement("div", _extends({
      className: (0, _classnames.default)(classes.root, className),
      ref: measureRef
    }, rest), menuItems.map(function (_ref3, index) {
      var _ref4, _ref5;
      var label = _ref3.label,
        value = _ref3.value,
        maxWidth = _ref3.maxWidth;
      var isMulti = Array.isArray(value) && value.length > 1;
      var shouldLimitWidth = !(index === 0 && overflowIndex === 1);
      var currentMaxWidth = index === 0 ? (_ref4 = maxWidth !== null && maxWidth !== void 0 ? maxWidth : maxCellWidth) !== null && _ref4 !== void 0 ? _ref4 : FIRST_ITEM_WIDTH : maxWidth !== null && maxWidth !== void 0 ? maxWidth : maxCellWidth;
      return /*#__PURE__*/_react.default.createElement("div", {
        key: label,
        className: (0, _classnames.default)(index === 0 ? classes.firstItem : classes.item, !shouldLimitWidth && classes.firstItemMobile, index >= overflowIndex && classes.itemOverflow),
        style: {
          maxWidth: shouldLimitWidth ? currentMaxWidth : undefined,
          width: index === 0 && ((_ref5 = maxWidth !== null && maxWidth !== void 0 ? maxWidth : maxCellWidth) !== null && _ref5 !== void 0 ? _ref5 : FIRST_ITEM_WIDTH)
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: index === 0 ? classes.firstTextContainer : classes.textContainer,
        ref: refs[index]
      }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
        className: classes.label
      }, label), /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
        body: value,
        placement: "bottom"
      }, isMulti ? /*#__PURE__*/_react.default.createElement(_Typography.default, {
        className: classes.value
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: classes.truncate,
        style: {
          maxWidth: shouldLimitWidth ? currentMaxWidth - CELL_PADDING - PLUS_TEXT_WIDTH : undefined
        }
      }, "".concat(value[0])), /*#__PURE__*/_react.default.createElement("span", {
        className: classes.plusText
      }, ", +".concat(value.length - 1))) : /*#__PURE__*/_react.default.createElement(_Typography.default, {
        style: {
          maxWidth: shouldLimitWidth ? currentMaxWidth - CELL_PADDING : undefined
        },
        className: classes.value
      }, value))));
    }), overflowIndex !== -1 && overflowIndex < itemCount && /*#__PURE__*/_react.default.createElement("div", {
      className: classes.infoContainer
    }, /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
      title: infoTooltipText
    }, /*#__PURE__*/_react.default.createElement(_IconButton.default, {
      onClick: infoOnClick
    }, /*#__PURE__*/_react.default.createElement(_Info.default, null)))));
  });
};
exports.ProjectHeader = ProjectHeader;
ProjectHeader.propTypes = {
  /**
   * Callback fired when the info icon is clicked.
   *
   * @param {object} event The event source of the callback.
   */
  infoOnClick: _propTypes.default.func,
  /** Customize the text of the info icon tooltip. */
  infoTooltipText: _propTypes.default.node,
  /** The maximum width of each cell. */
  maxCellWidth: _propTypes.default.number,
  /** The list of items to be displayed in the component. */
  menuItems: _propTypes.default.arrayOf(_propTypes.default.shape({
    /** The content of the item. */
    label: _propTypes.default.node,
    /** The maximum width of the cell. */
    maxWidth: _propTypes.default.number,
    /** The value of the item. */
    value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]))])
  }))
};
var _default = (0, _withRef.default)()(ProjectHeader);
exports.default = _default;