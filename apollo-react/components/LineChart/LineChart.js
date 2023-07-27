"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.LineChart = void 0;
var _compose = _interopRequireDefault(require("@hypnosphi/recompose/compose"));
var _withStyles = _interopRequireDefault(require("@mui/styles/withStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _d3Array = require("d3-array");
var _d3Ease = require("d3-ease");
var _d3Scale = require("d3-scale");
var _d3Selection = require("d3-selection");
var _d3Shape = require("d3-shape");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
require("d3-transition");
var _colors = require("../../colors");
var _typography = require("../../typography");
var _ChartResponsiveWrapper = _interopRequireDefault(require("../../utils/ChartResponsiveWrapper"));
var _colorUtils = require("../../utils/colorUtils");
var _isNullish = _interopRequireDefault(require("../../utils/isNullish"));
var _ChartLegend = _interopRequireDefault(require("../ChartLegend"));
var _Tooltip = _interopRequireDefault(require("../Tooltip"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
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
var styles = {
  root: {
    fontFamily: _typography.fontFamily,
    strokeWidth: 2,
    fill: 'none',
    display: 'block'
  },
  axisLabels: {
    fill: _colors.neutral7,
    fontSize: 14,
    textAnchor: 'middle'
  },
  yAxisLabels: {
    '@global g:first-of-type line': {
      stroke: _colors.neutral5,
      strokeWidth: 1,
      strokeDasharray: '1 0'
    }
  },
  gridLine: {
    fill: 'none',
    stroke: _colors.neutral4,
    strokeWidth: 1,
    strokeDasharray: '2 3'
  },
  hide: {
    display: 'none'
  }
};
var LineChart = /*#__PURE__*/function (_React$Component) {
  _inherits(LineChart, _React$Component);
  var _super = _createSuper(LineChart);
  function LineChart() {
    var _this;
    _classCallCheck(this, LineChart);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "legendRef", /*#__PURE__*/_react.default.createRef());
    _defineProperty(_assertThisInitialized(_this), "svg", /*#__PURE__*/_react.default.createRef());
    _defineProperty(_assertThisInitialized(_this), "state", {
      legendHeight: 40,
      initialParentHeight: _this.props.parentHeight,
      currentSeries: 0
    });
    _defineProperty(_assertThisInitialized(_this), "colorData", _this.props.data.map(function (d, i) {
      return _objectSpread(_objectSpread({}, d), {}, {
        color: _colors.dataVizColors[i]
      });
    }));
    _defineProperty(_assertThisInitialized(_this), "renderChart", function () {
      var _this$props = _this.props,
        classes = _this$props.classes,
        data = _this$props.data,
        height = _this$props.height,
        parentWidth = _this$props.parentWidth,
        suffix = _this$props.suffix,
        xTicks = _this$props.xTicks,
        width = _this$props.width,
        yTicks = _this$props.yTicks,
        yRange = _this$props.yRange;
      var _this$state = _this.state,
        initialParentHeight = _this$state.initialParentHeight,
        legendHeight = _this$state.legendHeight,
        currentSeries = _this$state.currentSeries;
      var margin = 16;
      var h = (height !== null && height !== void 0 ? height : initialParentHeight) - 2 * margin - legendHeight;
      var w = width !== null && width !== void 0 ? width : parentWidth;
      var allData = data.reduce(function (arr, item) {
        return [].concat(_toConsumableArray(arr), _toConsumableArray(item.data));
      }, []);

      // X-axis
      var xLabels = data[0].data.map(function (d) {
        return d.x;
      });
      var isXLabelStr = xLabels.some(function (d) {
        return typeof d === 'string';
      });
      var xTickNum = xTicks !== null && xTicks !== void 0 ? xTicks : xLabels.length;
      var xScale = (0, _d3Scale.scaleLinear)().domain(isXLabelStr ? [0, xLabels.length - 1] : (0, _d3Array.extent)(allData, function (d) {
        return d.x;
      })).range([margin + 60, w - 40]);
      var allXTicks = xScale.ticks(xTickNum).map(function (d, i) {
        return /*#__PURE__*/_react.default.createElement("g", {
          key: i,
          transform: "translate(".concat(xScale(d), ",").concat(h + 29, ")")
        }, /*#__PURE__*/_react.default.createElement("text", null, "".concat(isXLabelStr ? xLabels[d] : d)));
      });

      // Y-axis
      var yScale = (0, _d3Scale.scaleLinear)().domain(yRange !== null && yRange !== void 0 ? yRange : [0, (0, _d3Array.extent)(allData, function (d) {
        return d.y;
      })[1]]).range([h, margin]);
      var allYTicks = yScale.ticks(yTicks).map(function (d, i) {
        return /*#__PURE__*/_react.default.createElement("g", {
          key: i,
          transform: "translate(".concat(margin, ",").concat(yScale(d), ")")
        }, /*#__PURE__*/_react.default.createElement("text", {
          x: "3",
          y: "4"
        }, "".concat(d).concat(suffix)), /*#__PURE__*/_react.default.createElement("line", {
          className: classes.gridLine,
          x1: "30",
          x2: w,
          y1: "0",
          y2: "0"
        }));
      });

      // sort data so that hovered series is on top
      var sortedData = _toConsumableArray(data);
      sortedData.splice(currentSeries, 1);
      sortedData.push(data[currentSeries]);

      // lines and circles
      var line = (0, _d3Shape.line)().defined(function (d) {
        return !(0, _isNullish.default)(d.y);
      }).x(function (d, i) {
        return xScale(isXLabelStr ? i : d.x);
      }).y(function (d) {
        return yScale(d.y);
      }).curve(_d3Shape.curveLinear);
      var allLines = sortedData.map(function (item, i) {
        var dataIndex = data.indexOf(sortedData[i]);
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
          key: i
        }, /*#__PURE__*/_react.default.createElement("path", {
          stroke: _colors.dataVizColors[dataIndex],
          "data-i": dataIndex,
          d: line(item.data)
        }), item.data.map(function (point, j) {
          return /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
            key: j,
            title: point.y,
            subtitle: point.x,
            placement: "top",
            disableInteractive: true,
            PopperProps: {
              modifiers: [{
                name: 'offset',
                options: {
                  offset: [0.9, 0]
                }
              }, {
                name: 'flip',
                enabled: false
              }]
            }
          }, /*#__PURE__*/_react.default.createElement("circle", {
            cx: xScale(isXLabelStr ? j : point.x),
            cy: yScale((0, _isNullish.default)(point.y) ? 0 : point.y),
            r: 5,
            className: (0, _classnames.default)((0, _isNullish.default)(point.y) && classes.hide),
            fill: _colors.dataVizColors[dataIndex],
            "data-i": dataIndex
          }));
        }));
      });
      return {
        allLines: allLines,
        allXTicks: allXTicks,
        allYTicks: allYTicks
      };
    });
    _defineProperty(_assertThisInitialized(_this), "calculateLegendHeight", function () {
      var _legendRef$getBoundin;
      var legendRef = _this.legendRef.current;
      var legendHeight = _this.state.legendHeight;
      var newLegendHeight = (_legendRef$getBoundin = legendRef === null || legendRef === void 0 ? void 0 : legendRef.getBoundingClientRect().height) !== null && _legendRef$getBoundin !== void 0 ? _legendRef$getBoundin : 40;
      if (newLegendHeight !== legendHeight) {
        _this.setState({
          legendHeight: newLegendHeight
        });
      }
    });
    _defineProperty(_assertThisInitialized(_this), "addHoverEffect", function () {
      var self = _assertThisInitialized(_this);
      var svg = _this.svg.current;
      var allSeries = (0, _d3Selection.select)(svg).selectAll('path, circle');
      allSeries.on('mouseover', function () {
        var currentSeries = this.getAttribute('data-i');
        self.setState({
          currentSeries: currentSeries
        });
        allSeries.each(function () {
          var d = (0, _d3Selection.select)(this);
          var i = d.attr('data-i');
          var color = _colors.dataVizColors[i];
          d.interrupt().attr('stroke', d.attr('stroke') && color).attr('fill', d.attr('fill') && color).transition().ease(_d3Ease.easeCubic).duration(200).attr('stroke', d.attr('stroke') && (i === currentSeries ? color : (0, _colorUtils.transparencyToOpaque)(color, 0.4))).attr('fill', d.attr('fill') && (i === currentSeries ? color : (0, _colorUtils.transparencyToOpaque)(color, 0.4)));
        });
      });
      allSeries.on('mouseout', function () {
        var currentSeries = self.state.currentSeries;
        allSeries.each(function () {
          var d = (0, _d3Selection.select)(this);
          var i = d.attr('data-i');
          var color = _colors.dataVizColors[i];
          d.attr('stroke', d.attr('stroke') && (i === currentSeries ? color : (0, _colorUtils.transparencyToOpaque)(color, 0.4))).attr('fill', d.attr('fill') && (i === currentSeries ? color : (0, _colorUtils.transparencyToOpaque)(color, 0.4))).transition().ease(_d3Ease.easeCubic).duration(200).attr('stroke', d.attr('stroke') && color).attr('fill', d.attr('fill') && color);
        });
      });
    });
    return _this;
  }
  _createClass(LineChart, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.calculateLegendHeight();
      this.addHoverEffect();
      window && window.addEventListener('resize', this.calculateLegendHeight);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window && window.removeEventListener('resize', this.calculateLegendHeight);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
        classes = _this$props2.classes,
        data = _this$props2.data,
        parentWidth = _this$props2.parentWidth,
        width = _this$props2.width,
        legendLabels = _this$props2.legendLabels,
        height = _this$props2.height;
      var _this$state2 = this.state,
        legendHeight = _this$state2.legendHeight,
        initialParentHeight = _this$state2.initialParentHeight;
      var _this$renderChart = this.renderChart(),
        allLines = _this$renderChart.allLines,
        allXTicks = _this$renderChart.allXTicks,
        allYTicks = _this$renderChart.allYTicks;
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        ref: this.legendRef
      }, /*#__PURE__*/_react.default.createElement(_ChartLegend.default, {
        shape: "round",
        legendLabels: legendLabels !== null && legendLabels !== void 0 ? legendLabels : data.map(function (d) {
          return d.label;
        })
      })), /*#__PURE__*/_react.default.createElement("svg", {
        ref: this.svg,
        className: classes.root,
        width: width !== null && width !== void 0 ? width : parentWidth,
        height: (height !== null && height !== void 0 ? height : initialParentHeight) - legendHeight
      }, /*#__PURE__*/_react.default.createElement("g", {
        className: classes.axisLabels
      }, /*#__PURE__*/_react.default.createElement("g", null, allXTicks), /*#__PURE__*/_react.default.createElement("g", {
        className: classes.yAxisLabels
      }, allYTicks)), allLines));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, state) {
      var _nextProps$data;
      var currentSeries = state.currentSeries;
      if (((_nextProps$data = nextProps.data) === null || _nextProps$data === void 0 ? void 0 : _nextProps$data.length) <= currentSeries) {
        return {
          currentSeries: 0
        };
      }
      return null;
    }
  }]);
  return LineChart;
}(_react.default.Component);
exports.LineChart = LineChart;
LineChart.propTypes = {
  /** JSS styles object.
   * @ignore */
  classes: _propTypes.default.object.isRequired,
  /** Data in an array, should be formatted to: [{obj}, {obj}, ...] */
  data: _propTypes.default.arrayOf(_propTypes.default.object),
  /** Optional height of the chart (px). */
  height: _propTypes.default.number,
  /** An array of labels for the legend. */
  legendLabels: _propTypes.default.arrayOf(_propTypes.default.node),
  /** Optional suffix for y-axis labels. */
  suffix: _propTypes.default.string,
  /** Optional width of the chart (px). */
  width: _propTypes.default.number,
  /** Optional number of ticks for the X axis. Defaults to length of first data series. */
  xTicks: _propTypes.default.number,
  /** Optional range for y-axis. */
  yRange: _propTypes.default.arrayOf(_propTypes.default.number),
  /** Optional number of ticks for the Y axis. */
  yTicks: _propTypes.default.number
};
LineChart.defaultProps = {
  suffix: '',
  yTicks: 5
};
var _default = (0, _compose.default)(_ChartResponsiveWrapper.default, (0, _withStyles.default)(styles))(LineChart);
exports.default = _default;