"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPasswordStrength = exports.default = exports.PasswordComplexity = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _LinearProgress = _interopRequireDefault(require("../LinearProgress"));
var _Typography = _interopRequireDefault(require("../Typography"));
var _excluded = ["fullWidth", "value", "className", "forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var passwordStrengths = {
  short: {
    score: 25,
    description: 'Too Short',
    color: _colors.utilityNegative
  },
  weak: {
    score: 50,
    description: 'Weak',
    color: _colors.utilityWarning
  },
  okay: {
    score: 75,
    description: 'Okay',
    color: _colors.utilityPositive
  },
  strong: {
    score: 100,
    description: 'Strong',
    color: _colors.utilityInfo
  }
};
var styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    width: 300,
    marginLeft: 10,
    marginBottom: 18
  },
  fullWidth: {
    width: '100%'
  },
  linearProgress: {
    flexGrow: 1
  },
  short: {
    background: passwordStrengths.short.color,
    color: passwordStrengths.short.color
  },
  weak: {
    background: passwordStrengths.weak.color,
    color: passwordStrengths.weak.color
  },
  okay: {
    background: passwordStrengths.okay.color,
    color: passwordStrengths.okay.color
  },
  strong: {
    background: passwordStrengths.strong.color,
    color: passwordStrengths.strong.color
  },
  word: {
    marginLeft: 10,
    background: 'transparent'
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var passwordRegexStrong = new RegExp('^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$');
var passwordRegexOkay = new RegExp('^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{5,}$');
var passwordRegexWeak = new RegExp('(?=.{3,}).*');
var getPasswordStrength = function getPasswordStrength(value) {
  if (passwordRegexStrong.test(value)) {
    return 'strong';
  }
  if (passwordRegexOkay.test(value)) {
    return 'okay';
  }
  if (passwordRegexWeak.test(value)) {
    return 'weak';
  }
  return 'short';
};
exports.getPasswordStrength = getPasswordStrength;
var PasswordComplexity = function PasswordComplexity(_ref) {
  var fullWidth = _ref.fullWidth,
    value = _ref.value,
    className = _ref.className,
    ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = useStyles();
  var strength = getPasswordStrength(value);
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _classnames.default)(classes.root, fullWidth && classes.fullWidth, className)
  }, rest, {
    ref: ref
  }), /*#__PURE__*/_react.default.createElement(_LinearProgress.default, {
    className: classes.linearProgress,
    classes: {
      bar1Determinate: classes[strength]
    },
    variant: "determinate",
    value: passwordStrengths[strength].score
  }), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "body2",
    className: (0, _classnames.default)(classes.word, classes[strength])
  }, passwordStrengths[strength].description));
};
exports.PasswordComplexity = PasswordComplexity;
PasswordComplexity.propTypes = {
  /** If `true`, the component takes up the full width of its container. */
  fullWidth: _propTypes.default.bool,
  /** The value of component. */
  value: _propTypes.default.string
};
var _default = (0, _withRef.default)()(PasswordComplexity);
exports.default = _default;