"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NotificationsMenu = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _Bell = _interopRequireDefault(require("../../icons/Bell"));
var _Badge = _interopRequireDefault(require("../Badge"));
var _Divider = _interopRequireDefault(require("../Divider"));
var _ListItem = _interopRequireDefault(require("../ListItem"));
var _NavigationBarButton = _interopRequireDefault(require("../NavigationBar/NavigationBarButton"));
var _PopperMenu = _interopRequireDefault(require("../PopperMenu"));
var _Typography = _interopRequireDefault(require("../Typography"));
var _NotificationsItem = _interopRequireDefault(require("./NotificationsItem"));
var _NotificationsSubMenu = _interopRequireDefault(require("./NotificationsSubMenu"));
var _useMenu3 = _interopRequireDefault(require("./useMenu"));
var _excluded = ["notifications", "notificationIdField", "onToggleRead", "onDelete", "onClick", "enableNewDesign", "headerText", "emptyText", "removeText", "markReadText", "markUnreadText", "actionsMenuItems"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  paper: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    width: 420
  },
  menuList: {
    paddingTop: 0,
    maxHeight: 485,
    overflowY: 'auto'
  },
  icon: {
    color: _colors.neutral7,
    minWidth: 0,
    marginRight: 16
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: 31,
    paddingTop: 16,
    paddingBottom: 4
  },
  emptyNotificationsMenu: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 260,
    flexDirection: 'column'
  },
  emptyText: {
    color: _colors.neutral7,
    marginBottom: 32
  },
  emptyIcon: {
    color: _colors.neutral7,
    fontSize: 47,
    marginBottom: 12
  },
  header: {
    lineHeight: '32px'
  },
  divider: {
    marginLeft: 30
  },
  dividerWithIcon: {
    marginLeft: 62
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var NotificationsMenu = function NotificationsMenu(_ref) {
  var _ref$notifications = _ref.notifications,
    notifications = _ref$notifications === void 0 ? [] : _ref$notifications,
    _ref$notificationIdFi = _ref.notificationIdField,
    notificationIdField = _ref$notificationIdFi === void 0 ? 'id' : _ref$notificationIdFi,
    onToggleRead = _ref.onToggleRead,
    onDelete = _ref.onDelete,
    onClick = _ref.onClick,
    enableNewDesign = _ref.enableNewDesign,
    _ref$headerText = _ref.headerText,
    headerText = _ref$headerText === void 0 ? 'Notifications' : _ref$headerText,
    _ref$emptyText = _ref.emptyText,
    emptyText = _ref$emptyText === void 0 ? 'All squeaky clean' : _ref$emptyText,
    _ref$removeText = _ref.removeText,
    removeText = _ref$removeText === void 0 ? 'Remove' : _ref$removeText,
    _ref$markReadText = _ref.markReadText,
    markReadText = _ref$markReadText === void 0 ? 'Mark as read' : _ref$markReadText,
    _ref$markUnreadText = _ref.markUnreadText,
    markUnreadText = _ref$markUnreadText === void 0 ? 'Mark as unread' : _ref$markUnreadText,
    actionsMenuItems = _ref.actionsMenuItems,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  var _useMenu = (0, _useMenu3.default)(false),
    _useMenu2 = _slicedToArray(_useMenu, 4),
    open = _useMenu2[0],
    anchorRef = _useMenu2[1],
    openMenu = _useMenu2[2],
    closeMenu = _useMenu2[3];
  var newNotificationCount = notifications.reduce(function (acc, _ref2) {
    var unread = _ref2.unread;
    return unread ? acc + 1 : acc;
  }, 0);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_NavigationBarButton.default, _extends({
    open: open,
    icon: /*#__PURE__*/_react.default.createElement(_Badge.default, {
      badgeContent: newNotificationCount
    }, /*#__PURE__*/_react.default.createElement(_Bell.default, null)),
    handleClick: openMenu,
    ref: anchorRef
  }, rest)), /*#__PURE__*/_react.default.createElement(_PopperMenu.default, {
    open: open,
    onClose: closeMenu,
    anchorEl: anchorRef.current,
    classes: {
      paper: classes.paper
    },
    placement: "bottom-end",
    MenuListProps: {
      classes: {
        root: classes.menuList
      }
    },
    popperOptions: {
      strategy: 'fixed'
    }
  }, /*#__PURE__*/_react.default.createElement(_ListItem.default, {
    className: classes.headerContainer
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "h3",
    className: classes.header
  }, headerText), actionsMenuItems && /*#__PURE__*/_react.default.createElement(_NotificationsSubMenu.default, {
    actionsMenuItems: actionsMenuItems
  })), notifications.map(function (notification, i) {
    return /*#__PURE__*/_react.default.createElement("div", {
      key: notification[notificationIdField] || notification.key || 'item' + i
    }, i !== 0 && /*#__PURE__*/_react.default.createElement(_Divider.default, {
      type: "light",
      className: (0, _classnames.default)(classes.divider, notification.icon && classes.dividerWithIcon)
    }), /*#__PURE__*/_react.default.createElement(_NotificationsItem.default, _extends({
      id: notification[notificationIdField],
      handleClose: closeMenu,
      onToggleRead: onToggleRead,
      onDelete: onDelete,
      onClick: onClick,
      removeText: removeText,
      markReadText: markReadText,
      markUnreadText: markUnreadText
    }, notification)));
  }), notifications.length === 0 && /*#__PURE__*/_react.default.createElement(_ListItem.default, {
    className: classes.emptyNotificationsMenu
  }, /*#__PURE__*/_react.default.createElement(_Bell.default, {
    className: classes.emptyIcon
  }), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    className: classes.emptyText
  }, emptyText))));
};
exports.NotificationsMenu = NotificationsMenu;
var _default = NotificationsMenu;
exports.default = _default;