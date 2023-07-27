"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatData = exports.default = exports.ColumnChart = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _ClusterColumnChart = _interopRequireDefault(require("../ClusterColumnChart"));
var _excluded = ["data"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var formatData = function formatData(data) {
  var keys = data.length > 0 && Object.keys(data[0]);
  return data.map(function (datum) {
    return {
      label: datum[keys[0]],
      data: [{
        0: datum[keys[1]]
      }]
    };
  });
};
exports.formatData = formatData;
var ColumnChart = function ColumnChart(_ref) {
  var data = _ref.data,
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/_react.default.createElement(_ClusterColumnChart.default, _extends({
    data: formatData(data)
  }, rest));
};
exports.ColumnChart = ColumnChart;
ColumnChart.propTypes = {
  /** Data in an array, should be formatted to: [{obj}, {obj}, ...] */
  data: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
  /** The height of the chart. */
  height: _propTypes.default.number,
  /** If `true`, the component does not animate on render. */
  hideAnimation: _propTypes.default.bool,
  /** Optional suffix for y-axis labels. */
  suffix: _propTypes.default.string,
  /** The width of the chart. */
  width: _propTypes.default.number,
  /** Optional number of y-axis ticks. */
  yTicks: _propTypes.default.number
};
ColumnChart.defaultProps = {
  hideAnimation: false
};
var _default = ColumnChart;
exports.default = _default;