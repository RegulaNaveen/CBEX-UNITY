"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ColumnListItem = void 0;
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireWildcard(require("react"));
var _reactSortableHoc = require("react-sortable-hoc");
var _colors = require("../../colors");
var _Checkbox = require("../Checkbox/Checkbox");
var _MenuItem = _interopRequireDefault(require("../MenuItem"));
var _DragHandle = _interopRequireDefault(require("./DragHandle"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var styles = {
  menuItem: {
    height: 'initial',
    fontSize: 14,
    paddingRight: 32,
    paddingLeft: 44,
    paddingTop: 4,
    minHeight: '32px',
    paddingBottom: 4,
    lineHeight: '24px',
    whiteSpace: 'normal',
    zIndex: 3001,
    '&:hover label svg': {
      color: _colors.primary
    },
    '&:hover .Mui-checked svg': {
      color: _colors.primaryDark2
    }
  },
  disabledHidden: {
    '&:hover label svg': {
      color: _colors.neutral4
    }
  },
  disabledHeader: {
    color: _colors.neutral8,
    opacity: 0.4
  },
  checkbox: {
    position: 'absolute',
    right: 0,
    top: 0,
    marginRight: 19,
    pointerEvents: 'none'
  },
  frozenPadding: {
    paddingRight: 8
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var ColumnListItem = function ColumnListItem(_ref) {
  var accessor = _ref.accessor,
    header = _ref.header,
    hidden = _ref.hidden,
    toggleColumn = _ref.toggleColumn,
    noCheckbox = _ref.noCheckbox,
    isDisabled = _ref.isDisabled,
    isLocked = _ref.isLocked;
  var classes = useStyles();
  var clickHandler = (0, _react.useCallback)(function () {
    return toggleColumn && !isDisabled && toggleColumn(accessor);
  }, [toggleColumn, isDisabled, accessor]);
  return /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    selected: !hidden,
    className: (0, _classnames.default)(classes.menuItem, noCheckbox && classes.frozenPadding, isDisabled && hidden && classes.disabledHidden),
    onClick: clickHandler
  }, /*#__PURE__*/_react.default.createElement(_DragHandle.default, {
    isLocked: isLocked
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: (0, _classnames.default)(isDisabled && hidden && classes.disabledHeader)
  }, header), !noCheckbox && /*#__PURE__*/_react.default.createElement(_Checkbox.Checkbox, {
    checked: !hidden,
    disabled: isDisabled,
    className: classes.checkbox
  }));
};
exports.ColumnListItem = ColumnListItem;
var _default = (0, _reactSortableHoc.SortableElement)(ColumnListItem);
exports.default = _default;