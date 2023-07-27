"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ChartLegend = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _typography = require("../../typography");
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _Typography = _interopRequireDefault(require("../Typography"));
var _excluded = ["className", "shape", "legendLabels", "legendColors", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  root: {
    fontFamily: _typography.fontFamily,
    paddingTop: 8,
    paddingBottom: 8
  },
  inlineBlock: {
    display: 'inline-block'
  },
  icon: {
    width: 16,
    height: 16,
    display: 'inline-block',
    position: 'relative',
    top: 4,
    marginRight: 8,
    borderRadius: 2
  },
  round: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
    marginLeft: 3,
    top: 2
  },
  label: {
    marginRight: 16,
    fontSize: 14,
    lineHeight: '24px',
    color: _colors.neutral8
  },
  roundLabel: {
    marginRight: 19
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var ChartLegend = function ChartLegend(_ref) {
  var className = _ref.className,
    shape = _ref.shape,
    legendLabels = _ref.legendLabels,
    _ref$legendColors = _ref.legendColors,
    legendColors = _ref$legendColors === void 0 ? _colors.dataVizColors : _ref$legendColors,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _classnames.default)(classes.root, className)
  }, rest, {
    ref: ref
  }), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "caption"
  }, legendLabels.map(function (label, i) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: classes.inlineBlock,
      key: label
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: (0, _classnames.default)(classes.icon, classes[shape]),
      style: {
        background: legendColors[i]
      }
    }), /*#__PURE__*/_react.default.createElement("span", {
      className: (0, _classnames.default)(classes.label, classes["".concat(shape, "Label")])
    }, label));
  })));
};
exports.ChartLegend = ChartLegend;
var _default = (0, _withRef.default)()(ChartLegend);
exports.default = _default;