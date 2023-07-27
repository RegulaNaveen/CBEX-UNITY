"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.StepIcon = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _Check = _interopRequireDefault(require("../../icons/Check"));
var _typography = require("../../typography");
var _SvgIcon = _interopRequireDefault(require("../SvgIcon"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var styles = {
  root: {
    color: _colors.neutral5,
    height: 24
  },
  active: {
    color: _colors.utilityPositive
  },
  completed: {
    color: _colors.utilityPositive
  },
  svgText: {
    fontFamily: _typography.fontFamily,
    fontSize: 16,
    fill: _colors.white
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var StepIcon = function StepIcon(_ref) {
  var active = _ref.active,
    completed = _ref.completed,
    icon = _ref.icon;
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(classes.root, _defineProperty({}, classes.active, active))
  }, completed ? /*#__PURE__*/_react.default.createElement(_Check.default, {
    className: classes.completed
  }) : /*#__PURE__*/_react.default.createElement(_SvgIcon.default, null, /*#__PURE__*/_react.default.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "12"
  }), /*#__PURE__*/_react.default.createElement("text", {
    className: classes.svgText,
    x: "12",
    y: "17",
    textAnchor: "middle"
  }, icon)));
};
exports.StepIcon = StepIcon;
var _default = StepIcon;
exports.default = _default;