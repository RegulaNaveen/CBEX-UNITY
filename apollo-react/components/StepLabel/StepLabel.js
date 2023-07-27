"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.StepLabel = void 0;
var _StepLabel = _interopRequireDefault(require("@mui/material/StepLabel"));
var _react = _interopRequireDefault(require("react"));
var _StepIcon = _interopRequireDefault(require("../StepIcon"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var StepLabel = function StepLabel(_ref) {
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  return /*#__PURE__*/_react.default.createElement(_StepLabel.default, _extends({
    StepIconComponent: _StepIcon.default
  }, rest));
};
exports.StepLabel = StepLabel;
var _default = StepLabel;
exports.default = _default;