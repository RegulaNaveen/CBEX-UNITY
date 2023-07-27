"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Carousel = void 0;
var _withStyles = _interopRequireDefault(require("@mui/styles/withStyles"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _ChevronLeft = _interopRequireDefault(require("../../icons/ChevronLeft"));
var _ChevronRight = _interopRequireDefault(require("../../icons/ChevronRight"));
var _IconButton = _interopRequireDefault(require("../IconButton"));
var _Typography = _interopRequireDefault(require("../Typography"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
  title: {
    float: 'left'
  },
  buttonGroup: {
    float: 'right',
    marginBottom: 10
  },
  listContainer: {
    width: '100%',
    overflow: 'hidden'
  },
  itemList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    transition: 'transform 0.5s ease-in-out',
    '& li': {
      float: 'left'
    }
  },
  chevron: {
    fontSize: 16
  }
};

/**
 * A Carousel component that slides items back and forth.
 */
var Carousel = /*#__PURE__*/function (_React$Component) {
  _inherits(Carousel, _React$Component);
  var _super = _createSuper(Carousel);
  function Carousel() {
    var _this;
    _classCallCheck(this, Carousel);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "listContainer", /*#__PURE__*/_react.default.createRef());
    _defineProperty(_assertThisInitialized(_this), "state", {
      visibleItemIndex: 0
    });
    _defineProperty(_assertThisInitialized(_this), "slideRight", function () {
      var items = _this.props.items;
      _this.setState(function (_ref) {
        var visibleItemIndex = _ref.visibleItemIndex;
        return {
          visibleItemIndex: Math.min(items.length - 1, visibleItemIndex + _this.fullyVisibleItemsCount)
        };
      });
    });
    _defineProperty(_assertThisInitialized(_this), "slideLeft", function () {
      _this.setState(function (_ref2) {
        var visibleItemIndex = _ref2.visibleItemIndex;
        return {
          visibleItemIndex: Math.max(0, visibleItemIndex - _this.fullyVisibleItemsCount)
        };
      });
    });
    return _this;
  }
  _createClass(Carousel, [{
    key: "fullItemWidth",
    get: function get() {
      var _this$props = this.props,
        itemWidth = _this$props.itemWidth,
        itemMargin = _this$props.itemMargin;
      // Item width + left and right margins
      return itemWidth + 2 * itemMargin;
    }
  }, {
    key: "fullyVisibleItemsCount",
    get: function get() {
      var current = this.listContainer.current;
      return current ? Math.floor(current.clientWidth / this.fullItemWidth) : 1;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
        classes = _this$props2.classes,
        _this$props2$title = _this$props2.title,
        title = _this$props2$title === void 0 ? '' : _this$props2$title,
        _this$props2$items = _this$props2.items,
        items = _this$props2$items === void 0 ? [] : _this$props2$items,
        _this$props2$itemWidt = _this$props2.itemWidth,
        itemWidth = _this$props2$itemWidt === void 0 ? 400 : _this$props2$itemWidt,
        _this$props2$itemMarg = _this$props2.itemMargin,
        itemMargin = _this$props2$itemMarg === void 0 ? 10 : _this$props2$itemMarg,
        _this$props2$callToAc = _this$props2.callToActionButton,
        callToActionButton = _this$props2$callToAc === void 0 ? '' : _this$props2$callToAc;
      var visibleItemIndex = this.state.visibleItemIndex;

      // Calculate the xpos of the list based on the index of the first item to appear on the left
      var offsetX = visibleItemIndex * this.fullItemWidth;

      // Generate list and item styles
      var listStyles = {
        width: items.length * this.fullItemWidth,
        transform: "translateX(".concat(-offsetX, "px)")
      };
      var itemStyles = {
        width: itemWidth,
        margin: "0 ".concat(itemMargin, "px")
      };

      // Calculate whether or not to disable slide buttons
      var isLeftButtonDisabled = visibleItemIndex === 0;
      var isRightButtonDisabled = visibleItemIndex + this.fullyVisibleItemsCount >= items.length;
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, title && /*#__PURE__*/_react.default.createElement(_Typography.default, {
        className: classes.title,
        variant: "title1",
        gutterBottom: true
      }, title), /*#__PURE__*/_react.default.createElement("div", {
        className: classes.buttonGroup
      }, callToActionButton, /*#__PURE__*/_react.default.createElement(_IconButton.default, {
        onClick: this.slideLeft,
        disabled: isLeftButtonDisabled
      }, /*#__PURE__*/_react.default.createElement(_ChevronLeft.default, {
        className: classes.chevron
      })), /*#__PURE__*/_react.default.createElement(_IconButton.default, {
        onClick: this.slideRight,
        disabled: isRightButtonDisabled
      }, /*#__PURE__*/_react.default.createElement(_ChevronRight.default, {
        className: classes.chevron
      }))), /*#__PURE__*/_react.default.createElement("div", {
        className: classes.listContainer,
        ref: this.listContainer
      }, /*#__PURE__*/_react.default.createElement("ul", {
        className: classes.itemList,
        style: listStyles
      }, items.map(function (item, idx) {
        return /*#__PURE__*/_react.default.createElement("li", {
          key: idx,
          style: itemStyles
        }, item);
      }))));
    }
  }]);
  return Carousel;
}(_react.default.Component);
exports.Carousel = Carousel;
Carousel.propTypes = {
  /** JSS styles object.
   * @ignore */
  classes: _propTypes.default.object.isRequired,
  /** An optional call to action button that appears to the left of the slide buttons. */
  callToActionButton: _propTypes.default.element,
  /** The left and right margin for all the items in the carousel. */
  itemMargin: _propTypes.default.number,
  /** An array of React components that should appear in the carousel. */
  items: _propTypes.default.arrayOf(_propTypes.default.node),
  /** The fixed width of all the items in the carousel. */
  itemWidth: _propTypes.default.number
};
var _default = (0, _withStyles.default)(styles)(Carousel);
exports.default = _default;