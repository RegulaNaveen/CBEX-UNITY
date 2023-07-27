"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ClickAwayListener = _interopRequireDefault(require("@mui/base/ClickAwayListener"));
var _Grow = _interopRequireDefault(require("@mui/material/Grow"));
var _MenuList = _interopRequireDefault(require("@mui/material/MenuList"));
var _Paper = _interopRequireDefault(require("@mui/material/Paper"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _shadows = require("../../shadows");
var _Popper = _interopRequireDefault(require("../Popper"));
var _convertToPlacement = _interopRequireDefault(require("./convertToPlacement"));
var _excluded = ["children", "id", "open", "onClose", "anchorEl", "anchorOrigin", "transformOrigin", "placement", "disablePortal", "disableTransition", "classes", "className", "PaperProps", "MenuListProps", "ClickAwayProps", "TransitionProps", "TransitionComponent"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var placements = {
  'bottom-end': 'top right',
  'bottom-start': 'top left',
  bottom: 'top center',
  'left-end': 'bottom right',
  'left-start': 'top right',
  left: 'right center',
  'right-end': 'bottom left',
  'right-start': 'top left',
  right: 'left center',
  'top-end': 'bottom right',
  'top-start': 'bottom left',
  top: 'bottom center'
};
var PopperMenu = function PopperMenu(_ref) {
  var children = _ref.children,
    id = _ref.id,
    open = _ref.open,
    _ref$onClose = _ref.onClose,
    onClose = _ref$onClose === void 0 ? function () {} : _ref$onClose,
    anchorEl = _ref.anchorEl,
    anchorOrigin = _ref.anchorOrigin,
    transformOrigin = _ref.transformOrigin,
    _ref$placement = _ref.placement,
    placement = _ref$placement === void 0 ? 'bottom-start' : _ref$placement,
    _ref$disablePortal = _ref.disablePortal,
    disablePortal = _ref$disablePortal === void 0 ? false : _ref$disablePortal,
    _ref$disableTransitio = _ref.disableTransition,
    disableTransition = _ref$disableTransitio === void 0 ? false : _ref$disableTransitio,
    _ref$classes = _ref.classes,
    classes = _ref$classes === void 0 ? {} : _ref$classes,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$PaperProps = _ref.PaperProps,
    PaperProps = _ref$PaperProps === void 0 ? {} : _ref$PaperProps,
    _ref$MenuListProps = _ref.MenuListProps,
    MenuListProps = _ref$MenuListProps === void 0 ? {} : _ref$MenuListProps,
    _ref$ClickAwayProps = _ref.ClickAwayProps,
    ClickAwayProps = _ref$ClickAwayProps === void 0 ? {} : _ref$ClickAwayProps,
    _ref$TransitionProps = _ref.TransitionProps,
    CustomTransitionProps = _ref$TransitionProps === void 0 ? {} : _ref$TransitionProps,
    _ref$TransitionCompon = _ref.TransitionComponent,
    TransitionComponent = _ref$TransitionCompon === void 0 ? _Grow.default : _ref$TransitionCompon,
    rest = _objectWithoutProperties(_ref, _excluded);
  var realPlacement = anchorOrigin && transformOrigin ? (0, _convertToPlacement.default)({
    anchorOrigin: anchorOrigin,
    transformOrigin: transformOrigin
  }) : placement;
  var handleListKeyDown = function handleListKeyDown(event) {
    if (event.key === 'Tab' || event.key === 'Escape') {
      event.preventDefault();
      anchorEl.focus();
      onClose && onClose(event);
    }
  };
  var content = /*#__PURE__*/_react.default.createElement(_Paper.default, _extends({}, PaperProps, {
    className: (0, _classnames.default)(classes.paper, PaperProps.className)
  }), /*#__PURE__*/_react.default.createElement(_ClickAwayListener.default, _extends({
    onClickAway: onClose
  }, ClickAwayProps), /*#__PURE__*/_react.default.createElement(_MenuList.default, _extends({
    id: id,
    autoFocusItem: open,
    onKeyDown: handleListKeyDown
  }, MenuListProps, {
    className: (0, _classnames.default)(classes.list, MenuListProps.className)
  }), children)));
  return /*#__PURE__*/_react.default.createElement(_Popper.default, _extends({
    open: open,
    anchorEl: anchorEl,
    placement: realPlacement,
    disablePortal: disablePortal,
    transition: !disableTransition,
    className: (0, _classnames.default)(classes.root, className),
    sx: {
      zIndex: 3001,
      '.MuiPaper-root': {
        boxShadow: _shadows.shadowLevel3,
        borderColor: _colors.neutral4
      }
    }
  }, rest), disableTransition ? content : function (_ref2) {
    var TransitionProps = _ref2.TransitionProps,
      placement = _ref2.placement;
    return /*#__PURE__*/_react.default.createElement(TransitionComponent, _extends({}, TransitionProps, CustomTransitionProps, {
      sx: _objectSpread(_objectSpread(_objectSpread({
        transformOrigin: placements[placement]
      }, PaperProps === null || PaperProps === void 0 ? void 0 : PaperProps.sx), TransitionProps === null || TransitionProps === void 0 ? void 0 : TransitionProps.sx), CustomTransitionProps === null || CustomTransitionProps === void 0 ? void 0 : CustomTransitionProps.sx)
    }), content);
  });
};
PopperMenu.propTypes = {
  /**
   * A HTML element, or a function that returns it. It's used to set the
   * position of the popper.
   */
  anchorEl: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.func]),
  /** CSS classes applied to the internal components. */
  classes: _propTypes.default.shape({
    list: _propTypes.default.string,
    paper: _propTypes.default.string,
    root: _propTypes.default.string
  }),
  /** Classes applied to the root `Popper` component. */
  className: _propTypes.default.string,
  /** Props forwarded to the `ClickAwayListener` component. */
  ClickAwayProps: _propTypes.default.object,
  /** If `true`, the children will be under the DOM hierarchy of the parent component. */
  disablePortal: _propTypes.default.bool,
  /** If `true`, list will render without a transition. */
  disableTransition: _propTypes.default.bool,
  /** ID of the menu. */
  id: _propTypes.default.string,
  /** Props forwarded to the `MenuList` component. */
  MenuListProps: _propTypes.default.object,
  /** Callback fired when the component requests to be closed. */
  onClose: _propTypes.default.func,
  /** If `true`, the menu is visible. */
  open: _propTypes.default.bool,
  /** Props forwarded to the `Paper` component. */
  PaperProps: _propTypes.default.object,
  /** Placement of the `Popper`. */
  placement: _propTypes.default.oneOf(['auto-end', 'auto-start', 'auto', 'bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),
  /**
   * Transition component that wraps the `MenuList`.
   *
   * @see https://mui.com/material-ui/transitions/
   */
  TransitionComponent: _propTypes.default.elementType,
  /**
   * Props forwarded to the transition component specified by `TransitionComponent`.
   */
  TransitionProps: _propTypes.default.object
};
var _default = PopperMenu;
exports.default = _default;