"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Splits an array is as many parts as filters are passed in the second parameter, each one of those parts is also an
 * array, containing all the elements that matched the filter at the same index.
 *
 * example:
 * ```
 * const people = [
 *  { name: 'Jonathan Joestar', birthYear: 1868, score: 100000 },
 *  { name: 'Joseph Joestar',   birthYear: 1920, score: 40000 },
 *  { name: 'Jotaro kujo',      birthYear: 1970, score: 32000 },
 *  { name: 'Giorno Giovanna',  birthYear: 1985, score: 45000 },
 *  { name: 'Emporio Alnino',   birthYear: 2000, score: 500 },
 * ]
 *
 * const [
 *   born19thCentury, // Jonathan only.
 *   born20thCentury, // Joseph, Jotaro and Giorno.
 *   scoreOver35K,    // Jonathan, Joseph and Giorno.
 *   unmatched,       // Emporio.
 * ] = classifyByCallback(people, [
 *    e => e.birthYear >= 1800 && e.birthYear <= 1899,
 *    e => e.birthYear >= 1900 && e.birthYear <= 1999,
 *    e => e.score > 35000,
 * ])
 * ```
 *
 * Passing the third argument as `true` will cause the elements to be added to only the first classification whose filter
 * matches. In the previous example, it causes `scoreOver35K` to be empty, because all elements that could match that
 * filter (Jonathan, Joseph and Giorno) already matched one of the previous two filters.
 *
 * @param {Array<T>} elements Array of elements to classify.
 * @param {Array<Function>} filters Array of closures to test against each position of `elements`.
 * @param {Boolean} stopAtFirstMatch If `true`, each element will match only the first filter that returns a "truthy" value.
 * @returns {Array<Array<T>>} Array classified elements.
 */
var classifyByCallback = function classifyByCallback(elements, filters) {
  var stopAtFirstMatch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var unmatchedElements = [];
  var initial = Array.from(Array(filters.length), function () {
    return [];
  });
  var classified = elements.reduce(function (acc, el) {
    var isMatched = false;
    for (var index = 0; index < filters.length; index++) {
      var filter = filters[index];
      if (filter(el)) {
        acc[index].push(el);
        isMatched = true;
        if (stopAtFirstMatch) {
          break;
        }
      }
    }
    if (!isMatched) {
      unmatchedElements.push(el);
    }
    return acc;
  }, initial);
  classified.push(unmatchedElements);
  return classified;
};
var _default = classifyByCallback;
exports.default = _default;