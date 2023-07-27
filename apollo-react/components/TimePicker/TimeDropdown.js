"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateListItems = exports.default = exports.TimeDropdown = void 0;
var _ClickAwayListener = _interopRequireDefault(require("@mui/material/ClickAwayListener"));
var _Popper = _interopRequireDefault(require("@mui/material/Popper"));
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _moment = _interopRequireDefault(require("moment"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _colors = require("../../colors");
var _Check = _interopRequireDefault(require("../../icons/Check"));
var _Button = _interopRequireDefault(require("../Button"));
var _List = _interopRequireDefault(require("../List"));
var _ListItem = _interopRequireDefault(require("../ListItem"));
var _ListItemIcon = _interopRequireDefault(require("../ListItemIcon"));
var _ListItemText = _interopRequireDefault(require("../ListItemText"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var styles = {
  popup: {
    minWidth: 144,
    height: 216,
    border: "1px solid ".concat(_colors.neutral4),
    borderRadius: 4,
    boxShadow: '0 8px 20px 0 rgba(0, 0, 0, 0.08)',
    zIndex: 3001
  },
  timeList: {
    backgroundColor: _colors.white,
    minWidth: 144,
    height: 200,
    overflowY: 'auto',
    zIndex: 3001,
    borderRadius: 4
  },
  popupWithOverlay: {
    height: 257 // timeList + Overlay + 1px border divider
  },

  timeListWithOverlay: {
    height: 200,
    paddingBottom: 0
  },
  popupNoOverlaySmall: {
    minWidth: 132,
    height: 176
  },
  popupWithOverlaySmall: {
    height: 207
  },
  timeListNoOverlaySmall: {
    height: 160
  },
  timeListWithOverlaySmall: {
    height: 168,
    paddingBottom: 0
  },
  nowOverlay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f6f7fb',
    borderTop: "1px solid ".concat(_colors.neutral4),
    minWidth: 144,
    height: 48,
    borderRadius: '0 0 4px 4px',
    padding: '0 4px'
  },
  nowOverlaySmall: {
    height: 38
  },
  listItem: {
    textAlign: 'left',
    padding: '8px 24px 8px 8px',
    '&:hover': {
      background: _colors.primaryLight
    }
  },
  smallListItem: {
    padding: '4px 22px 4px 8px',
    '& span': {
      fontSize: 14,
      lineHeight: '24px'
    }
  },
  icon: {
    minWidth: 'auto',
    '& svg': {
      color: _colors.black
    }
  },
  text: {
    marginLeft: 20,
    '& span': {
      color: _colors.neutral7
    }
  },
  selected: {
    marginLeft: 4,
    '& span': {
      color: _colors.black,
      fontWeight: '600'
    }
  },
  check: {
    fontSize: '16px !important'
  },
  smallCheck: {
    fontSize: '14px !important'
  },
  nowText: {
    textAlign: 'left',
    marginLeft: 24
  },
  nowSelected: {
    marginLeft: 8,
    '& span': {
      color: _colors.black,
      fontWeight: '600'
    }
  },
  nowSelectedSmall: {
    marginLeft: 18
  },
  timeSection: {
    display: 'inline-block',
    minWidth: '2ch',
    textAlign: 'left',
    '&:first-of-type': {
      textAlign: 'right'
    }
  }
};
var useStyles = (0, _makeStyles.default)(styles);
var generateListItems = function generateListItems() {
  var entries = [];
  var i = 0;
  var period = 'AM';
  while (i < 12) {
    var h = i === 0 ? 12 : i;
    var vh = h >= 10 ? h : "0".concat(h);
    entries.push({
      label: [h, ':00', period],
      value: "".concat(vh, ":00 ").concat(period)
    });
    entries.push({
      label: [h, ':30', period],
      value: "".concat(vh, ":30 ").concat(period)
    });
    if (i === 11 && period === 'AM') {
      period = 'PM';
      i = 0;
    } else {
      i++;
    }
  }
  return entries;
};
exports.generateListItems = generateListItems;
var timeList = generateListItems();
var TimeDropdown = function TimeDropdown(_ref) {
  var anchorEl = _ref.anchorEl,
    onClose = _ref.onClose,
    onChange = _ref.onChange,
    selected = _ref.selected,
    showNowOption = _ref.showNowOption,
    nowSelected = _ref.nowSelected,
    size = _ref.size,
    nowText = _ref.nowText;
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_Popper.default, {
    anchorEl: anchorEl,
    open: Boolean(anchorEl),
    className: (0, _classnames.default)(classes.popup, showNowOption === 'overlay' && classes.popupWithOverlay, size === 'small' && [classes.popupNoOverlaySmall, showNowOption === 'overlay' && classes.popupWithOverlaySmall]),
    modifiers: [{
      name: 'offset',
      options: {
        offset: [0, 4]
      }
    }],
    placement: "bottom-start"
  }, /*#__PURE__*/_react.default.createElement(_ClickAwayListener.default, {
    onClickAway: onClose
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_List.default, {
    className: (0, _classnames.default)(classes.timeList, showNowOption === 'overlay' && classes.timeListWithOverlay, size === 'small' && classes.timeListNoOverlaySmall)
  }, (showNowOption === 'listItem' || showNowOption === true) && /*#__PURE__*/_react.default.createElement(_ListItem.default, {
    key: "now",
    className: (0, _classnames.default)(classes.listItem, size === 'small' && classes.smallListItem),
    button: true,
    onClick: function onClick() {
      return onChange && onChange((0, _moment.default)().format('hh:mm A'), true);
    }
  }, nowSelected && /*#__PURE__*/_react.default.createElement(_ListItemIcon.default, {
    className: classes.icon
  }, /*#__PURE__*/_react.default.createElement(_Check.default, {
    className: (0, _classnames.default)(classes.check, size === 'small' && classes.smallCheck)
  })), /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
    primary: nowText,
    className: (0, _classnames.default)(classes.text, classes.nowText, nowSelected && classes.nowSelected, nowSelected && size === 'small' && classes.nowSelectedSmall)
  })), timeList.map(function (entry) {
    return /*#__PURE__*/_react.default.createElement(_ListItem.default, {
      key: entry.value,
      className: (0, _classnames.default)(classes.listItem, size === 'small' && classes.smallListItem),
      button: true,
      onClick: function onClick() {
        return onChange && onChange(entry.value);
      }
    }, entry.value === selected && /*#__PURE__*/_react.default.createElement(_ListItemIcon.default, {
      className: classes.icon
    }, /*#__PURE__*/_react.default.createElement(_Check.default, {
      className: (0, _classnames.default)(classes.check, size === 'small' && classes.smallCheck)
    })), /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
      className: (0, _classnames.default)(classes.text, entry.value === selected && classes.selected)
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: classes.timeSection
    }, entry.label[0]), /*#__PURE__*/_react.default.createElement("span", {
      className: classes.timeSection
    }, entry.label[1]), /*#__PURE__*/_react.default.createElement("span", {
      className: classes.timeSection
    }, "\xA0", entry.label[2])));
  })), showNowOption === 'overlay' && /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(classes.nowOverlay, size === 'small' && classes.nowOverlaySmall)
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "text",
    disabled: nowSelected,
    onClick: function onClick() {
      return onChange && onChange((0, _moment.default)().format('hh:mm A'), true);
    },
    size: size
  }, nowText)))));
};
exports.TimeDropdown = TimeDropdown;
TimeDropdown.propTypes = {
  /**
   * A HTML element, or a function that returns it. It's used to set the
   * position of the popper.
   */
  anchorEl: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.func]),
  /** If `true`, the 'Now' option is selected. */
  nowSelected: _propTypes.default.bool,
  /**
   * The text to be displayed in the 'Now' listItem, or 'Now' overlay.
   * The default text is 'Now'
   */
  nowText: _propTypes.default.node,
  /** Callback fired when a new time is selected. */
  onChange: _propTypes.default.func,
  /** Callback fired when the component requests to be closed. */
  onClose: _propTypes.default.func,
  /** The selected time. */
  selected: _propTypes.default.string,
  /** Show 'Now' as a list item, an overlay, or not at all. */
  showNowOption: _propTypes.default.oneOf(['listItem', 'overlay', true, false]),
  /** The size of the component. */
  size: _propTypes.default.oneOf(['small', 'medium'])
};
var _default = TimeDropdown;
exports.default = _default;