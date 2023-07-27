"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NavigationBar = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _CustomNavigationBar = _interopRequireDefault(require("../CustomNavigationBar"));
var _NotificationsMenu = _interopRequireDefault(require("../NotificationsMenu"));
var _ProfileMenu = _interopRequireDefault(require("../ProfileMenu"));
var _Toolbar = _interopRequireDefault(require("../Toolbar"));
var _ApolloWaves = _interopRequireDefault(require("./ApolloWaves"));
var _NavigationBarLogo = _interopRequireDefault(require("./NavigationBarLogo"));
var _NavigationMenuItem = _interopRequireDefault(require("./NavigationMenuItem"));
var _excluded = ["logoProps", "menuItems", "notificationsMenuProps", "profileMenuProps", "LogoComponent", "onClick", "checkIsActive", "maxWidth", "waves", "otherButtons"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  toolbar: {
    paddingLeft: 24,
    paddingRight: 24,
    height: 56,
    width: function width(_ref) {
      var _ref$maxWidth = _ref.maxWidth,
        maxWidth = _ref$maxWidth === void 0 ? '100%' : _ref$maxWidth;
      return maxWidth;
    },
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    boxSizing: 'content-box',
    '@media (min-width:600px)': {
      minHeight: 56
    }
  },
  container: {
    display: 'flex',
    wrap: 'nowrap'
  },
  waves: {
    position: 'absolute',
    left: -84,
    top: 0
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var NavigationBar = function NavigationBar(_ref2) {
  var logoProps = _ref2.logoProps,
    menuItems = _ref2.menuItems,
    notificationsMenuProps = _ref2.notificationsMenuProps,
    profileMenuProps = _ref2.profileMenuProps,
    LogoComponent = _ref2.LogoComponent,
    onClick = _ref2.onClick,
    checkIsActive = _ref2.checkIsActive,
    maxWidth = _ref2.maxWidth,
    waves = _ref2.waves,
    otherButtons = _ref2.otherButtons,
    rest = _objectWithoutProperties(_ref2, _excluded);
  var classes = useStyles({
    maxWidth: maxWidth
  });
  return /*#__PURE__*/_react.default.createElement(_CustomNavigationBar.default, rest, /*#__PURE__*/_react.default.createElement(_Toolbar.default, {
    className: classes.toolbar
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.container
  }, waves && /*#__PURE__*/_react.default.createElement(_ApolloWaves.default, {
    className: classes.waves
  }), LogoComponent && /*#__PURE__*/_react.default.createElement(LogoComponent, null) || logoProps && /*#__PURE__*/_react.default.createElement(_NavigationBarLogo.default, logoProps), menuItems === null || menuItems === void 0 ? void 0 : menuItems.map(function (navItem, i) {
    return /*#__PURE__*/_react.default.createElement(_NavigationMenuItem.default, _extends({
      onClick: onClick && function (props) {
        return onClick(props !== null && props !== void 0 ? props : navItem);
      },
      active: checkIsActive === null || checkIsActive === void 0 ? void 0 : checkIsActive(navItem),
      checkIsActive: checkIsActive
    }, navItem, {
      key: i
    }));
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.container
  }, otherButtons, notificationsMenuProps && /*#__PURE__*/_react.default.createElement(_NotificationsMenu.default, notificationsMenuProps), profileMenuProps && /*#__PURE__*/_react.default.createElement(_ProfileMenu.default, _extends({
    onClick: onClick,
    active: checkIsActive === null || checkIsActive === void 0 ? void 0 : checkIsActive(profileMenuProps),
    checkIsActive: checkIsActive
  }, profileMenuProps)))));
};
exports.NavigationBar = NavigationBar;
NavigationBar.propTypes = {
  /** A function that determines which menu is styled as active. */
  checkIsActive: _propTypes.default.func,
  /** Custom component to display a logo. Used as an alternative to logoProps. */
  LogoComponent: _propTypes.default.elementType,
  /** Props applied to the logo component. */
  logoProps: _propTypes.default.shape({
    /** Alternative text for the image. */
    alt: _propTypes.default.string,
    /** Callback fired when the logo image is clicked. */
    onClick: _propTypes.default.func,
    /** Source of the logo image. */
    src: _propTypes.default.string
  }),
  /** Maximum width of navigation bar content. */
  maxWidth: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  /** The list of navigation items to be displayed in the component. */
  menuItems: _propTypes.default.arrayOf(_propTypes.default.shape({
    /** If `true`, the component is displayed in an active state. */
    active: _propTypes.default.bool,
    /** URL of the page the link goes to. */
    href: _propTypes.default.string,
    /** The list of sub navigation items to be displayed in the component. */
    menuItems: _propTypes.default.arrayOf(_propTypes.default.shape({
      /** If `true`, the component is displayed in an active state. */
      active: _propTypes.default.bool,
      /** URL of the page the link goes to. */
      href: _propTypes.default.string,
      /** Path of the menu item. Used in `checkIsActive`. */
      pathname: _propTypes.default.string,
      /** The content of the menu item. */
      text: _propTypes.default.node
    })),
    /** Path of the navigation item. Used in `checkIsActive`. */
    pathname: _propTypes.default.string,
    /** The content of the menu item. */
    text: _propTypes.default.node
  })),
  /** Props applied to the `NotificationMenu` component. */
  notificationsMenuProps: _propTypes.default.shape({
    /** The list of actions shown when the actions icon button is clicked. */
    actionsMenuItems: _propTypes.default.arrayOf(_propTypes.default.shape({
      /** Callback fired when the component is clicked. */
      onClick: _propTypes.default.func,
      /** The content of the menu item. */
      text: _propTypes.default.string
    })),
    /** Customize the text shown when there are no notifications. */
    emptyText: _propTypes.default.string,
    /** Customize the 'Notifications' header. */
    headerText: _propTypes.default.string,
    /** Customize the text of the 'Mark as read' action tooltip. */
    markReadText: _propTypes.default.string,
    /** Customize the text of the 'Mark as unread' action tooltip. */
    markUnreadText: _propTypes.default.string,
    /** If `true`, the `NotificationsMenu` icon indicates that there are new notifications. */
    newNotifications: _propTypes.default.bool,
    /** Field that uniquely identifies each notification. `id` by default. */
    notificationIdField: _propTypes.default.string,
    /** The list of notifications. */
    notifications: _propTypes.default.arrayOf(_propTypes.default.shape({
      /** The message of the notification. */
      details: _propTypes.default.node,
      /** The title of the notification. */
      header: _propTypes.default.node,
      /** The icon of the notification. */
      icon: _propTypes.default.elementType,
      /** Unique ID of the notification. */
      id: _propTypes.default.any,
      /**
       * Callback fired when a notification is clicked.
       *
       * @param {any} id The id of the notification.
       */
      onClick: _propTypes.default.func,
      /**
       * Callback fired when the notification's delete button is clicked.
       *
       * @param {any} id The id of the notification.
       */
      onDelete: _propTypes.default.func,
      /**
       * Callback fired when the notification's read/unread button is clicked.
       *
       * @param {any} id The id of the notification.
       */
      onToggleRead: _propTypes.default.func,
      /** The time of the notification. */
      timestamp: _propTypes.default.object,
      /** If `true`, the notification is unread. */
      unread: _propTypes.default.bool
    })),
    /**
     * Callback fired when a notification is clicked.
     *
     * @param {any} id The id of the notification.
     */
    onClick: _propTypes.default.func,
    /**
     * Callback fired when the notification's delete button is clicked.
     *
     * @param {any} id The id of the notification.
     */
    onDelete: _propTypes.default.func,
    /**
     * Callback fired when the notification's read/unread button is clicked.
     *
     * @param {any} id The id of the notification.
     */
    onToggleRead: _propTypes.default.func,
    /** If `true`, the component is displayed in an active state. */
    open: _propTypes.default.bool,
    /** Customize the text of the 'Remove' action tooltip. */
    removeText: _propTypes.default.string
  }),
  /** Callback fired when a navigation item is clicked. */
  onClick: _propTypes.default.func,
  /** Additional top level navigational items to include. */
  otherButtons: _propTypes.default.node,
  /** Props applied to the `ProfileMenu` component. */
  profileMenuProps: _propTypes.default.shape({
    /** The email address of the active user. */
    email: _propTypes.default.node,
    /** If `true`, the logout button is hidden. */
    hideLogout: _propTypes.default.bool,
    /** Add an icon to the profile menu button. */
    icon: _propTypes.default.element,
    /** Props applied to the logout button. */
    logoutButtonProps: _propTypes.default.object,
    /** Text displayed in the logout button. */
    logoutText: _propTypes.default.node,
    /** The list of navigation items. */
    menuItems: _propTypes.default.arrayOf(_propTypes.default.shape({
      /** Add an icon to the menu item. */
      icon: _propTypes.default.elementType,
      /** Path of the menu item. Used in `checkIsActive`. */
      pathname: _propTypes.default.string,
      /** The content of the menu item. */
      text: _propTypes.default.node
    })),
    /** The name of the active user. */
    name: _propTypes.default.node,
    /** The business title of the active user. */
    title: _propTypes.default.node
  }),
  /** If `true`, the wave style is applied. */
  waves: _propTypes.default.bool
};
var _default = NavigationBar;
exports.default = _default;