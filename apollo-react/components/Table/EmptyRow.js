"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.EmptyRow = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _Typography = _interopRequireDefault(require("../Typography"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var styles = {
  root: {
    background: 'transparent !important',
    '& td': {
      textAlign: 'center',
      padding: 0
    }
  },
  text: {
    color: _colors.neutral7
  },
  middleAlign: {
    verticalAlign: 'middle'
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var EmptyRow = function EmptyRow(_ref) {
  var _ref$colspan = _ref.colspan,
    colspan = _ref$colspan === void 0 ? 1 : _ref$colspan,
    _ref$text = _ref.text,
    text = _ref$text === void 0 ? 'No data to display' : _ref$text,
    img = _ref.img,
    height = _ref.height,
    alt = _ref.alt,
    content = _ref.content;
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement("tbody", null, /*#__PURE__*/_react.default.createElement("tr", {
    className: classes.root
  }, /*#__PURE__*/_react.default.createElement("td", {
    colSpan: colspan,
    style: {
      height: height
    },
    className: classes.middleAlign
  }, content || /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, typeof img === 'string' ? /*#__PURE__*/_react.default.createElement("img", {
    src: img,
    width: 80,
    height: 80,
    alt: alt
  }) : img, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "body1",
    className: classes.text
  }, text)))));
};
exports.EmptyRow = EmptyRow;
var _default = EmptyRow;
exports.default = _default;