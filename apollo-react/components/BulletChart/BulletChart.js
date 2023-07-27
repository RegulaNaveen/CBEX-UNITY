"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rightRoundedRect = exports.getTooltipOffset = exports.formatNumber = exports.default = exports.BulletChart = void 0;
require("d3-transition");
var _compose = _interopRequireDefault(require("@hypnosphi/recompose/compose"));
var _withStyles = _interopRequireDefault(require("@mui/styles/withStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
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
var _ChartLegend = _interopRequireDefault(require("../ChartLegend"));
var _Tooltip = _interopRequireDefault(require("../Tooltip"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
    display: 'block'
  },
  barRect: {
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
  primaryBar: {
    fill: _colors.dataVizColors[0]
  },
  secondaryBar: {
    fill: _colors.neutral4
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
    }
  },
  label: {
    textAnchor: 'start',
    color: _colors.neutral7,
    fill: _colors.neutral7,
    fontSize: 14,
    lineHeight: 1.71,
    fontFamily: _typography.fontFamily
  },
  xAxis: {
    textAnchor: 'middle',
    '@global line': {
      fill: 'none',
      stroke: _colors.neutral4,
      strokeWidth: 1,
      shapeRendering: 'crispEdges',
      strokeDasharray: '3 2',
      transition: 'fill 0.3s'
    },
    '@global text': {
      fontFamily: _typography.fontFamily,
      color: _colors.neutral7,
      fontSize: 14
    }
  }
};

//this should be in utils
var rightRoundedRect = function rightRoundedRect(x, y, width, height, radius) {
  return width ? "M".concat(x, ",").concat(y, "h").concat(width - radius, "a").concat(radius, ",").concat(radius, " 0 0 1 ").concat(radius, ",").concat(radius, "v").concat(height - 2 * radius, "a").concat(radius, ",").concat(radius, " 0 0 1 ").concat(-radius, ",").concat(radius, "h").concat(radius - width, "z") : "M".concat(x + 30, ",").concat(y + 15, "h0");
};

//this should be in utils
exports.rightRoundedRect = rightRoundedRect;
var formatNumber = function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num;
};
exports.formatNumber = formatNumber;
var getTooltipOffset = function getTooltipOffset(node, hoveredBulletIndex, width, hasZero, isNullish, popper) {
  if (node) {
    var allBars = (0, _d3Selection.select)(node).selectAll('path');
    if (allBars.nodes()[hoveredBulletIndex + 1]) {
      var bbox1 = allBars.nodes()[hoveredBulletIndex].getBBox();
      var bbox2 = allBars.nodes()[hoveredBulletIndex + 1].getBBox();
      var extraOffsetX = width ? 15 : 18; // different for fixed and responsive.
      var offsetX = -(node.getBBox().width - (hasZero ? 7 : isNullish ? 21 : Math.max(bbox1.width, bbox2.width))) - extraOffsetX; // distance from edge to longest bar.
      var offsetY = bbox1.y - popper.height / 2 + bbox1.height / 2;
      return [offsetY, offsetX];
    }
  }
  return [0, 0];
};
exports.getTooltipOffset = getTooltipOffset;
var BulletChart = /*#__PURE__*/function (_React$Component) {
  _inherits(BulletChart, _React$Component);
  var _super = _createSuper(BulletChart);
  function BulletChart() {
    var _this;
    _classCallCheck(this, BulletChart);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "node", /*#__PURE__*/_react.default.createRef());
    _defineProperty(_assertThisInitialized(_this), "state", {
      legendHeight: 40,
      initialParentHeight: _this.props.parentHeight,
      hoveredBulletIndex: 0,
      tooltipOpen: false
    });
    _defineProperty(_assertThisInitialized(_this), "withAffix", function (num) {
      return "".concat(formatNumber(num)).concat(_this.props.suffix);
    });
    _defineProperty(_assertThisInitialized(_this), "renderBulletChart", function () {
      var node = _this.node.current;
      var _this$props = _this.props,
        classes = _this$props.classes,
        data = _this$props.data,
        width = _this$props.width,
        parentWidth = _this$props.parentWidth,
        height = _this$props.height;
      var _this$state = _this.state,
        legendHeight = _this$state.legendHeight,
        initialParentHeight = _this$state.initialParentHeight;
      var chartHeight = (height !== null && height !== void 0 ? height : initialParentHeight) - legendHeight - 24;
      var chartWidth = (width !== null && width !== void 0 ? width : parentWidth) - 30;
      var dataKeys = Object.keys(data[0]);

      // define X position of each inner component
      var x = (0, _d3Scale.scaleLinear)().rangeRound([0, chartWidth]).domain([0, (0, _d3Array.max)(data, function (d) {
        return (0, _d3Array.max)(d[dataKeys[1]]);
      })]);

      // define Y position of each inner component
      var y = (0, _d3Scale.scaleBand)().domain(data.map(function (d) {
        return d[dataKeys[0]];
      })).rangeRound([28, chartHeight - 30]).paddingInner(1).paddingOuter(data.length >= 4 ? 0 : 1).align(0.5);

      // configure X axis
      var xAxis = function xAxis(g) {
        return g.attr('transform', "translate(0, ".concat(chartHeight, ")")).attr('class', classes.xAxis).attr('height', chartHeight).call((0, _d3Axis.axisBottom)(x).ticks(4).tickSize(-chartHeight)).call(function (g) {
          g.select('g line').remove();
          g.select('.domain').remove();
          g.selectAll('g text').attr('transform', 'translate(0, 8)').text(_this.withAffix);
          g.select('g text').attr('transform', 'translate(10, 8)');
        });
      };

      // configure Y axis
      var yAxis = function yAxis(g) {
        return g.attr('transform', 'translate(8, -10)').attr('class', (0, _classnames.default)(classes.yAxis, classes.label)).call((0, _d3Axis.axisLeft)(y)).call(function (g) {
          return g.select('.domain').remove();
        });
      };

      // add Y axis to SVG
      (0, _d3Selection.select)(node).append('g').call(yAxis);

      // add X axis to SVG
      (0, _d3Selection.select)(node).append('g').call(xAxis);

      // loop thru data for inner and outer bar
      data.forEach(function (d, i) {
        (0, _d3Selection.select)(node).append('path').attr('class', (0, _classnames.default)(classes.barRect, classes.secondaryBar)).attr('i', i);
        (0, _d3Selection.select)(node).append('path').attr('class', (0, _classnames.default)(classes.barRect, classes.primaryBar)).attr('i', i);
      });

      // style and position primary Bars
      (0, _d3Selection.select)(node).selectAll('.' + classes.primaryBar).data(data).transition().ease(_d3Ease.easeCubic).duration(600).attr('d', function (d) {
        return rightRoundedRect(0, y(d[dataKeys[0]]) + 8, d[dataKeys[1]][0] ? x(d[dataKeys[1]][0]) : 0, 16, 4);
      }).attr('opacity', 1);

      // style and position secondary Bars
      (0, _d3Selection.select)(node).selectAll('.' + classes.secondaryBar).data(data).transition().ease(_d3Ease.easeCubic).duration(600).attr('d', function (d) {
        return rightRoundedRect(0, y(d[dataKeys[0]]), d[dataKeys[1]][1] ? x(d[dataKeys[1]][1]) : 0, 32, 4);
      }).attr('opacity', 1);

      // hover effect
      var allBars = (0, _d3Selection.select)(node).selectAll('path');
      allBars.on('mouseover', _this.onMouseOver(allBars));
      allBars.on('mouseout', _this.onMouseOut(allBars));

      // add a text element for each bar
      var text = (0, _d3Selection.select)(node).append('g').selectAll('text').data(data).enter().append('text');

      // style and position text
      text.attr('class', classes.label).attr('x', 0).attr('y', function (d) {
        return y(d[dataKeys[0]]) + 20;
      }).text(function (d) {
        return d[dataKeys[1]][0] === 0 && !d[dataKeys[1]][1] || d[dataKeys[1]][1] === 0 && !d[dataKeys[1]][0] ? '0' : (0, _isNullish.default)(d[dataKeys[1]][0]) && (0, _isNullish.default)(d[dataKeys[1]][1]) ? 'N/A' : '';
      }).on('mouseover', _this.onMouseOver(allBars, true)).on('mouseout', _this.onMouseOut(allBars));
    });
    _defineProperty(_assertThisInitialized(_this), "calculateLegendHeight", function () {
      var _this$legendRef$getBo, _this$legendRef;
      var legendHeight = _this.state.legendHeight;
      var newLegendHeight = (_this$legendRef$getBo = (_this$legendRef = _this.legendRef) === null || _this$legendRef === void 0 ? void 0 : _this$legendRef.getBoundingClientRect().height) !== null && _this$legendRef$getBo !== void 0 ? _this$legendRef$getBo : 40;
      if (newLegendHeight !== legendHeight) {
        _this.setState({
          legendHeight: newLegendHeight
        });
      }
    });
    _defineProperty(_assertThisInitialized(_this), "onMouseOver", function (allBars, isText) {
      return function (data, i) {
        allBars.classed('unfade', false);
        allBars.classed('fade', true);
        allBars.filter("[i='".concat(Math.floor(i / 2), "']")).classed('nofade', true);
        _this.setState({
          hoveredBulletIndex: (isText ? i : Math.floor(i / 2)) * 2,
          tooltipOpen: true
        });
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
  _createClass(BulletChart, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.renderBulletChart();
      this.calculateLegendHeight();
      window && window.addEventListener('resize', this.calculateLegendHeight);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var legendHeight = this.state.legendHeight;
      if (this.props !== prevProps || legendHeight !== prevState.legendHeight) {
        (0, _d3Selection.select)(this.node.current).selectAll('*').remove();
        this.renderBulletChart();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window && window.removeEventListener('resize', this.calculateLegendHeight);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props2 = this.props,
        parentWidth = _this$props2.parentWidth,
        width = _this$props2.width,
        legendLabels = _this$props2.legendLabels,
        height = _this$props2.height,
        suffix = _this$props2.suffix,
        data = _this$props2.data,
        classes = _this$props2.classes;
      var _this$state2 = this.state,
        legendHeight = _this$state2.legendHeight,
        initialParentHeight = _this$state2.initialParentHeight,
        hoveredBulletIndex = _this$state2.hoveredBulletIndex,
        tooltipOpen = _this$state2.tooltipOpen;
      var legendColors = [_colors.dataVizColors[0], _colors.neutral4];
      var curDataItem = data[Math.floor(hoveredBulletIndex / 2)];
      var key = Object.keys(curDataItem)[1];
      var hoveredBulletFirstValue = curDataItem[key][0];
      var hoveredBulletSecondValue = curDataItem[key][1];
      var hasZero = hoveredBulletFirstValue === 0 && !hoveredBulletSecondValue || hoveredBulletSecondValue === 0 && !hoveredBulletFirstValue;
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(r) {
          return _this2.legendRef = r;
        }
      }, /*#__PURE__*/_react.default.createElement(_ChartLegend.default, {
        shape: "square",
        legendLabels: legendLabels,
        legendColors: legendColors
      })), /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
        open: tooltipOpen,
        title: (0, _isNullish.default)(hoveredBulletFirstValue) ? 'Not available' : "".concat(new Intl.NumberFormat('en-US').format(hoveredBulletFirstValue)).concat(suffix),
        subtitle: legendLabels[0],
        extraLabels: [{
          title: (0, _isNullish.default)(hoveredBulletSecondValue) ? 'Not available' : "".concat(new Intl.NumberFormat('en-US').format(hoveredBulletSecondValue)).concat(suffix),
          subtitle: legendLabels[1]
        }],
        placement: "right-start",
        PopperProps: {
          modifiers: [{
            name: 'offset',
            options: {
              offset: function offset(_ref) {
                var popper = _ref.popper;
                return getTooltipOffset(_this2.node.current, hoveredBulletIndex, width, hasZero, (0, _isNullish.default)(hoveredBulletFirstValue) && (0, _isNullish.default)(hoveredBulletSecondValue), popper);
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
        ref: this.node,
        className: classes.root,
        width: width !== null && width !== void 0 ? width : parentWidth,
        height: (height !== null && height !== void 0 ? height : initialParentHeight) - legendHeight
      })));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, state) {
      var _nextProps$data;
      var hoveredBulletIndex = state.hoveredBulletIndex;
      if (((_nextProps$data = nextProps.data) === null || _nextProps$data === void 0 ? void 0 : _nextProps$data.length) <= Math.floor(hoveredBulletIndex / 2)) {
        return {
          hoveredBulletIndex: 0
        };
      }
      return null;
    }
  }]);
  return BulletChart;
}(_react.default.Component);
exports.BulletChart = BulletChart;
BulletChart.propTypes = {
  /** JSS styles object.
   * @ignore */
  classes: _propTypes.default.object.isRequired,
  /** Data in an array, should be formatted to: [{obj}, {obj}, ...] */
  data: _propTypes.default.arrayOf(_propTypes.default.object),
  /** The height of the chart. */
  height: _propTypes.default.number,
  /** An array of labels for the legend. */
  legendLabels: _propTypes.default.arrayOf(_propTypes.default.node),
  /** String to be added to the end of the value. */
  suffix: _propTypes.default.string,
  /** The width of the chart. */
  width: _propTypes.default.number
};
BulletChart.defaultProps = {
  suffix: '',
  legendLabels: ['Label', 'Label']
};
var _default = (0, _compose.default)(_ChartResponsiveWrapper.default, (0, _withStyles.default)(styles))(BulletChart);
exports.default = _default;