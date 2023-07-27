"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DataVizCard = void 0;
var _compose = _interopRequireDefault(require("@hypnosphi/recompose/compose"));
var _withStyles = _interopRequireDefault(require("@mui/styles/withStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _shiitake = _interopRequireDefault(require("shiitake"));
var _colors = require("../../colors");
var _EllipsisVertical = _interopRequireDefault(require("../../icons/EllipsisVertical"));
var _typography = require("../../typography");
var _withStyledEngineProvider = _interopRequireDefault(require("../../utils/withStyledEngineProvider"));
var _Card = _interopRequireDefault(require("../Card"));
var _CardContent = _interopRequireDefault(require("../CardContent"));
var _CardHeader = _interopRequireDefault(require("../CardHeader"));
var _IconMenuButton = _interopRequireDefault(require("../IconMenuButton"));
var _excluded = ["children", "classes", "className", "href", "menuItems", "message", "onClick", "subtitle", "title", "noPadding"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var styles = {
  card: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    height: 456,
    padding: 0,
    '&:hover $titleHover': {
      color: _colors.primary
    }
  },
  cardHeader: {
    alignItems: 'flex-start',
    paddingBottom: 0
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingTop: 0,
    '&:last-child': {
      paddingBottom: 16
    }
  },
  contentNoPadding: {
    padding: '8px 0 0 0'
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
    color: '#000',
    textDecoration: 'none',
    lineHeight: 1.5,
    minHeight: 24
  },
  titleHover: {
    '&:hover': {
      color: _colors.primary,
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 400,
    color: _colors.neutral7,
    lineHeight: 1.71,
    minHeight: 24
  },
  menuPaper: {
    marginTop: -6,
    marginLeft: 8
  },
  message: {
    color: _colors.neutral7,
    fontFamily: _typography.fontFamily,
    position: 'absolute',
    top: '50%',
    fontWeight: 600
  },
  icon: {
    marginTop: '-8px'
  }
};
var DataVizCard = /*#__PURE__*/function (_React$Component) {
  _inherits(DataVizCard, _React$Component);
  var _super = _createSuper(DataVizCard);
  function DataVizCard() {
    var _this;
    _classCallCheck(this, DataVizCard);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      headerHeight: 0
    });
    _defineProperty(_assertThisInitialized(_this), "calculateHeaderHeight", function () {
      var _this$headerRef$getBo, _this$headerRef;
      var headerHeight = _this.state.headerHeight;
      var newHeaderHeight = (_this$headerRef$getBo = (_this$headerRef = _this.headerRef) === null || _this$headerRef === void 0 ? void 0 : _this$headerRef.getBoundingClientRect().height) !== null && _this$headerRef$getBo !== void 0 ? _this$headerRef$getBo : 0;
      if (newHeaderHeight !== headerHeight) {
        _this.setState({
          headerHeight: newHeaderHeight
        });
      }
    });
    return _this;
  }
  _createClass(DataVizCard, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.calculateHeaderHeight();
      window && window.addEventListener('resize', this.calculateHeaderHeight);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window && window.removeEventListener('resize', this.calculateHeaderHeight);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.calculateHeaderHeight();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        children = _this$props.children,
        classes = _this$props.classes,
        className = _this$props.className,
        href = _this$props.href,
        menuItems = _this$props.menuItems,
        message = _this$props.message,
        onClick = _this$props.onClick,
        subtitle = _this$props.subtitle,
        title = _this$props.title,
        noPadding = _this$props.noPadding,
        rest = _objectWithoutProperties(_this$props, _excluded);
      var headerHeight = this.state.headerHeight;
      var titleComponent = /*#__PURE__*/_react.default.createElement(_shiitake.default, {
        lines: 2,
        attributes: {
          className: (0, _classnames.default)(classes.title, (onClick || href) && classes.titleHover),
          title: title,
          onClick: onClick
        }
      }, title);
      return /*#__PURE__*/_react.default.createElement(_Card.default, _extends({
        className: (0, _classnames.default)(classes.card, className)
      }, rest), /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(r) {
          return _this2.headerRef = r;
        }
      }, /*#__PURE__*/_react.default.createElement(_CardHeader.default, {
        classes: {
          root: classes.cardHeader,
          action: classes.icon
        },
        action: (menuItems === null || menuItems === void 0 ? void 0 : menuItems.length) && /*#__PURE__*/_react.default.createElement(_IconMenuButton.default, {
          id: title,
          size: "small",
          menuItems: menuItems,
          placement: "bottom-end"
        }, /*#__PURE__*/_react.default.createElement(_EllipsisVertical.default, null)),
        title: href ? /*#__PURE__*/_react.default.createElement("a", {
          className: (0, _classnames.default)(classes.title, classes.titleHover),
          href: href
        }, titleComponent) : titleComponent,
        subheader: subtitle && /*#__PURE__*/_react.default.createElement(_shiitake.default, {
          lines: 1,
          attributes: {
            className: classes.subtitle,
            title: subtitle
          }
        }, subtitle)
      })), /*#__PURE__*/_react.default.createElement(_CardContent.default, {
        className: noPadding ? classes.contentNoPadding : classes.content
      }, children ? _react.default.Children.map(children, function (child) {
        var _child$props$height;
        return /*#__PURE__*/_react.default.cloneElement(child, {
          height: ((_child$props$height = child.props.height) !== null && _child$props$height !== void 0 ? _child$props$height : 434) - headerHeight + (noPadding ? 16 : 0)
        });
      }) : /*#__PURE__*/_react.default.createElement("span", {
        className: classes.message
      }, message)));
    }
  }]);
  return DataVizCard;
}(_react.default.Component);
exports.DataVizCard = DataVizCard;
DataVizCard.propTypes = {
  /** JSS styles object.
   * @ignore */
  classes: _propTypes.default.object.isRequired,
  /** The title of the component. */
  title: _propTypes.default.node.isRequired,
  /** The content of the card. */
  children: _propTypes.default.node,
  /** URL of the page the link goes to. */
  href: _propTypes.default.string,
  /** The menu items to display in the dropdown. */
  menuItems: _propTypes.default.arrayOf(_propTypes.default.shape({
    /** If `true`, destructive action style will be applied. */
    destructiveAction: _propTypes.default.bool,
    /** The label content. */
    label: _propTypes.default.node,
    /** Callback fired when the component is clicked. */
    onClick: _propTypes.default.func
  })),
  /** Message to be displayed if the card is empty. */
  message: _propTypes.default.node,
  /** If `true`, the `Card` container padding is removed. */
  noPadding: _propTypes.default.bool,
  /** Callback fired when the title is clicked. */
  onClick: _propTypes.default.func,
  /** The subtitle of the component. */
  subtitle: _propTypes.default.node
};
DataVizCard.defaultProps = {
  message: 'No data to display'
};
var _default = (0, _compose.default)((0, _withStyledEngineProvider.default)(), (0, _withStyles.default)(styles))(DataVizCard);
exports.default = _default;