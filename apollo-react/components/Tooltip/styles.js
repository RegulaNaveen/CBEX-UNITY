"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = exports.largeStyles = exports.darkStyles = exports.baseStyles = void 0;
var _colors = require("../../colors");
var _shadows = require("../../shadows");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var placements = {
  Bottom: ['top', 'left'],
  Top: ['bottom', 'left'],
  Right: ['left', 'top'],
  Left: ['right', 'top']
};

// TO DO: this can probably be DRYed up, but will it be more readable
//        and/or easier to understand and modify in the future?
var transforms = {
  large: {
    light: {
      Top: 'transform="rotate(180 8 4.5)"',
      Right: 'transform="rotate(270 8 4) translate(-4 -4)"',
      Bottom: '',
      Left: 'transform="rotate(90 8 4) translate(4 3)"'
    },
    dark: {
      Top: '',
      Right: 'transform="rotate(90 8 4) translate(4 4)"',
      Bottom: 'transform="rotate(180 8 4)"',
      Left: 'transform="rotate(270 8 4) translate(-4 -4)"'
    }
  },
  small: {
    light: {
      Top: 'transform="rotate(180 8 4) translate(4 0)"',
      Right: 'transform="rotate(270 8 4) translate(0 -4)"',
      Bottom: '',
      Left: 'transform="rotate(90 8 4) translate(4 4)"'
    },
    dark: {
      Top: 'transform="rotate(180 8 4) translate(4 2)"',
      Right: 'transform="rotate(270 8 4) translate(0 -4)"',
      Bottom: '',
      Left: 'transform="rotate(90 8 4) translate(4 6)"'
    }
  }
};

/**
 * Returns the proper size depending on the size,
 * variant and placement.
 */
var sizes = {
  large: {
    light: function light(placement) {
      if (placement === 'Top' || placement === 'Bottom') {
        return {
          width: 16,
          height: 9
        };
      }
      return {
        width: 9,
        height: 16
      };
    },
    dark: function dark(placement) {
      if (placement === 'Top' || placement === 'Bottom') {
        return {
          width: 16,
          height: 8
        };
      }
      return {
        width: 8,
        height: 16
      };
    }
  },
  small: {
    light: function light(placement) {
      if (placement === 'Top' || placement === 'Bottom') {
        return {
          width: 12,
          height: 8
        };
      }
      return {
        width: 8,
        height: 12
      };
    },
    dark: function dark(placement) {
      if (placement === 'Top' || placement === 'Bottom') {
        return {
          width: 12,
          height: 6
        };
      }
      return {
        width: 6,
        height: 12
      };
    }
  }
};

// TO DO: this can probably be DRYed up, but will it be more readable?
//        The lines where this variables get interpolated (the SVG string)
//        are already pretty crowded. Maybe turn this into a function.
var offsets = {
  absolute: {
    large: {
      light: 9,
      dark: 9
    },
    small: {
      light: 8,
      dark: 7
    }
  },
  calc: {
    large: {
      light: 8,
      dark: 8
    },
    small: {
      light: 6,
      dark: 6
    }
  }
};
var svgs = {
  large: {
    light: function light(placement) {
      var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#fff';
      return "<svg clip-rule=\"evenodd\" fill-rule=\"evenodd\" version=\"1.1\" viewBox=\"0 0 ".concat(sizes.large.light(placement).width, " ").concat(sizes.large.light(placement).height, "\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"").concat(color, "\" ").concat(transforms.large.light[placement], "><path d=\"m0 8.749h16l-6.958-7.762c-0.292-0.326-0.674-0.494-1.067-0.487-0.375 7e-3 -0.737 0.175-1.017 0.487l-6.958 7.762z\" stroke=\"#d9d9d9\" stroke-width=\"1px\"/><path d=\"m15.019 8.5c0-0.276-0.224-0.5-0.5-0.5h-12.977c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5h12.977c0.276 0 0.5-0.224 0.5-0.5z\"/></g></svg>");
    },
    dark: function dark(placement) {
      return "<svg version=\"1.1\" viewBox=\"0 0 ".concat(sizes.large.dark(placement).width, " ").concat(sizes.large.dark(placement).height, "\" xmlns=\"http://www.w3.org/2000/svg\"> <g fill=\"none\" fill-rule=\"evenodd\"><path ").concat(transforms.large.dark[placement], " d=\"m9.4142 7.3465c-0.78105 0.87127-2.0474 0.87127-2.8284 0l-6.5858-7.3465h16l-6.5858 7.3465z\" fill=\"#444\"/></g></svg>");
    }
  },
  small: {
    light: function light(placement) {
      return "<svg clip-rule=\"evenodd\" fill-rule=\"evenodd\" stroke-linejoin=\"round\" stroke-miterlimit=\"2\" version=\"1.1\" viewBox=\"0 0 ".concat(sizes.small.light(placement).width, " ").concat(sizes.small.light(placement).height, "\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\"><g ").concat(transforms.small.light[placement], "><path d=\"m5.248 0.859c0.19-0.217 0.464-0.341 0.752-0.341s0.562 0.124 0.752 0.341c1.807 2.065 6.248 7.141 6.248 7.141h-14s4.441-5.076 6.248-7.141z\" fill=\"#d9d9d9\"/><path d=\"m4.537 3.048c0.337-0.472 0.882-0.753 1.463-0.753s1.126 0.281 1.463 0.753c1.476 2.066 3.537 4.952 3.537 4.952h-10s2.061-2.886 3.537-4.952z\" fill=\"#fff\"/></g></svg>");
    },
    dark: function dark(placement) {
      return "<svg clip-rule=\"evenodd\" fill-rule=\"evenodd\" stroke-linejoin=\"round\" stroke-miterlimit=\"2\" version=\"1.1\" viewBox=\"0 0 ".concat(sizes.small.dark(placement).width, " ").concat(sizes.small.dark(placement).height, "\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\"><g ").concat(transforms.small.dark[placement], "><path d=\"m5.155 0.845c0.218-0.218 0.524-0.342 0.845-0.342s0.627 0.124 0.845 0.342l5.155 5.155h-12l5.155-5.155z\" fill=\"#444\"/></g></svg>");
    }
  }
};

