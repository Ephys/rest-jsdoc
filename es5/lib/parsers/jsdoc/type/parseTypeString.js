'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildInstanceForArgType;

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

var _parseTypedef = require('./parseTypedef');

var _parseType = require('./parseType');

var _GenericType = require('../../../format/types/GenericType');

var _GenericType2 = _interopRequireDefault(_GenericType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Unifies a @param-like type declaration.
 *
 * @param {!Object} parsedType - The declaration, parsed by JSDoc's parser.
 * @returns {!BaseType} The type.
 */
function buildInstanceForArgType(parsedType) {

  var type = parsedType.type;

  // Must be @typedef.
  if (typeof type !== 'string') {
    return (0, _parseTypedef.buildInstanceForTypedef)(parsedType);
  }

  switch (type) {
    case 'NameExpression':
      if (_PrimitiveType2.default.TYPES.includes(parsedType.name)) {
        return new _PrimitiveType2.default(parsedType.name);
      }

      return new _CustomType2.default(parsedType.name);

    case 'RecordType':
      return buildObjectType(parsedType);

    case 'TypeApplication':
      return buildGenericType(parsedType);

    case 'TypeUnion':
      return buildUnionType(parsedType);

    default:
      throw Error('Unknown JSDoc type ' + JSON.stringify(type));
  }
}

function buildGenericType(parsedType) {
  //        v application(s)
  // Array.<string>
  // ^ expression
  var expression = buildInstanceForArgType(parsedType.expression);
  var instance = new _GenericType2.default(expression);

  parsedType.applications.forEach(function (generic) {
    instance.addGeneric((0, _parseType.extractType)(generic));
  });

  console.log(parsedType);
  console.log('vvvvv');
  console.log(instance);
  console.log();

  return instance;
}

function buildUnionType(parsedType) {
  var instance = new _UnionType2.default();

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;

  var _iteratorError = void 0;

  try {
    for (var _iterator = parsedType.elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var element = _step.value;

      var elInstance = (0, _parseType.extractType)(element);

      // there is no point in being an union if you allow all types.
      if (elInstance instanceof _AnyType2.default) {
        return elInstance;
      }

      instance.addElement(elInstance);
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

  return instance;
}

/**
 * Builds an ObjectType from parsed JSDoc @param-like type declarations.
 *
 * @param {!Object} parsedType - The declaration, parsed by JSDoc's parser.
 * @returns {!ObjectType} The object type.
 */
function buildObjectType(parsedType) {
  var instance = new _ObjectType2.default();

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;

  var _iteratorError2 = void 0;

  try {
    for (var _iterator2 = parsedType.fields[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var field = _step2.value;

      var name = field.key.name;
      var member = buildInstanceForArgType(field.value);
      member.name = name;

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