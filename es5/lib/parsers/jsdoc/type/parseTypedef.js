'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = parseTypedef;
exports.buildInstanceForTypedef = buildInstanceForTypedef;

var _PrimitiveType = require('../../../format/types/PrimitiveType');

var _PrimitiveType2 = _interopRequireDefault(_PrimitiveType);

var _ObjectType = require('../../../format/types/ObjectType');

var _ObjectType2 = _interopRequireDefault(_ObjectType);

var _UnionType = require('../../../format/types/UnionType');

var _UnionType2 = _interopRequireDefault(_UnionType);

var _AnyType = require('../../../format/types/AnyType');

var _AnyType2 = _interopRequireDefault(_AnyType);

var _parseType = require('./parseType');

var _parseTypeString = require('./parseTypeString');

var _parseTypeString2 = _interopRequireDefault(_parseTypeString);

var _catharsis = require('catharsis');

var _catharsis2 = _interopRequireDefault(_catharsis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Parses a @typedef declaration.
 *
 * @param doc - The declaration, parsed by JSDoc's parser.
 * @returns {BaseType} The declared type.
 */
function parseTypedef(doc) {
  if (doc.kind !== 'typedef') {
    return null;
  }

  return (0, _parseType.extractType)(doc);
}

/**
 * Unifies a @typedef type declaration.
 *
 * @param {!Object} parsedType - The declaration, parsed by JSDoc's parser.
 * @returns {!BaseType} The type.
 */
function buildInstanceForTypedef(parsedType) {

  var type = parsedType.type;
  if (type == null) {
    return new _AnyType2.default();
  }

  if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) !== 'object') {
    throw new Error('Type is not an object (is ' + JSON.stringify(type) + ') in typedef, report this as bug.');
  }

  var instances = [];

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;

  var _iteratorError = void 0;

  try {
    for (var _iterator = parsedType.type.names[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var name = _step.value;

      if (name === '*') {
        // Special case 1
        // if one of the possibilities is all possibilities, the others have no point in existing.
        // Stop here.
        return new _AnyType2.default();
      }

      if (name === 'Object') {
        // special case 2
        // for objects as their properties are stored in parsedType.properties
        // and would be lost when sent through catharsis.
        instances.push(buildObjectType(parsedType));
        continue;
      }

      // Parse the string in the format handled by parseTypeString and send it back.
      var newFormat = _catharsis2.default.parse(name, { jsdoc: true });
      instances.push((0, _parseTypeString2.default)(newFormat));
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

  if (instances.length === 1) {
    return instances[0];
  }

  var instance = new _UnionType2.default();
  instances.forEach(function (element) {
    return instance.addElement(element);
  });

  return instance;
}

/**
 * Builds an ObjectType from parsed JSDoc @typedef-like type declarations.
 *
 * @param {!Object} parsedType - The declaration, parsed by JSDoc's parser.
 * @returns {!ObjectType} The object type.
 */
function buildObjectType(parsedType) {
  var instance = new _ObjectType2.default();

  if (!parsedType.properties) {
    return instance;
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;

  var _iteratorError2 = void 0;

  try {
    for (var _iterator2 = parsedType.properties[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var property = _step2.value;

      var member = (0, _parseType.extractType)(property);
      instance.addMember(member);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return instance;
}