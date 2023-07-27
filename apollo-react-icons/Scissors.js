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
  d: "M17.3801634,15.6481926 C16.0956177,15.353495 14.744721,15.7767217 13.9072632,16.7362287 L13.1080788,14.852353 C13.0700407,14.7624907 13.1045267,14.6599385 13.1906612,14.6067748 C16.7804943,12.5061479 19.0008396,8.85219634 19.0975219,4.88604257 C19.0977156,4.02018836 18.9855989,3.15752464 18.7636404,2.31704542 C18.719083,2.1468256 18.5655574,2.02101096 18.3796592,2.00237178 C18.193761,1.9837326 18.0153257,2.07626301 17.9333766,2.23379859 L12.1934567,13.2640035 C12.1558805,13.3352507 12.0784412,13.380343 11.9936606,13.380343 C11.90888,13.380343 11.8314407,13.3352507 11.7938645,13.2640035 L6.0530566,2.23546353 C5.97110754,2.07792794 5.79267225,1.98539753 5.60677402,2.00403672 C5.42087578,2.0226759 5.2673502,2.14849054 5.22279282,2.31871036 C5.00180123,3.15877367 4.88999164,4.02080958 4.88979932,4.88604257 C4.98538616,8.85400983 7.20662603,12.5098995 10.7984359,14.6109372 C10.8846098,14.6640595 10.9194107,14.7664473 10.8819063,14.8565153 L10.0827219,16.7412235 C9.0762065,15.5823941 7.35010588,15.2275149 5.9186718,15.8851119 C4.48723772,16.5427089 3.72876275,18.0389956 4.08892459,19.4947581 C4.44908644,20.9505206 5.83270326,21.9810371 7.42676578,21.9807789 C8.76169398,21.9775186 9.97660256,21.2575822 10.5524647,20.128537 L11.9936606,16.7362287 L13.460608,20.1834799 C14.2289749,21.666484 16.0667504,22.3673903 17.7212298,21.8084318 C19.3757093,21.2494733 20.3140787,19.6106588 19.8967063,18.0090727 C19.5980103,16.8411629 18.625746,15.9290388 17.3801634,15.6481926 Z M9.07574958,19.1087633 L8.92923244,19.4542377 C8.64358212,19.9856217 8.06148343,20.3194321 7.42676578,20.315871 C6.51605717,20.315871 5.77778198,19.6237222 5.77778198,18.7699487 C5.77778198,17.9161753 6.51605717,17.2240551 7.42676578,17.2240551 C8.33747438,17.2240551 9.07574958,17.9161753 9.07574958,18.7699487 L9.07574958,19.1087633 Z M16.5605554,20.3158424 C15.9482932,20.323481 15.3811778,20.0147851 15.0847282,19.5125105 L14.9071315,19.1037685 L14.9071315,18.7707812 C14.9066448,17.917442 15.6438025,17.2251321 16.5540472,17.2240607 C17.464292,17.2229917 18.2032996,17.9135661 18.2050991,18.7669037 C18.2068921,19.6202413 17.4707976,20.3135446 16.5605554,20.3158424 Z"
}), 'Scissors');

exports["default"] = _default;