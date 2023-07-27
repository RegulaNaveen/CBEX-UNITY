"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = void 0;
var _colors = require("../../colors");
var _sharedStyles = require("../../sharedStyles");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var placeholder = {
  color: _colors.neutral6,
  opacity: 1
};
var classes = {
  root: {
    backgroundColor: _colors.white,
    borderRadius: 4,
    color: _colors.black,
    '&.Mui-disabled': {
      pointerEvents: 'none',
      backgroundColor: _colors.neutral2,
      color: _colors.neutral7,
      '& .MuiInputAdornment-positionEnd svg': {
        color: _colors.neutral5
      }
    },
    '&:hover > input:not(.Mui-disabled)': _sharedStyles.textFieldHoverStyle,
    '&.Mui-error': {
      '&.MuiAutocomplete-inputRoot': {
        '& input[aria-invalid=true], & textarea[aria-invalid=true], & div[aria-haspopup=listbox]': {
          border: 'none !important'
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: "2px solid ".concat(_colors.utilityNegative, " !important")
        }
      },
      '& input[aria-invalid=true], & textarea[aria-invalid=true], & div[aria-haspopup=listbox]': {
        border: "2px solid ".concat(_colors.utilityNegative, " !important")
      },
      '& div[aria-haspopup=listbox]': {
        height: 40,
        lineHeight: 1.4,
        paddingLeft: 6
      }
    }
  },
  input: _objectSpread(_objectSpread({
    boxSizing: 'border-box',
    borderRadius: 4,
    border: "1px solid ".concat(_colors.neutral4),
    lineHeight: 1.5,
    padding: '8px 8px 8px 7px'
  }, _sharedStyles.textFieldFadeOut), {}, {
    '&:hover': _objectSpread(_objectSpread({}, _sharedStyles.textFieldHoverStyle), {}, {
      '& div': {
        borderColor: _colors.primary
      }
    }),
    '&:focus': _sharedStyles.textFieldFocusStyle,
    '&:required': {
      '&:focus': _sharedStyles.textFieldFocusStyle
    },
    '&::-webkit-input-placeholder': placeholder,
    '&::-moz-placeholder': placeholder,
    // Firefox 19+
    '&::-ms-input-placeholder': placeholder,
    // Edge
    '&:disabled': {
      color: _colors.neutral7
    },
    '&.MuiInput-input': {
      height: 40
    },
    '&.MuiOutlinedInput-input.Mui-disabled': {
      WebkitTextFillColor: 'unset'
    }
  }),
  inputAdornedStart: {
    paddingLeft: 31
  },
  inputAdornedEnd: {
    paddingRight: 48
  },
  multiline: {
    padding: 0,
    '&.MuiInputBase-sizeSmall': {
      paddingTop: 0
    }
  },
  inputMultiline: {
    height: 'auto',
    padding: '9px 11px',
    backgroundColor: _colors.white,
    '&.Mui-disabled': {
      backgroundColor: _colors.neutral2
    }
  },
  fullWidth: {
    '& > input': {
      width: '100%'
    }
  },
  inputSizeSmall: {
    lineHeight: '30px !important',
    paddingTop: '0px !important',
    paddingBottom: '0px !important',
    fontSize: 14,
    '&.MuiInput-input': {
      height: 32
    },
    '&.Mui-error': {
      backgroundColor: _colors.utilityNegative
    }
  },
  sizeSmall: {
    '& .MuiSelect-selectMenu': {
      height: '32px !important'
    },
    '&.Mui-error .MuiInput-input': {
      lineHeight: '28px !important',
      height: '32px !important'
    },
    '&.Mui-error .MuiSelect-selectMenu': {
      lineHeight: '28px !important'
    }
  }
};
exports.classes = classes;