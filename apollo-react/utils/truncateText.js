"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.truncateText = void 0;
var truncateText = function truncateText(text, limit) {
  if (text.length > limit) {
    return text.substring(0, limit).trim() + '...';
  }
  return text;
};
exports.truncateText = truncateText;