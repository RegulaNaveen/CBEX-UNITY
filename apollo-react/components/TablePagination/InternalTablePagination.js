"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultLabelDisplayedRows = exports.default = exports.InternalTablePagination = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireDefault(require("react"));
var _throttleDebounce = require("throttle-debounce");
var _colors = require("../../colors");
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _InternalTablePaginationActions = _interopRequireDefault(require("../Table/InternalTablePaginationActions"));
var _TableCell = _interopRequireDefault(require("../TableCell"));
var _Toolbar = _interopRequireDefault(require("../Toolbar"));
var _Typography = _interopRequireDefault(require("../Typography"));
var _InternalRowsPerPageSelector = _interopRequireDefault(require("./InternalRowsPerPageSelector"));
var _excluded = ["className", "colSpan", "count", "labelDisplayedRows", "labelRowsPerPage", "onChangePage", "onChangeRowsPerPage", "page", "rowsPerPage", "rowsPerPageOptions", "SelectProps", "truncate", "pageNumberInputProps", "pageText", "ofText", "firstPageButtonProps", "firstButtonProps", "firstButtonText", "backIconButtonProps", "backButtonProps", "backIconButtonText", "backButtonText", "nextIconButtonProps", "nextButtonProps", "nextIconButtonText", "nextButtonText", "lastPageButtonProps", "lastButtonProps", "lastButtonText", "tableWidth", "maxHeight", "tableHeight", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  root: {
    padding: '0px !important',
    color: _colors.neutral7
  },
  toolbar: {
    paddingRight: 16,
    paddingLeft: 16,
    borderTop: "1px solid ".concat(_colors.neutral1),
    height: 56,
    minHeight: 56,
    display: 'flex',
    justifyContent: 'space-between',
    position: 'sticky',
    left: 0
  },
  caption: {
    textAlign: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingRight: 16,
    paddingLeft: 16
  },
  wrapper: {
    flex: '1 1 0px'
  },
  paginationActionsRoot: {
    justifyContent: 'flex-end'
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var defaultLabelDisplayedRows = function defaultLabelDisplayedRows(_ref) {
  var from = _ref.from,
    to = _ref.to,
    count = _ref.count;
  return "Items ".concat(from.toLocaleString(), "-").concat(to.toLocaleString(), " of ").concat(count.toLocaleString());
};
exports.defaultLabelDisplayedRows = defaultLabelDisplayedRows;
var defaultRowsPerPageOptions = [5, 10, 15];
var InternalTablePagination = function InternalTablePagination(_ref2) {
  var className = _ref2.className,
    colSpan = _ref2.colSpan,
    count = _ref2.count,
    _ref2$labelDisplayedR = _ref2.labelDisplayedRows,
    labelDisplayedRows = _ref2$labelDisplayedR === void 0 ? defaultLabelDisplayedRows : _ref2$labelDisplayedR,
    _ref2$labelRowsPerPag = _ref2.labelRowsPerPage,
    labelRowsPerPage = _ref2$labelRowsPerPag === void 0 ? 'Rows' : _ref2$labelRowsPerPag,
    onChangePage = _ref2.onChangePage,
    onChangeRowsPerPage = _ref2.onChangeRowsPerPage,
    page = _ref2.page,
    rowsPerPage = _ref2.rowsPerPage,
    _ref2$rowsPerPageOpti = _ref2.rowsPerPageOptions,
    rowsPerPageOptions = _ref2$rowsPerPageOpti === void 0 ? defaultRowsPerPageOptions : _ref2$rowsPerPageOpti,
    _ref2$SelectProps = _ref2.SelectProps,
    SelectProps = _ref2$SelectProps === void 0 ? {} : _ref2$SelectProps,
    truncate = _ref2.truncate,
    pageNumberInputProps = _ref2.pageNumberInputProps,
    pageText = _ref2.pageText,
    ofText = _ref2.ofText,
    firstPageButtonProps = _ref2.firstPageButtonProps,
    firstButtonProps = _ref2.firstButtonProps,
    _ref2$firstButtonText = _ref2.firstButtonText,
    firstButtonText = _ref2$firstButtonText === void 0 ? 'First page' : _ref2$firstButtonText,
    backIconButtonProps = _ref2.backIconButtonProps,
    backButtonProps = _ref2.backButtonProps,
    _ref2$backIconButtonT = _ref2.backIconButtonText,
    backIconButtonText = _ref2$backIconButtonT === void 0 ? 'Previous page' : _ref2$backIconButtonT,
    backButtonText = _ref2.backButtonText,
    nextIconButtonProps = _ref2.nextIconButtonProps,
    nextButtonProps = _ref2.nextButtonProps,
    _ref2$nextIconButtonT = _ref2.nextIconButtonText,
    nextIconButtonText = _ref2$nextIconButtonT === void 0 ? 'Next page' : _ref2$nextIconButtonT,
    nextButtonText = _ref2.nextButtonText,
    lastPageButtonProps = _ref2.lastPageButtonProps,
    lastButtonProps = _ref2.lastButtonProps,
    _ref2$lastButtonText = _ref2.lastButtonText,
    lastButtonText = _ref2$lastButtonText === void 0 ? 'Last page' : _ref2$lastButtonText,
    tableWidth = _ref2.tableWidth,
    maxHeight = _ref2.maxHeight,
    tableHeight = _ref2.tableHeight,
    ref = _ref2.forwardedRef,
    rest = _objectWithoutProperties(_ref2, _excluded);
  var classes = useStyles();
  var rowsPerPageRef = _react.default.useRef();
  var captionRef = _react.default.useRef();
  var paginationActionsRef = _react.default.useRef();
  var _React$useState = _react.default.useState(!truncate),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    isCompact = _React$useState2[0],
    setIsCompact = _React$useState2[1];
  var checkOverflow = _react.default.useCallback((0, _throttleDebounce.throttle)(100, function () {
    var _rowsPerPageRef$curre, _rowsPerPageRef$curre2, _captionRef$current$g, _captionRef$current, _paginationActionsRef, _paginationActionsRef2;
    var childrenWidth = ((_rowsPerPageRef$curre = (_rowsPerPageRef$curre2 = rowsPerPageRef.current) === null || _rowsPerPageRef$curre2 === void 0 ? void 0 : _rowsPerPageRef$curre2.getBoundingClientRect().width) !== null && _rowsPerPageRef$curre !== void 0 ? _rowsPerPageRef$curre : 0) + ((_captionRef$current$g = (_captionRef$current = captionRef.current) === null || _captionRef$current === void 0 ? void 0 : _captionRef$current.getBoundingClientRect().width) !== null && _captionRef$current$g !== void 0 ? _captionRef$current$g : 0) + ((_paginationActionsRef = (_paginationActionsRef2 = paginationActionsRef.current) === null || _paginationActionsRef2 === void 0 ? void 0 : _paginationActionsRef2.getBoundingClientRect().width) !== null && _paginationActionsRef !== void 0 ? _paginationActionsRef : 0);
    if (tableWidth && childrenWidth + 33 > tableWidth) {
      setIsCompact(true);
    } else {
      setIsCompact(false);
    }
  }), [tableWidth]);
  _react.default.useEffect(function () {
    if (truncate) {
      checkOverflow();
    }
  }, [truncate, checkOverflow, tableWidth]);
  var width = tableWidth - (maxHeight > 0 && maxHeight === tableHeight ? 48 : 32);
  return /*#__PURE__*/_react.default.createElement(_TableCell.default, _extends({
    className: (0, _classnames.default)(classes.root, className),
    colSpan: colSpan
  }, rest), /*#__PURE__*/_react.default.createElement(_Toolbar.default, {
    className: classes.toolbar,
    style: {
      width: width
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(classes.wrapper)
  }, /*#__PURE__*/_react.default.createElement(_InternalRowsPerPageSelector.default, {
    isCompact: isCompact,
    rowsPerPageOptions: rowsPerPageOptions,
    labelRowsPerPage: labelRowsPerPage,
    value: rowsPerPage,
    onChange: onChangeRowsPerPage,
    SelectProps: SelectProps,
    ref: rowsPerPageRef
  })), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    color: "inherit",
    variant: "body2",
    className: classes.caption,
    ref: captionRef
  }, labelDisplayedRows({
    from: count === 0 ? 0 : page * (typeof rowsPerPage === 'string' ? 0 : rowsPerPage) + 1,
    to: count !== -1 ? Math.min(count, (page + 1) * (typeof rowsPerPage === 'string' ? count : rowsPerPage)) : (page + 1) * rowsPerPage,
    count: count,
    page: page
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(classes.wrapper)
  }, /*#__PURE__*/_react.default.createElement(_InternalTablePaginationActions.default, {
    count: count,
    onChangePage: onChangePage,
    page: page,
    rowsPerPage: rowsPerPage,
    ref: paginationActionsRef,
    pageNumberInputProps: pageNumberInputProps,
    className: classes.paginationActionsRoot,
    pageText: pageText,
    ofText: ofText,
    firstPageButtonProps: _objectSpread({
      'aria-label': firstButtonText
    }, firstPageButtonProps),
    firstButtonProps: firstButtonProps,
    firstButtonText: firstButtonText,
    backIconButtonProps: _objectSpread({
      'aria-label': backButtonText || backIconButtonText
    }, backIconButtonProps),
    backButtonProps: backButtonProps,
    backButtonText: backButtonText || backIconButtonText,
    nextIconButtonProps: _objectSpread({
      'aria-label': nextButtonText || nextIconButtonText
    }, nextIconButtonProps),
    nextButtonProps: nextButtonProps,
    nextButtonText: nextButtonText || nextIconButtonText,
    lastPageButtonProps: _objectSpread({
      'aria-label': lastButtonText
    }, lastPageButtonProps),
    lastButtonProps: lastButtonProps,
    lastButtonText: lastButtonText
  }))));
};
exports.InternalTablePagination = InternalTablePagination;
var _default = (0, _withRef.default)()(InternalTablePagination);
exports.default = _default;