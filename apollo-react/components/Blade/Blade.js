"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Blade = void 0;
var _withStyles = _interopRequireDefault(require("@mui/styles/withStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _shortid = _interopRequireDefault(require("shortid"));
var _ChevronLeft = _interopRequireDefault(require("../../icons/ChevronLeft"));
var _ChevronRight = _interopRequireDefault(require("../../icons/ChevronRight"));
var _Close = _interopRequireDefault(require("../../icons/Close"));
var _Backdrop = _interopRequireDefault(require("../Backdrop"));
var _Divider = _interopRequireDefault(require("../Divider"));
var _Drawer = _interopRequireDefault(require("../Drawer"));
var _IconButton = _interopRequireDefault(require("../IconButton"));
var _Typography = _interopRequireDefault(require("../Typography"));
var constants = _interopRequireWildcard(require("./constants"));
var _styles = _interopRequireDefault(require("./styles"));
var _excluded = ["actions", "children", "classes", "className", "expanded", "onClose", "open", "side", "subtitle", "title", "width", "zIndex", "hasBackdrop", "BackdropProps", "marginTop", "hideCloseButton", "headerProps", "bodyProps", "onChange", "alwaysExpanded"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
var Blade = /*#__PURE__*/function (_React$Component) {
  _inherits(Blade, _React$Component);
  var _super = _createSuper(Blade);
  function Blade() {
    var _this;
    _classCallCheck(this, Blade);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      expandedState: true,
      shouldHideContent: !_this.props.expanded,
      shouldAnimateOpen: false,
      mounted: false
    });
    _defineProperty(_assertThisInitialized(_this), "classId", _shortid.default.generate());
    _defineProperty(_assertThisInitialized(_this), "checkAnimation", function () {
      var prevProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _this$props = _this.props,
        open = _this$props.open,
        _this$props$width = _this$props.width,
        width = _this$props$width === void 0 ? constants.defaultWidth : _this$props$width,
        expanded = _this$props.expanded;
      if (!prevProps.open && open) {
        _this.setState({
          offset: expanded === false ? constants.collapsedWidth : width,
          shouldHideContent: expanded === false ? true : false,
          shouldAnimateOpen: true
        });
      } else if (prevProps.open && !open) {
        _this.setState({
          offset: 0,
          shouldAnimateOpen: false
        });
      } else if (prevProps.expanded === false && expanded) {
        _this.setState({
          shouldHideContent: false,
          offset: width
        });
      } else if (prevProps.expanded === true && !expanded) {
        _this.setState({
          offset: constants.collapsedWidth
        });
        // shouldHideContent prop hides the blade content after
        // the collapse animation finishes
        !expanded && setTimeout(function () {
          _this.setState({
            shouldHideContent: true
          });
        }, constants.transitionDuration);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "onChange", function (e, expanded) {
      var _this$props2 = _this.props,
        onChange = _this$props2.onChange,
        _this$props2$width = _this$props2.width,
        width = _this$props2$width === void 0 ? constants.defaultWidth : _this$props2$width,
        margin = _this$props2.margin;
      var offset = (margin !== null && margin !== void 0 ? margin : expanded) ? width : constants.collapsedWidth;
      onChange && onChange(e, expanded);
      _this.setState({
        offset: offset,
        expandedState: expanded,
        shouldHideContent: false
      });
      // shouldHideContent prop hides the blade content after
      // the collapse animation finishes
      !expanded && setTimeout(function () {
        _this.setState({
          shouldHideContent: true
        });
      }, constants.transitionDuration);
    });
    _defineProperty(_assertThisInitialized(_this), "getStyles", function () {
      var _this$state = _this.state,
        offset = _this$state.offset,
        shouldAnimateOpen = _this$state.shouldAnimateOpen;
      var _this$props3 = _this.props,
        side = _this$props3.side,
        margin = _this$props3.margin;

      // we check for shouldAnimateOpen state to make sure the transform is applied
      // after the blade renders (there's likely a better way to do this)
      if (shouldAnimateOpen) {
        var bladeOffset = margin !== null && margin !== void 0 ? margin : offset;
        if (side === 'right') {
          bladeOffset = -bladeOffset;
        }
        // the animation has a unique class name and important tag so that
        // it will override the Material-UI inline transition
        var style = ".anim-".concat(_this.classId, " {\n          transform: translate(").concat(bladeOffset, "px,0) !important;\n        }");
        return style;
      }
    });
    return _this;
  }
  _createClass(Blade, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        mounted: true
      }, this.checkAnimation);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      this.checkAnimation(prevProps);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$state2 = this.state,
        expandedState = _this$state2.expandedState,
        shouldHideContent = _this$state2.shouldHideContent,
        mounted = _this$state2.mounted;
      var _this$props4 = this.props,
        actions = _this$props4.actions,
        children = _this$props4.children,
        classes = _this$props4.classes,
        className = _this$props4.className,
        expanded = _this$props4.expanded,
        onClose = _this$props4.onClose,
        open = _this$props4.open,
        _this$props4$side = _this$props4.side,
        side = _this$props4$side === void 0 ? 'left' : _this$props4$side,
        subtitle = _this$props4.subtitle,
        title = _this$props4.title,
        _this$props4$width = _this$props4.width,
        width = _this$props4$width === void 0 ? constants.defaultWidth : _this$props4$width,
        zIndex = _this$props4.zIndex,
        hasBackdrop = _this$props4.hasBackdrop,
        BackdropProps = _this$props4.BackdropProps,
        _this$props4$marginTo = _this$props4.marginTop,
        marginTop = _this$props4$marginTo === void 0 ? 0 : _this$props4$marginTo,
        hideCloseButton = _this$props4.hideCloseButton,
        headerProps = _this$props4.headerProps,
        bodyProps = _this$props4.bodyProps,
        onChange = _this$props4.onChange,
        alwaysExpanded = _this$props4.alwaysExpanded,
        rest = _objectWithoutProperties(_this$props4, _excluded);
      var bladeExpanded = alwaysExpanded || (expanded !== null && expanded !== void 0 ? expanded : expandedState);
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("style", null, this.getStyles()), /*#__PURE__*/_react.default.createElement(_Drawer.default, _extends({
        variant: "persistent",
        open: mounted && open,
        classes: {
          paper: (0, _classnames.default)(classes.paper, subtitle && classes.hasSubtitle, "anim-".concat(this.classId))
        },
        PaperProps: {
          style: {
            zIndex: [zIndex],
            width: width,
            marginLeft: side === 'left' ? -width : 0,
            marginRight: side !== 'left' ? -width : 0,
            marginTop: marginTop,
            height: "calc(100% - ".concat(marginTop, "px)")
          }
        },
        className: (0, _classnames.default)(classes[side], className),
        anchor: side,
        SlideProps: {
          unmountOnExit: true
        },
        transitionDuration: constants.transitionDuration
      }, rest), !shouldHideContent && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, hideCloseButton || /*#__PURE__*/_react.default.createElement(_IconButton.default, {
        size: "small",
        key: "close",
        onClick: onClose,
        className: classes.closeIcon
      }, /*#__PURE__*/_react.default.createElement(_Close.default, {
        className: classes.icon
      })), /*#__PURE__*/_react.default.createElement("div", _extends({}, headerProps, {
        className: (0, _classnames.default)(classes.header, headerProps === null || headerProps === void 0 ? void 0 : headerProps.className)
      }), title && /*#__PURE__*/_react.default.createElement(_Typography.default, {
        variant: "title1",
        className: classes.title
      }, title), subtitle && /*#__PURE__*/_react.default.createElement(_Typography.default, {
        variant: "body1",
        className: classes.subtitle
      }, subtitle)), (title !== null && title !== void 0 ? title : subtitle) && /*#__PURE__*/_react.default.createElement(_Divider.default, {
        className: classes.divider
      }), /*#__PURE__*/_react.default.createElement("div", _extends({}, bodyProps, {
        className: (0, _classnames.default)(classes.body, actions && classes.bodyActions, bodyProps === null || bodyProps === void 0 ? void 0 : bodyProps.className)
      }), children), actions && /*#__PURE__*/_react.default.createElement("div", {
        className: classes.bladeActions
      }, actions)), !alwaysExpanded && /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)(classes.expandPanel, !bladeExpanded && classes.expandPanelCollapsed),
        onClick: function onClick(e) {
          return !bladeExpanded && _this2.onChange(e, !bladeExpanded);
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: classes.expandPanelButton,
        onClick: function onClick(e) {
          return bladeExpanded && _this2.onChange(e, !bladeExpanded);
        }
      }, side === 'right' && bladeExpanded || side === 'left' && !bladeExpanded ? /*#__PURE__*/_react.default.createElement(_ChevronRight.default, {
        className: classes.icon
      }) : /*#__PURE__*/_react.default.createElement(_ChevronLeft.default, {
        className: classes.icon
      })))), hasBackdrop && /*#__PURE__*/_react.default.createElement(_Backdrop.default, _extends({
        open: !!open && !!bladeExpanded
      }, BackdropProps, {
        className: (0, _classnames.default)(classes.backdrop, BackdropProps === null || BackdropProps === void 0 ? void 0 : BackdropProps.className)
      })));
    }
  }]);
  return Blade;
}(_react.default.Component);
exports.Blade = Blade;
Blade.propTypes = {
  /** JSS styles object.
   * @ignore */
  classes: _propTypes.default.object.isRequired,
  /** Action buttons at the bottom of the blade. */
  actions: _propTypes.default.object,
  /** If `true`, the blade can't be collapsed. */
  alwaysExpanded: _propTypes.default.bool,
  /** Props applied to the `Backdrop` component. */
  BackdropProps: _propTypes.default.object,
  /** Props applied to the div of the body section. */
  bodyProps: _propTypes.default.object,
  /** Body content of the blade. */
  children: _propTypes.default.node,
  /**
   * If `true`, expands the blade, otherwise collapse it.
   * Setting this prop enables control over the blade.
   */
  expanded: _propTypes.default.bool,
  /** If `true`, a backdrop will be shown when the blade is open and expanded. */
  hasBackdrop: _propTypes.default.bool,
  /** Props applied to the div of the header section. */
  headerProps: _propTypes.default.object,
  /** If `true`, the top corner, icon 'x' close button is not displayed. */
  hideCloseButton: _propTypes.default.bool,
  /** Add space above the blade for a navigation bar. */
  marginTop: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  /**
   * Callback fired when the blade is expanded or collapsed by the user.
   *
   * @param {object} event The event source of the callback.
   * @param {bool} expanded The new expanded state of the component.
   */
  onChange: _propTypes.default.func,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   */
  onClose: _propTypes.default.func,
  /** If `true`, the component is visible. */
  open: _propTypes.default.bool,
  /** The side of the screen the blade opens from. */
  side: _propTypes.default.oneOf(['left', 'right']),
  /** The subtitle of the blade. */
  subtitle: _propTypes.default.node,
  /** The title of the blade. */
  title: _propTypes.default.node,
  /** The width of the blade. */
  width: _propTypes.default.number,
  /** Modify the z-index of the blade. */
  zIndex: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
};
var _default = (0, _withStyles.default)(_styles.default)(Blade);
exports.default = _default;