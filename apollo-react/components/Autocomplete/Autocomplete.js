"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderTags = exports.renderOption = exports.isOptionEqualToValue = exports.getOptionLabel = exports.filterOptions = exports.defaultAddLabelFunc = exports.default = exports.Autocomplete = void 0;
var _Autocomplete = _interopRequireWildcard(require("@mui/material/Autocomplete"));
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _styles = require("@mui/styles");
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _reactWindow = require("react-window");
var _ArrowDown = _interopRequireDefault(require("../../icons/ArrowDown"));
var _CloseCircle = _interopRequireDefault(require("../../icons/CloseCircle"));
var _withRef = _interopRequireDefault(require("../../utils/withRef"));
var _Chip = _interopRequireDefault(require("../Chip"));
var _InputLabel = _interopRequireDefault(require("../InputLabel"));
var _Tooltip = _interopRequireDefault(require("../Tooltip"));
var _Typography = _interopRequireDefault(require("../Typography"));
var _FakePopper = _interopRequireDefault(require("./FakePopper"));
var _InlineMenuContainer = _interopRequireDefault(require("./InlineMenuContainer"));
var _Option = _interopRequireDefault(require("./Option"));
var _styles2 = _interopRequireDefault(require("./styles"));
var _excluded = ["children", "size", "forwardedRef"],
  _excluded2 = ["label", "source", "helperText", "disabled", "error", "className", "placeholder", "onChange", "limitChips", "value", "inputValue", "fullWidth", "onInputChange", "required", "asteriskPosition", "optional", "multiple", "chipColor", "size", "showClearAll", "showCheckboxes", "showSelectAll", "showClearIndicator", "selectAllText", "clearAllText", "allChipText", "noOptionsText", "blurOnSelect", "clearOnBlur", "disableClearable", "disableCloseOnSelect", "forcePopupIcon", "alwaysLimitChips", "matchFrom", "limit", "enableVirtualization", "TextFieldProps", "inlineMenu", "iconControlsMenu", "ListboxProps", "maxMenuHeight", "onOpen", "onClose", "open", "forwardedRef", "disableBackspaceRemoveSelected", "noWrap", "allowAddNewOptions", "TooltipProps", "getOptionDisabled", "getOptionTooltip", "addLabelFunc", "maxItems", "filterSelectedOptions"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var generateClassName = (0, _styles.createGenerateClassName)({
  seed: 'a'
});
var defaultAddLabelFunc = function defaultAddLabelFunc(inputValue) {
  return "Add \"".concat(inputValue, "\"");
};
exports.defaultAddLabelFunc = defaultAddLabelFunc;
var filterOptions = function filterOptions(selectAllText) {
  var matchFrom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'start';
  var limit = arguments.length > 2 ? arguments[2] : undefined;
  var allowAddNewOptions = arguments.length > 3 ? arguments[3] : undefined;
  var addLabelFunc = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : defaultAddLabelFunc;
  var value = arguments.length > 5 ? arguments[5] : undefined;
  return function (options, params) {
    var filterCallback = (0, _Autocomplete.createFilterOptions)({
      matchFrom: matchFrom,
      limit: limit,
      stringify: function stringify(option) {
        return option.label === selectAllText ? '' : option.label;
      }
    });
    var filtered = filterCallback(options, params);
    if (allowAddNewOptions && params.inputValue && !options.some(function (_ref) {
      var label = _ref.label;
      return label.toLowerCase() === params.inputValue.toLowerCase();
    }) && (!Array.isArray(value) || !value.some(function (_ref2) {
      var label = _ref2.label;
      return label.toLowerCase() === params.inputValue.toLowerCase();
    }))) {
      filtered.push({
        label: addLabelFunc(params.inputValue),
        __RAW_VALUE__: params.inputValue
      });
    }
    return filtered.length ? filtered : [{
      noMatches: true
    }];
  };
};
exports.filterOptions = filterOptions;
var renderTags = function renderTags(chipColor, size, allSelected, handleClearAll, allChipText, limitChips, alwaysLimitChips, toggleOpen, classes, disabled) {
  return function renderTagsFunc(tagValue, getTagProps) {
    if (allSelected) {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Chip.default, {
        onClick: toggleOpen,
        label: allChipText,
        color: chipColor,
        onDelete: handleClearAll,
        size: size,
        disabled: disabled
      }), tagValue.map(function (option, index) {
        return option.custom && /*#__PURE__*/_react.default.createElement(_Chip.default, _extends({
          key: index,
          onClick: toggleOpen,
          label: option.label
        }, getTagProps({
          index: index
        }), {
          color: chipColor,
          size: size
        }));
      }));
    } else {
      var chips = tagValue.map(function (option, index) {
        var chip = /*#__PURE__*/_react.default.createElement(_Chip.default, _extends({
          key: index,
          onClick: toggleOpen,
          label: option.selectedLabel || option.label
        }, getTagProps({
          index: index
        }), {
          color: chipColor,
          size: size,
          disabled: disabled
        }));
        return limitChips > -1 && alwaysLimitChips ? /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
          title: option.label,
          key: index
        }, chip) : chip;
      });
      if (limitChips > -1 && alwaysLimitChips) {
        var more = chips.length - limitChips;
        if (more > 0) {
          chips = chips.splice(0, limitChips);
          chips.push( /*#__PURE__*/_react.default.createElement("span", {
            className: classes.moreIndicator,
            key: chips.length
          }, "+".concat(more)));
        }
        return /*#__PURE__*/_react.default.createElement("div", {
          className: classes.chipWrapper
        }, chips);
      }
      return chips;
    }
  };
};
exports.renderTags = renderTags;
var getOptionLabel = function getOptionLabel(option) {
  return option.selectedLabel || option.label || '';
};
exports.getOptionLabel = getOptionLabel;
var isOptionEqualToValue = function isOptionEqualToValue(option, value) {
  return option.value ? option.value === value.value : option.label === value.label;
};
exports.isOptionEqualToValue = isOptionEqualToValue;
var renderOption = function renderOption(showCheckboxes, allSelected, matchFrom, noWrap, selectAllText, getOptionTooltip, TooltipProps, noOptionsText, inlineMenu, multiple, value) {
  return function renderOptionFunc(listItemProps, option, _ref3) {
    var inputValue = _ref3.inputValue,
      selected = _ref3.selected;
    var optProps = {
      showCheckboxes: showCheckboxes,
      allSelected: allSelected,
      matchFrom: matchFrom,
      option: option,
      inputValue: inputValue,
      selected: selected,
      noWrap: noWrap,
      listItemProps: listItemProps,
      isSelectAllOption: option.label === selectAllText,
      tooltipText: getOptionTooltip(option),
      TooltipProps: TooltipProps,
      noOptionsText: noOptionsText,
      inlineMenu: inlineMenu,
      shouldHighlight: multiple || (value === null || value === void 0 ? void 0 : value.label) !== inputValue
    };
    return /*#__PURE__*/_react.default.createElement(_Option.default, _extends({}, optProps, {
      key: listItemProps.key
    }));
  };
};
exports.renderOption = renderOption;
var LISTBOX_PADDING = 8; // px

