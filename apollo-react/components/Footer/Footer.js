"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Footer = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _ButtonGroup = _interopRequireDefault(require("../ButtonGroup"));
var _MenuItem = _interopRequireDefault(require("../MenuItem"));
var _SelectButton = _interopRequireDefault(require("../SelectButton"));
var _Typography = _interopRequireDefault(require("../Typography"));
var _IqviaLogo = _interopRequireDefault(require("./IqviaLogo"));
var _excluded = ["className", "buttonProps", "children", "languagePickerProps", "maxWidth", "forwardedRef"],
  _excluded2 = ["menuItems"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  root: {
    padding: 24,
    display: 'flex',
    justifyContent: 'center',
    height: 80,
    boxSizing: 'content-box'
  },
  wrapper: {
    width: function width(_ref) {
      var _ref$maxWidth = _ref.maxWidth,
        maxWidth = _ref$maxWidth === void 0 ? '100%' : _ref$maxWidth;
      return maxWidth;
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttonGroup: {
    marginRight: 8
  },
  leftContainer: {
    display: 'flex',
    color: _colors.primary
  },
  leftItems: {
    display: 'flex',
    marginTop: -3
  },
  rightContainer: {
    display: 'flex',
    color: _colors.neutral7,
    paddingLeft: 10
  },
  logo: {
    width: 88,
    height: 32,
    marginRight: 24
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var Footer = function Footer(_ref2) {
  var className = _ref2.className,
    buttonProps = _ref2.buttonProps,
    children = _ref2.children,
    _ref2$languagePickerP = _ref2.languagePickerProps,
    languagePickerProps = _ref2$languagePickerP === void 0 ? {} : _ref2$languagePickerP,
    maxWidth = _ref2.maxWidth,
    ref = _ref2.forwardedRef,
    rest = _objectWithoutProperties(_ref2, _excluded);
  var classes = useStyles({
    maxWidth: maxWidth
  });
  var menuItems = languagePickerProps.menuItems,
    languagePickerRest = _objectWithoutProperties(languagePickerProps, _excluded2);
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _classnames.default)(classes.root, className)
  }, rest, {
    ref: ref
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.wrapper
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.leftContainer
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: "https://www.iqvia.com/"
  }, /*#__PURE__*/_react.default.createElement(_IqviaLogo.default, {
    className: classes.logo,
    alt: "www.iqvia.com"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.leftItems
  }, buttonProps && /*#__PURE__*/_react.default.createElement(_ButtonGroup.default, {
    className: classes.buttonGroup,
    buttonProps: buttonProps.map(function (props) {
      return _objectSpread({
        size: 'small',
        variant: 'text'
      }, props);
    })
  }), menuItems && /*#__PURE__*/_react.default.createElement(_SelectButton.default, _extends({
    size: "small"
  }, languagePickerRest), menuItems.map(function (item) {
    return /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
      key: item.value,
      value: item.value
    }, item.text);
  })), children)), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "body2",
    className: classes.rightContainer
  }, "\xA9\xA0IQVIA")));
};
exports.Footer = Footer;
Footer.propTypes = {
  /** Array of props for the `Button`s. */
  buttonProps: _propTypes.default.arrayOf(_propTypes.default.shape({
    /** URL of the page the link goes to. */
    href: _propTypes.default.string,
    /** Link text. */
    label: _propTypes.default.node,
    /** Callback fired when the component is clicked. */
    onClick: _propTypes.default.func,
    /** Target attribute for link. */
    target: _propTypes.default.string
  })),
  /** Footer content. */
  children: _propTypes.default.node,
  /**
   * Props applied to the `SelectButton` component, for changing the language
   * of the page.
   */
  languagePickerProps: _propTypes.default.shape({
    /** The default value. Use when the component is not controlled.
     * @ignore */
    defaultValue: _propTypes.default.any,
    /** The menu items to display in the dropdown. */
    menuItems: _propTypes.default.arrayOf(_propTypes.default.shape({
      /** Language label. */
      text: _propTypes.default.node,
      /** The value corresponding to the language. */
      value: _propTypes.default.any
    })),
    /** If `true`, selecting the previously selected value will not deselect it. */
    noDeselect: _propTypes.default.bool,
    /** Callback fired when the value changes. */
    onChange: _propTypes.default.func,
    /** The short hint displayed in the input before the user enters a value.
     * @ignore */
    placeholder: _propTypes.default.string,
    /** The value of component. */
    value: _propTypes.default.any
  }),
  /** Maximum width of the footer. */
  maxWidth: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
};
var _default = (0, _withRef.default)()(Footer);
exports.default = _default;