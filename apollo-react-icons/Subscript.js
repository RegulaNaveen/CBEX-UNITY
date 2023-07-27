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
  d: "M14.7481493,2.25354374 C15.0839502,2.59130376 15.0839502,3.13679882 14.7481493,3.47455884 L9.88422622,8.33783597 C9.84355459,8.37830362 9.82068874,8.43330886 9.82068874,8.49067935 C9.82068874,8.54804984 9.84355459,8.60305508 9.88422622,8.64352273 L14.7481493,13.5111297 C15.0763708,13.8509173 15.0716768,14.3910268 14.7375992,14.7250599 C14.4035217,15.0590931 13.8633405,15.0637865 13.5235077,14.7356087 L8.65958461,9.87146557 C8.57459282,9.78760973 8.43798297,9.78760973 8.35299117,9.87146557 L3.48906806,14.7356087 C3.27161668,14.9607228 2.94960399,15.0510052 2.64679583,14.9717557 C2.34398766,14.8925063 2.10750801,14.656058 2.02824803,14.3532901 C1.94898804,14.0505221 2.03928242,13.7285522 2.26442645,13.5111297 L7.12834956,8.6469866 C7.16902119,8.60651895 7.19188705,8.55151371 7.19188705,8.49414322 C7.19188705,8.43677273 7.16902119,8.3817675 7.12834956,8.34129985 L2.26442645,3.47802271 C1.93620499,3.13823509 1.94089902,2.59812565 2.27497657,2.26409247 C2.60905413,1.93005929 3.1492353,1.92536588 3.48906806,2.25354374 L8.35299117,7.11682088 C8.43798297,7.20067672 8.57459282,7.20067672 8.65958461,7.11682088 L13.5235077,2.25354374 C13.8617131,1.91548542 14.409944,1.91548542 14.7481493,2.25354374 Z M21.118839,20.3780126 L21.1205601,20.3812501 C21.5958197,20.3812501 21.9810937,20.7436196 21.9810937,21.190625 C21.9810937,21.6376304 21.5958197,22 21.1205601,22 L16.8609188,22 C16.5400653,22.0001341 16.2457787,21.8323659 16.0974617,21.5647649 C15.9491447,21.2971639 15.9714322,20.9741775 16.1552812,20.7268532 L20.0354272,15.5201442 C20.3637232,15.1081255 20.3746527,14.5446873 20.0625546,14.1216794 C19.7504564,13.6986715 19.1854544,13.5111376 18.6602085,13.6562166 C18.1349626,13.8012956 17.7674879,14.2463903 17.7481289,14.7609506 C17.7352165,15.0501124 17.5592681,15.3108297 17.2865619,15.4448929 C17.0138556,15.5789561 16.6858221,15.5659978 16.4260283,15.4108992 C16.1662345,15.2558006 16.0141493,14.9821249 16.0270617,14.6929631 C16.080316,13.4947454 16.9361719,12.4603535 18.1580157,12.1174809 C19.3798595,11.7746083 20.6984063,12.1988215 21.4410013,13.1737087 C22.1835963,14.148596 22.1865772,15.4592996 21.4484234,16.437166 L18.7489295,20.0591188 C18.7025977,20.1209626 18.6968167,20.2019505 18.7339436,20.2690644 C18.7710704,20.3361782 18.8449024,20.3782057 18.9253389,20.3780126 L21.118839,20.3780126 L21.118839,20.3780126 Z"
}), 'Subscript');

exports["default"] = _default;