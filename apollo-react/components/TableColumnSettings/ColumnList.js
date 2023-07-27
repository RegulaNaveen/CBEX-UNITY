"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ColumnList = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireDefault(require("react"));
var _reactSortableHoc = require("react-sortable-hoc");
var _colors = require("../../colors");
var _classifyByCallback3 = _interopRequireDefault(require("./classifyByCallback"));
var _ColumnListItem = _interopRequireWildcard(require("./ColumnListItem"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var styles = {
  menuContainer: {
    paddingTop: 8,
    maxHeight: 336,
    overflow: 'auto'
  },
  dragging: {
    '&:after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      content: '""',
      cursor: 'grabbing'
    }
  },
  hasFrozen: {
    paddingTop: 0
  },
  frozenContainer: {
    backgroundColor: '#f6f7fb',
    paddingTop: 8,
    borderBottom: "1px solid ".concat(_colors.neutral5)
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var ColumnList = function ColumnList(_ref) {
  var columns = _ref.columns,
    toggleColumn = _ref.toggleColumn,
    isDragging = _ref.isDragging,
    frozenColumnsEnabled = _ref.frozenColumnsEnabled,
    maxVisibleColumns = _ref.maxVisibleColumns;
  var classes = useStyles();
  var _classifyByCallback = (0, _classifyByCallback3.default)(columns, [/* locked */function (col) {
      return col.header && col.accessor && col.locked;
    }, /* frozen */function (col) {
      return col.header && col.accessor && col.frozen;
    }, /* other */function (col) {
      return col.header && col.accessor;
    }]),
    _classifyByCallback2 = _slicedToArray(_classifyByCallback, 3),
    lockedColumns = _classifyByCallback2[0],
    frozenColumns = _classifyByCallback2[1],
    otherColumns = _classifyByCallback2[2];
  var visibleColumns = columns.filter(function (_ref2) {
    var hidden = _ref2.hidden,
      header = _ref2.header;
    return !hidden && header;
  });
  var onlyOneIsVisible = visibleColumns.length === 1;
  var maxColumnsSelected = visibleColumns.length >= maxVisibleColumns;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(classes.menuContainer, isDragging && classes.dragging, frozenColumnsEnabled && classes.hasFrozen)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(frozenColumnsEnabled && classes.frozenContainer)
  }, lockedColumns.map(function (_ref3, index) {
    var header = _ref3.header,
      accessor = _ref3.accessor,
      hidden = _ref3.hidden,
      alwaysVisible = _ref3.alwaysVisible;
    return /*#__PURE__*/_react.default.createElement(_ColumnListItem.ColumnListItem, {
      index: index,
      key: accessor,
      accessor: accessor,
      value: accessor,
      header: header,
      hidden: hidden,
      toggleColumn: toggleColumn,
      isDisabled: alwaysVisible || onlyOneIsVisible && !hidden || maxColumnsSelected && hidden,
      isLocked: true
    });
  }), frozenColumnsEnabled && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, frozenColumns.map(function (_ref4, index) {
    var header = _ref4.header,
      accessor = _ref4.accessor,
      hidden = _ref4.hidden,
      alwaysVisible = _ref4.alwaysVisible;
    return /*#__PURE__*/_react.default.createElement(_ColumnListItem.default, {
      index: index,
      key: accessor,
      accessor: accessor,
      value: accessor,
      header: header,
      hidden: hidden,
      toggleColumn: toggleColumn,
      isDisabled: alwaysVisible || onlyOneIsVisible && !hidden || maxColumnsSelected && hidden
    });
  }), /*#__PURE__*/_react.default.createElement(_ColumnListItem.default, {
    index: frozenColumns.length,
    key: "Freeze columns above this line",
    accessor: "Freeze columns above this line",
    header: "Freeze columns above this line",
    noCheckbox: true,
    hidden: true
  }))), otherColumns.map(function (_ref5, index) {
    var header = _ref5.header,
      accessor = _ref5.accessor,
      hidden = _ref5.hidden,
      alwaysVisible = _ref5.alwaysVisible;
    return /*#__PURE__*/_react.default.createElement(_ColumnListItem.default, {
      key: accessor,
      index: index + (frozenColumnsEnabled ? frozenColumns.length + 1 : 0),
      accessor: accessor,
      value: accessor,
      header: header,
      hidden: hidden,
      toggleColumn: toggleColumn,
      isDisabled: alwaysVisible || onlyOneIsVisible && !hidden || maxColumnsSelected && hidden
    });
  }));
};
exports.ColumnList = ColumnList;
var _default = (0, _reactSortableHoc.SortableContainer)(ColumnList);
exports.default = _default;