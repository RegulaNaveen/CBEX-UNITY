"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Pagination = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _InternalTablePaginationActions = _interopRequireDefault(require("../Table/InternalTablePaginationActions"));
var _excluded = ["forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var Pagination = function Pagination(_ref) {
  var ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/_react.default.createElement(_InternalTablePaginationActions.default, _extends({}, rest, {
    ref: ref
  }));
};
exports.Pagination = Pagination;
Pagination.propTypes = {
  /**
   * The total number of rows.
   * To enable server side pagination for an unknown number of items, provide -1.
   */
  count: _propTypes.default.number.isRequired,
  /** Callback fired when the page is changed. */
  onChangePage: _propTypes.default.func.isRequired,
  /** The zero-based index of the current page. */
  page: _propTypes.default.number.isRequired,
  /** The number of rows per page. */
  rowsPerPage: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]).isRequired,
  /** Props applied to the 'go to previous page' button. */
  backButtonProps: _propTypes.default.object,
  /** Customize the text of the 'go to previous page' button tooltip. */
  backButtonText: _propTypes.default.node,
  /** Props applied to the 'go to previous page' button.
   * @ignore */
  backIconButtonProps: _propTypes.default.object,
  /** Props applied to the 'go to first page' button. */
  firstButtonProps: _propTypes.default.object,
  /** Customize the text of the 'go to first page' button tooltip. */
  firstButtonText: _propTypes.default.node,
  /** Props applied to the 'go to first page' button.
   * @ignore */
  firstPageButtonProps: _propTypes.default.object,
  /** Props applied to the 'go to last page' button. */
  lastButtonProps: _propTypes.default.object,
  /** Customize the text of the 'go to last page' button tooltip. */
  lastButtonText: _propTypes.default.node,
  /** Props applied to the 'go to last page' button.
   * @ignore */
  lastPageButtonProps: _propTypes.default.object,
  /** Props applied to the 'go to next page' button. */
  nextButtonProps: _propTypes.default.object,
  /** Customize the text of the 'go to next page' button tooltip. */
  nextButtonText: _propTypes.default.node,
  /** Props applied to the 'go to next page' button.
   * @ignore */
  nextIconButtonProps: _propTypes.default.object,
  /**
   * Text to display between current page and total page count.
   * Default is 'of'.
   */
  ofText: _propTypes.default.string,
  /** Props applied to the `Input` component where current page number is displayed. */
  pageNumberInputProps: _propTypes.default.object,
  /**
   * Text to identify what the input number indicates.
   * Default is 'Page'.
   */
  pageText: _propTypes.default.string
};
var _default = (0, _withRef.default)()(Pagination);
exports.default = _default;