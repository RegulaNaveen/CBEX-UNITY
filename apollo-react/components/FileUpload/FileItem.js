"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FileItem = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _StatusCheck = _interopRequireDefault(require("../../icons/StatusCheck"));
var _StatusExclamation = _interopRequireDefault(require("../../icons/StatusExclamation"));
var _Trash = _interopRequireDefault(require("../../icons/Trash"));
var _animations = require("../../utils/animations");
var _CircularProgress = _interopRequireDefault(require("../CircularProgress"));
var _IconButton = _interopRequireDefault(require("../IconButton"));
var _Typography = _interopRequireDefault(require("../Typography"));
var _FileName = _interopRequireDefault(require("./FileName"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var styles = _objectSpread(_objectSpread({}, _animations.slideUp), {}, {
  root: {
    animation: 'slideUp 0.4s ease',
    borderBottom: "solid 1px ".concat(_colors.neutral3),
    '&:last-child': {
      border: 'none'
    }
  },
  wrapper: {
    height: 40,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    marginRight: -2
  },
  typography: {
    lineHeight: 1.71
  },
  grey: {
    color: _colors.neutral6
  },
  red: {
    marginRight: -2,
    color: _colors.red,
    fontSize: '19.22px !important'
  },
  green: {
    marginRight: -2,
    color: _colors.green,
    fontSize: '19.22px !important'
  },
  loader: {
    marginRight: -2,
    marginTop: 2
  },
  errorMessage: {
    color: _colors.red,
    lineHeight: 1.5,
    marginTop: -5,
    paddingBottom: 10,
    display: 'block'
  }
});
var useStyles = (0, _makeStyles.default)(styles);
var FileItem = function FileItem(_ref) {
  var file = _ref.file,
    onFileDelete = _ref.onFileDelete;
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement("li", {
    className: classes.root,
    key: file.lastModified
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.wrapper
  }, /*#__PURE__*/_react.default.createElement(_FileName.default, {
    file: file
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.buttons
  }, file.loading ? /*#__PURE__*/_react.default.createElement(_CircularProgress.default, {
    variant: "indeterminate",
    size: "small",
    className: classes.loader
  }) : file.errorMessage ? /*#__PURE__*/_react.default.createElement(_StatusExclamation.default, {
    fontSize: "small",
    className: classes.red
  }) : /*#__PURE__*/_react.default.createElement(_StatusCheck.default, {
    fontSize: "small",
    className: classes.green
  }), /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    size: "small",
    onClick: function onClick() {
      return onFileDelete && onFileDelete(file);
    }
  }, /*#__PURE__*/_react.default.createElement(_Trash.default, null)))), file.errorMessage && /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "caption",
    className: classes.errorMessage
  }, file.errorMessage));
};
exports.FileItem = FileItem;
FileItem.propTypes = {
  file: _propTypes.default.object,
  onFileDelete: _propTypes.default.func
};
var _default = FileItem;
exports.default = _default;