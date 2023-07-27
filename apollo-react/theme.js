"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _styles = require("@mui/material/styles");
var _classes = require("./components/Accordion/classes");
var _classes2 = require("./components/AccordionDetails/classes");
var _classes3 = require("./components/AccordionSummary/classes");
var _classes4 = require("./components/Avatar/classes");
var _classes5 = require("./components/Backdrop/classes");
var _classes6 = require("./components/Badge/classes");
var _classes7 = require("./components/Banner/classes");
var _classes8 = require("./components/BannerContent/classes");
var _classes9 = require("./components/Button/classes");
var _classes10 = require("./components/Card/classes");
var _classes11 = require("./components/CardActions/classes");
var _classes12 = require("./components/CardContent/classes");
var _classes13 = require("./components/CardMedia/classes");
var _classes14 = require("./components/Checkbox/classes");
var _classes15 = require("./components/Chip/classes");
var _classes16 = require("./components/CustomDialog/classes");
var _classes17 = require("./components/CustomNavigationBar/classes");
var _classes18 = require("./components/CustomTable/classes");
var _classes19 = require("./components/DatePicker/classes");
var _classes20 = require("./components/DateRangePicker/classes");
var _classes21 = require("./components/DialogActions/classes");
var _classes22 = require("./components/DialogContent/classes");
var _classes23 = require("./components/DialogContentText/classes");
var _classes24 = require("./components/Divider/classes");
var _classes25 = require("./components/Drawer/classes");
var _classes26 = require("./components/FormControlLabel/classes");
var _classes27 = require("./components/FormHelperText/classes");
var _classes28 = require("./components/FormLabel/classes");
var _classes29 = require("./components/IconButton/classes");
var _classes30 = require("./components/Input/classes");
var _classes31 = require("./components/InputAdornment/classes");
var _classes32 = require("./components/InputBase/classes");
var _classes33 = require("./components/InputLabel/classes");
var _classes34 = require("./components/LinearProgress/classes");
var _classes35 = require("./components/ListItem/classes");
var _classes36 = require("./components/ListItemText/classes");
var _classes37 = require("./components/Menu/classes");
var _classes38 = require("./components/MenuItem/classes");
var _classes39 = require("./components/Paper/classes");
var _classes40 = require("./components/Popover/classes");
var _classes41 = require("./components/RadialProgress/classes");
var _classes42 = require("./components/Radio/classes");
var _classes43 = require("./components/SegmentedControl/classes");
var _classes44 = require("./components/SegmentedControlGroup/classes");
var _classes45 = require("./components/Select/classes");
var _classes46 = require("./components/Slider/classes");
var _classes47 = require("./components/Step/classes");
var _classes48 = require("./components/StepConnector/classes");
var _classes49 = require("./components/StepLabel/classes");
var _classes50 = require("./components/Stepper/classes");
var _classes51 = require("./components/SvgIcon/classes");
var _classes52 = require("./components/Switch/classes");
var _classes53 = require("./components/Tab/classes");
var _classes54 = require("./components/TableBody/classes");
var _classes55 = require("./components/TableCell/classes");
var _classes56 = require("./components/TableFooter/classes");
var _classes57 = require("./components/TableHead/classes");
var _classes58 = require("./components/TablePagination/classes");
var _classes59 = require("./components/TableRow/classes");
var _classes60 = require("./components/TableSortLabel/classes");
var _classes61 = require("./components/Tabs/classes");
var _classes62 = require("./components/Tooltip/classes");
var _classes63 = require("./components/TreeItem/classes");
var _classes64 = require("./components/TreeView/classes");
var _palette = _interopRequireDefault(require("./palette"));
var _typography = _interopRequireDefault(require("./typography"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var overrides = {
  MuiAppBar: _classes17.classes,
  MuiAvatar: _classes4.classes,
  MuiBackdrop: _classes5.classes,
  MuiBadge: _classes6.classes,
  MuiButton: _classes9.classes,
  MuiCard: _classes10.classes,
  MuiCardActions: _classes11.classes,
  MuiCardContent: _classes12.classes,
  MuiCardMedia: _classes13.classes,
  MuiCheckbox: _classes14.classes,
  MuiChip: _classes15.classes,
  MuiCircularProgress: _classes41.classes,
  MuiDialog: _classes16.classes,
  MuiDialogActions: _classes21.classes,
  MuiDialogContent: _classes22.classes,
  MuiDialogContentText: _classes23.classes,
  MuiDivider: _classes24.classes,
  MuiDrawer: _classes25.classes,
  MuiAccordion: _classes.classes,
  MuiAccordionDetails: _classes2.classes,
  MuiAccordionSummary: _classes3.classes,
  MuiFormControlLabel: _classes26.classes,
  MuiFormHelperText: _classes27.classes,
  MuiFormLabel: _classes28.classes,
  MuiIconButton: _classes29.classes,
  MuiInput: _classes30.classes,
  MuiInputAdornment: _classes31.classes,
  MuiInputBase: _classes32.classes,
  MuiInputLabel: _classes33.classes,
  MuiListItem: _classes35.classes,
  MuiListItemText: _classes36.classes,
  MuiLinearProgress: _classes34.classes,
  MuiMenu: _classes37.classes,
  MuiMenuItem: _classes38.classes,
  MuiPaper: _classes39.classes,
  MuiPickersArrowSwitcher: _classes19.MuiPickersArrowSwitcher,
  MuiPickersDay: _classes19.MuiPickersDay,
  MuiDayPicker: _classes19.MuiDayPicker,
  MuiPickerStaticWrapper: _classes19.MuiPickerStaticWrapper,
  MuiCalendarOrClockPicker: _classes19.MuiCalendarOrClockPicker,
  MuiCalendarPicker: _classes19.MuiCalendarPicker,
  MuiDateRangePickerDay: _classes20.MuiDateRangePickerDay,
  MuiPickersCalendarHeader: _classes19.MuiPickersCalendarHeader,
  PrivatePickersMonth: _classes19.PrivatePickersMonth,
  MuiMonthPicker: _classes19.MuiMonthPicker,
  PrivatePickersYear: _classes19.PrivatePickersYear,
  MuiYearPicker: _classes19.MuiYearPicker,
  MuiRadio: _classes42.classes,
  MuiSelect: _classes45.classes,
  MuiSlider: _classes46.classes,
  MuiSnackbar: _classes7.classes,
  MuiSnackbarContent: _classes8.classes,
  MuiStep: _classes47.classes,
  MuiStepConnector: _classes48.classes,
  MuiStepLabel: _classes49.classes,
  MuiStepper: _classes50.classes,
  MuiSvgIcon: _classes51.classes,
  MuiSwitch: _classes52.classes,
  MuiTab: _classes53.classes,
  MuiTable: _classes18.classes,
  MuiTableBody: _classes54.classes,
  MuiTableCell: _classes55.classes,
  MuiTableFooter: _classes56.classes,
  MuiTableHead: _classes57.classes,
  MuiTablePagination: _classes58.classes,
  MuiTableRow: _classes59.classes,
  MuiTableSortLabel: _classes60.classes,
  MuiTabs: _classes61.classes,
  MuiToggleButton: _classes43.classes,
  MuiToggleButtonGroup: _classes44.classes,
  MuiTooltip: _classes62.classes,
  MuiTreeItem: _classes63.classes,
  MuiTreeView: _classes64.classes,
  MuiPopover: _classes40.classes
};
var fixedOverrides = Object.entries(overrides).reduce(function (acc, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
    k = _ref2[0],
    v = _ref2[1];
  acc[k] = {
    styleOverrides: v
  };
  return acc;
}, {});
var _default = (0, _styles.createTheme)({
  components: fixedOverrides,
  palette: _palette.default,
  typography: _typography.default,
  themeName: 'Apollo'
});
exports.default = _default;