'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseTypeString = parseTypeString;
exports.extractType = extractType;

var _BaseType = require('../../../lib/types/abstract/BaseType');

var _BaseType2 = _interopRequireDefault(_BaseType);

var _jsdocRequire = require('../jsdoc-require');

var _jsdocRequire2 = _interopRequireDefault(_jsdocRequire);

var _parseTypeString = require('./parseTypeString');

var _parseTypeString2 = _interopRequireDefault(_parseTypeString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var typeParser = (0, _jsdocRequire2.default)('jsdoc-75lb/lib/jsdoc/tag/type.js');

/**
 * Parses a type string ({type} [variable] - description).
 *
 * @param {!string} typeString - The type of the string.
 * @returns {!BaseType} The type in the string.
 */
function parseTypeString(typeString) {
  var typeRaw = typeParser.parse(typeString, true, true);

  return extractType(typeRaw);
}

/**
 * Unifies JSDoc's representations of types.
 *
 * @param {!object} typeRaw - The JSDoc representation of a @typedef or type string.
 * @returns {!BaseType} The unified type.
 */
function extractType(typeRaw) {
  var parsedType = typeRaw.parsedType ? typeRaw.parsedType : typeRaw;

  /**
   * @type {!BaseType}
   */
  var type = (0, _parseTypeString2.default)(parsedType);

  type.description = extractFromMultiple('text', void 0, typeRaw, parsedType) || extractFromMultiple('description', null, typeRaw, parsedType);
  type.name = typeRaw.name;
  type.nullable = extractFromMultiple('nullable', true, typeRaw, parsedType);
  type.optional = extractFromMultiple('optional', false, typeRaw, parsedType);

  // TODO depends on the type. Should be parsed
  // Array default value = '[]'
  // const defaultValue = parsedType.defaultValue;

  return type;
}

function extractFromMultiple(propName, def) {
  for (var _len = arguments.length, multiple = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    multiple[_key - 2] = arguments[_key];
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;

  var _iteratorError = void 0;

  try {

    for (var _iterator = multiple[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      if (item[propName] !== void 0) {
        return item[propName];
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return def;
}