"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Accordion = void 0;
var _Accordion = _interopRequireDefault(require("@mui/material/Accordion"));
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _ChevronDown = _interopRequireDefault(require("../../icons/ChevronDown"));
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _AccordionDetails = _interopRequireDefault(require("../AccordionDetails"));
var _AccordionSummary = _interopRequireDefault(require("../AccordionSummary"));
var _Typography = _interopRequireDefault(require("../Typography"));
var _excluded = ["children", "variant", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  alternate: {
    backgroundColor: _colors.neutral1
  },
  expanded: {
    backgroundColor: 'transparent'
  },
  titleText: {
    fontSize: 16,
    paddingTop: 12,
    fontWeight: 500,
    lineHeight: 'inherit',
    color: 'inherit',
    '$expanded &': {
      fontWeight: 600,
      marginTop: 1,
      '@supports (-moz-appearance:none)': {
        marginTop: 0
      },
      '@supports (-ms-ime-align: auto)': {
        marginTop: 0
      }
    }
  },
  subtitleText: {
    fontSize: 14,
    lineHeight: 'inherit',
    color: 'inherit',
    paddingBottom: 12
  },
  detailsText: {
    color: 'inherit',
    fontSize: 16
  },
  icon: {
    fontSize: 16
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var addClassName = function addClassName(children, classNameTitle, classNameSubtitle) {
  return _react.default.Children.map(children, function (child, i) {
    var newClassName = i === 0 ? classNameTitle : classNameSubtitle;
    return (child === null || child === void 0 ? void 0 : child.type) === _Typography.default ? /*#__PURE__*/_react.default.cloneElement(child, {
      className: (0, _classnames.default)(newClassName, child.props.className)
    }) : child;
  });
};

// This is a hack to get around this issue with wrapping AccordionSummary:
// https://github.com/mui-org/material-ui/issues/10495
var Accordion = function Accordion(_ref) {
  var children = _ref.children,
    variant = _ref.variant,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  var childrenWithProps = _react.default.Children.toArray(children).filter(function (child) {
    return !!child;
  }).map(function (child) {
    if ((child === null || child === void 0 ? void 0 : child.type) === _AccordionSummary.default) {
      return /*#__PURE__*/_react.default.cloneElement(child, {
        expandIcon: /*#__PURE__*/_react.default.createElement(_ChevronDown.default, {
          className: classes.icon
        }),
        children: addClassName(child.props.children, classes.titleText, classes.subtitleText),
        classes: _objectSpread({
          expanded: classes.expanded
        }, variant === 'alternate' && {
          root: classes.alternate
        })
      });
    } else if ((child === null || child === void 0 ? void 0 : child.type) === _AccordionDetails.default) {
      return /*#__PURE__*/_react.default.cloneElement(child, {
        children: addClassName(child.props.children, classes.detailsText)
      });
    }
    return child;
  });
  return /*#__PURE__*/_react.default.createElement(_Accordion.default, _extends({
    square: true
  }, rest, {
    ref: ref
  }), childrenWithProps);
};
exports.Accordion = Accordion;
Accordion.propTypes = {
  /**
   * The content of the component.
   * Must be one of either `AccordionSummary`, `AccordionDetails`, or both.
   */
  children: _propTypes.default.node.isRequired,
  /** If `true`, expands the accordion by default. */
  defaultExpanded: _propTypes.default.bool,
  /** If `true`, the component is disabled. */
  disabled: _propTypes.default.bool,
  /**
   * If `true`, expands the accordion, otherwise collapse it. Setting this prop
   * enables control over the accordion.
   */
  expanded: _propTypes.default.bool,
  /** Callback fired when the expand/collapse state is changed. */
  onChange: _propTypes.default.func,
  /** The variant to use. */
  variant: _propTypes.default.oneOf(['default', 'alternate'])
};
var _default = (0, _withRef.default)()(Accordion);
exports.default = _default;