var OuterElementContext = /*#__PURE__*/_react.default.createContext({});
var Row = function Row(_ref4) {
  var data = _ref4.data,
    index = _ref4.index,
    style = _ref4.style;
  return /*#__PURE__*/_react.default.createElement("div", {
    key: data[index].key,
    style: _objectSpread(_objectSpread({}, style), {}, {
      top: style.top + LISTBOX_PADDING
    })
  }, data[index]);
};
var OuterElementType = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var outerProps = _react.default.useContext(OuterElementContext);
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    ref: ref
  }, props, outerProps));
});
OuterElementType.displayName = 'OuterElementType';
function useResetCache(data) {
  var ref = _react.default.useRef(null);
  _react.default.useEffect(function () {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
var ListboxComponentBase = function ListboxComponentBase(_ref5) {
  var children = _ref5.children,
    size = _ref5.size,
    ref = _ref5.forwardedRef,
    other = _objectWithoutProperties(_ref5, _excluded);
  var itemData = _react.default.Children.toArray(children);
  var itemCount = itemData.length;
  var _itemSize = size === 'small' ? 32 : 40;
  var getHeight = function getHeight() {
    if (itemCount > 10) {
      return 10 * _itemSize;
    }
    return itemData.map(function () {
      return _itemSize;
    }).reduce(function (a, b) {
      return a + b;
    }, 0);
  };
  var gridRef = useResetCache(itemCount);
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: ref
  }, /*#__PURE__*/_react.default.createElement(OuterElementContext.Provider, {
    value: other
  }, /*#__PURE__*/_react.default.createElement(_reactWindow.VariableSizeList, {
    itemData: itemData,
    height: getHeight(),
    width: "100%",
    outerElementType: OuterElementType,
    itemSize: function itemSize() {
      return _itemSize;
    },
    overscanCount: 10,
    itemCount: itemCount,
    ref: gridRef
  }, function (props) {
    return /*#__PURE__*/_react.default.createElement(Row, props);
  })));
};
var ListboxComponent = (0, _withRef.default)()(ListboxComponentBase);
var useStyles = (0, _makeStyles.default)(_styles2.default);
var Autocomplete = function Autocomplete(_ref6) {
  var label = _ref6.label,
    source = _ref6.source,
    helperText = _ref6.helperText,
    disabled = _ref6.disabled,
    error = _ref6.error,
    className = _ref6.className,
    placeholder = _ref6.placeholder,
    _onChange = _ref6.onChange,
    _ref6$limitChips = _ref6.limitChips,
    limitChips = _ref6$limitChips === void 0 ? -1 : _ref6$limitChips,
    value = _ref6.value,
    inputValue = _ref6.inputValue,
    fullWidth = _ref6.fullWidth,
    _onInputChange = _ref6.onInputChange,
    required = _ref6.required,
    asteriskPosition = _ref6.asteriskPosition,
    optional = _ref6.optional,
    _ref6$multiple = _ref6.multiple,
    multiple = _ref6$multiple === void 0 ? false : _ref6$multiple,
    _ref6$chipColor = _ref6.chipColor,
    chipColor = _ref6$chipColor === void 0 ? 'white' : _ref6$chipColor,
    _ref6$size = _ref6.size,
    size = _ref6$size === void 0 ? 'medium' : _ref6$size,
    _ref6$showClearAll = _ref6.showClearAll,
    showClearAll = _ref6$showClearAll === void 0 ? false : _ref6$showClearAll,
    _ref6$showCheckboxes = _ref6.showCheckboxes,
    showCheckboxes = _ref6$showCheckboxes === void 0 ? multiple : _ref6$showCheckboxes,
    _ref6$showSelectAll = _ref6.showSelectAll,
    showSelectAll = _ref6$showSelectAll === void 0 ? false : _ref6$showSelectAll,
    _ref6$showClearIndica = _ref6.showClearIndicator,
    showClearIndicator = _ref6$showClearIndica === void 0 ? !multiple : _ref6$showClearIndica,
    _ref6$selectAllText = _ref6.selectAllText,
    selectAllText = _ref6$selectAllText === void 0 ? 'Select all' : _ref6$selectAllText,
    _ref6$clearAllText = _ref6.clearAllText,
    clearAllText = _ref6$clearAllText === void 0 ? 'Clear all' : _ref6$clearAllText,
    _ref6$allChipText = _ref6.allChipText,
    allChipText = _ref6$allChipText === void 0 ? 'All' : _ref6$allChipText,
    _ref6$noOptionsText = _ref6.noOptionsText,
    noOptionsText = _ref6$noOptionsText === void 0 ? 'No options' : _ref6$noOptionsText,
    _ref6$blurOnSelect = _ref6.blurOnSelect,
    blurOnSelect = _ref6$blurOnSelect === void 0 ? !multiple : _ref6$blurOnSelect,
    _ref6$clearOnBlur = _ref6.clearOnBlur,
    clearOnBlur = _ref6$clearOnBlur === void 0 ? true : _ref6$clearOnBlur,
    _ref6$disableClearabl = _ref6.disableClearable,
    disableClearable = _ref6$disableClearabl === void 0 ? false : _ref6$disableClearabl,
    _ref6$disableCloseOnS = _ref6.disableCloseOnSelect,
    disableCloseOnSelect = _ref6$disableCloseOnS === void 0 ? multiple : _ref6$disableCloseOnS,
    _ref6$forcePopupIcon = _ref6.forcePopupIcon,
    forcePopupIcon = _ref6$forcePopupIcon === void 0 ? true : _ref6$forcePopupIcon,
    _ref6$alwaysLimitChip = _ref6.alwaysLimitChips,
    alwaysLimitChips = _ref6$alwaysLimitChip === void 0 ? false : _ref6$alwaysLimitChip,
    _ref6$matchFrom = _ref6.matchFrom,
    matchFrom = _ref6$matchFrom === void 0 ? 'start' : _ref6$matchFrom,
    limit = _ref6.limit,
    enableVirtualization = _ref6.enableVirtualization,
    TextFieldProps = _ref6.TextFieldProps,
    inlineMenu = _ref6.inlineMenu,
    iconControlsMenu = _ref6.iconControlsMenu,
    ListboxProps = _ref6.ListboxProps,
    maxMenuHeight = _ref6.maxMenuHeight,
    onOpen = _ref6.onOpen,
    onClose = _ref6.onClose,
    open = _ref6.open,
    forwardedRef = _ref6.forwardedRef,
    disableBackspaceRemoveSelected = _ref6.disableBackspaceRemoveSelected,
    noWrap = _ref6.noWrap,
    allowAddNewOptions = _ref6.allowAddNewOptions,
    TooltipProps = _ref6.TooltipProps,
    _ref6$getOptionDisabl = _ref6.getOptionDisabled,
    getOptionDisabled = _ref6$getOptionDisabl === void 0 ? function (option) {
      return option.disabled;
    } : _ref6$getOptionDisabl,
    _ref6$getOptionToolti = _ref6.getOptionTooltip,
    getOptionTooltip = _ref6$getOptionToolti === void 0 ? function (option) {
      return option.tooltipText;
    } : _ref6$getOptionToolti,
    _ref6$addLabelFunc = _ref6.addLabelFunc,
    addLabelFunc = _ref6$addLabelFunc === void 0 ? defaultAddLabelFunc : _ref6$addLabelFunc,
    _ref6$maxItems = _ref6.maxItems,
    maxItems = _ref6$maxItems === void 0 ? 10 : _ref6$maxItems,
    _ref6$filterSelectedO = _ref6.filterSelectedOptions,
    filterSelectedOptions = _ref6$filterSelectedO === void 0 ? true : _ref6$filterSelectedO,
    rest = _objectWithoutProperties(_ref6, _excluded2);
  var classes = useStyles();
  var ref = _react.default.useRef();
  var _React$useState = _react.default.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    isOpenState = _React$useState2[0],
    setIsOpenState = _React$useState2[1];
  var isOpen = open !== null && open !== void 0 ? open : isOpenState;
  var handleOpen = function handleOpen(e) {
    if (onOpen) {
      onOpen(e);
    }
    setIsOpenState(true);
  };
  var handleClose = function handleClose(e, reason) {
    if (onClose) {
      onClose(e, reason);
    }
    setIsOpenState(false);
  };
  var toggleOpen = isOpen ? handleClose : handleOpen;
  var sourceMap = _react.default.useMemo(function () {
    var map = new Map();
    if (!Array.isArray(source)) {
      return map;
    }
    source.forEach(function (opt) {
      return map.set(opt.label, opt);
    });
    return map;
  }, [source]);
  var _React$useMemo = _react.default.useMemo(function () {
      var extra = new Map();
      var selected = new Map();
      if (!Array.isArray(value)) {
        return [extra, selected];
      }
      value.forEach(function (val) {
        if (sourceMap.has(val.label)) {
          selected.set(val.label, val);
        } else {
          extra.set(val.label, val);
        }
      });
      return [selected, extra];
    }, [value, sourceMap]),
    _React$useMemo2 = _slicedToArray(_React$useMemo, 2),
    valueMap = _React$useMemo2[0],
    extraValueMap = _React$useMemo2[1];
  var allSelected = multiple && showSelectAll && valueMap.size > 0 && sourceMap.size === valueMap.size;
  var handleClearAll = function handleClearAll(e) {
    _onChange && _onChange(e, [], 'clearAll');
  };
  return /*#__PURE__*/_react.default.createElement(_styles.StylesProvider, {
    generateClassName: generateClassName
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.labelWrapper
  }, label && /*#__PURE__*/_react.default.createElement(_InputLabel.default, {
    required: required,
    optional: optional,
    className: classes.label,
    asteriskPosition: asteriskPosition
  }, label), showClearAll && /*#__PURE__*/_react.default.createElement(_Typography.default, {
    className: (0, _classnames.default)(classes.clearAll, ((value === null || value === void 0 ? void 0 : value.length) === 0 || disabled) && classes.clearAllDisabled),
    onClick: handleClearAll
  }, clearAllText)), /*#__PURE__*/_react.default.createElement(_Autocomplete.default, _extends({
    classes: {
      option: (0, _classnames.default)(classes.option, size === 'small' && classes.optionSmall),
      paper: classes.paper,
      popper: classes.popper
    },
    className: (0, _classnames.default)(classes.root, size === 'small' && classes.small, showClearIndicator && !(chipColor === 'none' && !inputValue) && classes.showClearIndicator, className),
    disabled: disabled,
    options: showSelectAll ? [{
      label: selectAllText
    }].concat(_toConsumableArray(source)) : source,
    limitTags: alwaysLimitChips ? -1 : limitChips,
    filterSelectedOptions: filterSelectedOptions,
    blurOnSelect: blurOnSelect,
    size: "small",
    value: value,
    inputValue: inputValue,
    fullWidth: fullWidth,
    forcePopupIcon: forcePopupIcon,
    selectOnFocus: false,
    popupIcon: /*#__PURE__*/_react.default.createElement(_ArrowDown.default, {
      fontSize: "extraSmall"
    }),
    clearIcon: /*#__PURE__*/_react.default.createElement(_CloseCircle.default, {
      fontSize: "extraSmall"
    }),
    onChange: function onChange(event, value, reason) {
      if (!(reason === 'clear' && multiple || event.key === 'Backspace' && chipColor === 'none')) {
        var hasSelectAll = multiple && Array.isArray(value) && value.some(function (_ref7) {
          var label = _ref7.label;
          return label === selectAllText;
        });
        if (multiple && showSelectAll && hasSelectAll) {
          if (!allSelected) {
            value = [].concat(_toConsumableArray(source), _toConsumableArray(extraValueMap.values()));
          } else {
            value = _toConsumableArray(extraValueMap.values());
          }
        }

        /**
         * `allowAddNewOptions` causes MUI's Autocomplete to have freeSolo set to true. This allows
         * the user to add custom values by pressing enter, but then those values are added as
         * strings instead of objects. The following code formats the values correctly.
         */
        if (value && allowAddNewOptions) {
          if (multiple) {
            value = value.map(function (val) {
              if (typeof val === 'string') {
                return {
                  label: val,
                  custom: true
                };
              } else if (val.__RAW_VALUE__) {
                return {
                  label: val.__RAW_VALUE__,
                  custom: true
                };
              }
              return val;
            });
          } else {
            if (typeof value === 'string') {
              value = {
                label: value,
                custom: true
              };
            } else if (value.__RAW_VALUE__) {
              value = {
                label: value.__RAW_VALUE__,
                custom: true
              };
            }
          }
        }
        _onChange && _onChange(event, value, reason);
      }
    },
    onInputChange: function onInputChange(event, newInputValue, reason) {
      _onInputChange && _onInputChange(event, newInputValue, reason);
    },
    getOptionLabel: getOptionLabel,
    filterOptions: filterOptions(selectAllText, matchFrom, limit, allowAddNewOptions, addLabelFunc, value),
    isOptionEqualToValue: isOptionEqualToValue,
    multiple: multiple,
    disableClearable: disableClearable,
    clearOnBlur: clearOnBlur,
    disableCloseOnSelect: disableCloseOnSelect,
    noOptionsText: noOptionsText,
    ListboxComponent: enableVirtualization ? ListboxComponent : undefined,
    ListboxProps: _objectSpread(_objectSpread(_objectSpread({}, ListboxProps), enableVirtualization && {
      size: size
    }), {}, {
      style: _objectSpread({
        maxHeight: maxMenuHeight || (size === 'small' ? 32 : 40) * maxItems - 8
      }, ListboxProps === null || ListboxProps === void 0 ? void 0 : ListboxProps.style)
    }),
    renderTags: chipColor === 'none' ? function () {} : renderTags(chipColor, size, allSelected, function (e) {
      return _onChange && _onChange(e, _toConsumableArray(extraValueMap.values()), 'remove-option');
    }, allChipText, limitChips, alwaysLimitChips, toggleOpen, classes, disabled),
    onOpen: iconControlsMenu ? undefined : handleOpen,
    onClose: iconControlsMenu ? undefined : handleClose,
    open: isOpen,
    freeSolo: true,
    getOptionDisabled: getOptionDisabled
  }, inlineMenu && {
    PopperComponent: _FakePopper.default,
    PaperComponent: _InlineMenuContainer.default,
    disablePortal: true
  }, iconControlsMenu && {
    open: isOpen || !!inputValue
  }, rest, {
    renderInput: function renderInput(params) {
      var _ref$current;
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_TextField.default, _extends({
        variant: "outlined",
        placeholder: placeholder,
        helperText: helperText,
        error: error
      }, params, {
        fullWidth: fullWidth,
        inputProps: _objectSpread(_objectSpread({}, params.inputProps), {}, {
          style: {
            minWidth: ref === null || ref === void 0 ? void 0 : (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.getBoundingClientRect().width
          }
        })
      }, iconControlsMenu && {
        onClick: function onClick(event) {
          var buttonParent = event.target.closest('button');
          if (buttonParent && Array.from(buttonParent.classList).includes('MuiAutocomplete-popupIndicator')) {
            toggleOpen();
          }
        }
      }, TextFieldProps, {
        onKeyDown: function onKeyDown(event) {
          if (multiple && disableBackspaceRemoveSelected && event.key === 'Backspace') {
            event.stopPropagation();
          }
          (TextFieldProps === null || TextFieldProps === void 0 ? void 0 : TextFieldProps.onKeyDown) && TextFieldProps.onKeyDown(event);
        }
      })), /*#__PURE__*/_react.default.createElement("span", {
        className: classes.hiddenPlaceholder,
        ref: ref
      }, placeholder));
    },
    renderOption: renderOption(showCheckboxes, allSelected, matchFrom, noWrap || enableVirtualization, selectAllText, getOptionTooltip, TooltipProps, noOptionsText, inlineMenu, multiple, value),
    ref: forwardedRef
  })));
};
exports.Autocomplete = Autocomplete;
Autocomplete.propTypes = {
  /**
   * Customize the label shown in the dropdown when adding custom options.
   * Only used when `allowAddNewOptions` is `true`.
   *
   * @param {string} inputValue The current value of the input field.
   */
  addLabelFunc: _propTypes.default.func,
  /**
   * Override the default text for the 'All' `Chip`, displayed when all options
   * are selected.
   */
  allChipText: _propTypes.default.node,
  /* If `true`, a menu option is shown that enables adding custom values. */
  allowAddNewOptions: _propTypes.default.bool,
  /**
   * If `true`, `limitChips` always limits the number of `Chip`s shown, even
   * when the field is focused.
   */
  alwaysLimitChips: _propTypes.default.bool,
  /** Position of the asterisk when `required` is `true`. */
  asteriskPosition: _propTypes.default.oneOf(['before', 'after']),
  /**
   * Control if the input should be blurred when an option is selected:
   * - `false`: the input is not blurred.
   * - `true`: the input is always blurred.
   * - `touch`: the input is blurred after a touch event.
   * - `mouse`: the input is blurred after a mouse event.
   */
  blurOnSelect: _propTypes.default.oneOf(['mouse', 'touch', true, false]),
  /** The color of the `Chip`s. If `'none'`, the `Chip`s will be hidden. */
  chipColor: _propTypes.default.oneOf(['primary', 'white', 'none']),
  /** Override the default text for the 'Clear all' button. */
  clearAllText: _propTypes.default.node,
  /**
   * If `true`, the input's text is cleared on blur if no value is selected.
   * Set to `true` if you want to help the user enter a new value.
   * Set to `false` if you want to help the user resume their search.
   */
  clearOnBlur: _propTypes.default.bool,
  /** The default input value. Use when the component is not controlled. */
  defaultValue: _propTypes.default.any,
  /** If `true`, the options already selected can not be deleted by pressing the backspace key. Only relevant when `multiple` is `true`. */
  disableBackspaceRemoveSelected: _propTypes.default.bool,
  /** If `true`, the input can't be cleared. */
  disableClearable: _propTypes.default.bool,
  /** If `true`, the popup won't close when a value is selected. */
  disableCloseOnSelect: _propTypes.default.bool,
  /** If `true`, the component is disabled. */
  disabled: _propTypes.default.bool,
  /** If `true`, the list of available options loads dynamically on scroll. */
  enableVirtualization: _propTypes.default.bool,
  /** If `true`, the component is displayed in an error state. */
  error: _propTypes.default.bool,
  /** If `true`, the selected options are hidden from the menu. */
  filterSelectedOptions: _propTypes.default.bool,
  /** Force the visibility display of the popup icon. */
  forcePopupIcon: _propTypes.default.oneOf(['auto', true, false]),
  /** If `true`, the component takes up the full width of its container. */
  fullWidth: _propTypes.default.bool,
  /**
   * Used to determine the disabled state for a given option.
   * Signature:
   * function(option: T) => boolean
   * option: The option to test.
   */
  getOptionDisabled: _propTypes.default.func,
  /**
   * Used to determine the tooltip text for a given option.
   *
   * Signature: `function(option: T) => string`
   *
   * @param {Object} option The option to test.
   */
  getOptionTooltip: _propTypes.default.func,
  /** The helper text content. */
  helperText: _propTypes.default.node,
  /**
   * If `true`, the menu will only be shown if there is `inputText` or if the
   * popup icon is clicked. Used with the `popupIcon` prop.
   */
  iconControlsMenu: _propTypes.default.bool,
  /**
   * If `true`, the menu will be shown directly below the field, rather than
   * in a popper.
   */
  inlineMenu: _propTypes.default.bool,
  /** The input value. */
  inputValue: _propTypes.default.string,
  /** The label content. */
  label: _propTypes.default.node,
  /** Limit the number of suggested options to be shown. */
  limit: _propTypes.default.number,
  /**
   * The maximum number of chips that are visible when not focused.
   * Set -1 to disable the limit.
   */
  limitChips: _propTypes.default.number,
  /** Props applied to the `Listbox` component. */
  ListboxProps: _propTypes.default.object,
  /** The matching strategy.
   *
   * `start`: exact match from the beginning of the text
   *
   * `any`: exact match anywhere within the text
   **/
  matchFrom: _propTypes.default.oneOf(['start', 'any']),
  /** Maximum number of menu items shown in the menu. */
  maxItems: _propTypes.default.number,
  /** The maximum height of the menu. */
  maxMenuHeight: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  /** If `true`, `value` must be an array and the menu will support multiple selections. */
  multiple: _propTypes.default.bool,
  /** Text to display when there are no options. */
  noOptionsText: _propTypes.default.node,
  /** If `true`, text in the menu truncates with an overflow ellipsis. */
  noWrap: _propTypes.default.bool,
  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback.
   * @param {T|T[]} value The new value of the component.
   * @param {string} reason One of `"createOption"`, `"selectOption"`, `"removeOption"`, `"blur"` or `"clear"`.
   */
  onChange: _propTypes.default.func,
  /**
   * Callback fired when the popup requests to be closed. Use in controlled mode (see `open`).
   *
   * @param event: The event source of the callback.
   * @param reason: Can be: `"toggleInput"`, `"escape"`, `"selectOption"`,`"removeOption"`, `"blur"`.
   */
  onClose: _propTypes.default.func,
  /**
   * Callback fired when the input value changes.
   *
   * @param {object} event The event source of the callback.
   * @param {string} value The new value of the text input.
   * @param {string} reason Can be: `"input"` (user input), `"reset"` (programmatic change), `"clear"`.
   */
  onInputChange: _propTypes.default.func,
  /**
   * Callback fired when the popup requests to be opened. Use in controlled mode (see `open`).
   *
   * @param event: The event source of the callback.
   */
  onOpen: _propTypes.default.func,
  /** Control the `popup` open state. */
  open: _propTypes.default.bool,
  /** If `true`, the label is displayed as optional. */
  optional: _propTypes.default.bool,
  /** The short hint displayed in the input before the user enters a value. */
  placeholder: _propTypes.default.string,
  /** The icon to display in place of the default popup icon. */
  popupIcon: _propTypes.default.node,
  /** If `true`, the label is displayed as required. */
  required: _propTypes.default.bool,
  /** Override the default text for the 'Select all' menu option. */
  selectAllText: _propTypes.default.string,
  /** If `true`, checkboxes are displayed in the menu. */
  showCheckboxes: _propTypes.default.bool,
  /** If `true`, a clear all button is displayed. */
  showClearAll: _propTypes.default.bool,
  /** If `true`, a clear indicator is displayed. */
  showClearIndicator: _propTypes.default.bool,
  /** If `true`, a select all option is displayed in the menu. */
  showSelectAll: _propTypes.default.bool,
  /** The size of the component. */
  size: _propTypes.default.oneOf(['small', 'medium']),
  /** Array of options. */
  source: _propTypes.default.arrayOf(_propTypes.default.shape({
    /** If `true`, this option was created by the user. */
    custom: _propTypes.default.bool,
    /** If `true`, the option is disabled. */
    disabled: _propTypes.default.bool,
    /** The text of the option. */
    label: _propTypes.default.string,
    /** The text displayed in the Chip, or the field, if different from label. */
    selectedLabel: _propTypes.default.string,
    /** The props applied to the Tooltip. Accepts all Tooltip's props. */
    TooltipProps: _propTypes.default.object,
    /** Add a custom tooltip to show when hovering over the option. */
    tooltipText: _propTypes.default.node,
    /** The value of the Chip, or the field, if different from label. */
    value: _propTypes.default.any
  })),
  /** Props applied to the `TextField` component. */
  TextFieldProps: _propTypes.default.object,
  /** The props applied to the Tooltip. Accepts all Tooltip's props. */
  TooltipProps: _propTypes.default.object,
  /**
   * The value of the autocomplete.
   * The value must have reference equality with the option in order to be selected.
   * You can customize the equality behavior with the isOptionEqualToValue prop.
   */
  value: _propTypes.default.any
};
var _default = (0, _withRef.default)()(Autocomplete);
exports.default = _default;