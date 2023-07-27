"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DragHandle = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _react = _interopRequireDefault(require("react"));
var _reactSortableHoc = require("react-sortable-hoc");
var _colors = require("../../colors");
var _Drag = _interopRequireDefault(require("../../icons/Drag"));
var _Lock = _interopRequireDefault(require("../../icons/Lock"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var styles = {
  root: {
    color: _colors.neutral6,
    position: 'absolute',
    top: 0,
    left: 0,
    paddingLeft: 15,
    paddingTop: 7,
    cursor: 'grab'
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var DragHandle = function DragHandle(_ref) {
  var isLocked = _ref.isLocked;
  var classes = useStyles();
  var Icon = isLocked ? _Lock.default : _Drag.default;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/_react.default.createElement(Icon, {
    fontSize: "extraSmall"
  }));
};
exports.DragHandle = DragHandle;
var _default = (0, _reactSortableHoc.SortableHandle)(DragHandle);
exports.default = _default;