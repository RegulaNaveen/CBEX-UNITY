"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FormControlLabel = void 0;
var _FormControlLabel = _interopRequireDefault(require("@mui/material/FormControlLabel"));
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _excluded = ["checked", "indeterminate", "size", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  checkedLabel: {
    color: "".concat(_colors.black, " !important"),
    fontWeight: 500
  },
  small: {
    '&.MuiFormControlLabel-label': {
      fontSize: 14,
      paddingTop: 2,
      paddingBottom: 2,
      lineHeight: '20px'
    }
  },
  root: {},
  label: {}
};
var useStyles = (0, _makeStyles.default)(styles);
var FormControlLabel = function FormControlLabel(_ref) {
  var checked = _ref.checked,
    indeterminate = _ref.indeterminate,
    size = _ref.size,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_FormControlLabel.default, _extends({
    classes: {
      root: classes.root,
      label: (0, _classnames.default)(classes.label, checked && classes.checkedLabel, indeterminate && classes.checkedLabel, size === 'small' && classes.small)
    }
  }, rest, {
    ref: ref
  }));
};
exports.FormControlLabel = FormControlLabel;
var _default = (0, _withRef.default)()(FormControlLabel);
exports.default = _default;