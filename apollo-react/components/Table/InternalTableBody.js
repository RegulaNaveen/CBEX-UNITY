"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InternalTableBody = InternalTableBody;
exports.default = void 0;
var _Collapse = _interopRequireDefault(require("@mui/material/Collapse"));
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _colorUtils = require("../../utils/colorUtils");
var _TableBody = _interopRequireDefault(require("../TableBody"));
var _TableCell = _interopRequireDefault(require("../TableCell"));
var _TableRow = _interopRequireDefault(require("../TableRow"));
var _InternalTableCell = _interopRequireDefault(require("./InternalTableCell"));
var _utils = require("./utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var styles = {
  stripe: {
    backgroundColor: (0, _colorUtils.hexToRGBA)(_colors.neutral1, 0.72)
  },
  editMode: {
    borderTop: "solid 1px ".concat(_colors.neutral4, " !important"),
    borderBottom: "solid 1px ".concat(_colors.neutral4, " !important"),
    verticalAlign: 'top',
    '&:not(:last-child) td:first-child::before': {
      width: 0
    },
    '& td': {
      backgroundColor: '#f6f7fb'
    }
  },
  hideBorderBuffer: {
    '&:not(:last-child) td:first-child::before': {
      width: 0
    }
  },
  hideBorderBottom: {
    borderBottom: 'none !important'
  },
  expandedRowEditMode: {
    backgroundColor: '#f6f7fb',
    borderBottom: "solid 1px ".concat(_colors.neutral4, " !important"),
    '&:not(:last-child) td:first-child::before': {
      width: 0
    }
  },
  selectableRow: {
    '&:not(:last-child) td:first-child::before': {
      display: 'none'
    },
    '& td:first-child:hover ~ td': {
      backgroundColor: _colors.primaryLight
    },
    '-webkit-touch-callout': 'none' /* iOS Safari */,
    '-webkit-user-select': 'none' /* Safari */,
    '-khtml-user-select': 'none' /* Konqueror HTML */,
    '-moz-user-select': 'none' /* Old versions of Firefox */,
    '-ms-user-select': 'none' /* Edge */,
    'user-select': 'none' /* Chrome, Edge, Opera and Firefox */
  }
};

