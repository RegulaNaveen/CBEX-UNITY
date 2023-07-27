"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.topRoundedRect = exports.getDataMargins = exports.default = exports.ClusterColumnChart = void 0;
require("d3-transition");
var _compose = _interopRequireDefault(require("@hypnosphi/recompose/compose"));
var _withStyles = _interopRequireDefault(require("@mui/styles/withStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
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
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
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
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
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
  xAxis: {
    textAnchor: 'middle',
    color: _colors.neutral7,
    '@global path': {
      fill: 'none',
      display: 'none'
    },
    '@global line': {
      fill: 'none',
      display: 'none'
    }
  },
  yAxis: {
    fontSize: 14,
    textAnchor: 'end',
    color: _colors.neutral7,
    '@global line': {
      fill: 'none',
      stroke: _colors.neutral4,
      strokeWidth: 1,
      strokeDasharray: '3 2',
      transform: 'translate(6px)'
    },
    '@global text': {
      fontFamily: _typography.fontFamily
    },
    '@global g:first-of-type line': {
      display: 'none'
    }
  },
  label: {
    fontSize: 14,
    fontFamily: _typography.fontFamily
  },
  text: {
    fontFamily: _typography.fontFamily,
    color: _colors.neutral7,
    fill: _colors.neutral7,
    fontSize: 14
  }
};
var margins = {
  top: 5,
  right: 20,
  bottom: 22,
  left: 40
};
var radius = 4;
var spacing = 4;
var getDataMargins = function getDataMargins(keysLength, dataLength, chartWidth, columnWidth) {
  // calculate left and right margins
  var dataWidth = (chartWidth - margins.left - margins.right) / dataLength;
  var dataRemainder = Math.min((dataWidth - (columnWidth + spacing) * keysLength - spacing) / 2, 100);
  var widthAdjuster = Math.min((chartWidth - 400) / 500, 2);

  // four or more clusters
  var leftAdjuster = 0;
  var rightAdjuster = (1 - widthAdjuster) * keysLength * 5 + (1 - widthAdjuster) * 10 / keysLength;

  //adjust for highly populated charts
  if (keysLength > 4 && dataLength > 4) {
    rightAdjuster += (keysLength - 4) * 4 + (dataLength - 4) * 5;
  }

  // three clusters
  else if (dataLength === 3) {
    dataRemainder = 0;
    leftAdjuster = Math.max(widthAdjuster * 80 - (keysLength - 2) * 10, 0);
    rightAdjuster = -widthAdjuster * 160 + (keysLength - 2) * 10;
  }

  // two clusters
  else if (dataLength === 2) {
    dataRemainder = -dataRemainder / 3;
    leftAdjuster = Math.max(widthAdjuster * 10 - (keysLength - 2) * 5, 0);
    rightAdjuster = dataRemainder * 1.67 + (keysLength - 2) * 10;
  }

  // one cluster
  else if (dataLength === 1) {
    dataRemainder = 0;
    rightAdjuster = 0;
  }
  return {
    left: leftAdjuster,
    right: rightAdjuster,
    remainder: dataRemainder,
    dataWidth: dataWidth
  };
};
exports.getDataMargins = getDataMargins;
var getFlattenedData = function getFlattenedData(data) {
  return data.reduce(function (accumulator, current) {
    var entries = Object.entries(current.data[0]).map(function (kvPair) {
      return [].concat(_toConsumableArray(kvPair), [current.label]);
    });
    return [].concat(_toConsumableArray(accumulator), _toConsumableArray(entries));
  }, []);
};
var isColumnChart = function isColumnChart(data) {
  return Object.keys(data[0].data[0]).length === 1;
};
var getTooltipOffset = function getTooltipOffset(isCC, x, y, isZero, isNullish, popper) {
  // Several combination of units supported to specify the offset.
  // Docs: https://popper.js.org/popper-documentation.html#modifiers..offset
  var num = isZero ? 5 : isNullish || isCC ? 13 : 9;
  var offsetX = x + num - popper.width / 2;
  var offsetY = isZero ? isCC ? -y : -y - 34 : -y - popper.height / 2 + (isCC ? 45 : 14);
  return [offsetX, offsetY];
};
var topRoundedRect = function topRoundedRect(x, y, width, height, radius) {
  return !isNaN(y) ? "M ".concat(x, " ").concat(y + radius, " a ").concat(radius, " ").concat(radius, " 0 0 1 ").concat(radius, " -").concat(radius, " h ").concat(width - 2 * radius, " a ").concat(radius, " ").concat(radius, " 0 0 1 ").concat(radius, " ").concat(radius, " v ").concat(height - 2 * radius, " h -").concat(width, " z") : "M".concat(x + 30, ",", 15, "h0");
};
exports.topRoundedRect = topRoundedRect;
var ClusterColumnChart = /*#__PURE__*/function (_React$Component) {
  _inherits(ClusterColumnChart, _React$Component);
  var _super = _createSuper(ClusterColumnChart);
  function ClusterColumnChart() {
    var _this;
    _classCallCheck(this, ClusterColumnChart);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "node", /*#__PURE__*/_react.default.createRef());
    _defineProperty(_assertThisInitialized(_this), "legendRef", /*#__PURE__*/_react.default.createRef());
    _defineProperty(_assertThisInitialized(_this), "state", {
      flattenedData: [],
      hideAnimation: _this.props.hideAnimation,
      hoveredColumnIndex: -1,
      hoveredColumnX: 0,
      hoveredColumnY: 0,
      legendHeight: 0,
      tooltipOpen: false,
      initialParentHeight: _this.props.parentHeight
    });
    _defineProperty(_assertThisInitialized(_this), "onMouseOver", function (allColumns) {
      var self = _assertThisInitialized(_this);
      return function (_, index) {
        var _this$getBBox = this.getBBox(),
          x = _this$getBBox.x,
          y = _this$getBBox.y;
        self.setState({
          hoveredColumnIndex: index,
          hoveredColumnX: x,
          hoveredColumnY: y,
          tooltipOpen: true
        });
        allColumns.classed('unfade', false);
        allColumns.classed('fade', true);
        allColumns.filter(function (_, i) {
          return i === index;
        }).classed('nofade', true);
      };
    });
    _defineProperty(_assertThisInitialized(_this), "onMouseOut", function (allColumns) {
      var self = _assertThisInitialized(_this);
      return function () {
        self.setState({
          tooltipOpen: false
        });
        allColumns.classed('fade', false);
        allColumns.classed('nofade', false);
        allColumns.classed('unfade', true);
      };
    });
    _defineProperty(_assertThisInitialized(_this), "createClusterColumnChart", function () {
      var node = _this.node.current;
      var _this$props = _this.props,
        classes = _this$props.classes,
        data = _this$props.data,
        parentWidth = _this$props.parentWidth,
        width = _this$props.width,
        yTicks = _this$props.yTicks,
        suffix = _this$props.suffix,
        height = _this$props.height;
      var _this$state = _this.state,
        hideAnimation = _this$state.hideAnimation,
        legendHeight = _this$state.legendHeight,
        initialParentHeight = _this$state.initialParentHeight;
      var chartHeight = (height !== null && height !== void 0 ? height : initialParentHeight) - legendHeight;
      var chartWidth = width !== null && width !== void 0 ? width : parentWidth;
      var keys = Object.keys(data[0].data[0]);
      var isCC = isColumnChart(data);
      var columnWidth = isCC ? 24 : 16;

      // X-AXIS
      var dataMargins = getDataMargins(keys.length, data.length, chartWidth, columnWidth);
      var leftMargin = 0 - dataMargins.remainder + dataMargins.left + 20;
      var rightMargin = chartWidth - margins.left - margins.right - 22 + dataMargins.remainder * 2 + dataMargins.right;

      // build x-axis
      var x = (0, _d3Scale.scaleBand)().rangeRound([leftMargin, rightMargin]).domain(_toConsumableArray(Array(data.length).keys()));

      // center x-axis labels
      var labelAdjuster = 1 / (-data.length * 2);
      var labelOffset = labelAdjuster * (rightMargin - chartWidth - leftMargin) + 27 + data.length;
      if (data.length === 3) {
        labelOffset -= 1;
      } else if (data.length === 2) {
        labelOffset -= 5;
      } else if (data.length === 1) {
        labelOffset -= 20;
      }
      var labelX = labelAdjuster * data.length + labelOffset;
      var xAxis = function xAxis(g) {
        return g.attr('transform', "translate(".concat(labelX, ", ").concat(chartHeight - margins.bottom, ")")).attr('class', (0, _classnames.default)(classes.xAxis, classes.label)).call((0, _d3Axis.axisBottom)(x).tickFormat(function (i) {
          return data[i].label;
        })).call(function (g) {
          return g.select('.domain').remove();
        });
      };
      (0, _d3Selection.select)(node).append('g').call(xAxis);

      // Y-AXIS
      var yData = data.reduce(function (arr, item) {
        return [].concat(_toConsumableArray(arr), _toConsumableArray(Object.values(item.data[0])));
      }, []).filter(function (value) {
        return !(0, _isNullish.default)(value);
      });
      var y = (0, _d3Scale.scaleLinear)().range([chartHeight - margins.bottom - margins.top, 0]).domain([0, Math.max.apply(Math, _toConsumableArray(yData)) * 1.2]);
      var yAxis = function yAxis(g) {
        return g.attr('transform', "translate(".concat(margins.left, ", ").concat(margins.top, ")")).attr('class', classes.yAxis).call((0, _d3Axis.axisLeft)(y).ticks(yTicks).tickSize(margins.left - chartWidth).tickFormat(function (d) {
          return "".concat(d).concat(suffix);
        })).call(function (g) {
          return g.select('.domain').remove();
        });
      };
      (0, _d3Selection.select)(node).append('g').call(yAxis);

      // COLUMNS
      var dataNode = (0, _d3Selection.select)(node).append('g');

      // Text
      var textNode = (0, _d3Selection.select)(node).append('g');

      // cluster properties
      data.forEach(function (d, i) {
        var clusterAreaX = x(i) + margins.left;
        var clusterAreaW = dataMargins.dataWidth - radius;
        var clusterW = (columnWidth + spacing) * keys.length - spacing;

        // column properties
        keys.forEach(function (key, i) {
          var colRadius = radius;
          var colHi = radius * 2;
          var colYi = y(0) + margins.top - radius;
          var colX = clusterAreaX + clusterAreaW / 2 - clusterW / 2 + (columnWidth + spacing) * i;
          var colYf = y(d.data[0][key] || 0) + margins.top;
          var colHf = y(0) - y(d.data[0][key] || 0) + radius;

          // styles for very short columns
          if (colHf - radius < radius) {
            colRadius = colHf - radius;
            colHf = colHi = colRadius * 2;
            colYi = colYf;
          }

          // append and animate column
          dataNode.append('path').attr('class', classes.barRect).attr('d', topRoundedRect(colX, hideAnimation ? colYf : colYi, columnWidth, hideAnimation ? colHf : colHi, colRadius)).attr('opacity', hideAnimation ? 1 : 0).attr('fill', _colors.dataVizColors[i]).transition().ease(_d3Ease.easeCubic).duration(600).attr('d', topRoundedRect(colX, colYf, columnWidth, colHf, colRadius)).attr('opacity', 1);

          // style and position text
          var num = (0, _isNullish.default)(d.data[0][key]) ? isCC ? 0 : -4 : isCC ? 7 : 4;
          textNode.append('text').attr('class', classes.text).attr('x', colX + num).attr('y', y(0) + 5).text(d.data[0][key] === 0 ? '0' : (0, _isNullish.default)(d.data[0][key]) ? 'N/A' : '');
        });
      });
      var allColumns = (0, _d3Selection.select)(node).selectAll('path');
      allColumns.on('mouseover', _this.onMouseOver(allColumns)).on('mouseout', _this.onMouseOut(allColumns));
      textNode.selectAll('text').on('mouseover', _this.onMouseOver(allColumns)).on('mouseout', _this.onMouseOut(allColumns));
    });
    _defineProperty(_assertThisInitialized(_this), "calculateLegendHeight", function () {
      var _this$legendRef, _this$legendRef$curre;
      var legendHeight = _this.state.legendHeight;
      var height = (_this$legendRef = _this.legendRef) === null || _this$legendRef === void 0 ? void 0 : (_this$legendRef$curre = _this$legendRef.current) === null || _this$legendRef$curre === void 0 ? void 0 : _this$legendRef$curre.getBoundingClientRect().height;
      var newLegendHeight = height !== null && height !== void 0 ? height : 0;
      if (newLegendHeight !== legendHeight) {
        _this.setState({
          legendHeight: newLegendHeight
        });
      }
    });
    return _this;
  }
  _createClass(ClusterColumnChart, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var data = this.props.data;
      this.setState({
        flattenedData: getFlattenedData(data)
      });
      this.createClusterColumnChart();
      this.calculateLegendHeight();
      window && window.addEventListener('resize', this.calculateLegendHeight);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // if props changed, reset chart for responsive rendering
      if (prevProps !== this.props) {
        (0, _d3Selection.select)(this.node.current).selectAll('*').remove();
        var hideAnimation = this.state.hideAnimation;
        !hideAnimation && this.setState({
          hideAnimation: true
        });
        this.createClusterColumnChart();
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
      var _flattenedData$hovere;
      var _this$props2 = this.props,
        width = _this$props2.width,
        parentWidth = _this$props2.parentWidth,
        data = _this$props2.data,
        height = _this$props2.height,
        suffix = _this$props2.suffix,
        classes = _this$props2.classes;
      var _this$state2 = this.state,
        flattenedData = _this$state2.flattenedData,
        legendHeight = _this$state2.legendHeight,
        initialParentHeight = _this$state2.initialParentHeight,
        hoveredColumnX = _this$state2.hoveredColumnX,
        hoveredColumnY = _this$state2.hoveredColumnY,
        hoveredColumnIndex = _this$state2.hoveredColumnIndex,
        tooltipOpen = _this$state2.tooltipOpen;
      var isCC = isColumnChart(data);
      var legendLabels = isCC ? undefined : Object.keys(data[0].data[0]);
      var _ref = (_flattenedData$hovere = flattenedData[hoveredColumnIndex]) !== null && _flattenedData$hovere !== void 0 ? _flattenedData$hovere : [],
        _ref2 = _slicedToArray(_ref, 3),
        group = _ref2[0],
        value = _ref2[1],
        label = _ref2[2];
      return /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
        title: (0, _isNullish.default)(value) ? 'Not available' : "".concat(new Intl.NumberFormat('en-US').format(value)).concat(suffix) // eg: '50%'
        ,
        subtitle: isCC ? label : "".concat(label, ", ").concat(group),
        open: tooltipOpen,
        placement: "top-start",
        PopperProps: {
          modifiers: [{
            name: 'offset',
            options: {
              offset: function offset(_ref3) {
                var popper = _ref3.popper;
                return getTooltipOffset(isCC, hoveredColumnX, hoveredColumnY, value === 0, (0, _isNullish.default)(value), popper);
              }
            }
          }, {
            name: 'flip',
            enabled: false
          }]
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          width: width !== null && width !== void 0 ? width : parentWidth
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        ref: this.legendRef
      }, legendLabels && /*#__PURE__*/_react.default.createElement(_ChartLegend.default, {
        shape: "square",
        legendLabels: legendLabels
      })), /*#__PURE__*/_react.default.createElement("svg", {
        ref: this.node,
        className: classes.root,
        width: width !== null && width !== void 0 ? width : parentWidth,
        height: (height !== null && height !== void 0 ? height : initialParentHeight) - legendHeight
      })));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps) {
      var data = nextProps.data;
      return {
        flattenedData: getFlattenedData(data)
      };
    }
  }]);
  return ClusterColumnChart;
}(_react.default.Component);
exports.ClusterColumnChart = ClusterColumnChart;
ClusterColumnChart.propTypes = {
  /** JSS styles object.
   * @ignore */
  classes: _propTypes.default.object.isRequired,
  /** Data in an array, should be formatted to: [{obj}, {obj}, ...] */
  data: function data(props, propName, componentName) {
    _propTypes.default.checkPropTypes(_defineProperty({}, propName, _propTypes.default.array.isRequired), props, propName, componentName);
    if (props.data && Array.isArray(props.data)) {
      var labels = props.data.map(function (item) {
        return item.label;
      });
      var _iterator = _createForOfIteratorHelper(labels.entries()),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
            i = _step$value[0],
            label = _step$value[1];
          if (labels.indexOf(label) !== i) {
            return new Error("The prop `".concat(propName, "` in `").concat(componentName, "` has the duplicate label `").concat(label, "`. All labels should be unique."));
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  },
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
ClusterColumnChart.defaultProps = {
  hideAnimation: false,
  suffix: '',
  yTicks: 5
};
var _default = (0, _compose.default)(_ChartResponsiveWrapper.default, (0, _withStyles.default)(styles))(ClusterColumnChart);
exports.default = _default;