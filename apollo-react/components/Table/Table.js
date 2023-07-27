"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeFilters = exports.defaultSelectionMenuButtonLabel = exports.default = exports.Table = void 0;
exports.runFilters = runFilters;
exports.swapOrder = void 0;
var _withStyles = _interopRequireDefault(require("@mui/styles/withStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _reactMeasure = _interopRequireDefault(require("react-measure"));
var _colors = require("../../colors");
var _Filter = _interopRequireDefault(require("../../icons/Filter"));
var _Button = _interopRequireDefault(require("../Button"));
var _CustomTable = _interopRequireDefault(require("../CustomTable"));
var _Loader = _interopRequireDefault(require("../Loader"));
var _Menu = _interopRequireDefault(require("../Menu"));
var _MenuButton = _interopRequireDefault(require("../MenuButton"));
var _MenuItem = _interopRequireDefault(require("../MenuItem"));
var _Paper = _interopRequireDefault(require("../Paper"));
var _TableFooter = _interopRequireDefault(require("../TableFooter"));
var _InternalTablePagination = _interopRequireDefault(require("../TablePagination/InternalTablePagination"));
var _TableRow = _interopRequireDefault(require("../TableRow"));
var _Toolbar = _interopRequireDefault(require("../Toolbar"));
var _Tooltip = _interopRequireDefault(require("../Tooltip"));
var _Typography = _interopRequireDefault(require("../Typography"));
var _EmptyRow = _interopRequireDefault(require("./EmptyRow"));
var _InternalTableBody = _interopRequireDefault(require("./InternalTableBody"));
var _InternalTableHead = _interopRequireDefault(require("./InternalTableHead"));
var _utils = require("./utils");
var _excluded = ["onClick", "text"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function runFilters(columns, rows, filters) {
  var filteredRows = rows;
  columns.forEach(function (column) {
    if (column.filterFunction) {
      filteredRows = filteredRows.filter(function (row) {
        return column.filterFunction(row, filters);
      });
    }
  });
  return filteredRows;
}
var swapOrder = function swapOrder(order) {
  return order === 'asc' ? 'desc' : 'asc';
};
exports.swapOrder = swapOrder;
var initializeFilters = function initializeFilters(columns) {
  return columns.reduce(function (acc, column) {
    if (column.filterFunction) {
      acc[column.accessor] = '';
    }
    return acc;
  }, {});
};
exports.initializeFilters = initializeFilters;
var defaultSelectionMenuButtonLabel = function defaultSelectionMenuButtonLabel(_ref) {
  var selectedColumns = _ref.selectedColumns,
    selectedRows = _ref.selectedRows,
    selectedCells = _ref.selectedCells,
    allSelected = _ref.allSelected,
    columns = _ref.columns,
    rows = _ref.rows;
  var totalSelected = selectedColumns.length * rows.length + selectedRows.length * columns.length + selectedCells.length;
  var total = allSelected ? rows.length * columns.length + totalSelected : totalSelected;
  return "Actions".concat(total ? " (".concat(total, " selected)") : '');
};
exports.defaultSelectionMenuButtonLabel = defaultSelectionMenuButtonLabel;
var styles = {
  root: {
    position: 'relative',
    boxSizing: 'content-box'
  },
  toolbar: {
    justifyContent: 'space-between',
    padding: 16,
    minHeight: 0,
    backgroundColor: _colors.white,
    height: 80,
    boxSizing: 'border-box'
  },
  noSubtitleToolbar: {
    padding: 16,
    lineHeight: 1.6
  },
  title: {
    fontSize: 16,
    color: _colors.black,
    lineHeight: 1.5,
    display: 'flex',
    alignItems: 'center'
  },
  subtitle: {
    fontSize: 14,
    color: _colors.neutral7,
    lineHeight: 1.71
  },
  hideShadows: {
    boxShadow: 'none'
  },
  paper: {
    borderRadius: 4
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  scrollRoot: {
    overflowY: 'auto',
    maxHeight: function maxHeight(_ref2) {
      var _maxHeight = _ref2.maxHeight;
      return _maxHeight;
    }
  },
  stickyHeader: {
    position: 'sticky',
    top: 0,
    zIndex: 3
  },
  stickyFooter: {
    '& tr td': {
      position: 'sticky',
      bottom: 0,
      backgroundColor: '#f6f7fb',
      zIndex: 2,
      '&:after': {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        height: 1,
        content: '""',
        borderTop: "1px solid ".concat(_colors.neutral3)
      }
    }
  },
  cancelButton: {
    marginRight: 8,
    marginLeft: 8
  },
  clearFiltersButton: {
    marginRight: 8
  },
  smallSelectItem: {
    height: 32,
    fontSize: 14,
    padding: '0 8px'
  },
  emptySelectedMenuItems: {
    padding: '0 8px',
    color: _colors.neutral7,
    lineHeight: '24px'
  },
  disabledButtonWrapper: {
    display: 'inline-block'
  }
};
var Table = /*#__PURE__*/function (_React$Component) {
  _inherits(Table, _React$Component);
  var _super = _createSuper(Table);
  function Table() {
    var _this$props$page, _ref3, _this$props$rowsPerPa, _this$props$sortedCol, _ref4, _this$props$sortOrder, _this$props$filters;
    var _this;
    _classCallCheck(this, Table);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      page: (_this$props$page = _this.props.page) !== null && _this$props$page !== void 0 ? _this$props$page : 0,
      rowsPerPage: (_ref3 = (_this$props$rowsPerPa = _this.props.rowsPerPage) !== null && _this$props$rowsPerPa !== void 0 ? _this$props$rowsPerPa : _this.props.defaultRowsPerPage) !== null && _ref3 !== void 0 ? _ref3 : _this.props.rowsPerPageOptions[0],
      sortedColumn: (_this$props$sortedCol = _this.props.sortedColumn) !== null && _this$props$sortedCol !== void 0 ? _this$props$sortedCol : _this.props.initialSortedColumn,
      sortFunction: _this.props.initialSortedColumn && _this.props.columns.find(function (column) {
        return column.accessor === _this.props.initialSortedColumn;
      }).sortFunction,
      sortOrder: (_ref4 = (_this$props$sortOrder = _this.props.sortOrder) !== null && _this$props$sortOrder !== void 0 ? _this$props$sortOrder : _this.props.initialSortOrder) !== null && _ref4 !== void 0 ? _ref4 : 'asc',
      showFilters: false,
      filters: (_this$props$filters = _this.props.filters) !== null && _this$props$filters !== void 0 ? _this$props$filters : initializeFilters(_this.props.columns),
      columns: _this.props.columns,
      showColumnShadow: false,
      columnWidths: [],
      tableWidth: 0,
      tableHeight: 0,
      columnHeaderHeight: 32,
      selectedColumns: [],
      selectedRows: [],
      selectedCells: [],
      allSelected: false
    });
    _defineProperty(_assertThisInitialized(_this), "timer", null);
    _defineProperty(_assertThisInitialized(_this), "horizontalScrollRef", /*#__PURE__*/_react.default.createRef());
    _defineProperty(_assertThisInitialized(_this), "columnHeaderRefs", _this.props.columns.map(function () {
      return /*#__PURE__*/_react.default.createRef();
    }));
    _defineProperty(_assertThisInitialized(_this), "columnHeaderRootRef", /*#__PURE__*/_react.default.createRef());
    _defineProperty(_assertThisInitialized(_this), "sortedRows", _this.props.rows || []);
    _defineProperty(_assertThisInitialized(_this), "sortedFilteredRows", _this.props.rows || []);
    _defineProperty(_assertThisInitialized(_this), "updateSortedRows", function (_ref5) {
      var sortedColumn = _ref5.sortedColumn,
        sortFunction = _ref5.sortFunction,
        sortOrder = _ref5.sortOrder,
        filters = _ref5.filters;
      var _this$props = _this.props,
        rows = _this$props.rows,
        multipleColumnSort = _this$props.multipleColumnSort;
      var columns = _this.state.columns;
      var rowsToUse = multipleColumnSort ? _this.sortedRows : _toConsumableArray(rows);
      var isFilterable = filters && Object.keys(filters).length > 0;

      // Sort the rows
      _this.sortedRows = sortedColumn ? rowsToUse.sort(sortFunction(sortedColumn, sortOrder)) : rowsToUse;

      // Filter the rows
      _this.sortedFilteredRows = isFilterable ? runFilters(columns, _this.sortedRows, filters) : _this.sortedRows;
    });
    _defineProperty(_assertThisInitialized(_this), "emitOnChange", function (_ref6) {
      var _columns$find;
      var useTimer = _ref6.useTimer,
        clearTimer = _ref6.clearTimer,
        skipOnNonNullTimer = _ref6.skipOnNonNullTimer,
        _ref6$rowsPerPage = _ref6.rowsPerPage,
        rowsPerPage = _ref6$rowsPerPage === void 0 ? _this.state.rowsPerPage : _ref6$rowsPerPage,
        _ref6$sortedColumn = _ref6.sortedColumn,
        sortedColumn = _ref6$sortedColumn === void 0 ? _this.state.sortedColumn : _ref6$sortedColumn,
        _ref6$sortOrder = _ref6.sortOrder,
        sortOrder = _ref6$sortOrder === void 0 ? _this.state.sortOrder : _ref6$sortOrder,
        _ref6$filters = _ref6.filters,
        filters = _ref6$filters === void 0 ? _this.state.filters : _ref6$filters,
        _ref6$page = _ref6.page,
        page = _ref6$page === void 0 ? _this.state.page : _ref6$page;
      var columns = _this.state.columns;
      var _this$props2 = _this.props,
        onChange = _this$props2.onChange,
        filterDelay = _this$props2.filterDelay;
      var sortFunction = (_columns$find = columns.find(function (col) {
        return col.accessor === sortedColumn;
      })) === null || _columns$find === void 0 ? void 0 : _columns$find.sortFunction;
      _this.updateSortedRows({
        filters: filters,
        sortOrder: sortOrder,
        sortedColumn: sortedColumn,
        sortFunction: sortFunction
      });
      if (skipOnNonNullTimer && _this.timer !== null) {
        return;
      }
      if (clearTimer) {
        clearTimeout(_this.timer);
      }
      var rows = _this.sortedFilteredRows;
      if (useTimer) {
        _this.timer = setTimeout(function () {
          _this.timer = null;
          onChange && onChange({
            rowsPerPage: rowsPerPage,
            sortedColumn: sortedColumn,
            sortOrder: sortOrder,
            filters: filters,
            page: page,
            rows: rows
          });
        }, filterDelay);
      } else {
        onChange && onChange({
          rowsPerPage: rowsPerPage,
          sortedColumn: sortedColumn,
          sortOrder: sortOrder,
          filters: filters,
          page: page,
          rows: rows
        });
      }
      _this.setState({
        rowsPerPage: rowsPerPage,
        sortedColumn: sortedColumn,
        sortOrder: sortOrder,
        filters: filters,
        page: page,
        sortFunction: sortFunction
      });
    });
    _defineProperty(_assertThisInitialized(_this), "checkPageNotOutOfBounds", function () {
      var rows = _this.props.rows;
      var _this$state = _this.state,
        page = _this$state.page,
        rowsPerPage = _this$state.rowsPerPage;
      var lastPage = (Math.ceil(rows.length / rowsPerPage) || 1) - 1;
      if (page > lastPage) {
        _this.handleChangePage(lastPage);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "checkColumnWidths", function () {
      var _this$state2 = _this.state,
        columnWidths = _this$state2.columnWidths,
        columns = _this$state2.columns;
      if (columns.some(function (_ref7) {
        var frozen = _ref7.frozen;
        return frozen;
      })) {
        var newColumnWidths = _this.columnHeaderRefs.reduce(function (acc, ref, i) {
          var _columns$i, _columns$i2, _ref$current;
          acc.push(!ref.current || !((_columns$i = columns[i]) !== null && _columns$i !== void 0 && _columns$i.frozen) || (_columns$i2 = columns[i]) !== null && _columns$i2 !== void 0 && _columns$i2.hidden ? acc[i] : acc[i] + ((_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.getBoundingClientRect().width));
          return acc;
        }, [0]);
        if (newColumnWidths.some(function (width, i) {
          return width !== columnWidths[i];
        })) {
          _this.setState({
            columnWidths: newColumnWidths
          });
        }
      }
    });
    _defineProperty(_assertThisInitialized(_this), "checkColumnHeaderHeight", function () {
      var _this$props3 = _this.props,
        hasScroll = _this$props3.hasScroll,
        isSticky = _this$props3.isSticky;
      if (hasScroll || isSticky) {
        var _this$columnHeaderRoo, _this$columnHeaderRoo2;
        var columnHeaderHeight = _this.state.columnHeaderHeight;
        var newColumnHeaderHeight = (_this$columnHeaderRoo = _this.columnHeaderRootRef) === null || _this$columnHeaderRoo === void 0 ? void 0 : (_this$columnHeaderRoo2 = _this$columnHeaderRoo.current) === null || _this$columnHeaderRoo2 === void 0 ? void 0 : _this$columnHeaderRoo2.getBoundingClientRect().height;
        if (newColumnHeaderHeight !== columnHeaderHeight) {
          var _this$columnHeaderRoo3, _this$columnHeaderRoo4;
          _this.setState({
            columnHeaderHeight: (_this$columnHeaderRoo3 = _this.columnHeaderRootRef) === null || _this$columnHeaderRoo3 === void 0 ? void 0 : (_this$columnHeaderRoo4 = _this$columnHeaderRoo3.current) === null || _this$columnHeaderRoo4 === void 0 ? void 0 : _this$columnHeaderRoo4.getBoundingClientRect().height
          });
        }
      }
    });
    _defineProperty(_assertThisInitialized(_this), "createSortHandler", function (property) {
      return function (e) {
        if (e) {
          e.stopPropagation();
        }
        var _this$state3 = _this.state,
          sortOrder = _this$state3.sortOrder,
          sortedColumn = _this$state3.sortedColumn;
        var newSortOrder = sortedColumn === property ? swapOrder(sortOrder) : 'asc';
        _this.emitOnChange({
          clearTimer: true,
          sortedColumn: property,
          sortOrder: newSortOrder,
          page: 0
        });
      };
    });
    _defineProperty(_assertThisInitialized(_this), "updateFilterValue", function (event) {
      var filters = _this.state.filters;
      var value = event.target.value === 'none' ? '' : event.target.value;
      var accessor = event.target.name;
      var newFilters = _objectSpread(_objectSpread({}, filters), {}, _defineProperty({}, accessor, value));
      var shouldClearTimer = JSON.stringify(filters) !== JSON.stringify(newFilters);
      _this.emitOnChange({
        clearTimer: shouldClearTimer,
        useTimer: true,
        filters: newFilters,
        page: 0
      });
    });
    _defineProperty(_assertThisInitialized(_this), "clearFilters", function () {
      var columns = _this.props.columns;
      _this.emitOnChange({
        filters: initializeFilters(columns),
        page: 0
      });
    });
    _defineProperty(_assertThisInitialized(_this), "toggleFilters", function () {
      var onToggleFilters = _this.props.onToggleFilters;
      _this.setState(function (_ref8) {
        var showFilters = _ref8.showFilters;
        onToggleFilters && onToggleFilters(!showFilters);
        return {
          showFilters: !showFilters
        };
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handleChangeRowsPerPage", function (event) {
      var rowsPerPage = event.target.value;
      _this.emitOnChange({
        skipOnNonNullTimer: true,
        rowsPerPage: rowsPerPage,
        page: 0
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handleChangePage", function (page) {
      _this.emitOnChange({
        skipOnNonNullTimer: true,
        page: page
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handleChangeColumns", function (newColumns) {
      _this.setState({
        columns: newColumns
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onScrollTable", function () {
      if (_this.horizontalScrollRef.current.scrollLeft > 0) {
        _this.setState({
          showColumnShadow: true
        });
      } else {
        _this.setState({
          showColumnShadow: false
        });
      }
    });
    _defineProperty(_assertThisInitialized(_this), "onResizeTable", function () {
      var _this$horizontalScrol, _this$horizontalScrol2, _this$horizontalScrol3, _this$horizontalScrol4;
      var isSelectable = _this.props.isSelectable;
      _this.setState({
        tableWidth: ((_this$horizontalScrol = _this.horizontalScrollRef) === null || _this$horizontalScrol === void 0 ? void 0 : (_this$horizontalScrol2 = _this$horizontalScrol.current) === null || _this$horizontalScrol2 === void 0 ? void 0 : _this$horizontalScrol2.getBoundingClientRect().width) - (isSelectable ? 1 : 0) || 0,
        tableHeight: ((_this$horizontalScrol3 = _this.horizontalScrollRef) === null || _this$horizontalScrol3 === void 0 ? void 0 : (_this$horizontalScrol4 = _this$horizontalScrol3.current) === null || _this$horizontalScrol4 === void 0 ? void 0 : _this$horizontalScrol4.getBoundingClientRect().height) || 0
      });
    });
    _defineProperty(_assertThisInitialized(_this), "getFrozenOffset", function (index) {
      return _this.state.columnWidths[index];
    });
    _defineProperty(_assertThisInitialized(_this), "mouse", null);
    _defineProperty(_assertThisInitialized(_this), "handleMouseOver", function (hoveredColumnAccessor) {
      clearTimeout(_this.mouse);
      _this.mouse = setTimeout(function () {
        _this.setState({
          hoveredColumnAccessor: hoveredColumnAccessor
        });
      }, 25);
    });
    _defineProperty(_assertThisInitialized(_this), "handleMouseOut", function () {
      clearTimeout(_this.mouse);
      _this.mouse = setTimeout(function () {
        _this.setState(function (_ref9) {
          var hoveredColumnAccessor = _ref9.hoveredColumnAccessor;
          return hoveredColumnAccessor ? {
            hoveredColumnAccessor: null
          } : null;
        });
      }, 25);
    });
    _defineProperty(_assertThisInitialized(_this), "handleSelectColumn", function (columnAccessor, e) {
      var onSelect = _this.props.onSelect;
      var _this$state4 = _this.state,
        selectedColumns = _this$state4.selectedColumns,
        selectedRows = _this$state4.selectedRows,
        selectedCells = _this$state4.selectedCells,
        allSelected = _this$state4.allSelected,
        columns = _this$state4.columns;
      var newSelectedColumns;
      if (selectedColumns.length > 0 && e.shiftKey) {
        var lastSelectedColumn = selectedColumns[selectedColumns.length - 1];
        var columnsToAdd = [];
        var shouldAddColumns = false;
        for (var i = 0; i < columns.length; i++) {
          var column = columns[i];
          if (!column.hidden) {
            if (column.accessor === lastSelectedColumn || column.accessor === columnAccessor) {
              columnsToAdd.push(column.accessor);
              if (shouldAddColumns || lastSelectedColumn === columnAccessor) {
                break;
              }
              shouldAddColumns = true;
            } else if (shouldAddColumns) {
              columnsToAdd.push(column.accessor);
            }
          }
        }
        newSelectedColumns = _toConsumableArray(selectedColumns);
        columnsToAdd.forEach(function (columnAccessorToAdd) {
          if (!selectedColumns.some(function (selectedColumnAccessor) {
            return selectedColumnAccessor === columnAccessorToAdd;
          })) {
            newSelectedColumns.push(columnAccessorToAdd);
          }
        });
      } else if (selectedColumns.includes(columnAccessor)) {
        newSelectedColumns = selectedColumns.filter(function (selectedColumnAccessor) {
          return selectedColumnAccessor !== columnAccessor;
        });
      } else {
        newSelectedColumns = [].concat(_toConsumableArray(selectedColumns), [columnAccessor]);
      }
      _this.setState({
        selectedColumns: newSelectedColumns
      });
      onSelect && onSelect({
        selectedColumns: newSelectedColumns,
        selectedRows: selectedRows,
        selectedCells: selectedCells,
        allSelected: allSelected
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handleSelectRow", function (rowId, e) {
      var _this$props4 = _this.props,
        onSelect = _this$props4.onSelect,
        rowIdName = _this$props4.rowId;
      var _this$state5 = _this.state,
        selectedRows = _this$state5.selectedRows,
        selectedColumns = _this$state5.selectedColumns,
        selectedCells = _this$state5.selectedCells,
        allSelected = _this$state5.allSelected;
      var newSelectedRows;
      if (selectedRows.length > 0 && e.shiftKey) {
        var lastSelectedRow = selectedRows[selectedRows.length - 1];
        var rowsToAdd = [];
        var shouldAddRows = false;
        for (var i = 0; i < _this.sortedFilteredRows.length; i++) {
          var row = _this.sortedFilteredRows[i];
          if (row[rowIdName] === lastSelectedRow || row[rowIdName] === rowId) {
            rowsToAdd.push(row[rowIdName]);
            if (shouldAddRows || lastSelectedRow === rowId) {
              break;
            }
            shouldAddRows = true;
          } else if (shouldAddRows) {
            rowsToAdd.push(row[rowIdName]);
          }
        }
        newSelectedRows = _toConsumableArray(selectedRows);
        rowsToAdd.forEach(function (rowIdToAdd) {
          if (!selectedRows.some(function (curRowId) {
            return curRowId === rowIdToAdd;
          })) {
            newSelectedRows.push(rowIdToAdd);
          }
        });
      } else if (selectedRows.includes(rowId)) {
        newSelectedRows = selectedRows.filter(function (selectedRowId) {
          return selectedRowId !== rowId;
        });
      } else {
        newSelectedRows = [].concat(_toConsumableArray(selectedRows), [rowId]);
      }
      _this.setState({
        selectedRows: newSelectedRows
      });
      onSelect && onSelect({
        selectedRows: newSelectedRows,
        selectedColumns: selectedColumns,
        selectedCells: selectedCells,
        allSelected: allSelected
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handleSelectCell", function (rowId, columnAccessor, e) {
      var _this$props5 = _this.props,
        onSelect = _this$props5.onSelect,
        rowIdName = _this$props5.rowId;
      var _this$state6 = _this.state,
        selectedCells = _this$state6.selectedCells,
        selectedColumns = _this$state6.selectedColumns,
        selectedRows = _this$state6.selectedRows,
        allSelected = _this$state6.allSelected,
        columns = _this$state6.columns;
      var newSelectedCells;
      if (selectedCells.length > 0 && e.shiftKey) {
        var lastSelectedCell = selectedCells[selectedCells.length - 1];
        var columnsToAdd = [];
        var shouldAddColumns = false;
        for (var i = 0; i < columns.length; i++) {
          var column = columns[i];
          if (!column.hidden) {
            if (column.accessor === lastSelectedCell.columnAccessor || column.accessor === columnAccessor) {
              columnsToAdd.push(column.accessor);
              if (shouldAddColumns || lastSelectedCell.columnAccessor === columnAccessor) {
                break;
              }
              shouldAddColumns = true;
            } else if (shouldAddColumns) {
              columnsToAdd.push(column.accessor);
            }
          }
        }
        var rowsToAdd = [];
        var shouldAddRows = false;
        for (var _i = 0; _i < _this.sortedFilteredRows.length; _i++) {
          var row = _this.sortedFilteredRows[_i];
          if (row[rowIdName] === lastSelectedCell.rowId || row[rowIdName] === rowId) {
            rowsToAdd.push(row[rowIdName]);
            if (shouldAddRows || lastSelectedCell.rowId === rowId) {
              break;
            }
            shouldAddRows = true;
          } else if (shouldAddRows) {
            rowsToAdd.push(row[rowIdName]);
          }
        }
        newSelectedCells = _toConsumableArray(selectedCells);
        columnsToAdd.forEach(function (columnAccessor) {
          rowsToAdd.forEach(function (rowId) {
            if (!selectedCells.some(function (cell) {
              return cell.rowId === rowId && cell.columnAccessor === columnAccessor;
            })) {
              newSelectedCells.push({
                columnAccessor: columnAccessor,
                rowId: rowId
              });
            }
          });
        });
      } else if (selectedCells.some(function (_ref10) {
        var curRowId = _ref10.rowId,
          curColumnAccessor = _ref10.columnAccessor;
        return curRowId === rowId && curColumnAccessor === columnAccessor;
      })) {
        newSelectedCells = selectedCells.filter(function (_ref11) {
          var curRowId = _ref11.rowId,
            curColumnAccessor = _ref11.columnAccessor;
          return !(curRowId === rowId && curColumnAccessor === columnAccessor);
        });
      } else {
        newSelectedCells = [].concat(_toConsumableArray(selectedCells), [{
          rowId: rowId,
          columnAccessor: columnAccessor
        }]);
      }
      _this.setState({
        selectedCells: newSelectedCells
      });
      onSelect && onSelect({
        selectedCells: newSelectedCells,
        selectedRows: selectedRows,
        selectedColumns: selectedColumns,
        allSelected: allSelected
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handleCancelSelection", function () {
      var onSelect = _this.props.onSelect;
      var resetState = {
        selectedColumns: [],
        selectedRows: [],
        selectedCells: [],
        allSelected: false
      };
      _this.setState(resetState);
      onSelect && onSelect(resetState);
    });
    _defineProperty(_assertThisInitialized(_this), "handleSelectAll", function () {
      var onSelect = _this.props.onSelect;
      _this.setState(function (_ref12) {
        var selectedCells = _ref12.selectedCells,
          selectedColumns = _ref12.selectedColumns,
          selectedRows = _ref12.selectedRows,
          allSelected = _ref12.allSelected;
        onSelect && onSelect({
          selectedCells: selectedCells,
          selectedRows: selectedRows,
          selectedColumns: selectedColumns,
          allSelected: !allSelected
        });
        return {
          allSelected: !allSelected
        };
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handleContextMenu", function (e) {
      e.preventDefault();
      _this.setState({
        contextMenu: {
          mouseX: e.clientX + 8,
          mouseY: e.clientY + 12
        }
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handleCloseContextMenu", function () {
      _this.setState({
        contextMenu: null
      });
    });
    return _this;
  }
  _createClass(Table, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var isSelectable = this.props.isSelectable;
      if (isSelectable) {
        this.columnHeaderRefs.push( /*#__PURE__*/_react.default.createRef());
      }
      this.checkColumnWidths();
      this.checkColumnHeaderHeight();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props6 = this.props,
        columns = _this$props6.columns,
        rows = _this$props6.rows,
        page = _this$props6.page,
        multipleColumnSort = _this$props6.multipleColumnSort;
      if (prevProps.columns !== columns) {
        this.setState({
          columns: columns
        });
      }
      if (multipleColumnSort && prevProps.rows !== rows) {
        this.sortedRows = rows;
        this.forceUpdate();
      }
      if (page === undefined) {
        this.checkPageNotOutOfBounds();
      }
      this.checkColumnWidths();
      this.checkColumnHeaderHeight();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props7 = this.props,
        _this$props7$rows = _this$props7.rows,
        rows = _this$props7$rows === void 0 ? [] : _this$props7$rows,
        rowsPerPageOptions = _this$props7.rowsPerPageOptions,
        title = _this$props7.title,
        subtitle = _this$props7.subtitle,
        CustomHeader = _this$props7.CustomHeader,
        headerProps = _this$props7.headerProps,
        hidePagination = _this$props7.hidePagination,
        classes = _this$props7.classes,
        tablePaginationProps = _this$props7.tablePaginationProps,
        emptyProps = _this$props7.emptyProps,
        onChange = _this$props7.onChange,
        size = _this$props7.size,
        isLoading = _this$props7.isLoading,
        _this$props7$filterBu = _this$props7.filterButtonLabel,
        filterButtonLabel = _this$props7$filterBu === void 0 ? 'Filter' : _this$props7$filterBu,
        stripedRows = _this$props7.stripedRows,
        showFilterIcon = _this$props7.showFilterIcon,
        _this$props7$filterTo = _this$props7.filterTooltipText,
        filterTooltipText = _this$props7$filterTo === void 0 ? 'Filter' : _this$props7$filterTo,
        rowProps = _this$props7.rowProps,
        ExpandableComponent = _this$props7.ExpandableComponent,
        columnSettings = _this$props7.columnSettings,
        defaultColumns = _this$props7.defaultColumns,
        showFiltersProp = _this$props7.showFilters,
        _this$props7$hasScrol = _this$props7.hasScroll,
        hasScroll = _this$props7$hasScrol === void 0 ? false : _this$props7$hasScrol,
        _this$props7$isSticky = _this$props7.isSticky,
        isSticky = _this$props7$isSticky === void 0 ? false : _this$props7$isSticky,
        maxHeight = _this$props7.maxHeight,
        isSelectable = _this$props7.isSelectable,
        rowId = _this$props7.rowId,
        _this$props7$cancelSe = _this$props7.cancelSelectionButtonLabel,
        cancelSelectionButtonLabel = _this$props7$cancelSe === void 0 ? 'Cancel selection' : _this$props7$cancelSe,
        selectionMenuItems = _this$props7.selectionMenuItems,
        _this$props7$selectio = _this$props7.selectionMenuButtonLabel,
        selectionMenuButtonLabel = _this$props7$selectio === void 0 ? defaultSelectionMenuButtonLabel : _this$props7$selectio,
        _this$props7$stickyHe = _this$props7.stickyHeaderTop,
        stickyHeaderTop = _this$props7$stickyHe === void 0 ? 0 : _this$props7$stickyHe,
        _this$props7$sortTool = _this$props7.sortTooltipText,
        sortTooltipText = _this$props7$sortTool === void 0 ? 'Sort' : _this$props7$sortTool,
        showClearFiltersButton = _this$props7.showClearFiltersButton,
        _this$props7$clearFil = _this$props7.clearFiltersButtonLabel,
        clearFiltersButtonLabel = _this$props7$clearFil === void 0 ? 'Clear Filters' : _this$props7$clearFil,
        selectionMenuActionsEmptyText = _this$props7.selectionMenuActionsEmptyText;
      var _this$state7 = this.state,
        filters = _this$state7.filters,
        showFiltersState = _this$state7.showFilters,
        rowsPerPage = _this$state7.rowsPerPage,
        page = _this$state7.page,
        sortedColumn = _this$state7.sortedColumn,
        sortOrder = _this$state7.sortOrder,
        sortFunction = _this$state7.sortFunction,
        columns = _this$state7.columns,
        showColumnShadow = _this$state7.showColumnShadow,
        columnWidths = _this$state7.columnWidths,
        tableWidth = _this$state7.tableWidth,
        tableHeight = _this$state7.tableHeight,
        columnHeaderHeight = _this$state7.columnHeaderHeight,
        hoveredColumnAccessor = _this$state7.hoveredColumnAccessor,
        selectedColumns = _this$state7.selectedColumns,
        selectedRows = _this$state7.selectedRows,
        selectedCells = _this$state7.selectedCells,
        allSelected = _this$state7.allSelected,
        contextMenu = _this$state7.contextMenu;
      var showFilters = showFiltersProp !== null && showFiltersProp !== void 0 ? showFiltersProp : showFiltersState;
      var isLazy = onChange !== undefined && size !== undefined;
      var hasHeader = title || subtitle || CustomHeader;
      var isFilterable = Object.keys(filters).length > 0;
      var displayRows = rows;
      if (!isLazy) {
        this.updateSortedRows({
          sortedColumn: sortedColumn,
          sortFunction: sortFunction,
          sortOrder: sortOrder,
          filters: filters
        });

        // Slice out the rows for the current page
        var showAllRows = typeof rowsPerPage === 'string';
        var firstRow = page * (showAllRows ? 0 : rowsPerPage);
        var lastRow = firstRow + (showAllRows ? this.sortedRows.length : rowsPerPage);
        displayRows = hidePagination ? this.sortedFilteredRows : this.sortedFilteredRows.slice(firstRow, lastRow);
      }
      var someSelected = allSelected || selectedColumns.length || selectedRows.length || selectedCells.length;
      var lastVisibleColumnAcc = isSelectable ? (0, _utils.getLastVisibleColumnAcc)(columns) : undefined;
      var hasActiveFilters = Object.values(filters).some(function (filter) {
        return filter;
      });
      var table = /*#__PURE__*/_react.default.createElement("div", {
        className: classes.root
      }, hasHeader && /*#__PURE__*/_react.default.createElement(_Toolbar.default, {
        className: (0, _classnames.default)(classes.toolbar, !subtitle && classes.noSubtitleToolbar, isSticky && classes.stickyHeader),
        style: isSticky ? {
          top: stickyHeaderTop
        } : undefined
      }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Typography.default, {
        variant: "title1",
        className: classes.title
      }, title), /*#__PURE__*/_react.default.createElement(_Typography.default, {
        display: "block",
        variant: "caption",
        className: classes.subtitle
      }, subtitle)), CustomHeader && /*#__PURE__*/_react.default.createElement(CustomHeader, _extends({
        toggleFilters: this.toggleFilters,
        cancelSelection: this.handleCancelSelection,
        clearFilters: this.clearFilters,
        hasActiveFilters: hasActiveFilters
      }, headerProps)) || /*#__PURE__*/_react.default.createElement("div", null, showClearFiltersButton && /*#__PURE__*/_react.default.createElement(_Button.default, {
        size: "small",
        onClick: this.clearFilters,
        className: classes.clearFiltersButton,
        disabled: !hasActiveFilters
      }, clearFiltersButtonLabel), isFilterable && /*#__PURE__*/_react.default.createElement(_Button.default, {
        size: "small",
        icon: _Filter.default,
        variant: "secondary",
        onClick: this.toggleFilters
      }, filterButtonLabel), isSelectable && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Button.default, {
        size: "small",
        className: classes.cancelButton,
        onClick: this.handleCancelSelection,
        disabled: !someSelected
      }, cancelSelectionButtonLabel), /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
        subtitle: someSelected && selectionMenuItems.length === 0 && selectionMenuActionsEmptyText,
        placement: "top"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: classes.disabledButtonWrapper
      }, /*#__PURE__*/_react.default.createElement(_MenuButton.default, {
        size: "small",
        menuItems: selectionMenuItems,
        buttonText: typeof selectionMenuButtonLabel === 'function' ? selectionMenuButtonLabel({
          selectedColumns: selectedColumns,
          selectedRows: selectedRows,
          selectedCells: selectedCells,
          allSelected: allSelected,
          columns: columns,
          rows: this.sortedFilteredRows
        }) : selectionMenuButtonLabel,
        disabled: !someSelected || selectionMenuItems.length === 0
      })))))), /*#__PURE__*/_react.default.createElement(_reactMeasure.default, {
        onResize: (tablePaginationProps === null || tablePaginationProps === void 0 ? void 0 : tablePaginationProps.truncate) && this.onResizeTable,
        innerRef: this.horizontalScrollRef
      }, function (_ref13) {
        var measureRef = _ref13.measureRef;
        return /*#__PURE__*/_react.default.createElement("div", {
          className: (0, _classnames.default)(!isSticky && classes.tableWrapper, hasScroll && classes.scrollRoot),
          ref: measureRef,
          onScroll: (columnSettings === null || columnSettings === void 0 ? void 0 : columnSettings.frozenColumnsEnabled) && _this2.onScrollTable
        }, /*#__PURE__*/_react.default.createElement(_CustomTable.default, {
          className: (0, _classnames.default)(!hasHeader && hidePagination && classes.hideShadows)
        }, /*#__PURE__*/_react.default.createElement(_InternalTableHead.default, {
          columns: columns,
          createSortHandler: _this2.createSortHandler,
          filters: filters,
          showFilters: showFilters,
          filterTooltipText: filterTooltipText,
          sortedColumn: sortedColumn,
          sortOrder: sortOrder,
          sortTooltipText: sortTooltipText,
          updateFilterValue: _this2.updateFilterValue,
          toggleFilters: _this2.toggleFilters,
          showFilterIcon: showFilterIcon,
          columnSettings: columnSettings,
          defaultColumns: defaultColumns,
          handleChangeColumns: _this2.handleChangeColumns,
          hasScroll: hasScroll,
          isSticky: isSticky,
          stickyHeaderTop: isSticky && stickyHeaderTop,
          showColumnShadow: showColumnShadow,
          columnHeaderRefs: _this2.columnHeaderRefs,
          getFrozenOffset: _this2.getFrozenOffset,
          columnWidths: columnWidths,
          columnHeaderRootRef: _this2.columnHeaderRootRef,
          columnHeaderHeight: columnHeaderHeight,
          isSelectable: isSelectable,
          onMouseOver: isSelectable && _this2.handleMouseOver,
          onMouseOut: isSelectable && _this2.handleMouseOut,
          onSelectColumn: isSelectable && _this2.handleSelectColumn,
          selectedColumns: isSelectable && selectedColumns,
          hoveredColumnAccessor: isSelectable && hoveredColumnAccessor,
          selectAll: _this2.handleSelectAll,
          allSelected: allSelected,
          lastVisibleColumnAcc: lastVisibleColumnAcc,
          handleContextMenu: _this2.handleContextMenu
        }), displayRows.length ? /*#__PURE__*/_react.default.createElement(_InternalTableBody.default, {
          columns: columns,
          rows: displayRows,
          emptyRows: rowsPerPage - displayRows.length,
          stripedRows: stripedRows,
          rowProps: rowProps,
          ExpandableComponent: ExpandableComponent,
          showColumnShadow: showColumnShadow,
          getFrozenOffset: _this2.getFrozenOffset,
          isSelectable: isSelectable,
          hoveredColumnAccessor: isSelectable && hoveredColumnAccessor,
          selectedColumns: isSelectable && selectedColumns,
          onSelectRow: isSelectable && _this2.handleSelectRow,
          selectedRows: isSelectable && selectedRows,
          onSelectCell: isSelectable && _this2.handleSelectCell,
          selectedCells: isSelectable && selectedCells,
          rowId: rowId,
          allSelected: allSelected,
          lastVisibleColumnAcc: lastVisibleColumnAcc,
          handleContextMenu: _this2.handleContextMenu
        }) : /*#__PURE__*/_react.default.createElement(_EmptyRow.default, _extends({
          colspan: columns.length,
          height: (typeof rowsPerPage === 'string' ? 5 : rowsPerPage) * 48 - 1
        }, emptyProps)), !hidePagination && /*#__PURE__*/_react.default.createElement(_TableFooter.default, {
          className: (0, _classnames.default)((isSticky || hasScroll) && classes.stickyFooter)
        }, /*#__PURE__*/_react.default.createElement(_TableRow.default, null, /*#__PURE__*/_react.default.createElement(_InternalTablePagination.default, _extends({
          colSpan: columns.length + 1,
          count: isLazy ? size : _this2.sortedFilteredRows.length,
          rowsPerPage: rowsPerPage,
          page: page,
          rowsPerPageOptions: rowsPerPageOptions,
          onChangePage: _this2.handleChangePage,
          onChangeRowsPerPage: _this2.handleChangeRowsPerPage,
          tableWidth: tableWidth,
          maxHeight: maxHeight,
          tableHeight: tableHeight
        }, tablePaginationProps)), isSelectable && /*#__PURE__*/_react.default.createElement("td", {
          style: {
            width: 0
          }
        })))), isLoading && /*#__PURE__*/_react.default.createElement(_Loader.default, {
          isInner: true
        }));
      }), !!contextMenu && /*#__PURE__*/_react.default.createElement(_Menu.default, {
        open: !!contextMenu,
        onClose: this.handleCloseContextMenu,
        anchorReference: "anchorPosition",
        anchorPosition: contextMenu ? {
          top: contextMenu.mouseY,
          left: contextMenu.mouseX
        } : undefined
      }, selectionMenuItems.map(function (_ref14, i) {
        var _onClick = _ref14.onClick,
          text = _ref14.text,
          rest = _objectWithoutProperties(_ref14, _excluded);
        return /*#__PURE__*/_react.default.createElement(_MenuItem.default, _extends({
          key: i,
          onClick: function onClick() {
            _onClick();
            _this2.handleCloseContextMenu();
          },
          className: classes.smallSelectItem
        }, rest), text);
      }), selectionMenuItems.length === 0 && /*#__PURE__*/_react.default.createElement(_Typography.default, {
        variant: "body2",
        className: classes.emptySelectedMenuItems
      }, selectionMenuActionsEmptyText)));
      return !hidePagination && hasHeader ? /*#__PURE__*/_react.default.createElement(_Paper.default, {
        className: classes.paper
      }, table) : table;
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var page = props.page,
        rowsPerPage = props.rowsPerPage,
        sortedColumn = props.sortedColumn,
        sortOrder = props.sortOrder,
        selectedColumnsProp = props.selectedColumns,
        selectedRowsProp = props.selectedRows,
        selectedCellsProp = props.selectedCells,
        allSelectedProp = props.allSelected;
      var statePage = state.page,
        stateRowsPerPage = state.rowsPerPage,
        stateSortedColumn = state.sortedColumn,
        stateSortOrder = state.sortOrder,
        selectedColumnsState = state.selectedColumns,
        selectedRowsState = state.selectedRows,
        selectedCellsState = state.selectedCells,
        allSelectedState = state.allSelected;
      return {
        page: isNaN(page) ? statePage : page,
        rowsPerPage: rowsPerPage !== null && rowsPerPage !== void 0 ? rowsPerPage : stateRowsPerPage,
        sortedColumn: sortedColumn !== null && sortedColumn !== void 0 ? sortedColumn : stateSortedColumn,
        sortOrder: sortOrder !== null && sortOrder !== void 0 ? sortOrder : stateSortOrder,
        selectedColumns: selectedColumnsProp !== null && selectedColumnsProp !== void 0 ? selectedColumnsProp : selectedColumnsState,
        selectedRows: selectedRowsProp !== null && selectedRowsProp !== void 0 ? selectedRowsProp : selectedRowsState,
        selectedCells: selectedCellsProp !== null && selectedCellsProp !== void 0 ? selectedCellsProp : selectedCellsState,
        allSelected: allSelectedProp !== null && allSelectedProp !== void 0 ? allSelectedProp : allSelectedState
      };
    }
  }]);
  return Table;
}(_react.default.Component);
exports.Table = Table;
Table.propTypes = {
  /** JSS styles object.
   * @ignore */
  classes: _propTypes.default.object.isRequired,
  /** A list of the columns and their properties. */
  columns: _propTypes.default.arrayOf(_propTypes.default.shape({
    /** The column key. */
    accessor: _propTypes.default.string.isRequired,
    /** The alignment of the cells of the column. */
    align: _propTypes.default.string,
    /** If `true`, the column cannot be hidden by the user in column settings. */
    alwaysVisible: _propTypes.default.bool,
    /** The component used to render the cells of the column. */
    customCell: _propTypes.default.elementType,
    /** The component used to render the column filter. */
    filterComponent: _propTypes.default.elementType,
    /**
     * The function used to filter the column. It takes the `accessor` and
     * the `sortOrder` and returns a function that takes `rowA` and `rowB`
     * and returns 1, 0, or -1.
     */
    filterFunction: _propTypes.default.func,
    /** If `false`, the column is resizable. */
    fixedWidth: _propTypes.default.bool,
    /** If `true`, the column is frozen while scrolling. */
    frozen: _propTypes.default.bool,
    /** The column display name. */
    header: _propTypes.default.node,
    /** If `true`, the column is hidden. */
    hidden: _propTypes.default.bool,
    /**
     * If `true`, the column can't be rearranged in columnSettings.
     * If frozen columns is enabled, locked columns are also frozen.
     */
    locked: _propTypes.default.bool,
    /**
     * The function used to sort the column. It takes the `row` and the
     * current `filters` and returns `true` if the row should show or
     * `false` if it should be hidden.
     */
    sortFunction: _propTypes.default.func,
    /** Keeps the width of the column at the specified value. */
    width: _propTypes.default.number
  })).isRequired,
  /** If `true`, the entire table is selected. */
  allSelected: _propTypes.default.bool,
  /** Override the default text of the 'Cancel selection' button. */
  cancelSelectionButtonLabel: _propTypes.default.node,
  /** Override the default text of the 'Clear Filters' button. */
  clearFiltersButtonLabel: _propTypes.default.node,
  /** Configuration for the column settings feature. */
  columnSettings: _propTypes.default.shape({
    /** Customize the label of the 'Apply' button. */
    applyText: _propTypes.default.node,
    /** The columns to reset the state to when the 'Restore default' button is pressed. */
    defaultColumns: _propTypes.default.array,
    /** If `true`, the column settings feature is enabled. */
    enabled: _propTypes.default.bool,
    /** If `true`, the frozen columns feature is enabled. */
    frozenColumnsEnabled: _propTypes.default.bool,
    /**
     * Callback fired when the 'Apply' button is pressed. Called with the
     * updated columns.
     */
    onChange: _propTypes.default.func,
    /** Customize the text of the 'Restore default' button. */
    restoreDefaultText: _propTypes.default.node,
    /** Customize the text of the column settings icon tooltip. */
    tooltipText: _propTypes.default.node
  }),
  /** Component to replace the filter button in the header. */
  CustomHeader: _propTypes.default.elementType,
  /** The default number of rows per page. */
  defaultRowsPerPage: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  /** Override the content displayed when the table is empty. */
  emptyProps: _propTypes.default.shape({
    /** Alternative text for the image. */
    alt: _propTypes.default.string,
    /** Customize the default empty table content. */
    content: _propTypes.default.node,
    /** The image element. */
    img: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.string]),
    /** The empty message text. */
    text: _propTypes.default.node
  }),
  /** Component displayed when a row is expanded. It is passed the current row data. */
  ExpandableComponent: _propTypes.default.elementType,
  /** Override the default text of the 'Filter' button. */
  filterButtonLabel: _propTypes.default.node,
  /** The number of milliseconds to wait before calling the onChange function. */
  filterDelay: _propTypes.default.number,
  /** Override the default filter icon tooltip text. Use with the `showFilterIcon` prop. */
  filterTooltipText: _propTypes.default.node,
  /** If `true`, the table rows are scrollable if there is overflow. */
  hasScroll: _propTypes.default.bool,
  /** Props applied to the `CustomHeader` component. */
  headerProps: _propTypes.default.object,
  /** If `true`, the pagination is hidden. */
  hidePagination: _propTypes.default.bool,
  /** The column to start out sorted on the first render. */
  initialSortedColumn: _propTypes.default.string,
  /** The direction of the sort, either `asc` or `desc`. */
  initialSortOrder: _propTypes.default.string,
  /** If `true`, the table displays in a loading state. */
  isLoading: _propTypes.default.bool,
  /** If `true`, the table is in selectable mode. */
  isSelectable: _propTypes.default.bool,
  /** If `true`, the header and footer are position: sticky. */
  isSticky: _propTypes.default.bool,
  /** The maximum height of the rows. */
  maxHeight: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  /**
   * If `true`, the result of the last sort will be used when applying the next sort.
   *
   * If `false`, the `rows` prop will be used when sorting.
   *
   * If the `rows` prop changes, the sub-sorts will be forgotten. If this is a
   * possibility, set `multipleColumnSort` to `false` or manage the table state.
   */
  multipleColumnSort: _propTypes.default.bool,
  /**
   * Callback fired when the filtering, sorting or page number changes.
   *
   * @param {object} values The table state.
   * @param {number} values.rowsPerPage The number of rows per page.
   * @param {string} values.sortedColumn The column that is currently sorted.
   * @param {string} values.sortOrder The order of the sort, either `asc` or `desc`.
   * @param {object} values.filters The state of the filters.
   * @param {number} values.page The page number.
   * @param {arrray} values.rows The current sorted and/or filtered rows.
   */
  onChange: _propTypes.default.func,
  /**
   * Callback fired when a selection is made.
   *
   * `selectedCells`: array of objects with the `rowId` and `columnAccessor` of
   * the selected cell.
   *
   * `selectedRows`: array of `rowId`s of the selected rows.
   *
   * `selectedColumns`: array of `columnAccessor`s of the selected columns.
   *
   * `allSelected`: If `true`, the entire table is selected.
   */
  onSelect: _propTypes.default.func,
  /**
   * Callback fired when the filter button is pressed.
   *
   * @param {bool} showFilters The new state of the filter component.
   */
  onToggleFilters: _propTypes.default.func,
  /** The page number. */
  page: _propTypes.default.number,
  /** A unique identifier associated with each row. */
  rowId: _propTypes.default.any,
  /** Props applied to each row. */
  rowProps: _propTypes.default.shape({
    /** If `false`, rows will not be highlighted on hover. */
    hover: _propTypes.default.bool,
    /**
     * Callback fired when a row is clicked.
     *
     * @param {object} row The data of the row.
     */
    onClick: _propTypes.default.func,
    /**
     * Callback fired when a row is clicked.
     *
     * @param {object} event The event object.
     * @param {object} row The data of the row.
     */
    onClickV2: _propTypes.default.func,
    /**
     * Callback fired when the contexmenu event is fired.
     *
     * @param {object} event The event object.
     * @param {object} row The data of the row.
     */
    onContextMenu: _propTypes.default.func,
    /**
     * Callback fired when a row is double-clicked.
     *
     * @param {object} event The event object.
     * @param {object} row The data of the row.
     */
    onDoubleClick: _propTypes.default.func,
    /**
     * Callback fired when the drag event is fired.
     *
     * @param {object} event The event object.
     * @param {object} row The data of the row.
     */
    onDrag: _propTypes.default.func,
    /**
     * Callback fired when the dragend event is fired.
     *
     * @param {object} event The event object.
     * @param {object} row The data of the row.
     */
    onDragEnd: _propTypes.default.func,
    /**
     * Callback fired when the dragenter event is fired.
     *
     * @param {object} event The event object.
     * @param {object} row The data of the row.
     */
    onDragEnter: _propTypes.default.func,
    /**
     * Callback fired when the dragleave event is fired.
     *
     * @param {object} event The event object.
     * @param {object} row The data of the row.
     */
    onDragLeave: _propTypes.default.func,
    /**
     * Callback fired when the dragover event is fired.
     *
     * @param {object} event The event object.
     * @param {object} row The data of the row.
     */
    onDragOver: _propTypes.default.func,
    /**
     * Callback fired when the dragstart event is fired.
     *
     * @param {object} event The event object.
     * @param {object} row The data of the row.
     */
    onDragStart: _propTypes.default.func,
    /**
     * Callback fired when the drop event is fired.
     *
     * @param {object} event The event object.
     * @param {object} row The data of the row.
     */
    onDrop: _propTypes.default.func,
    /**
     * Callback fired when the mousedown event is fired.
     *
     * @param {object} event The event object.
     * @param {object} row The data of the row.
     */
    onMouseDown: _propTypes.default.func,
    /**
     * Callback fired when the mouseenter event is fired.
     *
     * @param {object} event The event object.
     * @param {object} row The data of the row.
     */
    onMouseEnter: _propTypes.default.func,
    /**
     * Callback fired when the mouseleave event is fired.
     *
     * @param {object} event The event object.
     * @param {object} row The data of the row.
     */
    onMouseLeave: _propTypes.default.func,
    /**
     * Callback fired when the mousemove event is fired.
     *
     * @param {object} event The event object.
     * @param {object} row The data of the row.
     */
    onMouseMove: _propTypes.default.func,
    /**
     * Callback fired when the mouse pointer is moved out of a row.
     *
     * @param {object} row The data of the row.
     */
    onMouseOut: _propTypes.default.func,
    /**
     * Callback fired when the mouse pointer is moved out of a row.
     *
     * @param {object} event The event object.
     * @param {object} row The data of the row.
     */
    onMouseOutV2: _propTypes.default.func,
    /**
     * Callback fired when the mouse pointer is moved over a row.
     *
     * @param {object} row The data of the row.
     */
    onMouseOver: _propTypes.default.func,
    /**
     * Callback fired when the mouse pointer is moved over a row.
     *
     * @param {object} event The event object.
     * @param {object} row The data of the row.
     */
    onMouseOverV2: _propTypes.default.func,
    /**
     * Callback fired when the mouseup event is fired.
     *
     * @param {object} event The event object.
     * @param {object} row The data of the row.
     */
    onMouseUp: _propTypes.default.func
  }),
  /** The list of rows and their values. */
  rows: _propTypes.default.arrayOf(_propTypes.default.object),
  /** The number of rows per page. */
  rowsPerPage: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  /**
   * Customizes the options of the rows per page select field. If less than two
   * options are available, no select field is displayed.
   */
  rowsPerPageOptions: _propTypes.default.array,
  /** The currently selected cells. */
  selectedCells: _propTypes.default.array,
  /** The currently selected columns. */
  selectedColumns: _propTypes.default.array,
  /** The currently selected rows. */
  selectedRows: _propTypes.default.array,
  /** Text shown when there are no selection menu actions. */
  selectionMenuActionsEmptyText: _propTypes.default.node,
  /**
   * Override the default actions menu button label.
   *
   * If it is a function, it is called with the following data:
   *
   * { `selectedColumns`, `selectedRows`, `selectedCells`, `allSelected`, `columns`, `rows` }
   */
  selectionMenuButtonLabel: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.string]),
  /** The menu items of the actions menu button. */
  selectionMenuItems: _propTypes.default.arrayOf(_propTypes.default.shape({
    /** If `true`, destructive action style will be applied. */
    destructiveAction: _propTypes.default.bool,
    /** The label content. */
    label: _propTypes.default.node,
    /** Callback fired when the menu item is clicked. */
    onClick: _propTypes.default.func
  })),
  /** If `true`, the Clear Filters button is displayed. */
  showClearFiltersButton: _propTypes.default.bool,
  /**
   * If `true`, a filter icon is displayed in a column header on hover and when
   * a filter is active in that column.
   */
  showFilterIcon: _propTypes.default.bool,
  /** If `true`, the column filters are displayed. */
  showFilters: _propTypes.default.bool,
  /** The total number of rows. Used in lazy loading mode. */
  size: _propTypes.default.number,
  /** The column that is currently sorted. */
  sortedColumn: _propTypes.default.string,
  /** The order of the sort, either `asc` or `desc`. */
  sortOrder: _propTypes.default.string,
  /** Override the default sort icon tooltip text. */
  sortTooltipText: _propTypes.default.node,
  /** Add space above the sticky header for a navigation bar. */
  stickyHeaderTop: _propTypes.default.number,
  /** If `true`, each row alternates colors. */
  stripedRows: _propTypes.default.bool,
  /** The subtitle of the table. */
  subtitle: _propTypes.default.node,
  /** Props applied to the `TablePagination` component. */
  tablePaginationProps: _propTypes.default.shape({
    /** Props applied to the 'go to previous page' button. */
    backButtonProps: _propTypes.default.object,
    /** Customize the text of the 'go to previous page' button tooltip. */
    backButtonText: _propTypes.default.node,
    /** Props applied to the 'go to first page' button. */
    firstButtonProps: _propTypes.default.object,
    /** Customize the text of the 'go to first page' button tooltip. */
    firstButtonText: _propTypes.default.node,
    /**
     * Customize the displayed rows label.
     * Invoked with a { from, to, count, page } object.
     */
    labelDisplayedRows: _propTypes.default.func,
    /** Customize the rows per page label. */
    labelRowsPerPage: _propTypes.default.node,
    /** Props applied to the 'go to last page' button. */
    lastButtonProps: _propTypes.default.object,
    /** Customize the text of the 'go to last page' button tooltip. */
    lastButtonText: _propTypes.default.node,
    /** Props applied to the 'go to next page' button. */
    nextButtonProps: _propTypes.default.object,
    /** Customize the text of the 'go to next page' button tooltip. */
    nextButtonText: _propTypes.default.node,
    /** Customize the 'of' label. */
    ofText: _propTypes.default.node,
    /** Customize the 'Page' label. */
    pageText: _propTypes.default.node,
    /**
     * If `true`, the rows per page options expands on large screens
     * and condenses to a select field on smaller screens.
     */
    truncate: _propTypes.default.bool
  }),
  /** The title of the table. */
  title: _propTypes.default.node
};
Table.defaultProps = {
  rowsPerPageOptions: [5, 10, 15],
  filterDelay: 600,
  selectionMenuItems: []
};
var _default = (0, _withStyles.default)(styles)(Table);
exports.default = _default;