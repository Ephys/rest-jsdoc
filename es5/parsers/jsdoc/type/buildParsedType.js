'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildParsedType;

var _PrimitiveType = require('../../../lib/types/PrimitiveType');

var _PrimitiveType2 = _interopRequireDefault(_PrimitiveType);

var _CustomType = require('../../../lib/types/CustomType');

var _CustomType2 = _interopRequireDefault(_CustomType);

var _ObjectType = require('../../../lib/types/ObjectType');

var _ObjectType2 = _interopRequireDefault(_ObjectType);

var _UnionType = require('../../../lib/types/UnionType');

var _UnionType2 = _interopRequireDefault(_UnionType);

var _AnyType = require('../../../lib/types/AnyType');

var _AnyType2 = _interopRequireDefault(_AnyType);

var _GenericType = require('../../../lib/types/GenericType');

var _GenericType2 = _interopRequireDefault(_GenericType);

var _BaseType = require('../../../lib/types/abstract/BaseType');

var _BaseType2 = _interopRequireDefault(_BaseType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JsDocParsedTypeKind = {
  NameExpression: 'NameExpression',
  RecordType: 'RecordType',
  TypeApplication: 'TypeApplication',
  TypeUnion: 'TypeUnion'
};

/**
 * Converts @type-like type declaration into a BaseType.
 *
 * @param {!Object} parsedType - The declaration, parsed by JSDoc's parser.
 * @returns {!BaseType} The type.
 */
function buildParsedType(parsedType) {

  var type = parsedType.type;

  // Is JsDocTypedefInstance.
  if (typeof type !== 'string') {
    throw new Error('#buildInstanceForParsedType: arg is not of type JsDocParsedType');
  }

  switch (type) {
    case JsDocParsedTypeKind.NameExpression:
      return buildNamedType(parsedType);

    case JsDocParsedTypeKind.RecordType:
      return buildObjectType(parsedType);

    case JsDocParsedTypeKind.TypeApplication:
      return buildGenericType(parsedType);

    case JsDocParsedTypeKind.TypeUnion:
      return buildUnionType(parsedType);

    default:
      throw Error('Unknown JSDoc type ' + JSON.stringify(type));
  }
}

function buildNamedType(namedExpression) {
  var name = namedExpression.name;

  if (_PrimitiveType2.default.TYPES.includes(name)) {
    return new _PrimitiveType2.default(name);
  }

  return new _CustomType2.default(name);
}

function buildGenericType(applicationType) {
  //        v application(s)
  // Array.<string>
  // ^ expression
  var expression = buildParsedType(applicationType.expression);
  var instance = new _GenericType2.default(expression);

  applicationType.applications.forEach(function (generic) {
    instance.addGeneric(buildParsedType(generic));
  });

  return instance;
}

function buildUnionType(union) {
  var instance = new _UnionType2.default();

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;

  var _iteratorError = void 0;

  try {
    for (var _iterator = union.elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var element = _step.value;

      var elInstance = buildParsedType(element);

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

function buildObjectType(record) {
  var instance = new _ObjectType2.default();

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;

  var _iteratorError2 = void 0;

  try {
    for (var _iterator2 = record.fields[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var field = _step2.value;

      var name = field.key.name;
      var member = buildParsedType(field.value);
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