"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InternalTableHeader = InternalTableHeader;
exports.default = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _Arrow2Down = _interopRequireDefault(require("../../icons/Arrow2Down"));
var _Filter = _interopRequireDefault(require("../../icons/Filter"));
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _IconButton = require("../IconButton/IconButton");
var _TableCell = _interopRequireDefault(require("../TableCell"));
var _TableSortLabel = _interopRequireDefault(require("../TableSortLabel"));
var _Tooltip = require("../Tooltip/Tooltip");
var _frozenColumnStyles = _interopRequireDefault(require("./frozenColumnStyles"));
var _excluded = ["fixedWidth"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var styles = _objectSpread({
  root: {
    fontSize: 14,
    lineHeight: 1.71,
    fontWeight: 500
  },
  rootFilterIcon: {
    '& $filterIcon': {
      transition: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    '&:hover svg': {
      opacity: 1
    }
  },
  resizableHeader: {
    overflow: 'auto',
    resize: 'horizontal'
  },
  filterIcon: {
    height: '13px !important',
    width: '13px !important',
    cursor: 'pointer',
    margin: 1,
    transform: 'translateY(4px)',
    opacity: 0,
    '&:hover': {
      color: _colors.black
    }
  },
  isFiltered: {
    color: _colors.primary,
    opacity: 1,
    '&:hover': {
      color: _colors.primary
    }
  },
  filtersShowing: {
    paddingBottom: 0
  },
  iconButton: {
    height: 24,
    width: 24,
    zIndex: 1,
    '&:hover': {
      '&& $icon': {
        opacity: 1,
        color: _colors.primary
      }
    },
    '&:not($active)': {
      '@global svg': {
        transform: 'rotate(180deg)'
      }
    },
    '&$active': {
      color: _colors.black,
      opacity: 1,
      '&& $icon': {
        color: _colors.black,
        opacity: 1
      }
    }
  },
  selectable: {
    cursor: 'pointer',
    '&:before': {
      position: 'absolute',
      top: 0,
      right: -1,
      bottom: -1,
      left: 0,
      content: '""',
      border: "1px solid ".concat(_colors.neutral3)
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
      borderTop: "2px solid ".concat(_colors.primary),
      left: -1
    },
    '&&&:after': {
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
  first: {
    '&:before': {
      borderLeft: 'none'
    }
  },
  last: {
    '&:before': {
      borderRight: 'none'
    }
  },
  firstAllSelected: {
    backgroundColor: "".concat(_colors.primaryLight, " !important"),
    '&:before': {
      borderLeft: "2px solid ".concat(_colors.primary),
      borderTop: "2px solid ".concat(_colors.primary)
    }
  },
  allSelected: {
    backgroundColor: "".concat(_colors.primaryLight, " !important"),
    '&:before': {
      borderTop: "2px solid ".concat(_colors.primary)
    }
  },
  lastAllSelected: {
    backgroundColor: "".concat(_colors.primaryLight, " !important"),
    '&:before': {
      borderRight: "2px solid ".concat(_colors.primary),
      borderTop: "2px solid ".concat(_colors.primary)
    }
  },
  hideTopBorder: {
    '&:before': {
      borderTop: 'none'
    }
  },
  icon: {
    width: 16,
    height: 16,
    opacity: 0,
    boxSizing: 'border-box'
  },
  iconDirectionDesc: {
    transform: 'rotate(0deg)'
  },
  iconDirectionAsc: {
    transform: 'rotate(180deg)'
  },
  active: {}
}, _frozenColumnStyles.default);
var useStyles = (0, _makeStyles.default)(styles);
var capitalize = function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1);
};
function InternalTableHeader(_ref) {
  var _ref$column = _ref.column,
    _ref$column$fixedWidt = _ref$column.fixedWidth,
    fixedWidth = _ref$column$fixedWidt === void 0 ? true : _ref$column$fixedWidt,
    column = _objectWithoutProperties(_ref$column, _excluded),
    createSortHandler = _ref.createSortHandler,
    sortedColumn = _ref.sortedColumn,
    sortOrder = _ref.sortOrder,
    _ref$sortTooltipText = _ref.sortTooltipText,
    sortTooltipText = _ref$sortTooltipText === void 0 ? 'Sort' : _ref$sortTooltipText,
    isFiltered = _ref.isFiltered,
    toggleFilters = _ref.toggleFilters,
    showFilterIcon = _ref.showFilterIcon,
    _ref$filterTooltipTex = _ref.filterTooltipText,
    filterTooltipText = _ref$filterTooltipTex === void 0 ? 'Filter' : _ref$filterTooltipTex,
    showFilters = _ref.showFilters,
    showColumnShadow = _ref.showColumnShadow,
    isLastFrozenColumn = _ref.isLastFrozenColumn,
    frozenOffset = _ref.frozenOffset,
    isSelectable = _ref.isSelectable,
    onMouseOver = _ref.onMouseOver,
    onMouseOut = _ref.onMouseOut,
    onSelectColumn = _ref.onSelectColumn,
    isSelected = _ref.isSelected,
    isHovered = _ref.isHovered,
    isFirst = _ref.isFirst,
    isLast = _ref.isLast,
    allSelected = _ref.allSelected,
    hideTopBorder = _ref.hideTopBorder,
    stickyOffset = _ref.stickyOffset,
    isNextColumnSelected = _ref.isNextColumnSelected,
    handleContextMenu = _ref.handleContextMenu,
    ref = _ref.forwardedRef;
  var classes = useStyles();
  var header = column.sortFunction ? isSelectable ? /*#__PURE__*/_react.default.createElement(_TableSortLabel.default, {
    key: column.accessor,
    active: column.accessor === sortedColumn,
    direction: sortOrder,
    IconComponent: function IconComponent() {
      return null;
    }
  }, column.header, /*#__PURE__*/_react.default.createElement(_Tooltip.Tooltip, {
    title: sortTooltipText,
    placement: "top",
    enterDelay: 300,
    disableInteractive: true
  }, /*#__PURE__*/_react.default.createElement(_IconButton.IconButtonWithoutTheme, {
    className: (0, _classnames.default)(classes.iconButton, column.accessor === sortedColumn && classes.active),
    onClick: createSortHandler(column.accessor),
    onMouseOver: onMouseOut,
    onContextMenu: isSelectable && function (e) {
      e.stopPropagation();
    }
  }, /*#__PURE__*/_react.default.createElement(_Arrow2Down.default, {
    className: (0, _classnames.default)(classes.icon, classes["iconDirection".concat(capitalize(sortOrder))])
  })))) : /*#__PURE__*/_react.default.createElement(_Tooltip.Tooltip, {
    title: sortTooltipText,
    placement: "top",
    PopperProps: {
      modifiers: [{
        name: 'offset',
        options: {
          offset: function offset(_ref2) {
            var reference = _ref2.reference;
            return [reference.width / 2 - 12, -5];
          }
        },
        enabled: true
      }]
    },
    enterDelay: 300,
    disableInteractive: true
  }, /*#__PURE__*/_react.default.createElement(_TableSortLabel.default, {
    key: column.accessor,
    active: column.accessor === sortedColumn,
    onClick: createSortHandler(column.accessor),
    direction: sortOrder
  }, column.header)) : column.header;
  return /*#__PURE__*/_react.default.createElement(_TableCell.default, {
    variant: "head",
    key: column.accessor,
    className: (0, _classnames.default)(classes.root, !fixedWidth && classes.resizableHeader, showFilterIcon && classes.rootFilterIcon, showFilters && classes.filtersShowing, column.frozen && classes.frozen, isLastFrozenColumn && [classes.columnLine, showColumnShadow && classes.columnShadow, isNextColumnSelected && classes.selectedColumnLine], isSelectable && [classes.selectable, !isFirst && isSelected && classes.selected, isHovered && classes.hover, isFirst && classes.first, isLast && classes.last, isSelected && isFirst && classes.firstAllSelected, allSelected && classes.allSelected, isLast && allSelected && classes.lastAllSelected, hideTopBorder && classes.hideTopBorder]),
    align: column.align,
    style: _objectSpread(_objectSpread({
      width: column.width
    }, column.frozen && !isNaN(frozenOffset) && {
      left: frozenOffset
    }), stickyOffset && {
      top: stickyOffset
    }),
    onMouseEnter: onMouseOver && function () {
      return onMouseOver(column.accessor);
    },
    onMouseOut: onMouseOut,
    onClick: isSelectable && onSelectColumn,
    onContextMenu: isSelectable && handleContextMenu && function (e) {
      if (!(isSelected || allSelected)) {
        onSelectColumn(e);
      }
      handleContextMenu(e);
    },
    ref: ref
  }, header, showFilterIcon && /*#__PURE__*/_react.default.createElement(_Tooltip.Tooltip, {
    title: filterTooltipText,
    enterDelay: 300,
    placement: "top",
    disableInteractive: true
  }, /*#__PURE__*/_react.default.createElement(_Filter.default, {
    className: (0, _classnames.default)(classes.filterIcon, isFiltered && classes.isFiltered),
    onClick: toggleFilters,
    onContextMenu: isSelectable && function (e) {
      e.stopPropagation();
    }
  })));
}
InternalTableHeader.propTypes = {
  column: _propTypes.default.object.isRequired,
  sortOrder: _propTypes.default.string.isRequired,
  createSortHandler: _propTypes.default.func,
  filterTooltipText: _propTypes.default.node,
  sortedColumn: _propTypes.default.string,
  sortTooltipText: _propTypes.default.node
};
var _default = (0, _withRef.default)()(InternalTableHeader);
exports.default = _default;