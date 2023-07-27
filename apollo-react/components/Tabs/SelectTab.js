"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SelectTab = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _SelectButton = _interopRequireDefault(require("../SelectButton"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var styles = {
  button: {
    color: _colors.neutral7,
    backgroundColor: 'transparent',
    height: 32,
    paddingLeft: 0,
    paddingRight: 0,
    bottom: -8,
    '&:hover': {
      backgroundColor: 'transparent',
      color: _colors.black
    }
  },
  open: {
    color: _colors.black
  },
  selected: {
    color: _colors.black,
    fontWeight: 600
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var SelectTab = function SelectTab(_ref) {
  var children = _ref.children,
    _onChange = _ref.onChange,
    displayText = _ref.displayText,
    tabValue = _ref.tabValue,
    size = _ref.size,
    forwardedRef = _ref.forwardedRef;
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_SelectButton.default, {
    displayText: displayText,
    onChange: function onChange(e) {
      return _onChange(e, e);
    },
    className: classes.button,
    value: tabValue,
    disableRipple: true,
    noDeselect: true,
    widthVariant: size === 'small' ? 16 : 32,
    openClassName: classes.open,
    selectedClassName: classes.selected,
    size: size,
    forwardedRef: forwardedRef
  }, children);
};
exports.SelectTab = SelectTab;
SelectTab.propTypes = {
  /** The text to display in the button. */
  displayText: _propTypes.default.string,
  /** Callback fired when the value changes. */
  onChange: _propTypes.default.func,
  /** The size of the component. */
  size: _propTypes.default.oneOf(['small', 'medium']),
  /** The value of the component. */
  value: _propTypes.default.any
};
var _default = (0, _withRef.default)()(SelectTab);
exports.default = _default;