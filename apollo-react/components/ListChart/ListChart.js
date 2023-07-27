"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ListChart = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _CustomTable = _interopRequireDefault(require("../../components/CustomTable"));
var _InternalTableBody = _interopRequireDefault(require("../../components/Table/InternalTableBody"));
var _InternalTableHead = _interopRequireDefault(require("../../components/Table/InternalTableHead"));
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _Typography = _interopRequireDefault(require("../Typography/Typography"));
var _excluded = ["className", "columns", "rows", "height", "emptyMessage", "forwardedRef", "stripedRows"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  root: {
    boxShadow: 'none',
    background: _colors.white,
    '& thead, tbody tr': {
      display: 'table',
      width: '100%',
      tableLayout: 'fixed'
    },
    '& tbody': {
      display: 'block',
      overflow: 'auto'
    },
    '& td, & th': {
      color: _colors.neutral7,
      fontSize: 14
    },
    '& tbody tr': {
      borderBottom: 'none'
    },
    '& tbody tr td': {
      fontSize: 14
    },
    '& tbody tr:hover td': {
      background: _colors.primaryLight,
      color: _colors.black
    }
  },
  noData: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    '& p': {
      width: '100%',
      textAlign: 'center'
    }
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var ListChart = function ListChart(_ref) {
  var className = _ref.className,
    _ref$columns = _ref.columns,
    columns = _ref$columns === void 0 ? [] : _ref$columns,
    _ref$rows = _ref.rows,
    rows = _ref$rows === void 0 ? [] : _ref$rows,
    height = _ref.height,
    _ref$emptyMessage = _ref.emptyMessage,
    emptyMessage = _ref$emptyMessage === void 0 ? 'No data available.' : _ref$emptyMessage,
    ref = _ref.forwardedRef,
    stripedRows = _ref.stripedRows,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  var bodyHeight = height - 40; // remove header height

  return rows.length > 0 ? /*#__PURE__*/_react.default.createElement(_CustomTable.default, _extends({
    className: (0, _classnames.default)(classes.root, className)
  }, rest, {
    ref: ref
  }), /*#__PURE__*/_react.default.createElement(_InternalTableHead.default, {
    columns: columns
  }), /*#__PURE__*/_react.default.createElement(_InternalTableBody.default, {
    columns: columns,
    rows: rows,
    rowHeight: 40,
    bodyHeight: bodyHeight,
    stripedRows: stripedRows
  })) : /*#__PURE__*/_react.default.createElement("div", _extends({
    className: classes.noData,
    style: {
      height: height
    }
  }, rest, {
    ref: ref
  }), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "body1"
  }, emptyMessage));
};
exports.ListChart = ListChart;
ListChart.propTypes = {
  /** An array of the columns and their properties. */
  columns: _propTypes.default.array,
  /** Message to be displayed if there is no row data. */
  emptyMessage: _propTypes.default.node,
  /** The height of the component. The overflow is scrollable. */
  height: _propTypes.default.number,
  /** An array of rows and their values. */
  rows: _propTypes.default.array,
  /** If `true`, each row alternates colors. */
  stripedRows: _propTypes.default.bool
};
var _default = (0, _withRef.default)()(ListChart);
exports.default = _default;