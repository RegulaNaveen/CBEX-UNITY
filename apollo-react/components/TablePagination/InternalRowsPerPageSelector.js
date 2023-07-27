"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.InternalRowsPerPageSelector = void 0;
var _utils = require("@mui/material/utils");
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _Button = _interopRequireDefault(require("../Button"));
var _MenuItem = _interopRequireDefault(require("../MenuItem"));
var _Select = _interopRequireDefault(require("../Select"));
var _Typography = _interopRequireDefault(require("../Typography"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var styles = {
  rowsCaption: {
    marginRight: 8,
    display: 'inline'
  },
  select: {
    marginTop: 2
  },
  selected: {
    padding: 8,
    display: 'inline',
    fontWeight: 500
  },
  button: {
    minWidth: 0
  },
  divider: {
    backgroundColor: _colors.neutral3,
    height: 16,
    width: 1,
    marginRight: 8,
    marginLeft: 8,
    display: 'inline-block'
  },
  root: {
    display: 'inline-block',
    alignItems: 'center'
  },
  hide: {
    visibility: 'hidden',
    position: 'absolute'
  },
  flex: {
    display: 'flex',
    alignItems: 'center'
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var InternalRowsPerPageSelector = function InternalRowsPerPageSelector(_ref) {
  var rowsPerPageOptions = _ref.rowsPerPageOptions,
    labelRowsPerPage = _ref.labelRowsPerPage,
    value = _ref.value,
    onChange = _ref.onChange,
    SelectProps = _ref.SelectProps,
    ref = _ref.forwardedRef,
    isCompact = _ref.isCompact;
  var classes = useStyles();
  var selectId = (0, _utils.unstable_useId)();
  var labelId = (0, _utils.unstable_useId)();
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(classes.root, isCompact && classes.hide),
    ref: ref
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.flex
  }, rowsPerPageOptions.length > 1 && /*#__PURE__*/_react.default.createElement(_Typography.default, {
    color: "inherit",
    variant: "body2",
    className: classes.rowsCaption,
    id: labelId
  }, labelRowsPerPage), rowsPerPageOptions.length > 1 && rowsPerPageOptions.map(function (rowsPerPageOption, i) {
    var rowValue = rowsPerPageOption.value ? rowsPerPageOption.value : rowsPerPageOption;
    var label = rowsPerPageOption.label ? rowsPerPageOption.label : rowsPerPageOption;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: rowValue
    }, i !== 0 && /*#__PURE__*/_react.default.createElement("span", {
      className: classes.divider
    }), rowValue === value ? /*#__PURE__*/_react.default.createElement(_Typography.default, {
      variant: "body2",
      className: classes.selected
    }, label) : /*#__PURE__*/_react.default.createElement(_Button.default, {
      size: "small",
      className: classes.button,
      onClick: function onClick() {
        return onChange({
          target: {
            value: rowValue
          }
        });
      }
    }, label));
  }))), isCompact && rowsPerPageOptions.length > 1 && /*#__PURE__*/_react.default.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.flex
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    color: "inherit",
    variant: "body2",
    className: classes.rowsCaption,
    id: labelId
  }, labelRowsPerPage), /*#__PURE__*/_react.default.createElement(_Select.default, _extends({
    className: classes.select,
    value: value,
    onChange: onChange,
    id: selectId,
    labelId: labelId,
    canDeselect: false,
    size: "small"
  }, SelectProps), rowsPerPageOptions.map(function (rowsPerPageOption) {
    return /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
      key: rowsPerPageOption.value ? rowsPerPageOption.value : rowsPerPageOption,
      value: rowsPerPageOption.value ? rowsPerPageOption.value : rowsPerPageOption
    }, rowsPerPageOption.label ? rowsPerPageOption.label : rowsPerPageOption);
  })))));
};
exports.InternalRowsPerPageSelector = InternalRowsPerPageSelector;
var _default = (0, _withRef.default)()(InternalRowsPerPageSelector);
exports.default = _default;