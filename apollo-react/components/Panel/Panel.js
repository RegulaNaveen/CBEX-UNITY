"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Panel = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _reactResizable = require("react-resizable");
var _ChevronLeft = _interopRequireDefault(require("../../icons/ChevronLeft"));
var _ChevronRight = _interopRequireDefault(require("../../icons/ChevronRight"));
var _IconButton = _interopRequireDefault(require("../IconButton"));
var _styles = _interopRequireDefault(require("./styles"));
var _excluded = ["className", "styles", "width", "minWidth", "maxWidth", "hideButton", "open", "onOpen", "onClose", "resizable", "_width", "ResizableBoxProps"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var useStyles = (0, _makeStyles.default)(_styles.default);
var Panel = function Panel(_ref) {
  var className = _ref.className,
    styles = _ref.styles,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? 400 : _ref$width,
    _ref$minWidth = _ref.minWidth,
    minWidth = _ref$minWidth === void 0 ? 0 : _ref$minWidth,
    _ref$maxWidth = _ref.maxWidth,
    maxWidth = _ref$maxWidth === void 0 ? Infinity : _ref$maxWidth,
    hideButton = _ref.hideButton,
    open = _ref.open,
    onOpen = _ref.onOpen,
    onClose = _ref.onClose,
    resizable = _ref.resizable,
    _width = _ref._width,
    ResizableBoxProps = _ref.ResizableBoxProps,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  var _React$useState = _react.default.useState(open !== null && open !== void 0 ? open : true),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    isOpen = _React$useState2[0],
    setOpen = _React$useState2[1];
  var _React$useState3 = _react.default.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    isMoving = _React$useState4[0],
    setMoving = _React$useState4[1];
  var _React$useState5 = _react.default.useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    hasMoved = _React$useState6[0],
    setHasMoved = _React$useState6[1];
  var _React$useState7 = _react.default.useState(_width || width),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    widthState = _React$useState8[0],
    setWidthState = _React$useState8[1];
  var curWidth = resizable ? Math.min(Math.max(!hasMoved && _width || widthState, minWidth), maxWidth) : _width !== null && _width !== void 0 ? _width : width;
  var handleOpen = function handleOpen(e) {
    setMoving(true);
    setOpen(true);
    onOpen && onOpen(e);
    setTimeout(function () {
      setMoving(false);
    }, 225);
  };
  var handleClose = _react.default.useCallback(function (e) {
    setMoving(true);
    setOpen(false);
    onClose && onClose(e);
    setTimeout(function () {
      setMoving(false);
    }, 225);
  }, [onClose]);
  _react.default.useEffect(function () {
    if (open === false) {
      handleClose();
    }
  }, [open, handleClose]);
  return /*#__PURE__*/_react.default.createElement(_reactResizable.ResizableBox, _extends({
    maxConstraints: [maxWidth, Infinity],
    minConstraints: [isOpen ? minWidth : 0, Infinity],
    width: isOpen ? typeof curWidth === 'string' ? 10000 : curWidth : 22,
    height: Infinity,
    axis: resizable && isOpen ? 'x' : 'none',
    resizeHandles: resizable && isOpen ? ['se'] : [],
    handle: /*#__PURE__*/_react.default.createElement("div", {
      className: classes.handleContainer
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: classes.handle
    })),
    onResize: function onResize(e, data) {
      if (!hasMoved) {
        setHasMoved(true);
      }
      setWidthState(data.size.width);
    }
  }, ResizableBoxProps, {
    className: (0, _classnames.default)(classes.container, isMoving && classes.animate, !isOpen && classes.closedPanel, hideButton && classes.hideLeftBorder, ResizableBoxProps === null || ResizableBoxProps === void 0 ? void 0 : ResizableBoxProps.className)
  }), /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      minWidth: minWidth
    },
    onClick: function onClick() {
      if (!isOpen) {
        handleOpen();
      }
    }
  }, /*#__PURE__*/_react.default.createElement("div", _extends({
    style: _objectSpread({
      width: isMoving && curWidth
    }, styles),
    className: (0, _classnames.default)(!isOpen && classes.hide, className)
  }, rest))), !hideButton && /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    className: classes.toggleButton,
    onClick: isOpen ? handleClose : handleOpen
  }, isOpen ? /*#__PURE__*/_react.default.createElement(_ChevronLeft.default, {
    className: classes.chevron
  }) : /*#__PURE__*/_react.default.createElement(_ChevronRight.default, {
    className: classes.chevron
  }))));
};
exports.Panel = Panel;
Panel.propTypes = {
  /** If `true`, the `Button` component is hidden. */
  hideButton: _propTypes.default.bool,
  /** The maximum width of the open `Panel`. */
  maxWidth: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  /** The minimum width of the open `Panel`. */
  minWidth: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  /**
   * Callback fired when the `Panel` is toggled to the closed state.
   *
   * @param {object} event The event source of the callback.
   */
  onClose: _propTypes.default.func,
  /**
   * Callback fired when the `Panel` is toggled to the open state.
   *
   * @param {object} event The event source of the callback.
   */
  onOpen: _propTypes.default.func,
  /** If `true`, the `Panel` is displayed in an open state. */
  open: _propTypes.default.bool,
  /** If `true`, the `Panel` can be resized by the user. */
  resizable: _propTypes.default.bool,
  /** Props applied to the ResizableBox component. */
  ResizableBoxProps: _propTypes.default.object,
  /** The width of the open `Panel`. */
  width: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
};
var _default = Panel;
exports.default = _default;