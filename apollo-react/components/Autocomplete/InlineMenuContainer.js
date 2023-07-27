"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.InlineMenuContainer = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireDefault(require("react"));
var _excluded = ["className"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var paperStyles = {
  listBox: {
    border: 'none !important',
    boxShadow: 'none !important',
    margin: '8px -16px 0px !important',
    paddingBottom: 0,
    '& .MuiAutocomplete-option': {
      paddingLeft: 40
    },
    '& ul': {
      paddingTop: 0
    },
    '& svg': {
      marginTop: 0.5
    }
  }
};
var usePaperStyles = (0, _makeStyles.default)(paperStyles);
var InlineMenuContainer = function InlineMenuContainer(_ref) {
  var className = _ref.className,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = usePaperStyles();
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _classnames.default)(className, classes.listBox)
  }, rest));
};
exports.InlineMenuContainer = InlineMenuContainer;
var _default = InlineMenuContainer;
exports.default = _default;