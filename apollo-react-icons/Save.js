"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _createSvgIcon = _interopRequireDefault(require("./createSvgIcon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = (0, _createSvgIcon["default"])( /*#__PURE__*/React.createElement("path", {
  d: "M20.3333333,2.00000401 L5.67833333,2.00000401 C5.2359652,1.99903086 4.81161752,2.17519216 4.5,2.48917472 L2.48833333,4.50000401 C2.17624274,4.81316468 2.00069396,5.23705807 2,5.67917472 L2,20.3333414 C2,21.253816 2.74619208,22.000004 3.66666667,22.000004 L20.3333333,22.000004 C21.2538079,22.000004 22,21.253816 22,20.3333414 L22,3.66667472 C22,2.74620014 21.2538079,2.00000401 20.3333333,2.00000401 Z M5.95833333,7.00000974 C5.90301195,7.00023068 5.8498921,6.97835283 5.81077366,6.93923439 C5.77165522,6.90011595 5.74977738,6.8469961 5.74999832,6.79167472 L5.74999832,3.87500805 C5.74999832,3.75994873 5.84327401,3.66667472 5.95833333,3.66667472 L18.0416667,3.66667472 C18.0969398,3.66667472 18.149969,3.68853804 18.1891667,3.72750805 C18.2278334,3.76690673 18.2496507,3.81980617 18.2499983,3.87500805 L18.2499983,6.79167472 C18.2502226,6.8469961 18.2283448,6.90011595 18.1892263,6.93923439 C18.1501079,6.97835283 18.096988,7.00023068 18.0416667,7.00000974 L5.95833333,7.00000974 Z M14.9166667,12.4166747 C14.9166667,14.0275052 13.6108305,15.3333414 12,15.3333414 C10.3891695,15.3333414 9.08333333,14.0275052 9.08333333,12.4166747 C9.08333333,10.8058442 10.3891695,9.50000805 12,9.50000805 C13.6108305,9.50000805 14.9166667,10.8058442 14.9166667,12.4166747 L14.9166667,12.4166747 Z M5.75,18.8750081 C5.75,18.7599487 5.84327401,18.6666747 5.95833333,18.6666747 L18.0416667,18.6666747 C18.156726,18.6666747 18.25,18.7599487 18.25,18.8750081 L18.25,20.1250081 C18.25,20.2400674 18.156726,20.3333414 18.0416667,20.3333414 L5.95833333,20.3333414 C5.84327401,20.3333414 5.75,20.2400674 5.75,20.1250081 L5.75,18.8750081 Z"
}), 'Save');

exports["default"] = _default;