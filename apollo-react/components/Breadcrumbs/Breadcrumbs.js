"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Breadcrumbs = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _ChevronRight = _interopRequireDefault(require("../../icons/ChevronRight"));
var _House = _interopRequireDefault(require("../../icons/House"));
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _IconButton = _interopRequireDefault(require("../IconButton"));
var _BreadcrumbsItem = _interopRequireDefault(require("./BreadcrumbsItem"));
var _excluded = ["items", "className", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '2rem',
    color: _colors.neutral6
  },
  divider: {
    display: 'inline-block',
    fontSize: 14,
    marginLeft: -1,
    marginRight: -1
  },
  item: {
    display: 'flex',
    alignItems: 'center'
  },
  iconButton: {
    color: _colors.neutral6,
    '&:hover': {
      color: _colors.primary
    }
  },
  houseIcon: {
    fontSize: 16.8,
    padding: 0.1
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var Breadcrumbs = function Breadcrumbs(_ref) {
  var items = _ref.items,
    className = _ref.className,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  var homeNode = items[0];
  var otherNodes = items.slice(1);
  return /*#__PURE__*/_react.default.createElement("ol", _extends({
    className: (0, _classnames.default)(classes.root, className)
  }, rest, {
    ref: ref
  }), /*#__PURE__*/_react.default.createElement(_IconButton.default, _extends({}, homeNode, {
    className: classes.iconButton,
    size: "small"
  }), /*#__PURE__*/_react.default.createElement(_House.default, {
    className: classes.houseIcon
  })), otherNodes === null || otherNodes === void 0 ? void 0 : otherNodes.map(function (item, index) {
    return /*#__PURE__*/_react.default.createElement("div", {
      key: index,
      className: classes.item
    }, /*#__PURE__*/_react.default.createElement(_ChevronRight.default, {
      className: classes.divider
    }), /*#__PURE__*/_react.default.createElement(_BreadcrumbsItem.default, _extends({
      isLastNode: index === otherNodes.length - 1
    }, item)));
  }));
};
exports.Breadcrumbs = Breadcrumbs;
Breadcrumbs.propTypes = {
  /** The breadcrumb items. */
  items: _propTypes.default.arrayOf(_propTypes.default.shape({
    /** Callback fired when the component is clicked.
     * @ignore */
    handleClick: _propTypes.default.func,
    /** URL of the page the link goes to. */
    href: _propTypes.default.string,
    /** Callback fired when the component is clicked. */
    onClick: _propTypes.default.func,
    /** The text of the breadcrumb. */
    title: _propTypes.default.string
  }))
};
var _default = (0, _withRef.default)()(Breadcrumbs);
exports.default = _default;