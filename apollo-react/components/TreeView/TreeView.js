"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TreeView = exports.TreeContext = void 0;
var _TreeView = _interopRequireDefault(require("@mui/lab/TreeView"));
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _ArrowDown = _interopRequireDefault(require("../../icons/ArrowDown"));
var _ArrowRight = _interopRequireDefault(require("../../icons/ArrowRight"));
var _Folder = _interopRequireDefault(require("../../icons/Folder"));
var _FolderOpen = _interopRequireDefault(require("../../icons/FolderOpen"));
var _excluded = ["className", "max", "variant", "children", "hideArrows", "disableFocus"];
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
var styles = {
  icon: {
    marginBottom: 2
  },
  iconWithArrow: {
    marginTop: 4,
    marginRight: -16,
    marginLeft: -1
  },
  arrow: {
    fontSize: '16px !important',
    padding: '4px 4px 4px 5px',
    paddingLeft: '5px !important'
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var TreeContext = /*#__PURE__*/_react.default.createContext({});
exports.TreeContext = TreeContext;
var TreeView = function TreeView(_ref) {
  var className = _ref.className,
    _ref$max = _ref.max,
    max = _ref$max === void 0 ? 99 : _ref$max,
    variant = _ref.variant,
    children = _ref.children,
    hideArrows = _ref.hideArrows,
    disableFocus = _ref.disableFocus,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  var _React$useState = _react.default.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    keyPressed = _React$useState2[0],
    setKeyPressed = _React$useState2[1];
  var hasCount = _react.default.Children.toArray(children).some(function (child) {
    return child.props.count !== undefined;
  });
  var upHandler = function upHandler(_ref2) {
    var key = _ref2.key;
    if (['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'].includes(key)) {
      setKeyPressed(true);
    }
  };
  var clickHandler = function clickHandler() {
    setKeyPressed(false);
  };
  _react.default.useEffect(function () {
    if (disableFocus) {
      window.addEventListener('keyup', upHandler);
      window.addEventListener('click', clickHandler);
    }
    return function () {
      window.removeEventListener('keyup', upHandler);
      window.removeEventListener('click', clickHandler);
    };
  }, [disableFocus]);
  return /*#__PURE__*/_react.default.createElement(TreeContext.Provider, {
    value: {
      max: max,
      variant: variant,
      hideArrows: hideArrows,
      hasCount: hasCount,
      disableFocus: disableFocus && !keyPressed
    }
  }, /*#__PURE__*/_react.default.createElement(_TreeView.default, _extends({
    defaultCollapseIcon: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !hideArrows && /*#__PURE__*/_react.default.createElement(_ArrowDown.default, {
      className: classes.arrow
    }), variant === 'folder' && /*#__PURE__*/_react.default.createElement(_FolderOpen.default, {
      className: (0, _classnames.default)(classes.icon, !hideArrows && classes.iconWithArrow)
    })),
    defaultExpandIcon: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !hideArrows && /*#__PURE__*/_react.default.createElement(_ArrowRight.default, {
      className: classes.arrow
    }), variant === 'folder' && /*#__PURE__*/_react.default.createElement(_Folder.default, {
      className: (0, _classnames.default)(classes.icon, !hideArrows && classes.iconWithArrow)
    }))
  }, rest), _react.default.Children.map(children, function (child) {
    return /*#__PURE__*/_react.default.cloneElement(child, {
      firstLevel: true
    });
  })));
};
exports.TreeView = TreeView;
TreeView.propTypes = {
  /** Expanded node ids (Uncontrolled). */
  defaultExpanded: _propTypes.default.arrayOf(_propTypes.default.string),
  /**
   * Selected node ids. (Uncontrolled)
   * When `multiSelect` is `true`, this must be an array of strings.
   * Otherwise, it must be a string.
   */
  defaultSelected: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.string), _propTypes.default.string]),
  /** If `true`, focus is disabled. */
  disableFocus: _propTypes.default.bool,
  /** If `true`, selection is disabled. */
  disableSelection: _propTypes.default.bool,
  /** Expanded node ids (Controlled). */
  expanded: _propTypes.default.arrayOf(_propTypes.default.string),
  /** If `true`, the arrow icon is hidden. */
  hideArrows: _propTypes.default.bool,
  /** Maximum count to show. */
  max: _propTypes.default.number,
  /** If `true`, `ctrl` and `shift` triggers multiselect. */
  multiSelect: _propTypes.default.bool,
  /**
   * Callback fired when tree items are selected or deselected.
   *
   * @param {object} event The event source of the callback
   * @param {(array|string)} value of the selected nodes. When `multiSelect` is
   * `true`, this is an array of strings. Otherwise, it is a string.
   */
  onNodeSelect: _propTypes.default.func,
  /**
   * Callback fired when tree items are expanded or collapsed.
   *
   * @param {object} event The event source of the callback.<br/>
   * @param {array} nodeIds The ids of the expanded nodes.
   */
  onNodeToggle: _propTypes.default.func,
  /**
   * Selected node ids. (Controlled)
   * When `multiSelect` is `true`, this must be an array of strings.
   * Otherwise, it must be a string.
   */
  selected: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.string), _propTypes.default.string]),
  /** The variant to use. The 'folder' variant displays file and folder icons. */
  variant: _propTypes.default.oneOf(['default', 'folder'])
};
var _default = TreeView;
exports.default = _default;