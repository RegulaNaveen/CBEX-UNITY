"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Menu = void 0;
var _Menu = _interopRequireDefault(require("@mui/material/Menu"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _excluded = ["forwardedRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var Menu = function Menu(_ref) {
  var ref = _ref.forwardedRef,
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/_react.default.createElement(_Menu.default, _extends({
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left'
    }
  }, rest, {
    ref: ref
  }));
};
exports.Menu = Menu;
Menu.propTypes = {
  /**
   * A HTML element, or a function that returns it. It's used to set the
   * position of the menu.
   */
  anchorEl: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.func]),
  /**
   * This is the point on the anchor where the popover's `anchorEl` will attach to.
   *
   * Options:
   * vertical: [top, center, bottom]
   * horizontal: [left, center, right]
   */
  anchorOrigin: _propTypes.default.shape({
    horizontal: _propTypes.default.oneOfType([_propTypes.default.oneOf(['center', 'left', 'right']), _propTypes.default.number]).isRequired,
    vertical: _propTypes.default.oneOfType([_propTypes.default.oneOf(['bottom', 'center', 'top']), _propTypes.default.number]).isRequired
  }),
  /** ID of the menu. */
  id: _propTypes.default.string,
  /** Callback fired when the component requests to be closed. */
  onClose: _propTypes.default.func,
  /** If `true`, the menu is visible. */
  open: _propTypes.default.bool,
  /**
   * This is the point on the popover which
   * will attach to the anchor's origin.
   *
   * Options:
   * vertical: [top, center, bottom, x(px)]
   * horizontal: [left, center, right, x(px)]
   */
  transformOrigin: _propTypes.default.shape({
    horizontal: _propTypes.default.oneOfType([_propTypes.default.oneOf(['center', 'left', 'right']), _propTypes.default.number]).isRequired,
    vertical: _propTypes.default.oneOfType([_propTypes.default.oneOf(['bottom', 'center', 'top']), _propTypes.default.number]).isRequired
  })
};
var _default = (0, _withRef.default)()(Menu);
exports.default = _default;