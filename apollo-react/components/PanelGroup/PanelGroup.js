"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.calculateWidth = exports.PanelGroup = void 0;
var _utils = require("@mui/material/utils");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _throttleDebounce = require("throttle-debounce");
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _excluded = ["children", "forwardedRef"];
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
var calculateWidth = function calculateWidth(width) {
  var rootWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  if (typeof width === 'string' && width.includes('%')) {
    return parseFloat(width.replace('%', '')) / 100 * rootWidth;
  }
  return width;
};
exports.calculateWidth = calculateWidth;
var PanelGroup = function PanelGroup(_ref) {
  var children = _ref.children,
    forwardedRef = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var ref = _react.default.useRef();
  var localRef = (0, _utils.useForkRef)(ref, forwardedRef);
  var _React$useState = _react.default.useState(),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    rootWidth = _React$useState2[0],
    setRootWidth = _React$useState2[1];
  var checkWidth = _react.default.useCallback((0, _throttleDebounce.throttle)(100, function () {
    var _ref$current;
    var curWidth = ((_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.getBoundingClientRect().width) || 0;
    setRootWidth(curWidth);
  }), []);
  _react.default.useEffect(function () {
    checkWidth();
  }, [checkWidth]);
  _react.default.useEffect(function () {
    window.addEventListener('resize', checkWidth);
    return function () {
      return window.removeEventListener('resize', checkWidth);
    };
  }, [checkWidth]);
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    ref: localRef
  }, rest), !!rootWidth && _react.default.Children.map(children, function (child) {
    return child && /*#__PURE__*/_react.default.cloneElement(child, {
      _width: calculateWidth(child === null || child === void 0 ? void 0 : child.props.width, rootWidth),
      maxWidth: calculateWidth(child === null || child === void 0 ? void 0 : child.props.maxWidth, rootWidth),
      minWidth: calculateWidth(child === null || child === void 0 ? void 0 : child.props.minWidth, rootWidth)
    });
  }));
};
exports.PanelGroup = PanelGroup;
PanelGroup.propTypes = {
  /** The `Panel`s to populate the group with. */
  children: _propTypes.default.node
};
var _default = (0, _withRef.default)()(PanelGroup);
exports.default = _default;