"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrivatePickersYear = exports.PrivatePickersMonth = exports.MuiYearPicker = exports.MuiPickersDay = exports.MuiPickersCalendarHeader = exports.MuiPickersArrowSwitcher = exports.MuiPickerStaticWrapper = exports.MuiMonthPicker = exports.MuiDayPicker = exports.MuiCalendarPicker = exports.MuiCalendarOrClockPicker = void 0;
var _colors = require("../../colors");
var _typography = require("../../typography");
var MuiDayPicker = {
  weekDayLabel: {
    fontFamily: _typography.fontFamily,
    width: 40,
    height: 24,
    fontSize: 16,
    fontWeight: 400,
    color: _colors.neutral8,
    margin: 0,
    lineHeight: '24px'
  },
  weekContainer: {
    margin: 0
  },
  monthContainer: {
    overflow: 'hidden'
  }
};
exports.MuiDayPicker = MuiDayPicker;
var MuiPickersDay = {
  root: {
    fontFamily: _typography.fontFamily,
    width: 40,
    height: 40,
    fontSize: 16,
    fontWeight: 500,
    color: _colors.neutral7,
    '&:hover': {
      backgroundColor: _colors.primaryLight,
      color: _colors.black
    },
    '&.Mui-selected': {
      '&:hover': {
        color: _colors.white
      }
    }
  },
  dayWithMargin: {
    margin: 0
  },
  today: {
    border: 'none !important',
    backgroundColor: _colors.neutral3
  }
};
exports.MuiPickersDay = MuiPickersDay;
var MuiCalendarOrClockPicker = {
  root: {
    width: 310,
    '& > div': {
      maxHeight: 382,
      overflowX: 'unset'
    }
  }
};
exports.MuiCalendarOrClockPicker = MuiCalendarOrClockPicker;
var MuiPickerStaticWrapper = {
  root: {
    minWidth: 310,
    width: 310
  },
  content: {
    minWidth: 310,
    width: 310,
    boxSizing: 'content-box'
  }
};
exports.MuiPickerStaticWrapper = MuiPickerStaticWrapper;
var MuiPickersCalendarHeader = {
  labelContainer: {
    margin: 'auto',
    zIndex: 1,
    borderRadius: 4,
    paddingLeft: 8,
    paddingRight: 8,
    height: 30,
    '&:hover': {
      backgroundColor: _colors.primaryLight
    },
    '& > button': {
      display: 'none'
    }
  },
  label: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 2,
    color: _colors.primary,
    opacity: 1,
    marginRight: 0,
    marginTop: 2
  },
  root: {
    paddingBottom: 16,
    paddingRight: 12,
    marginBottom: 0,
    '& > div:last-child': {
      boxSizing: 'border-box',
      position: 'absolute',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      left: 0,
      '& > button:first-of-type': {
        marginLeft: 16
      },
      '& > button:last-child': {
        marginRight: 16
      }
    }
  }
};
exports.MuiPickersCalendarHeader = MuiPickersCalendarHeader;
var MuiCalendarPicker = {
  root: {
    width: 310,
    margin: 'unset',
    maxHeight: 'unset',
    overflowX: 'unset'
  },
  viewTransitionContainer: {
    '& span[aria-hidden="true"]': {
      height: 24,
      fontSize: 16,
      lineHeight: 1.5,
      color: _colors.neutral8,
      overflowY: 'auto'
    }
  }
};
exports.MuiCalendarPicker = MuiCalendarPicker;
var MuiMonthPicker = {
  root: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    height: 208,
    paddingTop: 16,
    margin: 0
  }
};
exports.MuiMonthPicker = MuiMonthPicker;
var PrivatePickersMonth = {
  root: {
    flexBasis: 'auto',
    flexGrow: 0,
    borderRadius: 16,
    height: 32,
    width: 64,
    fontWeight: 500,
    margin: 0,
    '&:focus, &:hover': {
      backgroundColor: _colors.primaryLight
    },
    '&.Mui-selected': {
      color: _colors.white,
      backgroundColor: _colors.primary,
      fontSize: 16,
      paddingBottom: 3,
      '&:hover': {
        backgroundColor: _colors.primaryDark
      },
      '&:focus': {
        backgroundColor: _colors.primary
      }
    }
  }
};
exports.PrivatePickersMonth = PrivatePickersMonth;
var MuiYearPicker = {
  root: {
    paddingBottom: 16,
    paddingTop: 16,
    margin: 0,
    height: '100%'
  }
};
exports.MuiYearPicker = MuiYearPicker;
var PrivatePickersYear = {
  root: {
    flexBasis: '100%',
    padding: 0
  },
  button: {
    height: 32,
    width: 64,
    margin: 0,
    fontWeight: 500,
    '&:focus, &:hover': {
      backgroundColor: _colors.primaryLight
    },
    '&.Mui-selected': {
      '&:focus': {
        backgroundColor: _colors.primary,
        color: _colors.white
      }
    }
  }
};
exports.PrivatePickersYear = PrivatePickersYear;
var MuiPickersArrowSwitcher = {
  button: {
    width: 32,
    height: 32
  }
};
exports.MuiPickersArrowSwitcher = MuiPickersArrowSwitcher;