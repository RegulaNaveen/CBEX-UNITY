"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatFileSize = exports.default = exports.FileName = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _Tooltip = _interopRequireDefault(require("../Tooltip"));
var _Typography = _interopRequireDefault(require("../Typography"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var styles = {
  grey: {
    color: _colors.neutral6,
    whiteSpace: 'nowrap'
  },
  truncate: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  fileName: {
    display: 'flex',
    width: 'calc(100% - 52px)',
    lineHeight: 1.71
  },
  loadingFileName: {
    color: _colors.neutral6
  },
  extension: {
    marginRight: 5,
    whiteSpace: 'nowrap'
  }
};
var useStyles = (0, _makeStyles.default)(styles);

// Note: File sizes are in SI standard for base-10 units
// https://wiki.ubuntu.com/UnitsPolicy
var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
var formatFileSize = function formatFileSize(size) {
  var i = 0;
  while (parseFloat(size.toFixed(1)) >= 1000) {
    size /= 1000;
    i++;
  }
  return parseFloat(size.toFixed(1)) + ' ' + units[i];
};
exports.formatFileSize = formatFileSize;
var FileName = function FileName(_ref) {
  var file = _ref.file;
  var classes = useStyles();
  var fileSize = formatFileSize(file.size);
  var fileName = file.name;
  var extension = '';
  if (file.name.includes('.')) {
    var fileSplit = file.name.split('.');
    fileName = fileSplit.slice(0, -1).join('.');
    extension = ".".concat(fileSplit[fileSplit.length - 1]);
  }
  return /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    title: file.name,
    placement: "top"
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "body2",
    className: (0, _classnames.default)(classes.fileName, file.loading && classes.loadingFileName)
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: classes.truncate
  }, fileName), /*#__PURE__*/_react.default.createElement("span", {
    className: classes.extension
  }, extension), /*#__PURE__*/_react.default.createElement("span", {
    className: classes.grey
  }, " (".concat(fileSize, ")"))));
};
exports.FileName = FileName;
FileName.propTypes = {
  file: _propTypes.default.object
};
var _default = FileName;
exports.default = _default;