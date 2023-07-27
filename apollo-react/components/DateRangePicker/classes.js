"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MuiDateRangePickerDay = void 0;
var _colors = require("../../colors");
var _shadows = require("../../shadows");
var _typography = require("../../typography");
var MuiDateRangePickerDay = {
  root: {
    '&.MuiDateRangePickerDay-rangeIntervalDayHighlight': {
      backgroundColor: _colors.primaryLight,
      color: '#fff',
      // squares all edges of selected range
      borderRadius: '0 !important'
    },
    '& .MuiDateRangePickerDay-rangeIntervalDayHighlightEnd': {
      marginRight: 0
    },
    '& .MuiDateRangePickerDay-rangeIntervalDayHighlightStart': {
      marginLeft: 0
    },
    '& .MuiDateRangePickerDay-rangeIntervalPreview': {
      border: 'none'
    },
    '& .MuiDateRangePickerDay-dayInsideRangeInterval': {
      '&:hover': {
        backgroundColor: _shadows.blackExtraLight
      },
      '& .MuiDateRangePickerDay-MuiPickersDay-dayLabel': {
        color: _colors.neutral7
      }
    },
    '& .MuiDateRangePickerDay-rangeIntervalDayPreview': {
      border: 'none',
      background: _colors.primaryLight,
      // squares all edges of preview range
      borderRadius: '0 !important'
    },
    '& .MuiDateRangePickerDay-day': {
      fontFamily: _typography.fontFamily,
      width: 40,
      height: 40,
      fontSize: 16,
      fontWeight: 500,
      transform: 'scale(1)',
      '&:hover:not(.MuiPickersDay-daySelected) .MuiPickersDay-dayLabel': {
        color: _colors.black
      }
    },
    '& .MuiDateRangePickerDay-dayOutsideRangeInterval': {
      '&:hover': {
        border: 'none'
      }
    }
  }
};
exports.MuiDateRangePickerDay = MuiDateRangePickerDay;