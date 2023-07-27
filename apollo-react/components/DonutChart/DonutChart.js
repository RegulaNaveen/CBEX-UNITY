"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatPercent = exports.default = exports.DonutChart = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _typography = require("../../typography");
var _isNullish = _interopRequireDefault(require("../../utils/isNullish"));
var _CircularProgress = _interopRequireDefault(require("../CircularProgress/CircularProgress"));
var _Tooltip = _interopRequireDefault(require("../Tooltip"));
var _excluded = ["className", "dropshadow", "percent", "stroke", "style", "subtitle", "tooltipTitle", "tooltipSubtitle", "value"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  dropshadowWidth: {
    width: 300,
    padding: '22px 21px 18px 22px',
    marginRight: -44,
    boxSizing: 'content-box'
  },
  dropshadow: {
    background: _colors.neutral5,
    position: 'relative',
    width: '40%',
    height: 10,
    top: 23,
    left: 69,
    borderRadius: '50%',
    filter: 'blur(10px)',
    marginBottom: 10
  },
  noDataStyles: {
    color: _colors.black,
    fontSize: 60,
    fontFamily: _typography.fontFamily,
    fontWeight: 500,
    position: 'relative',
    top: 79,
    right: 22
  },
  percentStyles: {
    color: _colors.black,
    fontSize: 60,
    fontFamily: _typography.fontFamily,
    fontWeight: 500,
    position: 'relative',
    top: 79,
    right: 10
  },
  percentStylesNoSubtitle: {
    top: 94
  },
  percentSignStyles: {
    color: _colors.black,
    fontSize: 32,
    fontFamily: _typography.fontFamily,
    fontWeight: 500,
    position: 'relative',
    top: -20
  },
  subtitleStyles: {
    color: _colors.neutral7,
    fontFamily: _typography.fontFamily,
    position: 'relative',
    top: 72,
    right: 22
  },
  textContainer: {
    textAlign: 'center',
    height: 0
  },
  donutTransition: {
    '& circle': {
      transition: 'stroke-dashoffset 900ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    }
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var formatPercent = function formatPercent(percent) {
  if (percent > 0 && percent <= 1) {
    return 0.1;
  } else if (percent >= 1.75 && percent < 2.1237) {
    return 2.1237;
  } else {
    return percent;
  }
};
exports.formatPercent = formatPercent;
var DonutChart = function DonutChart(_ref) {
  var className = _ref.className,
    dropshadow = _ref.dropshadow,
    percent = _ref.percent,
    _ref$stroke = _ref.stroke,
    stroke = _ref$stroke === void 0 ? _colors.dataVizColors[0] : _ref$stroke,
    style = _ref.style,
    subtitle = _ref.subtitle,
    tooltipTitle = _ref.tooltipTitle,
    tooltipSubtitle = _ref.tooltipSubtitle,
    value = _ref.value,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  var _React$useState = _react.default.useState(0),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    donutPercent = _React$useState2[0],
    setDonutPercent = _React$useState2[1];
  _react.default.useEffect(function () {
    setTimeout(function () {
      setDonutPercent(percent);
    }, 100);
  }, [percent]);
  var chart = /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(classes.dropshadowWidth, className),
    style: style
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.textContainer
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: (0, _classnames.default)(!subtitle && classes.percentStylesNoSubtitle, (0, _isNullish.default)(percent) ? classes.noDataStyles : classes.percentStyles)
  }, (0, _isNullish.default)(percent) ? 'N/A' : "".concat(percent), !(0, _isNullish.default)(percent) && /*#__PURE__*/_react.default.createElement("span", {
    className: classes.percentSignStyles
  }, '%'), /*#__PURE__*/_react.default.createElement("br", null)), subtitle && /*#__PURE__*/_react.default.createElement("span", {
    className: classes.subtitleStyles
  }, subtitle)), /*#__PURE__*/_react.default.createElement(_CircularProgress.default, _extends({
    className: classes.donutTransition,
    style: {
      color: stroke
    },
    value: formatPercent(donutPercent),
    size: 256,
    thickness: 2.74
  }, rest)), /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(_defineProperty({}, classes.dropshadow, dropshadow))
  }));
  return tooltipTitle && tooltipSubtitle ? /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    title: tooltipTitle,
    subtitle: tooltipSubtitle,
    placement: "top",
    PopperProps: {
      modifiers: [{
        name: 'offset',
        options: {
          offset: [-21.5, -23]
        }
      }, {
        name: 'flip',
        enabled: false
      }]
    }
  }, chart) : chart;
};
exports.DonutChart = DonutChart;
DonutChart.propTypes = {
  /** If `true`, a dropshadow is shown. */
  dropshadow: _propTypes.default.bool,
  /** The percent of the stroke in the chart. */
  percent: _propTypes.default.number,
  /** The color of the stroke. */
  stroke: _propTypes.default.string,
  /** Label under percentage. */
  subtitle: _propTypes.default.node,
  /** Subtitle for the tooltip displayed on hover. */
  tooltipSubtitle: function tooltipSubtitle(props) {
    if (props.tooltipSubtitle && !props.tooltipTitle) {
      return new Error('The prop `tooltipTitle` is required in `DonutChart` when the prop `tooltipSubtitle` is supplied.');
    }
  },
  /** Title for the tooltip displayed on hover. */
  tooltipTitle: function tooltipTitle(props) {
    if (props.tooltipTitle && !props.tooltipSubtitle) {
      return new Error('The prop `tooltipSubtitle` is required in `DonutChart` when the prop `tooltipTitle` is supplied.');
    }
  }
};
var _default = DonutChart;
exports.default = _default;