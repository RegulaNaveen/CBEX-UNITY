"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.InternalTablePaginationActions = void 0;
var _compose = _interopRequireDefault(require("@hypnosphi/recompose/compose"));
var _withStyles = _interopRequireDefault(require("@mui/styles/withStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _ChevronLeft = _interopRequireDefault(require("../../icons/ChevronLeft"));
var _ChevronLeft2 = _interopRequireDefault(require("../../icons/ChevronLeft2"));
var _ChevronRight = _interopRequireDefault(require("../../icons/ChevronRight"));
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _IconButton = _interopRequireDefault(require("../IconButton"));
var _Link = _interopRequireDefault(require("../Link"));
var _TextField = _interopRequireDefault(require("../TextField"));
var _Tooltip = _interopRequireDefault(require("../Tooltip"));
var _Typography = _interopRequireDefault(require("../Typography"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  pageNumberInput: {
    marginRight: 10,
    marginTop: 2
  },
  totalPages: {
    marginRight: '4px !important',
    color: _colors.neutral8,
    whiteSpace: 'nowrap'
  },
  pageText: {
    marginRight: 8,
    marginLeft: 4,
    color: _colors.neutral8
  },
  link: {
    fontWeight: 600
  },
  chevron: {
    fontSize: 16
  }
};
var InternalTablePaginationActions = /*#__PURE__*/function (_React$Component) {
  _inherits(InternalTablePaginationActions, _React$Component);
  var _super = _createSuper(InternalTablePaginationActions);
  function InternalTablePaginationActions() {
    var _this;
    _classCallCheck(this, InternalTablePaginationActions);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      pageNumberInputValue: _this.props.page + 1
    });
    _defineProperty(_assertThisInitialized(_this), "setPageNumberInputValue", function (pageNumberInputValue) {
      _this.setState({
        pageNumberInputValue: pageNumberInputValue
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handlePageNumberInputChange", function (event) {
      var value = event.target.value.replace(',', '').replace('-', '').replace('.', '');
      //sync state and entered value
      _this.setPageNumberInputValue(value);
      //navigate to entered page number if valid
      var pageNumber = +value;
      if (pageNumber && pageNumber <= _this.numberOfPages) {
        _this.props.onChangePage(pageNumber - 1);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "handleFirstPageButtonClick", function () {
      _this.props.onChangePage(0);
    });
    _defineProperty(_assertThisInitialized(_this), "handlePrevButtonClick", function () {
      var _this$props = _this.props,
        onChangePage = _this$props.onChangePage,
        page = _this$props.page;
      onChangePage(page - 1);
    });
    _defineProperty(_assertThisInitialized(_this), "handleNextButtonClick", function () {
      var _this$props2 = _this.props,
        onChangePage = _this$props2.onChangePage,
        page = _this$props2.page;
      onChangePage(page + 1);
    });
    _defineProperty(_assertThisInitialized(_this), "handleLastPageButtonClick", function () {
      var _this$props3 = _this.props,
        onChangePage = _this$props3.onChangePage,
        count = _this$props3.count,
        rowsPerPage = _this$props3.rowsPerPage;
      onChangePage(Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    });
    _defineProperty(_assertThisInitialized(_this), "handleBlur", function () {
      var page = _this.props.page;
      var pageNumberInputValue = _this.state.pageNumberInputValue;
      if (pageNumberInputValue === '') {
        _this.setState({
          pageNumberInputValue: page
        });
      }
    });
    return _this;
  }
  _createClass(InternalTablePaginationActions, [{
    key: "numberOfPages",
    get: function get() {
      var _this$props4 = this.props,
        count = _this$props4.count,
        rowsPerPage = _this$props4.rowsPerPage;
      return Math.ceil(count / rowsPerPage);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var page = this.props.page;
      this.setPageNumberInputValue(page + 1);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props5 = this.props,
        className = _this$props5.className,
        page = _this$props5.page,
        count = _this$props5.count,
        rowsPerPage = _this$props5.rowsPerPage,
        classes = _this$props5.classes,
        pageNumberInputProps = _this$props5.pageNumberInputProps,
        _this$props5$pageText = _this$props5.pageText,
        pageText = _this$props5$pageText === void 0 ? 'Page' : _this$props5$pageText,
        _this$props5$ofText = _this$props5.ofText,
        ofText = _this$props5$ofText === void 0 ? 'of' : _this$props5$ofText,
        firstPageButtonProps = _this$props5.firstPageButtonProps,
        firstButtonProps = _this$props5.firstButtonProps,
        backIconButtonProps = _this$props5.backIconButtonProps,
        backButtonProps = _this$props5.backButtonProps,
        nextIconButtonProps = _this$props5.nextIconButtonProps,
        nextButtonProps = _this$props5.nextButtonProps,
        lastPageButtonProps = _this$props5.lastPageButtonProps,
        lastButtonProps = _this$props5.lastButtonProps,
        firstButtonText = _this$props5.firstButtonText,
        backButtonText = _this$props5.backButtonText,
        nextButtonText = _this$props5.nextButtonText,
        lastButtonText = _this$props5.lastButtonText,
        ref = _this$props5.forwardedRef;
      var pageNumberInputValue = this.state.pageNumberInputValue;
      var numberOfDigits = "".concat(this.numberOfPages).length;
      var isLastPage = typeof rowsPerPage === 'string' || page >= Math.ceil(count / rowsPerPage) - 1;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)(classes.root, className),
        ref: ref
      }, /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
        title: page === 0 ? '' : firstButtonText,
        placement: "top",
        enterDelay: 300
      }, /*#__PURE__*/_react.default.createElement(_IconButton.default, _extends({
        size: "small",
        onClick: this.handleFirstPageButtonClick,
        disabled: page === 0
      }, firstPageButtonProps, firstButtonProps), /*#__PURE__*/_react.default.createElement(_ChevronLeft2.default, {
        className: classes.chevron
      }))), /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
        title: page === 0 ? '' : backButtonText,
        placement: "top",
        enterDelay: 300
      }, /*#__PURE__*/_react.default.createElement(_IconButton.default, _extends({
        size: "small",
        onClick: this.handlePrevButtonClick,
        disabled: page === 0
      }, backIconButtonProps, backButtonProps), /*#__PURE__*/_react.default.createElement(_ChevronLeft.default, {
        className: classes.chevron
      }))), this.numberOfPages > 1 ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Typography.default, {
        variant: "body2",
        className: classes.pageText
      }, pageText), /*#__PURE__*/_react.default.createElement(_TextField.default, _extends({
        className: classes.pageNumberInput,
        style: {
          width: 25 + 10 * numberOfDigits,
          minWidth: 25 + 10 * numberOfDigits
        },
        value: pageNumberInputValue.toLocaleString(),
        onChange: function onChange(event) {
          return _this2.handlePageNumberInputChange(event);
        },
        onBlur: this.handleBlur,
        size: "small"
      }, pageNumberInputProps)), /*#__PURE__*/_react.default.createElement(_Typography.default, {
        variant: "body2",
        className: classes.totalPages
      }, !isLastPage ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "".concat(ofText, " "), /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
        title: lastButtonText,
        placement: "top",
        enterDelay: 300
      }, /*#__PURE__*/_react.default.createElement(_Link.default, _extends({
        onClick: this.handleLastPageButtonClick,
        className: classes.link
      }, lastPageButtonProps, lastButtonProps), this.numberOfPages.toLocaleString()))) : "".concat(ofText, " ").concat(this.numberOfPages.toLocaleString()))) : /*#__PURE__*/_react.default.createElement(_Typography.default, {
        variant: "body2",
        className: classes.totalPages
      }, "".concat(pageText, " 1 ").concat(ofText, " 1")), /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
        title: isLastPage ? '' : nextButtonText,
        placement: "top",
        enterDelay: 300
      }, /*#__PURE__*/_react.default.createElement(_IconButton.default, _extends({
        size: "small",
        onClick: this.handleNextButtonClick,
        disabled: isLastPage
      }, nextIconButtonProps, nextButtonProps), /*#__PURE__*/_react.default.createElement(_ChevronRight.default, {
        className: classes.chevron
      }))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var lastPage = Math.floor(props.count / props.rowsPerPage);
      if (state.pageNumberInputValue === '') {
        return null;
      } else if (props.page === lastPage || props.page !== state.pageNumberInputValue + 1) {
        return {
          pageNumberInputValue: props.page + 1
        };
      } else {
        return null;
      }
    }
  }]);
  return InternalTablePaginationActions;
}(_react.default.Component);
exports.InternalTablePaginationActions = InternalTablePaginationActions;
InternalTablePaginationActions.propTypes = {
  /** JSS styles object.
   * @ignore */
  classes: _propTypes.default.object.isRequired,
  count: _propTypes.default.number.isRequired,
  onChangePage: _propTypes.default.func.isRequired,
  page: _propTypes.default.number.isRequired,
  rowsPerPage: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]).isRequired,
  backButtonProps: _propTypes.default.object,
  firstPageButtonProps: _propTypes.default.object,
  lastPageButtonProps: _propTypes.default.object,
  nextButtonProps: _propTypes.default.object,
  pageNumberInputProps: _propTypes.default.object
};
var _default = (0, _compose.default)((0, _withStyles.default)(styles), (0, _withRef.default)())(InternalTablePaginationActions);
exports.default = _default;