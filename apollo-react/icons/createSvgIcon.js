"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createSvgIcon;
var _SvgIcon = _interopRequireDefault(require("@mui/material/SvgIcon"));
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var React = _interopRequireWildcard(require("react"));
var _excluded = ["fontSize", "className"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  fontSizeSmall: {
    fontSize: 19.22,
    padding: 0.4,
    boxSizing: 'content-box'
  },
  fontSizeExtraSmall: {
    fontSize: 16.8,
    padding: 0.1,
    boxSizing: 'content-box'
  }
};
var useStyles = (0, _makeStyles.default)(styles);
function createSvgIcon(path, displayName) {
  var Component = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (_ref, ref) {
    var fontSize = _ref.fontSize,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, _excluded);
    var classes = useStyles();
    return /*#__PURE__*/React.createElement(_SvgIcon.default, _extends({
      ref: ref,
      fontSize: fontSize === 'extraSmall' ? 'small' : fontSize,
      classes: {
        fontSizeSmall: classes.fontSizeSmall
      },
      className: fontSize === 'extraSmall' ? "".concat(classes.fontSizeExtraSmall, " ").concat(className) : className
    }, rest), path);
  }));
  if (process.env.NODE_ENV !== 'production') {
    Component.displayName = "".concat(displayName, "Icon");
  }
  Component.muiName = _SvgIcon.default.muiName;
  return Component;
}