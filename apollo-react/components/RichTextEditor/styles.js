"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editorStyles = exports.classes = void 0;
var _colors = require("../../colors");
var _shadows = require("../../shadows");
var _sharedStyles = require("../../sharedStyles");
var _typography = require("../../typography");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var classes = {
  root: {
    fontFamily: _typography.fontFamily,
    borderRadius: 5,
    padding: 8,
    border: "solid 1px ".concat(_colors.neutral4),
    boxSizing: 'content-box',
    position: 'relative'
  },
  rootDisabled: {
    pointerEvents: 'none',
    backgroundColor: _colors.neutral2,
    opacity: 0.4,
    color: _colors.neutral6,
    '& .MuiInputBase-root': {
      backgroundColor: 'transparent'
    }
  },
  label: {
    display: 'block',
    marginBottom: 5
  },
  withHover: _objectSpread(_objectSpread({}, _sharedStyles.textFieldFadeOut), {}, {
    '&:hover': _sharedStyles.textFieldHoverStyle
  }),
  withFocus: {
    borderColor: _colors.primary
  },
  withError: {
    border: "2px solid ".concat(_colors.utilityNegative, " !important")
  },
  /* InlineControllers */
  inlineControllersRoot: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  /* PopoverControllers */
  popoverControllersRoot: {
    position: 'relative',
    boxSizing: 'content-box'
  },
  controllerHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1
  },
  toolbar: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    position: 'absolute',
    backgroundColor: 'white',
    border: 'solid 1px',
    borderColor: 'rgba(200, 200, 200, 0.8)',
    borderRadius: 5,
    zIndex: 10,
    padding: 5,
    width: 260,
    right: 0,
    top: 24,
    boxShadow: _shadows.shadowLevel3,
    opacity: 1,
    transition: 'all 1s linear'
  }
};
exports.classes = classes;
var editorStyles = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: _typography.fontFamily,
    fontSize: 16,
    padding: 2
  },
  /* Legacy css below */

  /* font types */
  Arial: {
    fontFamily: 'Arial'
  },
  'Arial Black': {
    fontFamily: 'Arial Black'
  },
  'Courier New': {
    fontFamily: 'Courier New'
  },
  Georgia: {
    fontFamily: 'Georgia'
  },
  Helvetica: {
    fontFamily: 'Helvetica'
  },
  Impact: {
    fontFamily: 'Impact'
  },
  'Lucida Console': {
    fontFamily: 'Lucida Console'
  },
  'Proxima Nova': {
    fontFamily: 'Proxima Nova'
  },
  Roboto: {
    fontFamily: 'Roboto'
  },
  'Times New Roman': {
    fontFamily: 'Times New Roman'
  },
  /* font colors */
  White: {
    color: 'white'
  },
  Black: {
    color: 'black'
  },
  Grey: {
    color: 'grey'
  },
  Blue: {
    color: _colors.primary
  },
  Green: {
    color: 'green'
  },
  Red: {
    color: 'red'
  },
  Purple: {
    color: 'purple'
  },
  /* background colors */
  whiteBackground: {
    backgroundColor: 'White'
  },
  blackBackground: {
    backgroundColor: 'Black'
  },
  greyBackground: {
    backgroundColor: 'Grey'
  },
  blueBackground: {
    backgroundColor: _colors.primary
  },
  greenBackground: {
    backgroundColor: 'Green'
  },
  redBackground: {
    backgroundColor: 'Red'
  },
  purpleBackground: {
    backgroundColor: 'Purple'
  },
  /* font sizes */
  '8pt': {
    fontSize: '8pt'
  },
  '10pt': {
    fontSize: '10pt'
  },
  '12pt': {
    fontSize: '12pt'
  },
  '14pt': {
    fontSize: '14pt'
  },
  '16pt': {
    fontSize: '16pt'
  },
  '18pt': {
    fontSize: '18pt'
  },
  '24pt': {
    fontSize: '24pt'
  },
  '32pt': {
    fontSize: '32pt'
  },
  '48pt': {
    fontSize: '48pt'
  },
  /* Legacy css above */

  /* text transformation */
  UPPERCASE: {
    textTransform: 'uppercase'
  },
  LOWERCASE: {
    textTransform: 'lowercase'
  }
};
exports.editorStyles = editorStyles;