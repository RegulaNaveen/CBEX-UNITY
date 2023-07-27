"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SELECT_ROW_ACC = void 0;
exports.compareDates = compareDates;
exports.compareNumbers = compareNumbers;
exports.compareStrings = compareStrings;
exports.createSelectFilterComponent = createSelectFilterComponent;
exports.createStringSearchFilter = createStringSearchFilter;
exports.datePickerFilter = exports.dateFilter = void 0;
exports.exactNumberSearchFilter = exactNumberSearchFilter;
exports.getLastVisibleColumnAcc = void 0;
exports.numberSearchFilter = numberSearchFilter;
var _moment = _interopRequireDefault(require("moment"));
var _react = _interopRequireDefault(require("react"));
var _MenuItem = _interopRequireDefault(require("../MenuItem"));
var _Select = _interopRequireDefault(require("../Select"));
var _excluded = ["multiple"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var SELECT_ROW_ACC = '__internal_row_selector';
exports.SELECT_ROW_ACC = SELECT_ROW_ACC;
function compareDates(accessor, sortOrder) {
  return function (rowA, rowB) {
    var result;
    var valueA = rowA[accessor];
    var valueB = rowB[accessor];

    // Check for empty values
    if (!valueA && valueB) {
      result = -1;
    } else if (!valueB && valueA) {
      result = 1;
    } else if (!valueA && !valueB) {
      result = 0;
    }
    if (result === undefined) {
      var dateA = (0, _moment.default)(valueA, 'MM/DD/YYYY');
      var dateB = (0, _moment.default)(valueB, 'MM/DD/YYYY');

      // Check for invalid values
      if (!dateA.isValid() && dateB.isValid()) {
        result = -1;
      } else if (!dateB.isValid() && dateA.isValid()) {
        result = 1;
      } else if (!dateA.isValid() && !dateB.isValid()) {
        result = 0;
        // Finally compare the dates
      } else if (dateA.isBefore(dateB)) {
        result = -1;
      } else if (dateB.isBefore(dateA)) {
        result = 1;
      } else {
        result = 0;
      }
    }
    return sortOrder === 'asc' || result === 0 ? result : -result;
  };
}
function compareStrings(accessor, sortOrder) {
  return function (rowA, rowB) {
    var result;
    var stringA = (rowA[accessor] || '').toUpperCase();
    var stringB = (rowB[accessor] || '').toUpperCase();
    if (stringA < stringB) {
      result = -1;
    } else if (stringA > stringB) {
      result = 1;
    } else {
      return 0;
    }
    return sortOrder === 'asc' ? result : -result;
  };
}
function compareNumbers(accessor, sortOrder) {
  return function (rowA, rowB) {
    var numberA = rowA[accessor] || 0;
    var numberB = rowB[accessor] || 0;
    if (sortOrder === 'asc') {
      return numberA - numberB;
    } else {
      return numberB - numberA;
    }
  };
}
function createStringSearchFilter(accessor) {
  return function (row, filters) {
    if (!filters[accessor]) {
      return true;
    }
    if (!row[accessor]) {
      return false;
    }
    var rowVal = row[accessor].toUpperCase();
    var filterVal = filters[accessor].toUpperCase();
    return rowVal.includes(filterVal);
  };
}
function numberSearchFilter(accessor) {
  return function (row, filters) {
    if (!filters[accessor]) {
      return true;
    }
    if (!row[accessor]) {
      return false;
    }
    var rowVal = row[accessor].toString();
    var filterVal = filters[accessor].toString();
    return rowVal.includes(filterVal);
  };
}
var dateFilter = function dateFilter(accessor) {
  return function (row, filters) {
    if (!filters[accessor] || !filters[accessor][0] && !filters[accessor][1]) {
      return true;
    }
    if (!row[accessor]) {
      return false;
    }
    var date = (0, _moment.default)(row[accessor], 'MM/DD/YYYY');
    var fromDate = (0, _moment.default)(filters[accessor][0], 'MM/DD/YYYY');
    var toDate = (0, _moment.default)(filters[accessor][1], 'MM/DD/YYYY');
    return (!fromDate.isValid() || date.isAfter(fromDate)) && (!toDate.isValid() || date.isBefore(toDate)) || date.isSame(fromDate) || date.isSame(toDate);
  };
};
exports.dateFilter = dateFilter;
var datePickerFilter = function datePickerFilter(accessor) {
  return function (row, filters) {
    if (!filters[accessor]) {
      return true;
    }
    if (!row[accessor]) {
      return false;
    }
    var date = (0, _moment.default)(row[accessor], 'MM/DD/YYYY');
    var fromDate = (0, _moment.default)(filters[accessor], 'MM/DD/YYYY');
    return !fromDate.isValid() || date.isSame(fromDate, 'day');
  };
};
exports.datePickerFilter = datePickerFilter;
function exactNumberSearchFilter(accessor) {
  return function (row, filters) {
    var rowVal = row[accessor];
    var filterVal = filters[accessor];
    return !filterVal || rowVal === parseInt(filterVal, 10);
  };
}
function createSelectFilterComponent(options) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    multiple = _ref.multiple,
    rest = _objectWithoutProperties(_ref, _excluded);
  return function (_ref2) {
    var accessor = _ref2.accessor,
      filters = _ref2.filters,
      updateFilterValue = _ref2.updateFilterValue;
    return /*#__PURE__*/_react.default.createElement(_Select.default, _extends({
      value: multiple && filters[accessor] === '' ? [] : filters[accessor],
      name: accessor,
      onChange: updateFilterValue,
      fullWidth: true,
      margin: "none",
      multiple: multiple
    }, rest), options.map(function (optionValue) {
      return /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
        key: optionValue,
        value: optionValue
      }, optionValue);
    }));
  };
}
var getLastVisibleColumnAcc = function getLastVisibleColumnAcc(columns) {
  return columns.reduce(function (acc, _ref3) {
    var hidden = _ref3.hidden,
      accessor = _ref3.accessor;
    return !hidden ? accessor : acc;
  }, undefined);
};
exports.getLastVisibleColumnAcc = getLastVisibleColumnAcc;