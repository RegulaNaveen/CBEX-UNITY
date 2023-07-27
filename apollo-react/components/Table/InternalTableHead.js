"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InternalTableHead = InternalTableHead;
exports.getIsFiltered = exports.default = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _TableColumnSettings = _interopRequireDefault(require("../TableColumnSettings"));
var _TableHead = _interopRequireDefault(require("../TableHead"));
var _TableRow = _interopRequireDefault(require("../TableRow"));
var _InternalTableFilter = _interopRequireDefault(require("./InternalTableFilter"));
var _InternalTableHeader = _interopRequireDefault(require("./InternalTableHeader"));
var _utils = require("./utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var styles = {
  row: {
    '& th:nth-last-child(2)': {
      paddingRight: 40
    }
  },
  filterRow: {
    border: 'none'
  },
  filterRowWithColumnSettings: {
    '& th:last-child': {
      paddingRight: 40
    }
  },
  scrollable: {
    '& tr th': {
      position: 'sticky',
      top: 0,
      backgroundColor: '#f6f7fb',
      zIndex: 1
    }
  },
  sticky: {
    '& th': {
      position: 'sticky',
      top: 80,
      backgroundColor: '#f6f7fb',
      zIndex: 2
    }
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var getIsFiltered = function getIsFiltered(filterValue) {
  return !!filterValue && (!Array.isArray(filterValue) || filterValue.some(function (value) {
    return value !== null;
  }));
};
exports.getIsFiltered = getIsFiltered;
function InternalTableHead(_ref) {
  var columns = _ref.columns,
    createSortHandler = _ref.createSortHandler,
    showFilters = _ref.showFilters,
    filterTooltipText = _ref.filterTooltipText,
    _ref$filters = _ref.filters,
    filters = _ref$filters === void 0 ? {} : _ref$filters,
    sortedColumn = _ref.sortedColumn,
    updateFilterValue = _ref.updateFilterValue,
    _ref$sortOrder = _ref.sortOrder,
    sortOrder = _ref$sortOrder === void 0 ? 'asc' : _ref$sortOrder,
    sortTooltipText = _ref.sortTooltipText,
    toggleFilters = _ref.toggleFilters,
    showFilterIcon = _ref.showFilterIcon,
    handleChangeColumns = _ref.handleChangeColumns,
    _ref$columnSettings = _ref.columnSettings,
    columnSettings = _ref$columnSettings === void 0 ? {} : _ref$columnSettings,
    defaultColumns = _ref.defaultColumns,
    hasScroll = _ref.hasScroll,
    isSticky = _ref.isSticky,
    stickyHeaderTop = _ref.stickyHeaderTop,
    showColumnShadow = _ref.showColumnShadow,
    columnHeaderRefs = _ref.columnHeaderRefs,
    getFrozenOffset = _ref.getFrozenOffset,
    columnHeaderRootRef = _ref.columnHeaderRootRef,
    columnHeaderHeight = _ref.columnHeaderHeight,
    isSelectable = _ref.isSelectable,
    onMouseOver = _ref.onMouseOver,
    onMouseOut = _ref.onMouseOut,
    onSelectColumn = _ref.onSelectColumn,
    selectedColumns = _ref.selectedColumns,
    hoveredColumnAccessor = _ref.hoveredColumnAccessor,
    selectAll = _ref.selectAll,
    allSelected = _ref.allSelected,
    lastVisibleColumnAcc = _ref.lastVisibleColumnAcc,
    handleContextMenu = _ref.handleContextMenu;
  var classes = useStyles();
  var lastFrozenColumnIndex = columns.reduce(function (acc, _ref2, i) {
    var frozen = _ref2.frozen,
      hidden = _ref2.hidden;
    return frozen && !hidden ? i : acc;
  }, -1) + (isSelectable ? 1 : 0);
  return /*#__PURE__*/_react.default.createElement(_TableHead.default, {
    className: (0, _classnames.default)(hasScroll && classes.scrollable, isSticky && classes.sticky)
  }, /*#__PURE__*/_react.default.createElement(_TableRow.default, {
    style: {
      height: showFilters ? 32 : 40
    },
    className: (0, _classnames.default)(columnSettings.enabled && classes.row),
    ref: columnHeaderRootRef
  }, isSelectable && /*#__PURE__*/_react.default.createElement(_InternalTableHeader.default, {
    key: "select all",
    column: {
      accessor: _utils.SELECT_ROW_ACC,
      width: 32,
      frozen: lastFrozenColumnIndex !== 0
    },
    createSortHandler: createSortHandler,
    isSelectable: isSelectable,
    onMouseOver: onMouseOver,
    onMouseOut: onMouseOut,
    sortOrder: sortOrder,
    onSelectColumn: selectAll,
    isSelected: allSelected,
    isHovered: hoveredColumnAccessor === _utils.SELECT_ROW_ACC,
    isFirst: true,
    frozenOffset: 0,
    ref: columnHeaderRefs === null || columnHeaderRefs === void 0 ? void 0 : columnHeaderRefs[0]
  }), columns.map(function (column, i) {
    var _column$key, _columns$i;
    i = isSelectable ? i + 1 : i;
    return !column.hidden && /*#__PURE__*/_react.default.createElement(_InternalTableHeader.default, {
      key: (_column$key = column.key) !== null && _column$key !== void 0 ? _column$key : column.accessor,
      column: column,
      createSortHandler: createSortHandler,
      sortedColumn: sortedColumn,
      sortOrder: sortOrder,
      sortTooltipText: sortTooltipText,
      isFiltered: getIsFiltered(filters[column.accessor]),
      toggleFilters: toggleFilters,
      showFilterIcon: showFilterIcon,
      filterTooltipText: filterTooltipText,
      showFilters: showFilters,
      showColumnShadow: showColumnShadow,
      isLastFrozenColumn: column.frozen && i === lastFrozenColumnIndex,
      isNextColumnSelected: selectedColumns === null || selectedColumns === void 0 ? void 0 : selectedColumns.includes((_columns$i = columns[i]) === null || _columns$i === void 0 ? void 0 : _columns$i.accessor),
      frozenOffset: getFrozenOffset === null || getFrozenOffset === void 0 ? void 0 : getFrozenOffset(i),
      isSelectable: isSelectable,
      onMouseOver: onMouseOver,
      onMouseOut: onMouseOut,
      onSelectColumn: onSelectColumn && function (e) {
        return onSelectColumn(column.accessor, e);
      },
      isSelected: selectedColumns === null || selectedColumns === void 0 ? void 0 : selectedColumns.includes(column.accessor),
      isHovered: isSelectable && (hoveredColumnAccessor === column.accessor || hoveredColumnAccessor === _utils.SELECT_ROW_ACC),
      isLast: isSelectable && column.accessor === lastVisibleColumnAcc,
      allSelected: allSelected,
      handleContextMenu: handleContextMenu,
      stickyOffset: isSticky && stickyHeaderTop ? stickyHeaderTop + 80 : undefined,
      ref: columnHeaderRefs === null || columnHeaderRefs === void 0 ? void 0 : columnHeaderRefs[i]
    });
  }), columnSettings.enabled && /*#__PURE__*/_react.default.createElement(_TableColumnSettings.default, {
    handleChangeColumns: handleChangeColumns,
    columns: columns,
    columnSettings: columnSettings,
    defaultColumns: defaultColumns,
    isSticky: isSticky,
    stickyHeaderTop: stickyHeaderTop
  })), showFilters ? /*#__PURE__*/_react.default.createElement(_TableRow.default, {
    className: (0, _classnames.default)(classes.filterRow, columnSettings.enabled && classes.filterRowWithColumnSettings)
  }, isSelectable && /*#__PURE__*/_react.default.createElement(_InternalTableHeader.default, {
    key: "select all",
    column: {
      accessor: _utils.SELECT_ROW_ACC,
      width: 32,
      frozen: lastFrozenColumnIndex !== 0
    },
    createSortHandler: createSortHandler,
    isSelectable: isSelectable,
    onMouseOver: onMouseOver,
    onMouseOut: onMouseOut,
    sortOrder: sortOrder,
    onSelectColumn: selectAll,
    isSelected: allSelected,
    isHovered: hoveredColumnAccessor === _utils.SELECT_ROW_ACC,
    isFirst: true,
    hideTopBorder: true,
    stickyOffset: (hasScroll || isSticky) && columnHeaderHeight + (isSticky ? stickyHeaderTop + 80 : 0)
  }), columns.map(function (column, i) {
    var _column$key2, _columns$i2;
    i = isSelectable ? i + 1 : i;
    return !column.hidden && /*#__PURE__*/_react.default.createElement(_InternalTableFilter.default, {
      key: (_column$key2 = column.key) !== null && _column$key2 !== void 0 ? _column$key2 : column.accessor,
      column: column,
      filters: filters,
      updateFilterValue: updateFilterValue,
      showColumnShadow: showColumnShadow,
      isLastFrozenColumn: column.frozen && i === lastFrozenColumnIndex,
      isNextColumnSelected: selectedColumns === null || selectedColumns === void 0 ? void 0 : selectedColumns.includes((_columns$i2 = columns[i]) === null || _columns$i2 === void 0 ? void 0 : _columns$i2.accessor),
      frozenOffset: getFrozenOffset === null || getFrozenOffset === void 0 ? void 0 : getFrozenOffset(i),
      stickyOffset: (hasScroll || isSticky) && columnHeaderHeight + (isSticky ? stickyHeaderTop + 80 : 0),
      isSelectable: isSelectable,
      onMouseOver: onMouseOver,
      onMouseOut: onMouseOut,
      onSelectColumn: onSelectColumn && function (e) {
        return onSelectColumn(column.accessor, e);
      },
      isSelected: selectedColumns === null || selectedColumns === void 0 ? void 0 : selectedColumns.includes(column.accessor),
      isHovered: isSelectable && (hoveredColumnAccessor === column.accessor || hoveredColumnAccessor === _utils.SELECT_ROW_ACC),
      isLast: isSelectable && column.accessor === lastVisibleColumnAcc,
      allSelected: allSelected
    });
  })) : null);
}
InternalTableHead.propTypes = {
  columns: _propTypes.default.array.isRequired,
  createSortHandler: _propTypes.default.func,
  filters: _propTypes.default.object,
  filterTooltipText: _propTypes.default.node,
  showFilters: _propTypes.default.bool,
  sortedColumn: _propTypes.default.string,
  sortOrder: _propTypes.default.string,
  sortTooltipText: _propTypes.default.node,
  updateFilterValue: _propTypes.default.func
};
var _default = InternalTableHead;
exports.default = _default;