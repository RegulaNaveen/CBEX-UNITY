"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleHidden = exports.toggleFrozenRange = exports.toggleFrozen = exports.default = exports.TableColumnSettings = void 0;
var _ClickAwayListener = _interopRequireDefault(require("@mui/material/ClickAwayListener"));
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _Cog = _interopRequireDefault(require("../../icons/Cog"));
var _shadows = require("../../shadows");
var _Button = _interopRequireDefault(require("../Button"));
var _IconButton = _interopRequireDefault(require("../IconButton"));
var _Popper = _interopRequireDefault(require("../Popper"));
var _Tooltip = _interopRequireDefault(require("../Tooltip"));
var _arrayMove = _interopRequireDefault(require("./arrayMove"));
var _classifyByCallback3 = _interopRequireDefault(require("./classifyByCallback"));
var _ColumnList = _interopRequireDefault(require("./ColumnList"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var toggleHidden = function toggleHidden(columns, accessor) {
  return columns.map(function (column) {
    return column.accessor === accessor ? _objectSpread(_objectSpread({}, column), {}, {
      hidden: !column.hidden
    }) : column;
  });
};
exports.toggleHidden = toggleHidden;
var toggleFrozen = function toggleFrozen(columns, accessor) {
  return columns.map(function (column) {
    return column.accessor === accessor ? _objectSpread(_objectSpread({}, column), {}, {
      frozen: !column.frozen
    }) : column;
  });
};
exports.toggleFrozen = toggleFrozen;
var toggleFrozenRange = function toggleFrozenRange(columns) {
  var isFrozen = true;
  return columns.map(function (col) {
    if (col.isFrozenLine === true) {
      isFrozen = false;
    }
    return _objectSpread(_objectSpread({}, col), {}, {
      frozen: isFrozen
    });
  });
};
exports.toggleFrozenRange = toggleFrozenRange;
var styles = {
  settingsContainer: {
    position: 'sticky',
    width: 0,
    padding: 0,
    right: 0,
    zIndex: 4,
    '&:before': {
      position: 'absolute',
      top: -4,
      right: 0,
      bottom: 4,
      width: 64,
      left: 'unset !important',
      content: '""',
      backgroundImage: 'linear-gradient(to right, rgba(248, 249, 251, 0), #f8f9fb 46%)'
    }
  },
  card: {
    marginTop: 4,
    boxShadow: _shadows.shadowLevel3,
    backgroundColor: _colors.white,
    border: "solid 1px ".concat(_colors.neutral4),
    borderRadius: 4,
    maxWidth: 264
  },
  buttonContainer: {
    padding: 16,
    borderTop: "1px solid ".concat(_colors.neutral3)
  },
  firstButton: {
    marginBottom: 8
  },
  settingsButton: {
    position: 'absolute',
    right: 8,
    top: 0
  },
  popper: {
    zIndex: 3001
  },
  settingsContainerSticky: {
    zIndex: 2,
    '& .MuiButtonBase-root': {
      top: 4
    }
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var TableColumnSettings = function TableColumnSettings(_ref) {
  var columns = _ref.columns,
    handleChangeColumns = _ref.handleChangeColumns,
    _ref$columnSettings = _ref.columnSettings,
    _ref$columnSettings$a = _ref$columnSettings.applyText,
    applyText = _ref$columnSettings$a === void 0 ? 'Apply' : _ref$columnSettings$a,
    _ref$columnSettings$r = _ref$columnSettings.restoreDefaultText,
    restoreDefaultText = _ref$columnSettings$r === void 0 ? 'Restore default' : _ref$columnSettings$r,
    _ref$columnSettings$t = _ref$columnSettings.tooltipText,
    tooltipText = _ref$columnSettings$t === void 0 ? 'Column settings' : _ref$columnSettings$t,
    onChange = _ref$columnSettings.onChange,
    settingsDefaultColumns = _ref$columnSettings.defaultColumns,
    frozenColumnsEnabled = _ref$columnSettings.frozenColumnsEnabled,
    maxVisibleColumns = _ref$columnSettings.maxVisibleColumns,
    defaultColumns = _ref.defaultColumns,
    isSticky = _ref.isSticky,
    _ref$stickyHeaderTop = _ref.stickyHeaderTop,
    stickyHeaderTop = _ref$stickyHeaderTop === void 0 ? 0 : _ref$stickyHeaderTop;
  var classes = useStyles();
  var _React$useState = _react.default.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    anchorEl = _React$useState2[0],
    setAnchorEl = _React$useState2[1];
  var _React$useState3 = _react.default.useState(columns),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    newColumns = _React$useState4[0],
    setNewColumns = _React$useState4[1];
  var _React$useState5 = _react.default.useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    isDragging = _React$useState6[0],
    setIsDragging = _React$useState6[1];
  var toggleOpen = function toggleOpen(event) {
    setAnchorEl(function (anchorEl) {
      setNewColumns(columns);
      return anchorEl ? null : event.currentTarget;
    });
  };
  var toggleColumn = function toggleColumn(accessor) {
    setNewColumns(function (prevColumns) {
      return toggleHidden(prevColumns, accessor);
    });
  };
  var handleReorder = function handleReorder(_ref2) {
    var oldIndex = _ref2.oldIndex,
      newIndex = _ref2.newIndex;
    setIsDragging(false);
    setNewColumns(function (prevOrder) {
      var _classifyByCallback = (0, _classifyByCallback3.default)(prevOrder, [/* locked */function (col) {
          return col.locked || !col.accessor;
        }, /* frozen */function (col) {
          return col.header && col.frozen;
        }]),
        _classifyByCallback2 = _slicedToArray(_classifyByCallback, 3),
        locked = _classifyByCallback2[0],
        frozen = _classifyByCallback2[1],
        others = _classifyByCallback2[2];
      if (frozenColumnsEnabled && oldIndex !== newIndex) {
        var frozenLinePlaceholder = {
          isFrozenLine: true
        };
        var notLockedColumns = [].concat(_toConsumableArray(frozen), [frozenLinePlaceholder], _toConsumableArray(others));
        var reordered = (0, _arrayMove.default)(notLockedColumns, oldIndex, newIndex);
        var fixedFrozenRange = toggleFrozenRange(reordered);
        var withoutFrozenLinePlaceholder = fixedFrozenRange.filter(function (c) {
          return !c.isFrozenLine;
        });
        return [].concat(_toConsumableArray(locked), _toConsumableArray(withoutFrozenLinePlaceholder));
      } else {
        return (0, _arrayMove.default)(prevOrder, oldIndex + locked.length, newIndex + locked.length);
      }
    });
  };
  return /*#__PURE__*/_react.default.createElement("td", {
    className: (0, _classnames.default)(classes.settingsContainer, isSticky && classes.settingsContainerSticky),
    style: {
      top: isSticky ? stickyHeaderTop + 80 : 4
    }
  }, /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    title: tooltipText,
    placement: "top"
  }, /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    size: "small",
    onClick: toggleOpen,
    open: !!anchorEl,
    className: classes.settingsButton
  }, /*#__PURE__*/_react.default.createElement(_Cog.default, null))), /*#__PURE__*/_react.default.createElement(_Popper.default, {
    open: !!anchorEl,
    anchorEl: anchorEl,
    placement: "bottom-end",
    className: classes.popper
  }, /*#__PURE__*/_react.default.createElement(_ClickAwayListener.default, {
    onClickAway: toggleOpen
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.card
  }, /*#__PURE__*/_react.default.createElement(_ColumnList.default, {
    columns: newColumns,
    toggleColumn: toggleColumn,
    onSortStart: function onSortStart() {
      return setIsDragging(true);
    },
    onSortEnd: handleReorder,
    isDragging: isDragging,
    useDragHandle: true,
    frozenColumnsEnabled: frozenColumnsEnabled,
    maxVisibleColumns: maxVisibleColumns
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.buttonContainer
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    size: "small",
    fullWidth: true,
    variant: "primary",
    className: classes.firstButton,
    onClick: function onClick() {
      handleChangeColumns(newColumns);
      onChange && onChange(newColumns);
      toggleOpen();
    }
  }, applyText), /*#__PURE__*/_react.default.createElement(_Button.default, {
    size: "small",
    fullWidth: true,
    onClick: function onClick() {
      var _ref3;
      setNewColumns((_ref3 = defaultColumns !== null && defaultColumns !== void 0 ? defaultColumns : settingsDefaultColumns) !== null && _ref3 !== void 0 ? _ref3 : columns);
    }
  }, restoreDefaultText))))));
};
exports.TableColumnSettings = TableColumnSettings;
var _default = TableColumnSettings;
exports.default = _default;