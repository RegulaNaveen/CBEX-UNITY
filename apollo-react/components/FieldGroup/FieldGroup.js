"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FieldGroup = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _Typography = _interopRequireDefault(require("../Typography"));
var _excluded = ["children", "className", "header"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  root: {
    border: "1px solid ".concat(_colors.neutral4),
    borderRadius: 4
  },
  header: {
    backgroundColor: _colors.neutral1,
    padding: 16,
    lineHeight: 32,
    borderBottom: "1px solid ".concat(_colors.neutral4),
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  content: {
    padding: '24px 16px'
  },
  noHeader: {
    padding: '0px 16px'
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var FieldGroup = function FieldGroup(_ref) {
  var children = _ref.children,
    className = _ref.className,
    header = _ref.header,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _classnames.default)(classes.root, className)
  }, rest), header && /*#__PURE__*/_react.default.createElement("div", {
    className: classes.header
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "title1"
  }, header)), /*#__PURE__*/_react.default.createElement("div", {
    className: header ? classes.content : classes.noHeader
  }, children));
};
exports.FieldGroup = FieldGroup;
FieldGroup.propTypes = {
  /** The content of the component. */
  children: _propTypes.default.node,
  /** The title of the component. */
  header: _propTypes.default.node
};
var _default = FieldGroup;
exports.default = _default;