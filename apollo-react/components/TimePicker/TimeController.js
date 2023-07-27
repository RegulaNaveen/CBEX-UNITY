"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TimeController = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _ArrowDown = _interopRequireDefault(require("../../icons/ArrowDown"));
var _ArrowUp = _interopRequireDefault(require("../../icons/ArrowUp"));
var _Button = _interopRequireDefault(require("../Button"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var styles = {
  root: {
    position: 'absolute',
    right: 0,
    top: 0,
    borderLeft: "solid 1px ".concat(_colors.neutral4),
    display: 'flex',
    flexDirection: 'column',
    height: 38,
    marginTop: 1
  },
  smallRoot: {
    height: 30
  },
  error: {
    top: 1,
    height: 36
  },
  smallError: {
    top: 1,
    height: 28
  },
  buttons: {
    width: 31,
    minWidth: 31,
    padding: 0,
    height: 19,
    borderRadius: 0,
    '&:hover svg': {
      color: _colors.black
    }
  },
  smallButtons: {
    width: 27,
    minWidth: 27,
    height: 15
  },
  buttonsError: {
    height: 18
  },
  smallButtonsError: {
    height: 14
  },
  arrow: {
    fontSize: 16,
    color: _colors.neutral7
  },
  smallArrow: {
    fontSize: 15
  },
  disabled: {
    color: _colors.neutral5
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var TimeController = function TimeController(_ref) {
  var onChange = _ref.onChange,
    error = _ref.error,
    size = _ref.size,
    disabled = _ref.disabled;
  var classes = useStyles();
  var isSmall = size === 'small';
  var buttonClass = (0, _classnames.default)(classes.buttons, isSmall && classes.smallButtons, error && (isSmall ? classes.smallButtonsError : classes.buttonsError));
  var arrowClass = (0, _classnames.default)(classes.arrow, isSmall && classes.smallArrow, disabled && classes.disabled);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(classes.root, isSmall && classes.smallRoot, error && (isSmall ? classes.smallError : classes.error))
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    className: buttonClass,
    onClick: function onClick(e) {
      return onChange(e, true);
    }
  }, /*#__PURE__*/_react.default.createElement(_ArrowUp.default, {
    className: arrowClass
  })), /*#__PURE__*/_react.default.createElement(_Button.default, {
    className: buttonClass,
    onClick: function onClick(e) {
      return onChange(e, false);
    }
  }, /*#__PURE__*/_react.default.createElement(_ArrowDown.default, {
    className: arrowClass
  })));
};
exports.TimeController = TimeController;
TimeController.propTypes = {
  onChange: _propTypes.default.func
};
var _default = TimeController;
exports.default = _default;