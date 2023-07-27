"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Tabs = void 0;
var _Tabs = _interopRequireDefault(require("@mui/material/Tabs"));
var _utils = require("@mui/material/utils");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _reactMeasure = _interopRequireDefault(require("react-measure"));
var _throttleDebounce = require("throttle-debounce");
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _SelectTab = _interopRequireDefault(require("./SelectTab"));
var _excluded = ["size", "children", "displayText", "forwardedRef", "onChange", "value", "truncate"];
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
var Tabs = function Tabs(_ref) {
  var size = _ref.size,
    children = _ref.children,
    _ref$displayText = _ref.displayText,
    displayText = _ref$displayText === void 0 ? 'More' : _ref$displayText,
    forwardedRef = _ref.forwardedRef,
    onChange = _ref.onChange,
    value = _ref.value,
    truncate = _ref.truncate,
    rest = _objectWithoutProperties(_ref, _excluded);
  var tabCount = _react.default.Children.count(children);
  var tabLabels = _react.default.Children.map(children, function (child) {
    return child.props.label;
  }).join(',');
  var _React$useState = _react.default.useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    widths = _React$useState2[0],
    setWidths = _React$useState2[1];
  var _React$useState3 = _react.default.useState(tabCount),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    overflowIndex = _React$useState4[0],
    setOverflowIndex = _React$useState4[1];
  var ref = _react.default.useRef();
  var localRef = (0, _utils.useForkRef)(ref, forwardedRef);
  var selectRef = _react.default.useRef();
  var _React$useState5 = _react.default.useState(Array(tabCount).fill().map(function () {
      return /*#__PURE__*/_react.default.createRef();
    })),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    refs = _React$useState6[0],
    setRefs = _React$useState6[1];
  _react.default.useEffect(function () {
    setOverflowIndex(tabCount);
    setRefs(Array(tabCount).fill().map(function () {
      return /*#__PURE__*/_react.default.createRef();
    }));
  }, [tabCount]);
  _react.default.useEffect(function () {
    if (truncate) {
      setWidths(refs.map(function (ref, i) {
        var _ref$current;
        return (((_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.getBoundingClientRect().width) || 0) + (i === tabCount - 1 ? 0 : size === 'small' ? 24 : 32);
      }));
    }
  }, [tabCount, tabLabels, refs, size, truncate]);
  var checkOverflow = _react.default.useCallback((0, _throttleDebounce.throttle)(100, function () {
    if (widths.length) {
      var _selectRef$current$ge, _selectRef$current;
      var tabsWidth = ref.current.getBoundingClientRect().width;
      var selectWidth = (_selectRef$current$ge = (_selectRef$current = selectRef.current) === null || _selectRef$current === void 0 ? void 0 : _selectRef$current.getBoundingClientRect().width) !== null && _selectRef$current$ge !== void 0 ? _selectRef$current$ge : 0;
      var width = 0;
      var newStart = -1;
      for (var i = 0; i < widths.length; i++) {
        width += widths[i];
        if (width > tabsWidth) {
          if (width - widths[i] + selectWidth > tabsWidth) {
            newStart = i - 1;
          } else {
            newStart = i;
          }
          break;
        }
      }
      if (width < tabsWidth) {
        newStart = widths.length;
      }
      if (newStart !== -1) {
        setOverflowIndex(newStart);
      }
    }
  }), [widths]);
  _react.default.useEffect(function () {
    if (truncate) {
      checkOverflow();
    }
  }, [checkOverflow, truncate]);
  return /*#__PURE__*/_react.default.createElement(_reactMeasure.default, {
    onResize: checkOverflow,
    innerRef: localRef
  }, function (_ref2) {
    var measureRef = _ref2.measureRef;
    return /*#__PURE__*/_react.default.createElement(_Tabs.default, _extends({
      indicatorColor: "primary",
      onChange: onChange,
      value: value > overflowIndex ? overflowIndex : value
    }, rest, {
      ref: measureRef
    }), _react.default.Children.map(children, function (child, i) {
      return i < overflowIndex && /*#__PURE__*/_react.default.cloneElement(child, {
        size: size,
        ref: refs[i]
      });
    }), overflowIndex < tabCount && /*#__PURE__*/_react.default.createElement(_SelectTab.default, {
      displayText: displayText,
      onChange: onChange,
      tabValue: value >= overflowIndex ? value : '',
      size: size,
      ref: selectRef
    }, _react.default.Children.map(children, function (child, i) {
      return i >= overflowIndex && /*#__PURE__*/_react.default.cloneElement(child, {
        children: child.props.label,
        value: i
      });
    }).filter(function (child) {
      return child;
    })));
  });
};
exports.Tabs = Tabs;
Tabs.propTypes = {
  /** One or more `Tab` components. */
  children: _propTypes.default.node,
  /** The label for the overflow menu button. */
  displayText: _propTypes.default.string,
  /** Callback fired when a new tab is selected. */
  onChange: _propTypes.default.func,
  /** The size of the component. */
  size: _propTypes.default.oneOf(['small', 'medium']),
  /**
   * If `true`, tabs that would render outside the container are collected in
   * a menu button instead.
   */
  truncate: _propTypes.default.bool,
  /**
   * The value of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this property to `false`.
   */
  value: _propTypes.default.any
};
var _default = (0, _withRef.default)()(Tabs);
exports.default = _default;