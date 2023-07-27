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
  d: "M14.7481493,9.25354374 C15.0839502,9.59130376 15.0839502,10.1367988 14.7481493,10.4745588 L9.88422622,15.337836 C9.84355459,15.3783036 9.82068874,15.4333089 9.82068874,15.4906794 C9.82068874,15.5480498 9.84355459,15.6030551 9.88422622,15.6435227 L14.7481493,20.5111297 C15.0763708,20.8509173 15.0716768,21.3910268 14.7375992,21.7250599 C14.4035217,22.0590931 13.8633405,22.0637865 13.5235077,21.7356087 L8.65958461,16.8714656 C8.57459282,16.7876097 8.43798297,16.7876097 8.35299117,16.8714656 L3.48906806,21.7356087 C3.27161668,21.9607228 2.94960399,22.0510052 2.64679583,21.9717557 C2.34398766,21.8925063 2.10750801,21.656058 2.02824803,21.3532901 C1.94898804,21.0505221 2.03928242,20.7285522 2.26442645,20.5111297 L7.12834956,15.6469866 C7.16902119,15.606519 7.19188705,15.5515137 7.19188705,15.4941432 C7.19188705,15.4367727 7.16902119,15.3817675 7.12834956,15.3412998 L2.26442645,10.4780227 C1.93620499,10.1382351 1.94089902,9.59812565 2.27497657,9.26409247 C2.60905413,8.93005929 3.1492353,8.92536588 3.48906806,9.25354374 L8.35299117,14.1168209 C8.43798297,14.2006767 8.57459282,14.2006767 8.65958461,14.1168209 L13.5235077,9.25354374 C13.8617131,8.91548542 14.409944,8.91548542 14.7481493,9.25354374 Z M21.118839,10.3780126 L21.1205601,10.3812501 C21.5958197,10.3812501 21.9810937,10.7436196 21.9810937,11.190625 C21.9810937,11.6376304 21.5958197,12 21.1205601,12 L16.8609188,12 C16.5400653,12.0001341 16.2457787,11.8323659 16.0974617,11.5647649 C15.9491447,11.2971639 15.9714322,10.9741775 16.1552812,10.7268532 L20.0354272,5.52014424 C20.3637232,5.10812553 20.3746527,4.5446873 20.0625546,4.12167938 C19.7504564,3.69867145 19.1854544,3.51113758 18.6602085,3.65621659 C18.1349626,3.8012956 17.7674879,4.24639034 17.7481289,4.76095056 C17.7352165,5.05011237 17.5592681,5.31082973 17.2865619,5.44489293 C17.0138556,5.57895614 16.6858221,5.56599779 16.4260283,5.41089919 C16.1662345,5.25580058 16.0141493,4.98212487 16.0270617,4.69296306 C16.080316,3.4947454 16.9361719,2.46035348 18.1580157,2.11748089 C19.3798595,1.77460829 20.6984063,2.19882151 21.4410013,3.17370875 C22.1835963,4.14859599 22.1865772,5.45929963 21.4484234,6.43716603 L18.7489295,10.0591188 C18.7025977,10.1209626 18.6968167,10.2019505 18.7339436,10.2690644 C18.7710704,10.3361782 18.8449024,10.3782057 18.9253389,10.3780126 L21.118839,10.3780126 L21.118839,10.3780126 Z"
}), 'Superscript');

exports["default"] = _default;