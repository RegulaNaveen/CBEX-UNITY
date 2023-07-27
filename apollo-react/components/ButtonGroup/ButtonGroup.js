"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultButtonProps = exports.default = exports.ButtonGroup = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _Button = _interopRequireDefault(require("../Button"));
var _excluded = ["className", "alignItems", "buttonProps", "forwardedRef"],
  _excluded2 = ["label"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    '& button': {
      '&:not(:first-of-type)': {
        marginLeft: 8
      }
    }
  },
  left: {
    justifyContent: 'flex-start'
  },
  center: {
    justifyContent: 'center'
  },
  right: {
    justifyContent: 'flex-end'
  },
  spaceBetween: {
    justifyContent: 'space-between'
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var firstButtonProps = {
  variant: 'text',
  label: 'Cancel'
};
var lastButtonProps = {
  variant: 'primary',
  label: 'Done'
};
var defaultButtonProps = [firstButtonProps, lastButtonProps];
exports.defaultButtonProps = defaultButtonProps;
var ButtonGroup = function ButtonGroup(_ref) {
  var className = _ref.className,
    _ref$alignItems = _ref.alignItems,
    alignItems = _ref$alignItems === void 0 ? 'left' : _ref$alignItems,
    _ref$buttonProps = _ref.buttonProps,
    buttonProps = _ref$buttonProps === void 0 ? defaultButtonProps : _ref$buttonProps,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  var newButtonProps = _toConsumableArray(buttonProps);
  newButtonProps[0] = _objectSpread(_objectSpread({}, firstButtonProps), newButtonProps[0]);
  newButtonProps[newButtonProps.length - 1] = _objectSpread(_objectSpread({}, lastButtonProps), newButtonProps[newButtonProps.length - 1]);
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _classnames.default)(classes.root, classes[alignItems], className)
  }, rest, {
    ref: ref
  }), newButtonProps.map(function (_ref2, index) {
    var label = _ref2.label,
      rest = _objectWithoutProperties(_ref2, _excluded2);
    return /*#__PURE__*/_react.default.createElement(_Button.default, _extends({
      key: index,
      variant: "tertiary"
    }, rest), label);
  }));
};
exports.ButtonGroup = ButtonGroup;
ButtonGroup.propTypes = {
  /** The alignment of the button group. */
  alignItems: _propTypes.default.oneOf(['left', 'center', 'right']),
  /** Array of props for the `Button`s. */
  buttonProps: _propTypes.default.arrayOf(_propTypes.default.shape({
    /** The content of the button. */
    label: _propTypes.default.node,
    /** Callback fired when the component is clicked. */
    onClick: _propTypes.default.func,
    /** The variant to use. */
    variant: _propTypes.default.oneOf(['primary', 'secondary', 'tertiary', 'text'])
  }))
};
var _default = (0, _withRef.default)()(ButtonGroup);
exports.default = _default;