"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _moment = _interopRequireDefault(require("moment"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Gives a text representation of the notification time, relative to the current Date.
 *
 * The current date is received as a parameter to make this a pure function so it's easier to test.
 *
 * @param {Number} timestamp the timestamp of the notification
 * @param {String|Date|moment.Moment} currentDate the current date to compare with the timestamp, can beas a string, a `Date` object or a `moment()` instance
 * @param {String} currentDateFormat format used to parse currentDate when its passed as a String, defaults to "YYYMMDD"
 *
 * @returns String
 */
var getTimestampAsText = function getTimestampAsText(timestamp, currentDate) {
  var currentDateFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'YYYYMMDD';
  var date = (0, _moment.default)(timestamp);
  var current = (0, _moment.default)(currentDate, currentDateFormat);
  if (date.isSame(current, 'day')) {
    return date.format('LT');
  }
  var yesterday = current.subtract(1, 'day');
  if (date.isSame(yesterday, 'day')) {
    // This is a little hacky, but it automatically translates 'Yesterday'
    return date.calendar(currentDate).replace(/\d+:\d+/, '').split(/\s+/).sort(function (a, b) {
      return b.length - a.length;
    })[0];
  }
  return date.format('MMM D');
};
var _default = getTimestampAsText;
exports.default = _default;