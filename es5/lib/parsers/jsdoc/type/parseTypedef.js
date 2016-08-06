'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = parseTypedef;
exports.buildInstanceForTypedef = buildInstanceForTypedef;

var _PrimitiveType = require('../../../format/types/PrimitiveType');

var _PrimitiveType2 = _interopRequireDefault(_PrimitiveType);

var _CustomType = require('../../../format/types/CustomType');

var _CustomType2 = _interopRequireDefault(_CustomType);

var _ObjectType = require('../../../format/types/ObjectType');

var _ObjectType2 = _interopRequireDefault(_ObjectType);

var _UnionType = require('../../../format/types/UnionType');

var _UnionType2 = _interopRequireDefault(_UnionType);

var _AnyType = require('../../../format/types/AnyType');

var _AnyType2 = _interopRequireDefault(_AnyType);

var _parseType = require('./parseType');

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
        // if one of the possibilities is all possibilities, the others have no point in existing.
        // Stop here.
        return new _AnyType2.default();
      }

      if (_PrimitiveType2.default.TYPES.includes(name)) {
        instances.push(new _PrimitiveType2.default(name));
        continue;
      }

      if (name === 'Object') {
        // we don't have details for literals in typedefs.
        instances.push(buildObjectType(parsedType));
        continue;
      }

      // TODO Array
      // TODO Array.<>

      instances.push(new _CustomType2.default(name));
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