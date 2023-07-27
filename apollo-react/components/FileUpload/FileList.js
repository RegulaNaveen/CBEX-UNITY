"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FileList = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _FileItem = _interopRequireDefault(require("./FileItem"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var styles = {
  root: {
    margin: 0,
    padding: 0,
    listStyle: 'none'
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var FileList = function FileList(_ref) {
  var files = _ref.files,
    onFileDelete = _ref.onFileDelete;
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement("ul", {
    className: classes.root
  }, files.map(function (file) {
    return /*#__PURE__*/_react.default.createElement(_FileItem.default, {
      key: file.name,
      file: file,
      onFileDelete: onFileDelete
    });
  }));
};
exports.FileList = FileList;
FileList.propTypes = {
  files: _propTypes.default.array,
  onFileDelete: _propTypes.default.func
};
var _default = FileList;
exports.default = _default;