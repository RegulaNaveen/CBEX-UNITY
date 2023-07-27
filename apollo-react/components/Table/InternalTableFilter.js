"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InternalTableFilter = InternalTableFilter;
exports.default = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _TableCell = _interopRequireDefault(require("../TableCell"));
var _frozenColumnStyles = _interopRequireDefault(require("./frozenColumnStyles"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var styles = _objectSpread(_objectSpread({}, _frozenColumnStyles.default), {}, {
  selectable: {
    cursor: 'pointer',
    '&:before': {
      position: 'absolute',
      top: 0,
      right: -1,
      bottom: -1,
      left: 0,
      content: '""',
      border: "1px solid ".concat(_colors.neutral3),
      borderTop: 'none',
      zIndex: -1
    },
    '&:first-child:before': {
      left: -1
    },
    '&:last-child:before': {
      right: 0
    }
  },
  selected: {
    backgroundColor: "".concat(_colors.primaryLight, " !important"),
    paddingLeft: 3,
    paddingRight: 3,
    '&:before': {
      borderRight: "2px solid ".concat(_colors.primary, " !important"),
      borderLeft: "2px solid ".concat(_colors.primary),
      left: -1
    },
    '&&:after': {
      borderRight: 'none !important'
    },
    '& + th:before': {
      borderLeft: "2px solid ".concat(_colors.primary),
      left: -1
    },
    '&:last-child:before': {
      right: -1
    }
  },
  hover: {
    backgroundColor: "".concat(_colors.primaryLight, " !important")
  },
  last: {
    '&:before': {
      borderRight: 'none'
    }
  },
  allSelected: {
    backgroundColor: "".concat(_colors.primaryLight, " !important")
  },
  lastAllSelected: {
    '&:before': {
      borderRight: "2px solid ".concat(_colors.primary)
    }
  },
  filterCell: {
    paddingTop: 0
  }
});
var useStyles = (0, _makeStyles.default)(styles);
function InternalTableFilter(_ref) {
  var column = _ref.column,
    filters = _ref.filters,
    updateFilterValue = _ref.updateFilterValue,
    showColumnShadow = _ref.showColumnShadow,
    isLastFrozenColumn = _ref.isLastFrozenColumn,
    frozenOffset = _ref.frozenOffset,
    stickyOffset = _ref.stickyOffset,
    isSelectable = _ref.isSelectable,
    isSelected = _ref.isSelected,
    isHovered = _ref.isHovered,
    isLast = _ref.isLast,
    allSelected = _ref.allSelected,
    isNextColumnSelected = _ref.isNextColumnSelected,
    onMouseOver = _ref.onMouseOver,
    onMouseOut = _ref.onMouseOut,
    onSelectColumn = _ref.onSelectColumn;
  var classes = useStyles();
  if (column.filterComponent) {
    var FilterComponent = column.filterComponent;
    return /*#__PURE__*/_react.default.createElement(_TableCell.default, {
      style: _objectSpread(_objectSpread({
        verticalAlign: 'top'
      }, column.frozen && !isNaN(frozenOffset) && {
        left: frozenOffset
      }), stickyOffset && {
        top: stickyOffset
      }),
      className: (0, _classnames.default)(classes.filterCell, column.frozen && classes.frozen, isLastFrozenColumn && [classes.columnLine, showColumnShadow && classes.columnShadow, isNextColumnSelected && classes.selectedColumnLine], isSelectable && [classes.selectable, isSelected && classes.selected, isHovered && classes.hover, isLast && classes.last, allSelected && classes.allSelected, isLast && allSelected && classes.lastAllSelected])
    }, /*#__PURE__*/_react.default.createElement(FilterComponent, {
      accessor: column.accessor,
      filters: filters,
      updateFilterValue: updateFilterValue
    }));
  } else {
    return /*#__PURE__*/_react.default.createElement(_TableCell.default, _extends({}, stickyOffset && {
      style: {
        top: stickyOffset
      }
    }, {
      className: (0, _classnames.default)(classes.filterCell, column.frozen && classes.frozen, isLastFrozenColumn && [classes.columnLine, showColumnShadow && classes.columnShadow, isNextColumnSelected && classes.selectedColumnLine], isSelectable && [classes.selectable, isSelected && classes.selected, isHovered && classes.hover, isLast && classes.last, allSelected && classes.allSelected, isLast && allSelected && classes.lastAllSelected]),
      onMouseEnter: onMouseOver && function () {
        return onMouseOver(column.accessor);
      },
      onMouseOut: onMouseOut,
      onClick: onSelectColumn
    }));
  }
}
InternalTableFilter.propTypes = {
  column: _propTypes.default.object.isRequired,
  filters: _propTypes.default.object.isRequired,
  updateFilterValue: _propTypes.default.func.isRequired
};
var _default = InternalTableFilter;
exports.default = _default;