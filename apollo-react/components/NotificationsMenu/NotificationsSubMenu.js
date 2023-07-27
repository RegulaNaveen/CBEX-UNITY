"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _react = _interopRequireDefault(require("react"));
var _Cog = _interopRequireDefault(require("../../icons/Cog"));
var _IconMenuButton = _interopRequireDefault(require("../IconMenuButton"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var styles = {
  button: {
    marginRight: 7
  },
  smallMenuItem: {
    height: 32,
    fontSize: 14
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var NotificationsSubMenu = function NotificationsSubMenu(_ref) {
  var actionsMenuItems = _ref.actionsMenuItems;
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_IconMenuButton.default, {
    id: "apollo-react-notifications-actions-menu",
    className: classes.button,
    size: "small",
    menuItems: actionsMenuItems,
    placement: "bottom-end"
  }, /*#__PURE__*/_react.default.createElement(_Cog.default, {
    fontSize: "small"
  }));
};
var _default = NotificationsSubMenu;
exports.default = _default;