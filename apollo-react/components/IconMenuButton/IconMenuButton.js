"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.IconMenuButton = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _DropMenu = _interopRequireDefault(require("../DropMenu"));
var _IconButton = _interopRequireDefault(require("../IconButton"));
var _excluded = ["forwardedRef", "maxItems"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var IconMenuButton = function IconMenuButton(_ref) {
  var ref = _ref.forwardedRef,
    _ref$maxItems = _ref.maxItems,
    maxItems = _ref$maxItems === void 0 ? 10 : _ref$maxItems,
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/_react.default.createElement(_DropMenu.default, _extends({
    MenuAnchor: _IconButton.default,
    maxItems: maxItems
  }, rest, {
    ref: ref
  }));
};
exports.IconMenuButton = IconMenuButton;
IconMenuButton.propTypes = {
  /** ID of the menu. */
  id: _propTypes.default.string.isRequired,
  /**
   * This is the point on the anchor where the popover's `anchorEl` will attach to.
   *
   * Options:
   * vertical: [top, center, bottom]
   * horizontal: [left, center, right]
   *
   * @deprecated Use `placement` instead.
   */
  anchorOrigin: _propTypes.default.shape({
    horizontal: _propTypes.default.oneOfType([_propTypes.default.oneOf(['center', 'left', 'right']), _propTypes.default.number]).isRequired,
    vertical: _propTypes.default.oneOfType([_propTypes.default.oneOf(['bottom', 'center', 'top']), _propTypes.default.number]).isRequired
  }),
  /** Maximum number of menu items shown in the menu. */
  maxItems: _propTypes.default.number,
  /** The menu items to display in the dropdown. */
  menuItems: _propTypes.default.arrayOf(_propTypes.default.shape({
    /** If `true`, destructive action style will be applied. */
    destructiveAction: _propTypes.default.bool,
    /** The label content. */
    label: _propTypes.default.node,
    /** Callback fired when the component is clicked. */
    onClick: _propTypes.default.func
  })),
  /** If `true`, the menu is visible. */
  open: _propTypes.default.bool,
  /** Placement of the `Popper`. */
  placement: _propTypes.default.oneOf(['auto-end', 'auto-start', 'auto', 'bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),
  /** Props applied to the `PopperMenu` component. */
  PopperMenuProps: _propTypes.default.object,
  /**
   * This is the point on the popover which
   * will attach to the anchor's origin.
   *
   * Options:
   * vertical: [top, center, bottom, x(px)]
   * horizontal: [left, center, right, x(px)]
   *
   * @deprecated Use `placement` instead.
   */
  transformOrigin: _propTypes.default.shape({
    horizontal: _propTypes.default.oneOfType([_propTypes.default.oneOf(['center', 'left', 'right']), _propTypes.default.number]).isRequired,
    vertical: _propTypes.default.oneOfType([_propTypes.default.oneOf(['bottom', 'center', 'top']), _propTypes.default.number]).isRequired
  })
};
var _default = (0, _withRef.default)()(IconMenuButton);
exports.default = _default;