"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.IconComponent = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var styles = {
  icon: {
    marginRight: 8,
    marginLeft: -1,
    fontSize: '19.22px !important'
  },
  small: {
    fontSize: '16.8px !important',
    marginRight: 7
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var IconComponent = function IconComponent(_ref) {
  var icon = _ref.icon,
    size = _ref.size;
  var classes = useStyles();
  var ReactIcon = icon;
  var iconComponent = /*#__PURE__*/_react.default.isValidElement(icon) ? icon : /*#__PURE__*/_react.default.createElement(ReactIcon, null);
  return /*#__PURE__*/_react.default.cloneElement(iconComponent, {
    className: (0, _classnames.default)(classes.icon, classes[size])
  });
};
exports.IconComponent = IconComponent;
var _default = IconComponent;
exports.default = _default;