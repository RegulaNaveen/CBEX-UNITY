"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Step = void 0;
var _Step = _interopRequireDefault(require("@mui/material/Step"));
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _excluded = ["box"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  box: {
    border: "1px solid ".concat(_colors.neutral4),
    marginBottom: 8,
    padding: '8px 8px 8px 16px',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center'
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var Step = function Step(_ref) {
  var box = _ref.box,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_Step.default, _extends({
    className: (0, _classnames.default)(box && ['apollo-theme-box', classes.box])
  }, rest));
};
exports.Step = Step;
Step.propTypes = {
  box: _propTypes.default.bool,
  completed: _propTypes.default.bool
};
var _default = Step;
exports.default = _default;