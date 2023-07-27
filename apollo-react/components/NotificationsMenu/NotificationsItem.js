"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NotificationsItem = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _Email = _interopRequireDefault(require("apollo-react-icons/Email"));
var _EmailRead = _interopRequireDefault(require("apollo-react-icons/EmailRead"));
var _StatusDotSolid = _interopRequireDefault(require("apollo-react-icons/StatusDotSolid"));
var _Trash = _interopRequireDefault(require("apollo-react-icons/Trash"));
var _classnames = _interopRequireDefault(require("classnames"));
var _moment = _interopRequireDefault(require("moment"));
var _react = _interopRequireWildcard(require("react"));
var _shiitake = _interopRequireDefault(require("shiitake"));
var _colors = require("../../colors");
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _IconButton = _interopRequireDefault(require("../IconButton"));
var _ListItem = _interopRequireDefault(require("../ListItem"));
var _ListItemIcon = _interopRequireDefault(require("../ListItemIcon"));
var _ListItemText = _interopRequireDefault(require("../ListItemText"));
var _Tooltip = _interopRequireDefault(require("../Tooltip"));
var _Typography = _interopRequireDefault(require("../Typography"));
var _getTimestampAsText = _interopRequireDefault(require("./getTimestampAsText"));
var _excluded = ["id", "timestamp", "handleClose", "onClick", "icon", "header", "details", "onToggleRead", "onDelete", "unread", "removeText", "markReadText", "markUnreadText", "forwardedRef"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  listItem: {
    paddingBottom: 7,
    paddingTop: 11,
    paddingLeft: 8,
    color: _colors.neutral8,
    cursor: 'pointer',
    '&:hover, &:focus': {
      backgroundColor: _colors.primaryLight
    }
  },
  listItemUnread: {},
  listItemTextRoot: {
    paddingLeft: 0,
    marginTop: 6,
    marginBottom: 6
  },
  listItemTextPrimary: {
    marginRight: 64,
    fontSize: 16,
    fontWeight: 600,
    color: _colors.neutral7,
    marginBottom: 4,
    '$listItemUnread &, $listItem:hover &, $listItem:focus &': {
      color: _colors.black
    }
  },
  listItemTextSecondary: {
    marginRight: 5,
    fontSize: 14,
    color: _colors.neutral7,
    lineHeight: '24px',
    '$listItemUnread &': {
      color: _colors.neutral8
    },
    '$listItem:hover &, $listItem:focus &': {
      color: _colors.black
    }
  },
  iconContainer: {
    color: _colors.neutral7,
    minWidth: 0,
    height: 20,
    marginRight: 8,
    marginTop: 7,
    alignSelf: 'flex-start',
    display: 'flex',
    alignItems: 'center'
  },
  unreadMarker: {
    color: _colors.fuchsia,
    visibility: 'hidden',
    fontSize: 15,
    '$listItemUnread &': {
      visibility: 'visible'
    }
  },
  notificationIcon: {
    marginLeft: 7,
    marginRight: 6,
    '$listItemUnread &, $listItem:hover &, $listItem:focus &': {
      color: _colors.neutral8
    }
  },
  timestamp: {
    color: _colors.neutral7,
    top: 16,
    right: 23,
    position: 'absolute',
    whiteSpace: 'nowrap',
    lineHeight: '24px',
    '$listItem:hover &': {
      display: 'none'
    }
  },
  actionButtons: {
    color: _colors.neutral7,
    top: 12,
    right: 23,
    position: 'absolute',
    whiteSpace: 'nowrap',
    display: 'none',
    '$listItem:hover &': {
      display: 'initial'
    }
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var NotificationsItem = function NotificationsItem(_ref) {
  var id = _ref.id,
    timestamp = _ref.timestamp,
    handleClose = _ref.handleClose,
    _onClick = _ref.onClick,
    Icon = _ref.icon,
    header = _ref.header,
    details = _ref.details,
    onToggleRead = _ref.onToggleRead,
    onDelete = _ref.onDelete,
    unread = _ref.unread,
    removeText = _ref.removeText,
    markReadText = _ref.markReadText,
    markUnreadText = _ref.markUnreadText,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  var currentDate = (0, _moment.default)().format('YYYYMMDD');
  var memoizedTimestampText = (0, _react.useMemo)(function () {
    return (0, _getTimestampAsText.default)(timestamp, currentDate, 'YYYYMMDD');
  }, [timestamp, currentDate]);
  return /*#__PURE__*/_react.default.createElement(_ListItem.default, _extends({
    button: false,
    onClick: function onClick() {
      _onClick && _onClick(id);
      handleClose && handleClose();
    },
    className: (0, _classnames.default)(classes.listItem, unread && classes.listItemUnread)
  }, rest, {
    ref: ref
  }), /*#__PURE__*/_react.default.createElement(_ListItemIcon.default, {
    className: classes.iconContainer
  }, /*#__PURE__*/_react.default.createElement(_StatusDotSolid.default, {
    fontSize: "extraSmall",
    className: classes.unreadMarker
  }), Icon && /*#__PURE__*/_react.default.createElement(Icon, {
    fontSize: "small",
    className: classes.notificationIcon
  })), /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
    primary: header,
    secondary: /*#__PURE__*/_react.default.createElement(_shiitake.default, {
      lines: 2
    }, details),
    secondaryTypographyProps: {
      component: 'div'
    },
    classes: {
      root: classes.listItemTextRoot,
      primary: classes.listItemTextPrimary,
      secondary: classes.listItemTextSecondary
    }
  }), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "body2",
    gutterBottom: true,
    className: (0, _classnames.default)(classes.rightSideControls, classes.timestamp)
  }, memoizedTimestampText), /*#__PURE__*/_react.default.createElement("span", {
    className: (0, _classnames.default)(classes.rightSideControls, classes.actionButtons)
  }, /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    title: unread ? markReadText : markUnreadText,
    placement: "top"
  }, /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    size: "small",
    "aria-label": unread ? markReadText : markUnreadText,
    onClick: function onClick(e) {
      // avoid calling the onClick handler in the parent
      e.stopPropagation();
      onToggleRead && onToggleRead(id);
    }
  }, unread ? /*#__PURE__*/_react.default.createElement(_EmailRead.default, null) : /*#__PURE__*/_react.default.createElement(_Email.default, null))), /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    title: removeText,
    placement: "top"
  }, /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    size: "small",
    "aria-label": removeText,
    onClick: function onClick(e) {
      // avoid calling the onClick handler in the parent
      e.stopPropagation();
      onDelete && onDelete(id);
    }
  }, /*#__PURE__*/_react.default.createElement(_Trash.default, null)))));
};
exports.NotificationsItem = NotificationsItem;
var _default = (0, _withRef.default)()(NotificationsItem);
exports.default = _default;