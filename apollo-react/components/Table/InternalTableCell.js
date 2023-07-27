"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InternalTableCell = InternalTableCell;
exports.default = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _TableCell = _interopRequireDefault(require("../TableCell"));
var _frozenColumnStyles = _interopRequireDefault(require("./frozenColumnStyles"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var styles = _objectSpread(_objectSpread({}, _frozenColumnStyles.default), {}, {
  selectable: {
    border: "1px solid ".concat(_colors.neutral3),
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: _colors.primaryLight
    }
  },
  hover: {
    backgroundColor: "".concat(_colors.primaryLight, " !important")
  },
  firstInRow: {
    backgroundColor: '#f6f7fb',
    borderLeft: 'none'
  },
  lastInRow: {
    borderRight: 'none'
  },
  inSelectedColumn: {
    backgroundColor: _colors.primaryLight,
    borderRight: "2px solid ".concat(_colors.primary),
    borderLeft: "2px solid ".concat(_colors.primary),
    paddingLeft: 3,
    paddingRight: 3
  },
  inSelectedColumnLast: {
    borderBottom: "2px solid ".concat(_colors.primary),
    '&:before': {
      borderBottom: "2px solid ".concat(_colors.primary, " !important")
    }
  },
  inSelectedRow: {
    backgroundColor: _colors.primaryLight,
    borderTop: "2px solid ".concat(_colors.primary),
    borderBottom: "2px solid ".concat(_colors.primary)
  },
  firstInSelectedRow: {
    backgroundColor: _colors.primaryLight,
    borderLeft: "2px solid ".concat(_colors.primary)
  },
  lastInSelectedRow: {
    borderRight: "2px solid ".concat(_colors.primary, " !important")
  },
  cellSelected: {
    backgroundColor: _colors.primaryLight,
    borderTop: "2px solid ".concat(_colors.primary),
    borderBottom: "2px solid ".concat(_colors.primary),
    borderRight: "2px solid ".concat(_colors.primary),
    borderLeft: "2px solid ".concat(_colors.primary)
  },
  allSelected: {
    backgroundColor: "".concat(_colors.primaryLight, " !important")
  },
  firstAllSelected: {
    borderLeft: "2px solid ".concat(_colors.primary)
  },
  lastInColumnAllSelected: {
    borderBottom: "2px solid ".concat(_colors.primary, " !important")
  },
  lastInRowAllSelected: {
    borderRight: "2px solid ".concat(_colors.primary, " !important")
  },
  frozenSelectableCell: {
    border: 'none !important',
    '&:before': {
      position: 'absolute',
      top: -1,
      right: 0,
      bottom: -1,
      left: 0,
      content: '""',
      borderLeft: "1px solid ".concat(_colors.neutral3),
      borderBottom: "1px solid ".concat(_colors.neutral3)
    }
  },
  firstFrozenSelectableCell: {
    '&:after': {
      position: 'absolute',
      top: -1,
      right: 0,
      bottom: -1,
      left: 0,
      content: '""',
      borderBottom: "1px solid ".concat(_colors.neutral3)
    }
  },
  frozenCellSelected: {
    '&:before': {
      borderTop: "2px solid ".concat(_colors.primary),
      borderBottom: "2px solid ".concat(_colors.primary),
      borderRight: "2px solid ".concat(_colors.primary),
      borderLeft: "2px solid ".concat(_colors.primary),
      left: -1,
      right: -1
    },
    '&&:after': {
      borderRight: 'none !important'
    },
    '& + td:before': {
      borderLeft: "2px solid ".concat(_colors.primary),
      left: -1
    }
  },
  frozenInSelectedColumn: {
    border: 'none !important',
    '&:before': {
      borderRight: "2px solid ".concat(_colors.primary),
      borderLeft: "2px solid ".concat(_colors.primary),
      left: -1,
      right: -1
    },
    '& + td:before': {
      borderLeft: "2px solid ".concat(_colors.primary),
      left: -1,
      right: -1
    },
    '&&:after': {
      borderRight: 'none !important'
    }
  },
  frozenInSelectedRow: {
    '&:before': {
      top: -2,
      borderTop: "2px solid ".concat(_colors.primary, " !important"),
      borderBottom: "2px solid ".concat(_colors.primary, " !important")
    }
  },
  frozenFirstInSelectedRow: {
    '&:after': {
      top: -2,
      borderLeft: "2px solid ".concat(_colors.primary),
      borderTop: "2px solid ".concat(_colors.primary),
      borderBottom: "2px solid ".concat(_colors.primary)
    }
  },
  frozenFirstAllSelected: {
    '&:after': {
      borderLeft: "2px solid ".concat(_colors.primary)
    }
  },
  frozenLastInColumnAllSelected: {
    '&:before': {
      borderBottom: "2px solid ".concat(_colors.primary)
    }
  },
  frozenFirstRow: {
    '&:before, &:after': {
      marginTop: 2
    }
  }
});
var useStyles = (0, _makeStyles.default)(styles);
function InternalTableCell(_ref) {
  var column = _ref.column,
    row = _ref.row,
    showColumnShadow = _ref.showColumnShadow,
    isLastFrozenColumn = _ref.isLastFrozenColumn,
    frozenOffset = _ref.frozenOffset,
    isSelectable = _ref.isSelectable,
    isHovered = _ref.isHovered,
    isFirstInRow = _ref.isFirstInRow,
    isLastInRow = _ref.isLastInRow,
    isLastInColumn = _ref.isLastInColumn,
    isInSelectedColumn = _ref.isInSelectedColumn,
    isInSelectedRow = _ref.isInSelectedRow,
    isCellSelected = _ref.isCellSelected,
    onSelectRow = _ref.onSelectRow,
    onSelectCell = _ref.onSelectCell,
    allSelected = _ref.allSelected,
    isInFirstRow = _ref.isInFirstRow,
    isNextColumnSelected = _ref.isNextColumnSelected,
    handleContextMenu = _ref.handleContextMenu;
  var classes = useStyles();
  var CustomCell = column.customCell;
  return /*#__PURE__*/_react.default.createElement(_TableCell.default, {
    key: column.accessor,
    align: column.align,
    style: _objectSpread({
      width: column.width
    }, column.frozen && !isNaN(frozenOffset) && {
      left: frozenOffset
    }),
    className: (0, _classnames.default)(column.frozen && classes.frozenColumn, isLastFrozenColumn && [classes.columnLine, showColumnShadow && classes.columnShadow, isNextColumnSelected && classes.selectedColumnLine], isSelectable && [classes.selectable, isHovered && classes.hover, isFirstInRow && classes.firstInRow, isLastInRow && classes.lastInRow, isInSelectedColumn && [classes.inSelectedColumn, isLastInColumn && classes.inSelectedColumnLast, column.frozen && classes.frozenInSelectedColumn], isInSelectedRow && [classes.inSelectedRow, isFirstInRow && classes.firstInSelectedRow, isLastInRow && classes.lastInSelectedRow, column.frozen && [classes.frozenInSelectedRow, isFirstInRow && classes.frozenFirstInSelectedRow, isInFirstRow && classes.frozenFirstRow]], isCellSelected && [classes.cellSelected, column.frozen && [classes.frozenCellSelected, isInFirstRow && classes.frozenFirstRow]], allSelected && [classes.allSelected, isFirstInRow && classes.firstAllSelected, isLastInColumn && classes.lastInColumnAllSelected, isLastInRow && classes.lastInRowAllSelected, column.frozen && [isFirstInRow && classes.frozenFirstAllSelected, isLastInColumn && classes.frozenLastInColumnAllSelected]], column.frozen && [classes.frozenSelectableCell, isFirstInRow && classes.firstFrozenSelectableCell]]),
    onClick: isSelectable && (onSelectRow || onSelectCell),
    onContextMenu: isSelectable && function (e) {
      if (!(isInSelectedColumn || isInSelectedRow || isCellSelected || allSelected)) {
        (onSelectRow || onSelectCell)(e);
      }
      handleContextMenu(e);
    }
  }, CustomCell ? /*#__PURE__*/_react.default.createElement(CustomCell, {
    row: row,
    column: column
  }) : row[column.accessor]);
}
InternalTableCell.propTypes = {
  column: _propTypes.default.object.isRequired,
  row: _propTypes.default.object.isRequired
};
var _default = InternalTableCell;
exports.default = _default;