/**
 * Returns an object with the styles required to show
 * the Tooltip arrow using an SVG as background-image.
 * @param {string} size Can be 'large' or 'small'
 * @param {string} placement Can be 'Top', 'Right', Bottom' or 'Left'
 * @param {string} variant Can be 'light' or 'dark'
 */
var getArrowStyles = function getArrowStyles(size, placement, variant, color) {
  var _objectSpread2;
  var _placements$placement = _slicedToArray(placements[placement], 2),
    first = _placements$placement[0],
    second = _placements$placement[1];
  return _defineProperty({}, "&[data-popper-placement*=\"".concat(placement.toLowerCase(), "\"] $arrow"), _objectSpread(_objectSpread({}, sizes[size][variant](placement)), {}, (_objectSpread2 = {}, _defineProperty(_objectSpread2, first, -offsets.absolute[size][variant]), _defineProperty(_objectSpread2, second, "calc(50% - ".concat(offsets.calc[size][variant], "px)")), _defineProperty(_objectSpread2, "color", 'transparent'), _defineProperty(_objectSpread2, "backgroundSize", "".concat(sizes[size][variant](placement).width, "px ").concat(sizes[size][variant](placement).height, "px")), _defineProperty(_objectSpread2, "backgroundImage", "url(\"data:image/svg+xml, ".concat(encodeURIComponent(svgs[size][variant](placement, color)), "\");")), _objectSpread2)));
};
var arrowGenerator = function arrowGenerator(variant, size, color) {
  return ['Bottom', 'Top', 'Right', 'Left'].reduce(function (acc, position) {
    return _objectSpread(_objectSpread({}, acc), getArrowStyles(size, position, variant, color));
  }, {
    opacity: 1
  });
};
var baseStyles = {
  arrow: {
    position: 'absolute',
    fontSize: 6,
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      borderStyle: 'solid'
    }
  },
  popper: arrowGenerator('light', 'small'),
  title: {
    fontSize: 13,
    fontWeight: 400,
    lineHeight: 1.54
  },
  tooltip: {
    background: _colors.white,
    color: _colors.black,
    fontSize: 13,
    border: "solid 1px ".concat(_colors.neutral4),
    borderRadius: 4,
    boxShadow: _shadows.shadowLevel3,
    padding: '1px 7px'
  }
};
exports.baseStyles = baseStyles;
var largeStyles = {
  title: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.5
  },
  subtitle: {
    color: _colors.black,
    fontSize: 14,
    lineHeight: 1.7143
  },
  tooltip: {
    padding: '7px 15px',
    margin: '14px !important'
  },
  labelSpacer: {
    marginTop: 8
  }
};
exports.largeStyles = largeStyles;
var darkStyles = _objectSpread(_objectSpread({}, baseStyles), {}, {
  popper: arrowGenerator('dark', 'small'),
  tooltip: _objectSpread(_objectSpread({}, baseStyles.tooltip), {}, {
    background: _colors.neutral8,
    color: _colors.white,
    border: "solid 1px ".concat(_colors.neutral8)
  })
});
exports.darkStyles = darkStyles;
var styles = {
  arrow: baseStyles.arrow,
  'small-light-popper': baseStyles.popper,
  'small-light-title': baseStyles.title,
  'small-light-tooltip': baseStyles.tooltip,
  'small-dark-popper': darkStyles.popper,
  'small-dark-title': darkStyles.title,
  'small-dark-tooltip': darkStyles.tooltip,
  'large-light-popper': arrowGenerator('light', 'large'),
  'large-light-popper-peek': arrowGenerator('light', 'large', '#f6f7fb'),
  'large-light-title': largeStyles.title,
  'large-light-subtitle': largeStyles.subtitle,
  'large-light-tooltip': _objectSpread(_objectSpread({}, baseStyles.tooltip), largeStyles.tooltip),
  'large-light-labelSpacer': largeStyles.labelSpacer,
  'large-dark-popper': arrowGenerator('dark', 'large'),
  'large-dark-title': largeStyles.title,
  'large-dark-subtitle': _objectSpread(_objectSpread({}, largeStyles.subtitle), {}, {
    color: _colors.white
  }),
  'large-dark-tooltip': _objectSpread(_objectSpread({}, darkStyles.tooltip), largeStyles.tooltip),
  'large-dark-labelSpacer': largeStyles.labelSpacer,
  'large-left': {
    margin: '13px !important'
  },
  'large-right': {
    margin: '15px !important'
  }
};
exports.styles = styles;