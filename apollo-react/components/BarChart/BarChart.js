"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rightRoundedRect = exports.getTooltipOffset = exports.getFormattedData = exports.formatNumber = exports.default = exports.BarChart = void 0;
require("d3-transition");
var _compose = _interopRequireDefault(require("@hypnosphi/recompose/compose"));
var _withStyles = _interopRequireDefault(require("@mui/styles/withStyles"));
var _d3Array = require("d3-array");
var _d3Axis = require("d3-axis");
var _d3Ease = require("d3-ease");
var _d3Scale = require("d3-scale");
var _d3Selection = require("d3-selection");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _typography = require("../../typography");
var _ChartResponsiveWrapper = _interopRequireDefault(require("../../utils/ChartResponsiveWrapper"));
var _isNullish = _interopRequireDefault(require("../../utils/isNullish"));
var _Tooltip = _interopRequireDefault(require("../Tooltip"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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
  svg: {
    display: 'block'
  },
  barRect: {
    transition: 'fill 0.3s',
    fill: _colors.dataVizColors[0],
    '&.fade': {
      opacity: 0.4,
      transition: 'opacity 0.2s'
    },
    '&.unfade': {
      opacity: 1,
      transition: 'opacity 0.2s'
    },
    '&.nofade': {
      opacity: 1
    }
  },
  yAxis: {
    textAnchor: 'start',
    '@global path': {
      fill: 'none',
      display: 'none'
    },
    '@global line': {
      fill: 'none',
      display: 'none'
    },
    '@global text': {
      color: _colors.neutral7,
      fontSize: 14,
      fontFamily: _typography.fontFamily
    }
  },
  xAxis: {
    textAnchor: 'middle',
    '@global line': {
      fill: 'none',
      stroke: _colors.neutral4,
      strokeWidth: 1,
      shapeRendering: 'crispEdges',
      strokeDasharray: '3 2'
    },
    '@global text': {
      fontFamily: _typography.fontFamily,
      color: _colors.neutral7,
      fontSize: 14
    }
  },
  text: {
    fontFamily: _typography.fontFamily,
    color: _colors.neutral7,
    fill: _colors.neutral7,
    fontSize: 14
  }
};
var rightRoundedRect = function rightRoundedRect(x, y, width, height, radius) {
  return width ? "M".concat(x, ",").concat(y, "h").concat(width - radius, "a").concat(radius, ",").concat(radius, " 0 0 1 ").concat(radius, ",").concat(radius, "v").concat(height - 2 * radius, "a").concat(radius, ",").concat(radius, " 0 0 1 ").concat(-radius, ",").concat(radius, "h").concat(radius - width, "z") : "M".concat(x, ",").concat(y, "h0");
};
exports.rightRoundedRect = rightRoundedRect;
var formatNumber = function formatNumber(num) {
  return num >= 1000000 && (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M' || num >= 1000 && (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K' || num;
};
exports.formatNumber = formatNumber;
var getFormattedData = function getFormattedData(data) {
  return data.map(Object.values);
};
exports.getFormattedData = getFormattedData;
var getTooltipOffset = function getTooltipOffset(node, hoveredBarIndex, isZero, isNullish, popper) {
  if (node) {
    var allBars = (0, _d3Selection.select)(node).selectAll('path');
    if (allBars.nodes()[hoveredBarIndex]) {
      var bbox = allBars.nodes()[hoveredBarIndex].getBBox();
      var offsetX = -(node.getBoundingClientRect().width - (isZero ? 7 : isNullish ? 22 : bbox.width)); // distance from edge to bar.
      var offsetY = bbox.y - popper.height / 2 + (bbox.height || 21) / 2;
      return [offsetY, offsetX];
    }
  }
  return [0, 0];
};
exports.getTooltipOffset = getTooltipOffset;
var BarChart = /*#__PURE__*/function (_React$Component) {
  _inherits(BarChart, _React$Component);
  var _super = _createSuper(BarChart);
  function BarChart() {
    var _this;
    _classCallCheck(this, BarChart);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "node", /*#__PURE__*/_react.default.createRef());
    _defineProperty(_assertThisInitialized(_this), "state", {
      tooltipOpen: false,
      formattedData: [],
      hoveredBarIndex: 0
    });
    _defineProperty(_assertThisInitialized(_this), "withAffix", function (num) {
      return "".concat(formatNumber(num)).concat(_this.props.suffix);
    });
    _defineProperty(_assertThisInitialized(_this), "onMouseOver", function (allBars) {
      return function (_, index) {
        _this.setState({
          hoveredBarIndex: index,
          tooltipOpen: true
        });
        allBars.classed('unfade', false);
        allBars.classed('fade', true);
        allBars.filter(function (_, i) {
          return i === index;
        }).classed('nofade', true);
      };
    });
    _defineProperty(_assertThisInitialized(_this), "onMouseOut", function (allBars) {
      return function () {
        allBars.classed('fade', false);
        allBars.classed('nofade', false);
        allBars.classed('unfade', true);
        _this.setState({
          tooltipOpen: false
        });
      };
    });
    return _this;
  }
  _createClass(BarChart, [{
    key: "renderChart",
    value: function renderChart() {
      var _this2 = this;
      var node = this.node.current;
      var _this$props = this.props,
        classes = _this$props.classes,
        data = _this$props.data,
        width = _this$props.width,
        parentWidth = _this$props.parentWidth,
        height = _this$props.height,
        parentHeight = _this$props.parentHeight,
        xRange = _this$props.xRange;
      var chartWidth = (width !== null && width !== void 0 ? width : parentWidth) - 30;
      var chartHeight = (height !== null && height !== void 0 ? height : parentHeight) - 24;
      var dataKeys = Object.keys(data[0]);

      // define X position of each inner component
      var x = (0, _d3Scale.scaleLinear)().rangeRound([0, chartWidth]).domain(xRange !== null && xRange !== void 0 ? xRange : [0, (0, _d3Array.max)(data, function (d) {
        return d[dataKeys[1]];
      })]);

      // define Y position of each inner component
      var y = (0, _d3Scale.scaleBand)().domain(data.map(function (d) {
        return d[dataKeys[0]];
      })).rangeRound([28, chartHeight - 30]).paddingInner(1).paddingOuter(data.length >= 5 ? 0 : data.length <= 3 ? 1 : 0.25).align(0.5);

      // configure X axis
      var xAxis = function xAxis(g) {
        return g.attr('transform', "translate(0, ".concat(chartHeight, ")")).attr('class', classes.xAxis).attr('height', chartHeight).call((0, _d3Axis.axisBottom)(x).ticks(4).tickSize(-chartHeight)).call(function (g) {
          g.select('g line').remove();
          g.select('.domain').remove();
          g.selectAll('g text').attr('transform', 'translate(0, 8)').text(_this2.withAffix);
          g.select('g text').attr('transform', 'translate(10, 8)');
        });
      };

      // configure Y axis
      var yAxis = function yAxis(g) {
        return g.attr('transform', 'translate(8, -10)').attr('class', classes.yAxis).call((0, _d3Axis.axisLeft)(y).tickSize(5)).call(function (g) {
          return g.select('.domain').remove();
        });
      };

      // add X axis to SVG
      (0, _d3Selection.select)(node).append('g').call(xAxis);

      // add Y axis to SVG
      (0, _d3Selection.select)(node).append('g').call(yAxis);

      // add a path element for each bar
      (0, _d3Selection.select)(node).selectAll('path').data(data).enter().append('path');

      // style and position Bars
      (0, _d3Selection.select)(node).selectAll('path').data(data).attr('class', classes.barRect).transition().ease(_d3Ease.easeCubic).duration(600).attr('d', function (d) {
        return rightRoundedRect(0, y(d[dataKeys[0]]), d[dataKeys[1]] ? x(d[dataKeys[1]]) : 0, 24, 4);
      }).attr('opacity', 1);

      // fade in/out hover effect
      var allBars = (0, _d3Selection.select)(node).selectAll('path');
      allBars.on('mouseover', this.onMouseOver(allBars)).on('mouseout', this.onMouseOut(allBars));

      // add a text element for each bar
      var text = (0, _d3Selection.select)(node).append('g').selectAll('text').data(data).enter().append('text');

      // style and position text
      text.attr('class', classes.text).attr('x', 0).attr('y', function (d) {
        return y(d[dataKeys[0]]) + 16;
      }).text(function (d) {
        return d[dataKeys[1]] === 0 ? '0' : (0, _isNullish.default)(d[dataKeys[1]]) ? 'N/A' : '';
      }).on('mouseover', this.onMouseOver(allBars)).on('mouseout', this.onMouseOut(allBars));
      this.setState({
        formattedData: getFormattedData(data)
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.renderChart();
    }

    // reset chart for responsive rendering
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props !== prevProps) {
        (0, _d3Selection.select)(this.node.current).selectAll('*').remove();
        this.renderChart();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _formattedData$hovere,
        _this3 = this;
      var _this$props2 = this.props,
        width = _this$props2.width,
        height = _this$props2.height,
        parentWidth = _this$props2.parentWidth,
        parentHeight = _this$props2.parentHeight,
        classes = _this$props2.classes,
        suffix = _this$props2.suffix;
      var _this$state = this.state,
        formattedData = _this$state.formattedData,
        hoveredBarIndex = _this$state.hoveredBarIndex,
        tooltipOpen = _this$state.tooltipOpen;
      var _ref = (_formattedData$hovere = formattedData[hoveredBarIndex]) !== null && _formattedData$hovere !== void 0 ? _formattedData$hovere : [],
        _ref2 = _slicedToArray(_ref, 2),
        title = _ref2[0],
        value = _ref2[1];
      return /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
        title: (0, _isNullish.default)(value) ? 'Not available' : "".concat(new Intl.NumberFormat('en-US').format(value)).concat(suffix),
        subtitle: title,
        open: tooltipOpen,
        placement: "right-start",
        PopperProps: {
          modifiers: [{
            name: 'offset',
            options: {
              offset: function offset(_ref3) {
                var popper = _ref3.popper;
                return getTooltipOffset(_this3.node.current, hoveredBarIndex, value === 0, (0, _isNullish.default)(value), popper);
              }
            }
          }, {
            name: 'flip',
            enabled: false
          }, {
            name: 'preventOverflow',
            enabled: false
          }, {
            name: 'hide',
            enabled: false
          }]
        }
      }, /*#__PURE__*/_react.default.createElement("svg", {
        className: classes.svg,
        ref: this.node,
        width: width !== null && width !== void 0 ? width : parentWidth,
        height: height !== null && height !== void 0 ? height : parentHeight
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, state) {
      var _nextProps$data;
      var hoveredBarIndex = state.hoveredBarIndex;
      if (((_nextProps$data = nextProps.data) === null || _nextProps$data === void 0 ? void 0 : _nextProps$data.length) <= hoveredBarIndex) {
        return {
          hoveredBarIndex: 0
        };
      }
      return null;
    }
  }]);
  return BarChart;
}(_react.default.Component);
exports.BarChart = BarChart;
BarChart.propTypes = {
  /** JSS styles object.
   * @ignore */
  classes: _propTypes.default.object.isRequired,
  /** Data in an array, should be formatted to: [{obj}, {obj}, ...] */
  data: _propTypes.default.arrayOf(_propTypes.default.object),
  /** The height of the chart. */
  height: _propTypes.default.number,
  /** String to be added to the end of the value. */
  suffix: _propTypes.default.string,
  /** The width of the chart. */
  width: _propTypes.default.number,
  /** Optional range for x-axis. */
  xRange: _propTypes.default.arrayOf(_propTypes.default.number)
};
BarChart.defaultProps = {
  suffix: ''
};
var _default = (0, _compose.default)(_ChartResponsiveWrapper.default, (0, _withStyles.default)(styles))(BarChart);
exports.default = _default;