var useStyles = (0, _makeStyles.default)(styles);
var makeEventHandler = function makeEventHandler(row, handler, rowPropsHandler) {
  return !handler && !rowPropsHandler ? undefined : function (event) {
    rowPropsHandler && rowPropsHandler(event, row);
    handler && handler(event, row);
  };
};
function InternalTableBody(_ref) {
  var _ref$columns = _ref.columns,
    columns = _ref$columns === void 0 ? [] : _ref$columns,
    _ref$rows = _ref.rows,
    rows = _ref$rows === void 0 ? [] : _ref$rows,
    _ref$emptyRows = _ref.emptyRows,
    emptyRows = _ref$emptyRows === void 0 ? 0 : _ref$emptyRows,
    _ref$rowHeight = _ref.rowHeight,
    rowHeight = _ref$rowHeight === void 0 ? 48 : _ref$rowHeight,
    bodyHeight = _ref.bodyHeight,
    stripedRows = _ref.stripedRows,
    _ref$rowProps = _ref.rowProps,
    rowProps = _ref$rowProps === void 0 ? {} : _ref$rowProps,
    ExpandableComponent = _ref.ExpandableComponent,
    showColumnShadow = _ref.showColumnShadow,
    getFrozenOffset = _ref.getFrozenOffset,
    isSelectable = _ref.isSelectable,
    hoveredColumnAccessor = _ref.hoveredColumnAccessor,
    selectedColumns = _ref.selectedColumns,
    _onSelectRow = _ref.onSelectRow,
    selectedRows = _ref.selectedRows,
    onSelectCell = _ref.onSelectCell,
    selectedCells = _ref.selectedCells,
    rowId = _ref.rowId,
    allSelected = _ref.allSelected,
    lastVisibleColumnAcc = _ref.lastVisibleColumnAcc,
    handleContextMenu = _ref.handleContextMenu;
  var classes = useStyles();
  var lastFrozenColumnIndex = columns.reduce(function (acc, _ref2, i) {
    var frozen = _ref2.frozen,
      hidden = _ref2.hidden;
    return frozen && !hidden ? i : acc;
  }, -1) + (isSelectable ? 1 : 0);
  return /*#__PURE__*/_react.default.createElement(_TableBody.default, {
    style: {
      height: bodyHeight
    }
  }, rows.map(function (row, index) {
    var _ref3, _row$key;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: (_ref3 = (_row$key = row.key) !== null && _row$key !== void 0 ? _row$key : row[rowId]) !== null && _ref3 !== void 0 ? _ref3 : JSON.stringify(row)
    }, /*#__PURE__*/_react.default.createElement(_TableRow.default, _extends({
      hover: !isSelectable
    }, rowProps, {
      style: _objectSpread(_objectSpread({
        height: rowHeight,
        cursor: row.onClick ? 'pointer' : 'initial'
      }, rowProps.style), row.style),
      className: (0, _classnames.default)(stripedRows && index % 2 === 1 && classes.stripe, row.editMode && classes.editMode, index < rows.length - 1 && rows[index + 1].editMode && classes.hideBorderBuffer, ExpandableComponent && row.expanded && classes.hideBorderBottom, isSelectable && classes.selectableRow, rowProps.className, row.className),
      onClick: function onClick(event) {
        rowProps.onClick && rowProps.onClick(row);
        row.onClick && row.onClick(row);
        rowProps.onClickV2 && rowProps.onClickV2(event, row);
        row.onClickV2 && row.onClickV2(event, row);
      },
      onMouseOver: function onMouseOver(event) {
        rowProps.onMouseOver && rowProps.onMouseOver(row);
        rowProps.onMouseOverV2 && rowProps.onMouseOverV2(event, row);
        row.onMouseOver && row.onMouseOver(event, row);
      },
      onMouseOut: function onMouseOut(event) {
        rowProps.onMouseOut && rowProps.onMouseOut(row);
        rowProps.onMouseOutV2 && rowProps.onMouseOutV2(event, row);
        row.onMouseOut && row.onMouseOut(event, row);
      },
      onMouseDown: makeEventHandler(row, row.onMouseDown, rowProps.onMouseDown),
      onMouseUp: makeEventHandler(row, row.onMouseUp, rowProps.onMouseUp),
      onMouseEnter: makeEventHandler(row, row.onMouseEnter, rowProps.onMouseEnter),
      onMouseLeave: makeEventHandler(row, row.onMouseLeave, rowProps.onMouseLeave),
      onMouseMove: makeEventHandler(row, row.onMouseMove, rowProps.onMouseMove),
      onContextMenu: makeEventHandler(row, row.onContextMenu, rowProps.onContextMenu),
      onDoubleClick: makeEventHandler(row, row.onDoubleClick, rowProps.onDoubleClick),
      onDrag: makeEventHandler(row, row.onDrag, rowProps.onDrag),
      onDragStart: makeEventHandler(row, row.onDragStart, rowProps.onDragStart),
      onDragEnd: makeEventHandler(row, row.onDragEnd, rowProps.onDragEnd),
      onDragEnter: makeEventHandler(row, row.onDragEnter, rowProps.onDragEnter),
      onDragOver: makeEventHandler(row, row.onDragOver, rowProps.onDragOver),
      onDragLeave: makeEventHandler(row, row.onDragLeave, rowProps.onDragLeave),
      onDrop: makeEventHandler(row, row.onDrop, rowProps.onDrop)
    }), isSelectable && /*#__PURE__*/_react.default.createElement(_InternalTableCell.default, {
      key: "select row",
      column: {
        accessor: _utils.SELECT_ROW_ACC,
        width: 32,
        frozen: lastFrozenColumnIndex !== 0
      },
      row: row,
      isSelectable: isSelectable,
      isHovered: hoveredColumnAccessor === _utils.SELECT_ROW_ACC,
      isFirstInRow: true,
      isLastInColumn: index === rows.length - 1,
      isInSelectedRow: selectedRows === null || selectedRows === void 0 ? void 0 : selectedRows.includes(row[rowId]),
      onSelectRow: function onSelectRow(e) {
        return _onSelectRow(row[rowId], e);
      },
      allSelected: allSelected,
      frozenOffset: 0,
      isInFirstRow: isSelectable && index === 0,
      handleContextMenu: handleContextMenu
    }), columns.map(function (column, i) {
      var _column$key, _columns$i;
      i = isSelectable ? i + 1 : i;
      return !column.hidden && /*#__PURE__*/_react.default.createElement(_InternalTableCell.default, {
        key: (_column$key = column.key) !== null && _column$key !== void 0 ? _column$key : column.accessor,
        column: column,
        row: row,
        showColumnShadow: showColumnShadow,
        isLastFrozenColumn: column.frozen && i === lastFrozenColumnIndex,
        isNextColumnSelected: selectedColumns === null || selectedColumns === void 0 ? void 0 : selectedColumns.includes((_columns$i = columns[i]) === null || _columns$i === void 0 ? void 0 : _columns$i.accessor),
        frozenOffset: getFrozenOffset === null || getFrozenOffset === void 0 ? void 0 : getFrozenOffset(i),
        isSelectable: isSelectable,
        isHovered: isSelectable && (hoveredColumnAccessor === column.accessor || hoveredColumnAccessor === _utils.SELECT_ROW_ACC),
        isLastInRow: isSelectable && column.accessor === lastVisibleColumnAcc,
        isLastInColumn: isSelectable && index === rows.length - 1,
        isInSelectedColumn: isSelectable && (selectedColumns === null || selectedColumns === void 0 ? void 0 : selectedColumns.includes(column.accessor)),
        isInSelectedRow: isSelectable && (selectedRows === null || selectedRows === void 0 ? void 0 : selectedRows.includes(row[rowId])),
        isCellSelected: isSelectable && (selectedCells === null || selectedCells === void 0 ? void 0 : selectedCells.find(function (_ref4) {
          var curRowId = _ref4.rowId,
            columnAccessor = _ref4.columnAccessor;
          return curRowId === row[rowId] && columnAccessor === column.accessor;
        })),
        onSelectCell: onSelectCell && function (e) {
          return onSelectCell(row[rowId], column.accessor, e);
        },
        allSelected: allSelected,
        isInFirstRow: isSelectable && index === 0,
        handleContextMenu: handleContextMenu
      });
    })), ExpandableComponent && /*#__PURE__*/_react.default.createElement(_TableRow.default, {
      className: (0, _classnames.default)(row.expanded && classes.expandedRowEditMode, index < rows.length - 1 && rows[index + 1].editMode && classes.hideBorderBuffer)
    }, /*#__PURE__*/_react.default.createElement(_TableCell.default, {
      style: {
        paddingBottom: 0,
        paddingTop: 0
      },
      colSpan: columns.length
    }, /*#__PURE__*/_react.default.createElement(_Collapse.default, {
      in: row.expanded,
      timeout: "auto",
      unmountOnExit: true
    }, /*#__PURE__*/_react.default.createElement(ExpandableComponent, {
      row: row,
      column: columns
    })))));
  }), emptyRows > 0 && /*#__PURE__*/_react.default.createElement(_TableRow.default, {
    style: {
      height: rowHeight * emptyRows
    }
  }, /*#__PURE__*/_react.default.createElement(_TableCell.default, null)));
}
InternalTableBody.propTypes = {
  columns: _propTypes.default.array,
  emptyRows: _propTypes.default.number,
  rowHeight: _propTypes.default.number,
  rows: _propTypes.default.array
};
var _default = InternalTableBody;
exports.default = _default;