"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _createSvgIcon = _interopRequireDefault(require("./createSvgIcon"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var _default = (0, _createSvgIcon.default)( /*#__PURE__*/React.createElement("path", {
  fillRule: "evenodd",
  d: "M4.16784886,9.00661628 L11.4897123,16.7949811 L11.4897123,16.7949811 C11.623731,16.9259501 11.8089989,17 12.002656,17 C12.196313,17 12.3815809,16.9259501 12.5155997,16.7949811 L19.8341301,9.00661628 C19.9523922,8.88178628 20.0115655,8.71736045 19.9981227,8.55092736 C19.9846799,8.38449427 19.8997703,8.23028326 19.7628046,8.12354774 L18.5296066,7.15117311 C18.2434863,6.92517905 17.8167567,6.9560394 17.5710451,7.22049461 L12.1283089,13.1240639 C12.0966507,13.1585324 12.0505259,13.1783572 12.0019894,13.1783572 C11.9534528,13.1783572 11.9073281,13.1585324 11.8756699,13.1240639 L6.43093391,7.2198701 C6.31274047,7.09335274 6.1459942,7.01569104 5.96698481,7.00378685 C5.78766808,6.98880898 5.60950907,7.04241955 5.473039,7.15242215 L4.23917436,8.12354774 C4.10142084,8.23009387 4.01577169,8.38449395 4.00186707,8.55134261 C3.98838265,8.71798405 4.04836984,8.88252371 4.16784886,9.00661628 Z"
}), 'ChevronDown');
exports.default = _default;