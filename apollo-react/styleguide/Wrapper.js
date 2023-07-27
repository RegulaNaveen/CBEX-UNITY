"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _withTheme = _interopRequireDefault(require("../utils/withTheme"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var Wrapper = function Wrapper(props) {
  return props.children;
};
var _default = (0, _withTheme.default)()(Wrapper);
exports.default = _default;