"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colors = require("../../colors");
var _shadows = require("../../shadows");
var _sharedStyles = require("../../sharedStyles");
var _typography = require("../../typography");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var styles = {
  // Autocomplete root
  root: {
    borderRadius: 4,
    // TextField & text INSIDE TextField
    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
      minHeight: 40,
      padding: '2px 4px',
      fontFamily: _typography.fontFamily,
      color: _colors.black,
      flexGrow: 1
    },
    // TextField - hover out
    '& .MuiOutlinedInput-root': {
      letterSpacing: 'normal',
      '& fieldset': _objectSpread({}, _sharedStyles.textFieldFadeOut),
      // Restricted Chip number count
      '& span.MuiAutocomplete-tag': {
        color: _colors.neutral7
      },
      // Chip padding
      '& div .MuiChip-root': {
        marginLeft: 4,
        marginRight: 0,
        '&:not(:first-of-type)': {
          marginLeft: 4
        }
      },
      // TextField - error
      '&.Mui-error .MuiOutlinedInput-notchedOutline': {
        border: "2px solid ".concat(_colors.utilityNegative)
      },
      '&.Mui-error input': {
        border: 'none !important'
      },
      // TextField - disabled
      '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
        border: "1px solid ".concat(_colors.neutral4),
        pointerEvents: 'none'
      },
      '&.Mui-disabled': {
        backgroundColor: _colors.neutral2
      },
      '&.Mui-disabled .MuiChip-root, &.Mui-disabled .MuiChip-root': {
        color: _colors.white
      },
      // Dropdown Arrow - removes 'flip'
      '& .MuiAutocomplete-endAdornment': {
        '& .MuiAutocomplete-popupIndicator.MuiAutocomplete-popupIndicatorOpen': {
          transform: 'none'
        }
      }
    },
    '& .MuiInputBase-root.Mui-disabled': {
      opacity: 1
    },
    // TextField - border
    '& .MuiOutlinedInput-notchedOutline': {
      border: "1px solid ".concat(_colors.neutral4)
    },
    '&:hover .MuiOutlinedInput-notchedOutline': _objectSpread({}, _sharedStyles.textFieldHoverStyle),
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: "1px solid ".concat(_colors.primary)
    },
    // Helper text - BELOW TextField
    '& .MuiFormHelperText-root': {
      color: _colors.neutral8,
      fontSize: 13,
      lineHeight: '24px',
      margin: 0,
      letterSpacing: 'normal',
      fontFamily: _typography.fontFamily,
      '&.MuiFormHelperText-root.Mui-disabled': {
        color: _colors.neutral8,
        pointerEvents: 'none'
      },
      '&.MuiFormHelperText-root.Mui-error': {
        color: _colors.utilityNegative
      }
    },
    '& .MuiAutocomplete-clearIndicator': {
      display: 'none'
    },
    '& input': {
      height: 36,
      paddingLeft: '4px !important',
      border: 'none',
      fontSize: 16
    },
    '& .MuiAutocomplete-popupIndicator': {
      height: 32,
      width: 32
    },
    '& .MuiAutocomplete-endAdornment': {
      top: 4,
      right: 0,
      marginRight: -2
    },
    '&.MuiAutocomplete-hasPopupIcon .MuiOutlinedInput-root': {
      paddingRight: '40px !important'
    }
  },
  // Label text - ABOVE TextField
  label: {
    color: _colors.neutral8,
    fontSize: 14,
    lineHeight: 1.71,
    marginBottom: 4,
    '& span': {
      top: -2
    }
  },
  clearAll: {
    fontSize: 14,
    color: _colors.primary,
    lineHeight: 1.71,
    marginLeft: 'auto',
    marginBottom: 4,
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  },
  clearAllDisabled: {
    opacity: 0.4,
    pointerEvents: 'none'
  },
  // Menu items text
  option: {
    // increase specificity to override MUI's default style selectors
    '&.MuiAutocomplete-option': {
      fontFamily: _typography.fontFamily,
      color: _colors.neutral8,
      backgroundColor: 'transparent',
      letterSpacing: 'normal',
      minHeight: 40,
      display: 'block',
      paddingTop: 8,
      '&[aria-selected="true"]': {
        backgroundColor: 'transparent',
        fontWeight: 500,
        color: _colors.black,
        '&:hover svg': {
          color: "".concat(_colors.primaryDark2, " !important")
        }
      },
      '&:hover, &:focus, &[data-focus="true"], &.Mui-focused': {
        backgroundColor: "".concat(_colors.primaryLight, " !important"),
        color: _colors.black,
        '&[aria-disabled="true"]': {
          backgroundColor: 'transparent',
          color: _colors.neutral8
        },
        '& svg': {
          color: _colors.primary
        }
      }
    }
  },
  hiddenPlaceholder: {
    visibility: 'hidden',
    position: 'absolute',
    display: 'inline-block',
    minWidth: 32
  },
  paper: {
    boxShadow: _shadows.shadowLevel3,
    border: "1px solid ".concat(_colors.neutral4),
    margin: '4px 0'
  },
  small: {
    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
      minHeight: 32,
      padding: '2px 4px'
    },
    '& input': {
      height: 28,
      fontSize: 14
    },
    '& .MuiAutocomplete-popupIndicator, & .MuiAutocomplete-clearIndicator, & .MuiIconButton-sizeMedium.MuiAutocomplete-clearIndicator': {
      height: 28,
      width: 28
    },
    '&.MuiAutocomplete-hasPopupIcon .MuiOutlinedInput-root': {
      paddingRight: '32px !important'
    },
    '& .MuiAutocomplete-endAdornment': {
      top: 2
    }
  },
  optionSmall: {
    // increase specificity to override MUI's default style selectors
    '&.MuiAutocomplete-option': {
      minHeight: 32,
      fontSize: 14,
      lineHeight: '20px',
      paddingTop: 6,
      '& .MuiCheckbox-root': {
        top: 9
      }
    }
  },
  showClearIndicator: {
    '& .MuiAutocomplete-clearIndicator': {
      display: 'inline-flex',
      height: 32,
      width: 32
    },
    '&:hover .MuiAutocomplete-clearIndicator, &.Mui-focused .MuiAutocomplete-clearIndicator': {
      visibility: 'visible'
    }
  },
  labelWrapper: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  popper: {
    zIndex: 3001
  },
  moreIndicator: {
    margin: 'auto 3px',
    color: _colors.neutral7
  },
  chipWrapper: {
    maxWidth: 'calc(100% - 32px)',
    gridTemplateColumns: 'repeat(10, minmax(0px, auto))',
    display: 'grid'
  }
};
var _default = styles;
exports.default = _default;