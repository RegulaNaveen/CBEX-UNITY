"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TreeItem = void 0;
var _TreeItem = _interopRequireDefault(require("@mui/lab/TreeItem"));
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _File = _interopRequireDefault(require("../../icons/File"));
var _FilePdf = _interopRequireDefault(require("../../icons/FilePdf"));
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _Tooltip = _interopRequireDefault(require("../Tooltip"));
var _TreeView = require("../TreeView/TreeView");
var _excluded = ["className", "label", "count", "disabled", "icon", "firstLevel", "forwardedRef"];
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
  focus: {
    '&:focus > .MuiTreeItem-content': {
      '&::before': {
        backgroundColor: _colors.primaryLightTransparent,
        content: "''",
        position: 'absolute',
        height: 32,
        left: 0,
        right: 0
      },
      '& span span': {
        color: _colors.black
      },
      '& svg': {
        color: _colors.black
      }
    }
  },
  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%'
  },
  truncateWithCount: {
    width: 'calc(100% - 30px)'
  },
  disabled: {
    opacity: 0.4,
    pointerEvents: 'none'
  },
  icon: {
    marginRight: 1,
    fontSize: 16.8,
    padding: 0.1,
    boxSizing: 'content-box'
  },
  labelFolderPadding: {
    marginLeft: 22
  },
  folderIndent: {
    marginLeft: 3
  },
  fileIndent: {
    marginLeft: 25
  },
  labelFolderPaddingWithoutArrow: {
    marginLeft: 3
  },
  fileIndentWithoutArrow: {
    marginLeft: 5
  },
  firstFileIndent: {
    marginLeft: 21
  },
  firstFileIndentWithoutArrow: {
    marginLeft: 23
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var fileIcons = {
  pdf: _FilePdf.default
};
var TreeItem = function TreeItem(_ref) {
  var _fileIcons$label$spli, _ref2;
  var className = _ref.className,
    label = _ref.label,
    count = _ref.count,
    disabled = _ref.disabled,
    icon = _ref.icon,
    firstLevel = _ref.firstLevel,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  var labelRef = _react.default.useRef();
  var labelWrapperRef = _react.default.useRef();
  var _React$useState = _react.default.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    showTooltip = _React$useState2[0],
    setShowTooltip = _React$useState2[1];
  var _React$useContext = _react.default.useContext(_TreeView.TreeContext),
    variant = _React$useContext.variant,
    max = _React$useContext.max,
    hideArrows = _React$useContext.hideArrows,
    hasCount = _React$useContext.hasCount,
    disableFocus = _React$useContext.disableFocus;
  var calcShowTooltip = function calcShowTooltip() {
    var _labelRef$current, _labelWrapperRef$curr;
    var labelWidth = (_labelRef$current = labelRef.current) === null || _labelRef$current === void 0 ? void 0 : _labelRef$current.getBoundingClientRect().width;
    var labelWrapperWidth = (_labelWrapperRef$curr = labelWrapperRef.current) === null || _labelWrapperRef$curr === void 0 ? void 0 : _labelWrapperRef$curr.getBoundingClientRect().width;
    var maxDiff = 0;
    if (labelWrapperWidth && labelWidth && labelWrapperWidth - labelWidth < maxDiff) {
      setShowTooltip(true);
    } else {
      setShowTooltip(false);
    }
  };
  _react.default.useEffect(function () {
    calcShowTooltip();
  });
  _react.default.useEffect(function () {
    window.addEventListener('resize', calcShowTooltip);
    return function () {
      return window.removeEventListener('resize', calcShowTooltip);
    };
  }, []);
  var Icon = variant === 'folder' && !rest.children && ((_fileIcons$label$spli = fileIcons[label.split('.').pop().toLowerCase()]) !== null && _fileIcons$label$spli !== void 0 ? _fileIcons$label$spli : _File.default);
  return /*#__PURE__*/_react.default.createElement(_TreeItem.default, _extends({}, rest, {
    icon: (_ref2 = icon && /*#__PURE__*/_react.default.cloneElement(icon, {
      className: classes.icon
    })) !== null && _ref2 !== void 0 ? _ref2 : Icon && /*#__PURE__*/_react.default.createElement(Icon, {
      className: classes.icon
    }),
    classes: {
      root: !disableFocus ? classes.focus : ''
    },
    className: (0, _classnames.default)(disabled && classes.disabled, variant === 'folder' && !firstLevel && classes.folderIndent,
    // prettier-ignore
    variant === 'folder' && !rest.children && (!firstLevel ? !hideArrows ? classes.fileIndent : classes.fileIndentWithoutArrow : !hideArrows ? classes.firstFileIndent : classes.firstFileIndentWithoutArrow), className),
    label: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
      title: label,
      placement: "top",
      disableHoverListener: !showTooltip
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: (0, _classnames.default)(classes.truncate, hasCount && classes.truncateWithCount, variant === 'folder' && rest.children && (!hideArrows ? classes.labelFolderPadding : classes.labelFolderPaddingWithoutArrow)),
      ref: labelWrapperRef
    }, /*#__PURE__*/_react.default.createElement("span", {
      ref: labelRef
    }, label))), count !== undefined && /*#__PURE__*/_react.default.createElement("span", null, count > max ? "".concat(max, "+") : count)),
    ref: ref
  }));
};
exports.TreeItem = TreeItem;
TreeItem.propTypes = {
  count: _propTypes.default.number,
  disabled: _propTypes.default.bool,
  firstLevel: _propTypes.default.bool,
  icon: _propTypes.default.element,
  label: _propTypes.default.node
};
var _default = (0, _withRef.default)()(TreeItem);
exports.default = _default;